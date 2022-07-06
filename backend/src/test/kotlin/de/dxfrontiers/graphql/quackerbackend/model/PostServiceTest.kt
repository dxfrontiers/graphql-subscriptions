package de.dxfrontiers.graphql.quackerbackend.model

import assertk.assertThat
import assertk.assertions.*
import com.hazelcast.map.IMap
import de.dxfrontiers.graphql.quackerbackend.HazelcastConfiguration
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Import
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.time.LocalDateTime
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit

@ExtendWith(SpringExtension::class)
@Import(value = [HazelcastConfiguration::class, PostService::class])
internal class PostServiceTest {

  @Autowired
  lateinit var postService: PostService
  @Autowired
  lateinit var postMap: IMap<String, Post>
  
  val user = User("testuser1", "Test User")
  
  @AfterEach
  internal fun reset() {
    postMap.clear()
  }
  
  @Test
  internal fun `successful creation of a post`() {
    val post = postService.createPost(user, "simple message")
    
    assertNotNull(post)
    assertEquals("simple message", post.message)
    assertThat(post.username).isEqualTo(user.username)
  }
  
  @Test
  internal fun `retrieval of the 5 most recent posts`() {
    postService.createPost(user, "Post 1", LocalDateTime.parse("2022-03-01T10:11:12"))
    postService.createPost(user, "Post 2", LocalDateTime.parse("2022-03-02T10:11:12"))
    postService.createPost(user, "Post 6", LocalDateTime.parse("2022-03-03T11:12:13"))
    postService.createPost(user, "Post 3", LocalDateTime.parse("2022-03-03T10:11:12"))
    postService.createPost(user, "Post 4", LocalDateTime.parse("2022-03-03T11:11:12"))
    postService.createPost(user, "Post 5", LocalDateTime.parse("2022-03-03T11:12:12"))
    postService.createPost(user, "Post 7", LocalDateTime.parse("2022-03-04T10:11:12"))
    
    val posts = postService.getNewestPosts(5)
    
    assertThat(posts).size().isEqualTo(5)
    assertThat(posts).extracting(Post::message).containsExactly("Post 7", "Post 6", "Post 5", "Post 4", "Post 3")
  }

  @Test
  internal fun `recent posts will only contain posts that are not a reply to another post`() {
    postService.createPost(user, "Post 1", LocalDateTime.parse("2022-03-01T10:11:12"))
    postService.createPost(user, "Post 2", LocalDateTime.parse("2022-03-02T10:11:12"))
    postService.createPost(user, "Post 6", LocalDateTime.parse("2022-03-03T11:12:13"))
    postService.createPost(user, "Post 3", LocalDateTime.parse("2022-03-03T10:11:12"))
    postService.createPost(user, "Post 4", LocalDateTime.parse("2022-03-03T11:11:12"))
    val post5 = postService.createPost(user, "Post 5", LocalDateTime.parse("2022-03-03T11:12:12"))
    postService.createReply(user, post5.id, "Reply 1 to Post 5", LocalDateTime.parse("2022-03-03T11:13:12"))
    postService.createReply(user, post5.id, "Reply 2 to Post 5", LocalDateTime.parse("2022-03-03T11:14:12"))
    postService.createPost(user, "Post 7", LocalDateTime.parse("2022-03-04T10:11:12"))

    val posts = postService.getNewestPosts(5)

    assertThat(posts).size().isEqualTo(5)
    assertThat(posts).extracting(Post::message).containsExactly("Post 7", "Post 6", "Post 5", "Post 4", "Post 3")
  }

  @Test
  internal fun `creating a post will notify listeners`() {

    val latch = CountDownLatch(1)

    val unregister = postService.watch({ latch.countDown() })
    try {
      
      postService.createPost(user, "Test Message")
      assertTrue(latch.await(3, TimeUnit.SECONDS), "listener was not called withing three seconds")
    } finally {
      unregister()
    }
  }

  @Test
  internal fun `get non existing post returns null`() {
    assertThat(postService.getPost("adsf")).isNull()
  }

  @Test
  internal fun `retrieving an existing post`() {
    val id = postService.createPost(user, "Simple existing test post").id

    val post = postService.getPost(id)

    assertThat(post).isNotNull()
    assertThat(post?.message).isEqualTo("Simple existing test post")
  }

  @Test
  internal fun `create a reply for a post`() {
    val (id) = postService.createPost(user, "Initial post")

    val reply = postService.createReply(user, id, "Reply")
    
    assertThat(reply).isNotNull()
    assertThat(reply.replyToPostId).isEqualTo(id)
    assertThat(reply.message).isEqualTo("Reply")
    assertThat(reply.username).isEqualTo(user.username)
  }

  @Test
  internal fun `replying to a non existing id throws an exception`() {
    assertThat {
        postService.createReply(user,"certainly not existing", "Some invalid message")
      }.isFailure()
  }

  @Test
  internal fun `retrieve replies to a post`() {
    
    val id1 = postService.createPost(user, "First Post").id
    val id2 = postService.createPost(user, "Second Post").id
    
    postService.createReply(user, id1, "First Reply")
    postService.createReply(user, id1, "Second Reply")
    postService.createReply(user, id2, "Another Reply")


    val replies1 = postService.getRepliesTo(id1)
     
    assertThat(replies1).size().isEqualTo(2)
    assertThat(replies1).extracting { it.message }.containsExactlyInAnyOrder("First Reply", "Second Reply")
  }
}

