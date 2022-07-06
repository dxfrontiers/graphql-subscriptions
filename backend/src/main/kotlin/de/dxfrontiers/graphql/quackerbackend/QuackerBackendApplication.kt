package de.dxfrontiers.graphql.quackerbackend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class QuackerBackendApplication {
	companion object {
		/**
		 * For the sake of simplicity, this demo application uses a single user and
		 * assumes this user to be using the system.
		 */
		const val SIMULATED_USERNAME = "Rhat1979"
	}
}

fun main(args: Array<String>) {
	runApplication<QuackerBackendApplication>(*args)
}
