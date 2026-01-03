

# 1. Initialize Spring
"Setup a backend framework of your choice."

1. moved all the files that belongs to the frontend part to `fronted` directory
2. created an empty `backend` directory 
3. used the Spring initializr to kick off a Spring project
  - https://start.spring.io/
  - ![chosen spring config](imgs/image.png)
4. The Spring application is ready to run!


# 2. Create an API
"Create an API your frontend will be connected to. Your backend should request the bear data from presented Wikipedia API and serve it to your frontend."

- implemented an API with fetching logic similar to what was already implemented in frontend

# 3. Configure CORS
"Configure CORS to only allow requests from your frontend."

## References
- [Enabling Cross Origin Requests for a RESTful Web Service](https://spring.io/guides/gs/rest-service-cors#_enabling_cors)

