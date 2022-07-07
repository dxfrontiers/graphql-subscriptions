import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  replyTo: Post;
};


export type MutationCreatePostArgs = {
  message: Scalars['String'];
};


export type MutationReplyToArgs = {
  message: Scalars['String'];
  postId: Scalars['ID'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  message: Scalars['String'];
  postedAt: Scalars['DateTime'];
  replies?: Maybe<Array<Post>>;
  replyTo?: Maybe<Post>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  post: Post;
  timeline: Array<Post>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onTimelineUpdate: Post;
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String'];
  username: Scalars['ID'];
};

export type CreatePostMutationVariables = Exact<{
  message: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string } };

export type FetchPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FetchPostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: string, message: string, postedAt: any, user: { __typename?: 'User', displayName: string, username: string }, replies?: Array<{ __typename?: 'Post', id: string, message: string, postedAt: any, user: { __typename?: 'User', displayName: string, username: string } }> | null } };

export type FetchTimelineQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchTimelineQuery = { __typename?: 'Query', timeline: Array<{ __typename?: 'Post', id: string, message: string, postedAt: any, user: { __typename?: 'User', displayName: string, username: string }, replies?: Array<{ __typename?: 'Post', id: string, message: string, postedAt: any, user: { __typename?: 'User', displayName: string, username: string } }> | null }> };

export type ReplyToPostMutationVariables = Exact<{
  postId: Scalars['ID'];
  message: Scalars['String'];
}>;


export type ReplyToPostMutation = { __typename?: 'Mutation', replyTo: { __typename?: 'Post', id: string } };

export type SubscribeTimelineSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeTimelineSubscription = { __typename?: 'Subscription', onTimelineUpdate: { __typename?: 'Post', id: string, message: string, postedAt: any, user: { __typename?: 'User', displayName: string, username: string } } };


export const CreatePostDocument = gql`
    mutation createPost($message: String!) {
  createPost(message: $message) {
    id
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const FetchPostDocument = gql`
    query fetchPost($id: ID!) {
  post(id: $id) {
    id
    message
    postedAt
    user {
      displayName
      username
    }
    replies {
      id
      message
      user {
        displayName
        username
      }
      postedAt
    }
  }
}
    `;

/**
 * __useFetchPostQuery__
 *
 * To run a query within a React component, call `useFetchPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchPostQuery(baseOptions: Apollo.QueryHookOptions<FetchPostQuery, FetchPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchPostQuery, FetchPostQueryVariables>(FetchPostDocument, options);
      }
export function useFetchPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPostQuery, FetchPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchPostQuery, FetchPostQueryVariables>(FetchPostDocument, options);
        }
export type FetchPostQueryHookResult = ReturnType<typeof useFetchPostQuery>;
export type FetchPostLazyQueryHookResult = ReturnType<typeof useFetchPostLazyQuery>;
export type FetchPostQueryResult = Apollo.QueryResult<FetchPostQuery, FetchPostQueryVariables>;
export const FetchTimelineDocument = gql`
    query fetchTimeline {
  timeline {
    id
    message
    postedAt
    user {
      displayName
      username
    }
    replies {
      id
      message
      user {
        displayName
        username
      }
      postedAt
    }
  }
}
    `;

/**
 * __useFetchTimelineQuery__
 *
 * To run a query within a React component, call `useFetchTimelineQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchTimelineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchTimelineQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchTimelineQuery(baseOptions?: Apollo.QueryHookOptions<FetchTimelineQuery, FetchTimelineQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchTimelineQuery, FetchTimelineQueryVariables>(FetchTimelineDocument, options);
      }
export function useFetchTimelineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchTimelineQuery, FetchTimelineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchTimelineQuery, FetchTimelineQueryVariables>(FetchTimelineDocument, options);
        }
export type FetchTimelineQueryHookResult = ReturnType<typeof useFetchTimelineQuery>;
export type FetchTimelineLazyQueryHookResult = ReturnType<typeof useFetchTimelineLazyQuery>;
export type FetchTimelineQueryResult = Apollo.QueryResult<FetchTimelineQuery, FetchTimelineQueryVariables>;
export const ReplyToPostDocument = gql`
    mutation replyToPost($postId: ID!, $message: String!) {
  replyTo(postId: $postId, message: $message) {
    id
  }
}
    `;
export type ReplyToPostMutationFn = Apollo.MutationFunction<ReplyToPostMutation, ReplyToPostMutationVariables>;

/**
 * __useReplyToPostMutation__
 *
 * To run a mutation, you first call `useReplyToPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyToPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyToPostMutation, { data, loading, error }] = useReplyToPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useReplyToPostMutation(baseOptions?: Apollo.MutationHookOptions<ReplyToPostMutation, ReplyToPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplyToPostMutation, ReplyToPostMutationVariables>(ReplyToPostDocument, options);
      }
export type ReplyToPostMutationHookResult = ReturnType<typeof useReplyToPostMutation>;
export type ReplyToPostMutationResult = Apollo.MutationResult<ReplyToPostMutation>;
export type ReplyToPostMutationOptions = Apollo.BaseMutationOptions<ReplyToPostMutation, ReplyToPostMutationVariables>;
export const SubscribeTimelineDocument = gql`
    subscription subscribeTimeline {
  onTimelineUpdate {
    id
    message
    postedAt
    user {
      displayName
      username
    }
  }
}
    `;

/**
 * __useSubscribeTimelineSubscription__
 *
 * To run a query within a React component, call `useSubscribeTimelineSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeTimelineSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeTimelineSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscribeTimelineSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeTimelineSubscription, SubscribeTimelineSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeTimelineSubscription, SubscribeTimelineSubscriptionVariables>(SubscribeTimelineDocument, options);
      }
export type SubscribeTimelineSubscriptionHookResult = ReturnType<typeof useSubscribeTimelineSubscription>;
export type SubscribeTimelineSubscriptionResult = Apollo.SubscriptionResult<SubscribeTimelineSubscription>;