import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.7.0"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
	kotlin("jvm") version "1.6.21"
	kotlin("plugin.spring") version "1.6.21"
}

group = "de.dxfrontiers.graphql"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-graphql")
	implementation("org.springframework.boot:spring-boot-starter-webflux")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310")
	implementation("io.projectreactor.kotlin:reactor-kotlin-extensions")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor")
	
	implementation("com.hazelcast:hazelcast:5.1.2")
	
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("io.projectreactor:reactor-test")
	testImplementation("org.springframework.graphql:spring-graphql-test")
	testImplementation("com.willowtreeapps.assertk:assertk-jvm:0.25")
	testImplementation("org.mockito.kotlin:mockito-kotlin:4.0.0")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "17"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
