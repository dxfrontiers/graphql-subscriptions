package de.dxfrontiers.graphql.quackerbackend.model

import com.hazelcast.flakeidgen.FlakeIdGenerator
import com.hazelcast.map.IMap
import com.hazelcast.map.listener.EntryAddedListener
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class PostService(private val postMap: IMap<String, Post>, private val postIdGenerator: FlakeIdGenerator) {

  fun getNewestPosts(count: Int): List<Post> {
    return postMap.values.sortedByDescending { it.postedAt }.take(count)
  }

  fun getPost(id: String): Post? = postMap[id]

  fun createPost(message: String) = createPost(message, LocalDateTime.now())
  fun createPost(message: String, time: LocalDateTime): Post {
    val p = Post(postIdGenerator.newId().toString(), message, time)
    postMap.put(p.id, p)
    return p
  }

  fun createReply(postId: String, message: String) = createReply(postId, message, LocalDateTime.now())
  fun createReply(postId: String, message: String, time: LocalDateTime): Post {
    // simple sanity check. This will not ensure absolute consistency 
    if (!postMap.containsKey(postId))
      throw java.lang.IllegalArgumentException("No post with id '$postId' to reply to")

    val p = Post(postIdGenerator.newId().toString(), message, time, postId)
    postMap.put(p.id, p)
    return p
  }

  fun watch(callback: WatchCallback): UnregisterHandler {
    // only watching for added events, as we're not supporting edits right now
    val listener = EntryAddedListener<String, Post> { callback(it.value) }
    val uuid = postMap.addEntryListener(listener, true)
    return { postMap.removeEntryListener(uuid) }
  }

  fun getRepliesTo(post: Post): Collection<Post> = getRepliesTo(post.id)
  fun getRepliesTo(id: String): Collection<Post> {
    return postMap.values { e -> e.value.replyToPostId == id }
  }

}
typealias WatchCallback = (post: Post) -> Unit
typealias UnregisterHandler = () -> Unit 
