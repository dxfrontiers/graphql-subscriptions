package de.dxfrontiers.graphql.quackerbackend.model

import com.hazelcast.map.IMap
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.stereotype.Service
import java.security.Principal

@Service
class UserService(private val userMap: IMap<String, User>) {

  fun createUser(username: String, displayName: String): User {
    return userMap.executeOnKey(username) { e ->
      if (e.value != null)
        throw java.lang.IllegalArgumentException("username already exists")
      val user = User(username, displayName)
      e.setValue(user)
      return@executeOnKey user
    }
  }

  fun getUser(username: String): User? = userMap[username]

  fun getUser(principal: Principal): User = userMap.getOrPut(principal.name) { principal.asUser() }

}

private fun Principal.asUser(): User {
  if (this is JwtAuthenticationToken) {
    return User(
      token.claims["sub"] as String? ?: name,
      token.claims["name"] as String? ?: name
    )
  }
  return User(name, name)
}
