package de.dxfrontiers.graphql.quackerbackend.model

import assertk.assertThat
import assertk.assertions.isEqualTo
import assertk.assertions.isNotNull
import de.dxfrontiers.graphql.quackerbackend.HazelcastConfiguration
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Import
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
@Import(value = [HazelcastConfiguration::class, UserService::class])
internal class UserServiceTest {

  @Autowired
  lateinit var userService: UserService
  
  @Test
  internal fun `creating a user is successful`() {
    val user = userService.createUser("Brezel", "Martin Baker")
    
    assertThat(user.username).isEqualTo("Brezel")
    assertThat(user.displayName).isEqualTo("Martin Baker")
  }

  @Test
  internal fun `accessing existing users is possible`() {
    userService.createUser("Bruzzel", "Olaf Metzger")
    
    val user = userService.getUser("Bruzzel")

    assertThat(user).isNotNull()
    assertThat(user!!.username).isEqualTo("Bruzzel")
    assertThat(user!!.displayName).isEqualTo("Olaf Metzger")
  }
}
