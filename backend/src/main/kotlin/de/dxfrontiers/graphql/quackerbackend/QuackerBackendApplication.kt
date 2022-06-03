package de.dxfrontiers.graphql.quackerbackend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class QuackerBackendApplication

fun main(args: Array<String>) {
	runApplication<QuackerBackendApplication>(*args)
}
