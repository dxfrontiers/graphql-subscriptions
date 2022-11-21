package de.dxfrontiers.graphql.quackerbackend

import graphql.schema.Coercing
import graphql.schema.GraphQLScalarType
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.graphql.execution.RuntimeWiringConfigurer
import org.springframework.graphql.server.*
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.core.context.ReactiveSecurityContextHolder
import org.springframework.security.core.context.SecurityContextImpl
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoders
import org.springframework.security.oauth2.server.resource.BearerTokenAuthenticationToken
import org.springframework.security.oauth2.server.resource.authentication.JwtReactiveAuthenticationManager
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.ofType
import java.time.LocalDateTime

@Configuration
class GraphQLConfiguration {
  @Bean
  fun graphqlRuntimeWiring(): RuntimeWiringConfigurer {
    return RuntimeWiringConfigurer { builder ->
      builder.scalar(
        GraphQLScalarType.newScalar()
          .name("DateTime")
          .coercing(LocalDateTimeCoercing())
          .build()
      )
    }
  }

  @Bean
  fun graphqlWsInterceptor(
    @Value("\${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    issuerUri: String
  ) = WebSocketAuthenticationInterceptor(
    JwtReactiveAuthenticationManager(ReactiveJwtDecoders.fromIssuerLocation(issuerUri))
  )

  class LocalDateTimeCoercing : Coercing<LocalDateTime, String> {
    override fun serialize(dataFetcherResult: Any): String =
      (dataFetcherResult as LocalDateTime).toString()

    override fun parseValue(input: Any): LocalDateTime =
      LocalDateTime.parse(input.toString())

    override fun parseLiteral(input: Any): LocalDateTime =
      LocalDateTime.parse(input.toString())

  }
}

class WebSocketAuthenticationInterceptor(private val authenticationManager: ReactiveAuthenticationManager): WebSocketGraphQlInterceptor {
  private companion object {
    const val TOKEN_KEY_NAME = "token"
    private val AUTHENTICATION_SESSION_ATTRIBUTE_KEY =
      WebSocketAuthenticationInterceptor::class.qualifiedName + ".authentication"

    fun WebSocketSessionInfo.getAuthentication(): BearerTokenAuthenticationToken? =
      attributes[AUTHENTICATION_SESSION_ATTRIBUTE_KEY] as? BearerTokenAuthenticationToken

    fun WebSocketSessionInfo.setAuthentication(authentication: BearerTokenAuthenticationToken) {
      attributes[AUTHENTICATION_SESSION_ATTRIBUTE_KEY] = authentication
    }
  }

  override fun intercept(request: WebGraphQlRequest, chain: WebGraphQlInterceptor.Chain): Mono<WebGraphQlResponse> {

    if (request !is WebSocketGraphQlRequest) {
      return chain.next(request)
    }
    
    val securityContext = Mono.just(request)
      .ofType<WebSocketGraphQlRequest>()
      .mapNotNull { it.sessionInfo.getAuthentication() }
      .flatMap { authenticationManager.authenticate(it) }
      .map { SecurityContextImpl(it) }
    
    return chain.next(request)
      .contextWrite(ReactiveSecurityContextHolder.withSecurityContext(securityContext))
  }

  override fun handleConnectionInitialization(
    sessionInfo: WebSocketSessionInfo,
    connectionInitPayload: MutableMap<String, Any>,
  ): Mono<Any> {
    
    val token = connectionInitPayload[TOKEN_KEY_NAME] as? String
    if (token != null) {
      sessionInfo.setAuthentication(BearerTokenAuthenticationToken(token))
    }

    return Mono.empty()
  }
}
