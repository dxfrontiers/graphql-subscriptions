package de.dxfrontiers.graphql.quackerbackend.controller

import de.dxfrontiers.graphql.quackerbackend.QuackerBackendApplication
import de.dxfrontiers.graphql.quackerbackend.model.Post
import de.dxfrontiers.graphql.quackerbackend.model.PostService
import de.dxfrontiers.graphql.quackerbackend.model.User
import de.dxfrontiers.graphql.quackerbackend.model.UserService
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.stereotype.Controller
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Controller
class GraphQLController(private val postService: PostService, private val userService: UserService) {

  private fun getUser() = userService.getUser(QuackerBackendApplication.SIMULATED_USERNAME)!!

  /////// QUERIES
  @QueryMapping
  fun post(@Argument id: String): Mono<Post> = Mono.justOrEmpty(postService.getPost(id))

  @QueryMapping
  fun timeline(): Flux<Post> {
    // we're defining the timeline as being the 10 most recent posts.
    return Flux.fromIterable(postService.getNewestPosts(10))
  }

  /////// QUERY-EXTENSIONS FOR Post
  @SchemaMapping(typeName = "Post")
  fun replies(post: Post): Flux<Post> = Flux.fromIterable(postService.getRepliesTo(post))

  @SchemaMapping(typeName = "Post")
  fun replyTo(post: Post): Mono<Post> = Mono.justOrEmpty(postService.getPost(post.replyToPostId!!))

  @SchemaMapping(typeName = "Post")
  fun user(post: Post): Mono<User> = Mono.justOrEmpty(userService.getUser(post.username))
  
  /////// MUTATIONS
  @MutationMapping
  fun createPost(@Argument message: String): Post = postService.createPost(getUser(), message)

  @MutationMapping
  fun replyTo(@Argument postId: String, @Argument message: String) = postService.createReply(getUser(), postId, message)

}
