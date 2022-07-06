package de.dxfrontiers.graphql.quackerbackend.model

import java.time.LocalDateTime

data class Post(
  val id: String,
  val message: String,
  val postedAt: LocalDateTime,
  val username: String,
  val replyToPostId: String? = null
)
