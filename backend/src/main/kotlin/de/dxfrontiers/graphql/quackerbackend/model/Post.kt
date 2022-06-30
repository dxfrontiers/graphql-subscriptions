package de.dxfrontiers.graphql.quackerbackend.model

import java.time.LocalDateTime

data class Post(
  val id: String,
  val message: String,
  val postedAt: LocalDateTime,
  val replyToPostId: String? = null
)
