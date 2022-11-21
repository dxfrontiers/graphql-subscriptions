package de.dxfrontiers.graphql.quackerbackend.controller

import de.dxfrontiers.graphql.quackerbackend.model.Post
import de.dxfrontiers.graphql.quackerbackend.model.PostService
import org.springframework.graphql.data.method.annotation.SubscriptionMapping
import org.springframework.stereotype.Controller
import reactor.core.publisher.Flux
import java.security.Principal

@Controller
class GraphQLSubscriptionController(private val postService: PostService) {

  @SubscriptionMapping
  fun onTimelineUpdate(principal: Principal): Flux<Post> {

    return Flux.create { sink ->
      val unregister = postService.watch { 
          post -> sink.next(post) 
      }

      sink.onDispose { unregister() }
    }

  }

}
