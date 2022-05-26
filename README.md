
# Weather App

The Weather App web application uses the Open Weather Map API to serve weather condition information to clients for a given place.

It is developed with *NodeJs* and the *Express* library. *EJS* view engine is used to serve views. 

The pages are built with Bootstrap, and the modifications on pages are done with *JQuery*.

Open Weather Map free API is preferred as a data source, and thanks to free limited access, only 60 calls are allowed for a minute. 

Dockerization is possible with the provided Dockerfile and it has been available on DockerHub. 

The application has two environment dependencies:

1. Port the application will listen and serve on (**PORT**)
2. Open Weather Map API KEY in order to make queries to get information for places (**APIKEY**)

The application also supports ***.env*** file to access for those environment variables programmatically. Placing an ***.env*** file at the root directory which contains the needed two keys is also preferable. 

# Containerization

An application can be containerized on Docker with a supplied Dockerfile. NodeJs-Alpine is used in the Docker image.


## Building Docker Image

- Command for creating a Docker image:

~~~
docker build -t <tag>
~~~

- Docker image also can be checked from docker hub: https://hub.docker.com/repository/docker/onurergun/weather-app

- Command to pull latest docker image:
~~~
docker pull onurergun/weather-app:latest
~~~

## Running Container

In order to create a properly running application in container, application needs two ENV variables:

- ***PORT***: Port number that application will listen to
- ***APIKEY***: Open Weather Map API KEY to make queries for given location

Example for running container:

~~~
docker run --name <name> -p <host_port>:<container_app_port> -e PORT=<container_app_port> -e APIKEY=<open_weather_map_api_key> -d <image>
~~~

# References

All images that are used in the Weather App are from: https://unsplash.com/ 

Also, some icons has been taken from: https://findicons.com/