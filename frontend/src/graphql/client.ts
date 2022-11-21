import {ApolloClient, HttpLink, InMemoryCache, split} from "@apollo/client";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {CloseCode, createClient} from "graphql-ws";
import {getMainDefinition} from "@apollo/client/utilities";
import {setContext} from "@apollo/client/link/context";
import {User} from 'firebase/auth';

export const clientFactory = (user: User) => {

  console.log("client created")

  // setContext is used to specify the authentication token
  const authLink = setContext(async (_, {headers}) => {
    const token = await user.getIdToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });


  let expirationTime: number;
  let activeTimeout: any;
  // client creation with authentication token:
  // https://github.com/enisdenjo/graphql-ws#auth-token
  const graphQLWsClient = createClient({
    url: "ws://localhost:8080/graphql",
    connectionParams: async () => {
      
      console.log("connectionParams")
      
      const result = await user.getIdTokenResult()
      expirationTime = new Date(result.expirationTime).getTime()

      console.log("id token result", {result, expirationTime})
      
      return {token: result.token};
    },
    on: {
      connected: (socket: any) => {
        
        const refreshIn = expirationTime - 2 * 60 * 100 - Date.now()
        
        console.log("connected", {
          expirationTime, activeTimeout, refreshIn
        })


        // set a token expiry timeout for closing the socket
        // with an `403: Forbidden` close event indicating
        // that the token expired.
        activeTimeout = setTimeout(
            () => {
              console.log("timeout hit")
              if (socket.readyState === WebSocket.OPEN)
                socket.close(CloseCode.Forbidden, 'Forbidden');
            },
            // refresh the token two minutes prior to expiry.
            // getIdToken will only refresh tokens, if they will expire within the next five minutes
            refreshIn
        )
      },
      closed: () => {
        console.log("closed", {expirationTime, activeTimeout})
        if (activeTimeout) {
          clearTimeout(activeTimeout)
          activeTimeout = undefined
        }
      }
    },
  })

  const wsLink = new GraphQLWsLink(graphQLWsClient);
  const httpLink = new HttpLink({uri: "/graphql"})

  const splitLink = split(
      ({query}) => {
        const definition = getMainDefinition(query);

        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
  );

  return new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
  });
};
