# Stage 1: Base stage with common dependencies
FROM gradle:9.2.1-jdk25 AS base
WORKDIR /app
COPY gradlew .
COPY gradle gradle/
COPY build.gradle .
COPY settings.gradle .
RUN gradle build --no-daemon || return 0


# Stage 2: Development stage
FROM base AS development
COPY src src/
CMD ["gradle", "bootRun", "--no-daemon"]
EXPOSE 8080


# Stage 3: Build stage
FROM base AS build
COPY src src/
RUN gradle bootJar --no-daemon
RUN ls -la build/libs/


# Stage 4: Production stage
FROM eclipse-temurin:25-jre-alpine AS production
# Create a non-root user
RUN addgroup -S spring && adduser -S spring -G spring
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
RUN chown -R spring:spring /app
USER spring
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]
EXPOSE 8080

