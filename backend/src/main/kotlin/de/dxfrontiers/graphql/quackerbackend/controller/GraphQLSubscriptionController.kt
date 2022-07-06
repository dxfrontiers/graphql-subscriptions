package de.dxfrontiers.graphql.quackerbackend.controller

import de.dxfrontiers.graphql.quackerbackend.model.Post
import de.dxfrontiers.graphql.quackerbackend.model.PostService
import org.springframework.graphql.data.method.annotation.SubscriptionMapping
import org.springframework.stereotype.Controller
import reactor.core.publisher.Flux

@Controller
class GraphQLSubscriptionController(private val postService: PostService) {

  @SubscriptionMapping
  fun onTimelineUpdate(): Flux<Post> {

    return Flux.create { emitter ->
      val unregister = postService.watch { post -> emitter.next(post) }

      emitter.onDispose { unregister() }
    }

  }

}
