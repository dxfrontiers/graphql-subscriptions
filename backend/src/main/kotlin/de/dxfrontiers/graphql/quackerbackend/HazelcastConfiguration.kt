package de.dxfrontiers.graphql.quackerbackend

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.hazelcast.config.Config
import com.hazelcast.config.SerializerConfig
import com.hazelcast.core.Hazelcast
import com.hazelcast.core.HazelcastInstance
import com.hazelcast.nio.ObjectDataInput
import com.hazelcast.nio.ObjectDataOutput
import com.hazelcast.nio.serialization.StreamSerializer
import de.dxfrontiers.graphql.quackerbackend.model.Post
import de.dxfrontiers.graphql.quackerbackend.model.User
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class HazelcastConfiguration {

  private val objectMapper = ObjectMapper()
    .registerModule(JavaTimeModule())
    .registerModule(KotlinModule.Builder().build())

  @Bean
  fun hazelcastInstance(): HazelcastInstance? {
    val c = Config.loadDefault()
    c.serializationConfig.serializerConfigs.apply {
      add(SerializerConfig().apply {
        typeClass = Post::class.java
        implementation = PostSerializer(objectMapper)
      })
      add(SerializerConfig().apply {
        typeClass = User::class.java
        implementation = UserSerializer(objectMapper)
      })
    }
    c.networkConfig.join.multicastConfig.isEnabled = false
    return Hazelcast.newHazelcastInstance(c)
  }

  @Bean
  fun postMap() = hazelcastInstance()!!.getMap<String, Post>("posts")

  @Bean
  fun postIdGenerator() = hazelcastInstance()!!.getFlakeIdGenerator("postIdGenerator")

  @Bean
  fun userMap() = hazelcastInstance()!!.getMap<String, User>("users")
}


class PostSerializer(private val objectMapper: ObjectMapper) : StreamSerializer<Post> {

  override fun write(out: ObjectDataOutput, `object`: Post) {
    objectMapper.writeValue(out, `object`)
  }

  override fun getTypeId(): Int = 14_203 // type identifier for posts

  override fun read(`in`: ObjectDataInput): Post {
    return objectMapper.readValue(`in`, Post::class.java)
  }
}

class UserSerializer(private val objectMapper: ObjectMapper) : StreamSerializer<User> {

  override fun write(out: ObjectDataOutput, `object`: User) {
    objectMapper.writeValue(out, `object`)
  }

  override fun getTypeId(): Int = 14_204 // type identifier for users

  override fun read(`in`: ObjectDataInput): User {
    return objectMapper.readValue(`in`, User::class.java)
  }
}
