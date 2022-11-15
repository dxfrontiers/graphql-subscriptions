package de.dxfrontiers.graphql.quackerbackend

import de.dxfrontiers.graphql.quackerbackend.model.PostService
import de.dxfrontiers.graphql.quackerbackend.model.UserService
import org.slf4j.LoggerFactory
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.ConfigurableApplicationContext
import java.time.LocalDateTime
import kotlin.random.Random
import kotlin.random.nextInt

@SpringBootApplication
class QuackerBackendApplication

fun main(args: Array<String>) {
	val context = runApplication<QuackerBackendApplication>(*args)

	populateSampleData(context)

}

private fun populateSampleData(context: ConfigurableApplicationContext) {
	val log = LoggerFactory.getLogger(QuackerBackendApplication::class.java)
	
	log.info("Generating sample data")
	// fill the application with some sample data
	val postService = context.getBean(PostService::class.java)
	val userService = context.getBean(UserService::class.java)

	val user1 = userService.createUser("Absom1962", "Max Krueger")
	val user2 = userService.createUser("Citionabous", "Kristin Shuster")
	val user3 = userService.createUser("Ablefte", "Sandra Seiler")

	val nextTime = timeSequenceGenerator(yesterday()).iterator()::next

	postService.apply {
		createPost(user1, "GraphQL Subscriptions are great!", nextTime()).also {
			createReply(user2, it.id, "Yes! They are easy to read and understand.", nextTime())
			createReply(user3, it.id, "I've used these in many projects", nextTime())
		}
		createPost(
			user2,
			"Kotlin is a very nice language. I'm able to express tasks in very short code fragments",
			nextTime()
		).also {
			createReply(user2, it.id, "And I got used to that language quite fast!", nextTime())
		}
		createPost(user3, "Sometimes software development is hard, but it is still a lot of fun.")
	}
}

private fun yesterday() = LocalDateTime.now().minusDays(1).withHour(8).withMinute(0).withSecond(0)

fun timeSequenceGenerator(start: LocalDateTime): Sequence<LocalDateTime> {
	return generateSequence(start) { previous ->
		previous.plusMinutes(Random.nextInt(5..15).toLong())
	}
}
