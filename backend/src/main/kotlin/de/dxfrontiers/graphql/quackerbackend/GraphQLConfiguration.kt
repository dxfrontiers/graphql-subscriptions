package de.dxfrontiers.graphql.quackerbackend

import graphql.schema.Coercing
import graphql.schema.GraphQLScalarType
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.graphql.execution.RuntimeWiringConfigurer
import java.time.LocalDateTime

@Configuration
class GraphQLConfiguration {
  @Bean
  fun graphqlRuntimeWiring(): RuntimeWiringConfigurer {
    return RuntimeWiringConfigurer {builder ->
      builder.scalar(
        GraphQLScalarType.newScalar()
          .name("DateTime")
          .coercing(LocalDateTimeCoercing())
          .build()
      )
    }
  }

  class LocalDateTimeCoercing : Coercing<LocalDateTime, String> {
    override fun serialize(dataFetcherResult: Any): String =
      (dataFetcherResult as LocalDateTime).toString()

    override fun parseValue(input: Any): LocalDateTime =
      LocalDateTime.parse(input.toString())

    override fun parseLiteral(input: Any): LocalDateTime =
      LocalDateTime.parse(input.toString())

  }
}
