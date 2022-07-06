package de.dxfrontiers.graphql.quackerbackend.model

import com.hazelcast.map.IMap
import org.springframework.stereotype.Service

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
  
  fun getUser(username: String): User? = userMap.get(username)
  
}
