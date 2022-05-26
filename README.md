
# Weather App

The Weather App web application uses Open Weather Map API to serve weather condition information to clients for given place.

It is developed with NodeJs and express library. EJS view engine is used to serve views. 

Open Weather Map free API is preferred as a data source and thanks to free access, only 60 calls is allowed for a minute. 

Dockerization is possible with provided Dockerfile and it has been already avaiable on DockerHub. 

Application has two environment dependicies:

1. Port the application will listen and serve on (**PORT**)
2. Open Weather Map API KEY in order to make queries to get information for places (**APIKEY**)

Application is also support ***.env*** file to access for those environment variables programmatically. Placing ***.env*** file at the root directory which contains needed two keys is also preferable. 

# Containerization

Application can be containerizated with Docker supplied Dockerfile. NodeJs-Alpine is used in Docker image.


## Building Docker Image

- Command for create Docker image:

~~~
docker build -t <tag>
~~~

- Docker image also can be downloaded from docker hub: https://hub.docker.com/repositories

## Running Container

In order to create properly running container, application needs two ENV variables:

- ***PORT***: Port number that application will listen 
- ***APIKEY***: Open Weather Map API KEY to make queries for given place

Example for running container:

~~~
docker run --name <name> -p <host_port>:<container_app_port> -e PORT=<container_app_port> -e APIKEY=<open_weather_map_api_key> -d <image>
~~~


