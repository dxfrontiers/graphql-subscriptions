package de.dxfrontiers.graphql.quackerbackend.controller

import de.dxfrontiers.graphql.quackerbackend.GraphQLConfiguration
import de.dxfrontiers.graphql.quackerbackend.model.Post
import de.dxfrontiers.graphql.quackerbackend.model.PostService
import de.dxfrontiers.graphql.quackerbackend.model.WatchCallback
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.stubbing
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Import
import org.springframework.graphql.test.tester.GraphQlTester
import reactor.test.StepVerifier
import java.time.Duration
import java.time.LocalDateTime

@GraphQlTest(controllers = [GraphQLSubscriptionController::class])
@Import(GraphQLConfiguration::class)
internal class GraphQLSubscriptionControllerTest {

  @MockBean
  lateinit var postService: PostService

  @Autowired
  lateinit var client: GraphQlTester

  @Test
  internal fun `subscriber notified on new entries`() {

    stubbing(postService) {
      on { watch(any()) }.thenAnswer {invocation ->
        val callback = invocation.getArgument(0) as WatchCallback
        
        Thread {
          // simulate defer on another thread
          Thread.sleep(1000)
          callback(Post("12", "Message", LocalDateTime.now()))
        }.start()
        
        return@thenAnswer {}
      }
    }

    val subscription = client.document(
      //language=graphql
      """
        subscription {
          onTimelineUpdate {
            id
            message
          }
        }
      """
    )
      .executeSubscription()
      .toFlux()

    StepVerifier.create(subscription)
      .assertNext { response ->
        response.errors().verify()
        response.path("$.data.onTimelineUpdate.id").matchesJson("\"12\"")
      }
      .thenCancel()
      .verify(Duration.ofSeconds(5))
  }
}
