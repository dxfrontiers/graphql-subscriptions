package de.dxfrontiers.graphql.quackerbackend

import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.config.web.server.invoke
import org.springframework.security.web.server.SecurityWebFilterChain

@EnableWebFluxSecurity
class SecurityConfiguration {

  @Bean
  fun springSecurityFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain {
    return http {
      authorizeExchange {
        // accessing the graphql API doesn't require authentication. The individual operations though, might either
        // behave different or reject any requests.
        authorize("/graphql", permitAll)
        
        authorize(anyExchange, authenticated)
      }
      oauth2ResourceServer { 
        jwt { }
      }
      httpBasic { disable() }
      formLogin { disable() }
    }
  }
}
