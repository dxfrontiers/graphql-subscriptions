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
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class HazelcastConfiguration {


  @Bean
  fun hazelcastInstance(): HazelcastInstance? {
    val c = Config.loadDefault()
    c.serializationConfig.serializerConfigs.add(
      SerializerConfig().apply {
        typeClass = Post::class.java
        implementation = PostSerializer()
      }
    )
    return Hazelcast.newHazelcastInstance(c)
  }

  @Bean
  fun postMap() = hazelcastInstance()!!.getMap<String, Post>("posts")

  @Bean
  fun postIdGenerator() = hazelcastInstance()!!.getFlakeIdGenerator("postIdGenerator")

}


class PostSerializer : StreamSerializer<Post> {

  private val objectMapper = ObjectMapper()
    .registerModule(JavaTimeModule())
    .registerModule(KotlinModule.Builder().build())

  override fun write(out: ObjectDataOutput, `object`: Post) {
    objectMapper.writeValue(out, `object`)
  }

  override fun getTypeId(): Int = 14_203 // this is just some random number

  override fun read(`in`: ObjectDataInput): Post {
    return objectMapper.readValue(`in`, Post::class.java)
  }

}
