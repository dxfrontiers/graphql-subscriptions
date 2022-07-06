package de.dxfrontiers.graphql.quackerbackend.controller

import de.dxfrontiers.graphql.quackerbackend.GraphQLConfiguration
import de.dxfrontiers.graphql.quackerbackend.model.Post
import de.dxfrontiers.graphql.quackerbackend.model.PostService
import de.dxfrontiers.graphql.quackerbackend.model.User
import de.dxfrontiers.graphql.quackerbackend.model.UserService
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.kotlin.any
import org.mockito.kotlin.argThat
import org.mockito.kotlin.eq
import org.mockito.kotlin.stubbing
import org.mockito.stubbing.Stubbing
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Import
import org.springframework.graphql.test.tester.GraphQlTester
import java.time.LocalDateTime

@GraphQlTest(controllers = [GraphQLController::class])
@Import(GraphQLConfiguration::class)
internal class GraphQLControllerTest {

  @Autowired
  lateinit var client: GraphQlTester

  @MockBean
  lateinit var postService: PostService

  @MockBean
  lateinit var userService: UserService

  @Test
  internal fun `retrieve a single post by id`() {

    val date = "2022-07-23T14:13:02"
    stubbing(postService) {
      on { getPost(any()) }.thenReturn(
        Post("12", "Message", LocalDateTime.parse(date), "testuser")
      )
    }

    stubbing(userService) {
      on { getUser(eq("testuser")) }.thenReturn(
        User("testuser", "Testing User")
      )
    }


    client.document(
      //language=graphql
      """
      query {
        post(id: "12") {
          message
          id
          postedAt
          user {
            username
            displayName
          }
        }
      }
    """
    )
      .execute()
      .errors().verify()
      .path("$.data.post").matchesJson(
        //language=json
        """
        {
          "id": "12",
          "message": "Message",
          "postedAt": "$date",
          "user": {
            "username": "testuser",
            "displayName": "Testing User"
          }
        }
      """
      )
  }

  @Test
  internal fun `retrieve the replies to a post`() {

    stubbing(postService) {
      on { getPost(any()) }.thenReturn(
        Post("12", "Message", LocalDateTime.now(), "testuser")
      )
      on { getRepliesTo(argThat<Post> { id == "12" }) }.thenReturn(
        listOf(
          Post("13", "Reply 1", LocalDateTime.now(), "testuser"),
          Post("14", "Reply 2", LocalDateTime.now(), "testuser")
        )
      )
    }

    client.document(
      //language=graphql
      """
      query {
        post(id: "12") {
          id
          replies {
            id
            message
          }
        }
      }
      """
    )
      .execute()
      .errors().verify()
      .path("$.data.post.id").hasValue().matchesJson("\"12\"")
      .path("$.data.post.replies").hasValue().matchesJson(
        //language=json
        """
          [
            {"id": "13", "message": "Reply 1"},
            {"id": "14", "message": "Reply 2"}
          ]
        """
      )
  }

  @Test
  internal fun `accessing the post that has been replied to`() {

    stubbing(postService) {
      on { getPost(eq("12")) }.thenReturn(
        Post("12", "Message", LocalDateTime.now(), replyToPostId = "11", username = "testuser")
      )
      on { getPost(eq("11")) }.thenReturn(
        Post("11", "Original Post", LocalDateTime.now(), "testuser")
      )
    }

    client.document(
      //language=graphql
      """
      query {
        post(id: "12") {
          id
          replyTo {
            id
            message
          }
        }
      }
      """
    )
      .execute()
      .errors().verify()
      .path("$.data.post.id").hasValue().matchesJson("\"12\"")
      .path("$.data.post.replyTo").hasValue()
      .path("$.data.post.replyTo.id").matchesJson("\"11\"")
      .path("$.data.post.replyTo.message").matchesJson("\"Original Post\"")
  }

  @Test
  internal fun `retrieve the most recent posts`() {

    stubbing(postService) {
      on { getNewestPosts(any()) }.thenReturn(
        listOf(
          Post("12", "Message 1", LocalDateTime.now(), "testuser"),
          Post("13", "Message 2", LocalDateTime.now(), "testuser"),
          Post("14", "Message 3", LocalDateTime.now(), "testuser"),
          Post("15", "Message 4", LocalDateTime.now(), "testuser"),
          Post("16", "Message 5", LocalDateTime.now(), "testuser"),
        )
      )
    }

    client.document(
      //language=graphql
      """
      query {
        timeline {
          id
          message
        }
      }
      """
    )
      .execute()
      .errors().verify()
      .path("$.data.timeline").matchesJson(
        //language=json
        """
          [
            {"id": "12", "message": "Message 1"},
            {"id": "13", "message": "Message 2"},
            {"id": "14", "message": "Message 3"},
            {"id": "15", "message": "Message 4"},
            {"id": "16", "message": "Message 5"}
          ]
        """
      )
  }
}
