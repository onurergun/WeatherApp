const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const url = require("url");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Main Page Route urls
const mainPageRoutes = ["/", "index.html", "/index"];
app.route(mainPageRoutes)
    .get(mainRouteHandlerGet)
    .post(mainRouteHandlerPost);

app.route("/failure")
    .get(failureRouteHandlerGet);

app.route("/result")
    .get(resultRouteHandlerGet);

// Handle all invalid routes
app.route("*")
    .get(invalidRouteHandler)
    .post(invalidRouteHandler)
    .patch(invalidRouteHandler)
    .put(invalidRouteHandler)
    .delete(invalidRouteHandler)

const portNumber = process.env.PORT || 3000;
app.listen(portNumber, function() {
    console.log("Server has been started on port: " + portNumber);
});

/**
 * The index route GET handler method
 * @param req Request object
 * @param res Response object
 */
function mainRouteHandlerGet(req, res) {
    res.sendFile(__dirname + "/index.html");
}

/**
 * The index route POST handler method
 * @param req Request object
 * @param res Response object
 */
function mainRouteHandlerPost(req, res) {
    let cityName = req.body.cityName;

    console.log("POST request handled. City name: " + cityName);

    const redirectUrl = req.url + "result?q=" + cityName;
    res.redirect(redirectUrl);
}

/**
 * Handler method to tackle with failure situations
 * Sends failure page
 * @param req Request object
 * @param res Response object
 */
function failureRouteHandlerGet(req, res) {
    res.sendFile(__dirname + "/failure.html");
}

/**
 * Handler for all type of invalid routes, redirects to failure route
 * @param req Request object
 * @param res Response object
 */
function invalidRouteHandler(req, res) {
    redirectToFailureRoute(res);
}

/**
 * Redirects given route to failure route
 * @param res Given response object, will be used in redirection
 */
function redirectToFailureRoute(res) {
    res.redirect("/failure");
}

/**
 * Result route GET handler method
 * @param req Request object
 * @param res Response object
 */
function resultRouteHandlerGet(req, res) {
    // Get query parameter from request
    const cityName = req.query.q;
    handleResult(cityName, renderWeatherInformationResult, res);
}

/**
 * Generates Weather information for given place with API Call to Open Weather Map
 * @param placeName Place name that searching for
 * @param callbackOnSuccess Callback method will be called when the API call to Open Weather MAP occurred successfully
 * @param res Response object to create view
 */
function handleResult(placeName, callbackOnSuccess, res) {
    const endPoint = "https://api.openweathermap.org/data/2.5/weather";
    const apiKey = process.env.APIKEY;

    // Generate URL for Open Weather Map API
    let apiRequestUrl = new URL(endPoint);
    apiRequestUrl.searchParams.append("q", placeName);
    apiRequestUrl.searchParams.append("appid", apiKey);
    apiRequestUrl.searchParams.append("units", "metric");

    console.log(apiRequestUrl.href);
    let weatherQueryRequest = https.get(apiRequestUrl.href, function(apiResponse) {
        console.log("Response from OpenWeatherMap: " + Number(apiResponse.statusCode));

        // HTTPS API Call successful
        if (apiResponse.statusCode === 200) {
            apiResponse.on("data", function(data) {
                const weatherData = JSON.parse(data);
                callbackOnSuccess(res, weatherData);
            });
        }
        else {
            console.log("API Response not OK");
            redirectToFailureRoute(res);
        }
    });

    // Handle HTTPS Request errors
    weatherQueryRequest.on("error", function(e) {
        console.log(e);
        redirectToFailureRoute(res);
    });
    weatherQueryRequest.end();
}

/**
 * Renders result page from given result json parameter
 * @param res Response object to render
 * @param resultJson Data that will be used in result page in json format
 */
function renderWeatherInformationResult(res, resultJson) {
    console.log(resultJson);

    res.render("result",
        {
            cityName: resultJson.name,
            weatherCondition: convertWeatherConditionName(resultJson.weather[0].main),
            weatherDescription: resultJson.weather[0].description,
            temperature: Math.round((resultJson.main.temp + Number.EPSILON) * 10) / 10,
        });
}

/**
 * Converts weather condition info from Open Weather Map API name to inner data name
 * @param cond Open Weather Map API data name for weather condition
 * @returns {string} Own weather condition name
 */
function convertWeatherConditionName(cond) {
    switch (cond.toLowerCase()) {
        case "clear":
            return "clear";
        case "clouds":
            return "cloudy";
        case "windy":
            return "windy";
        case "thunderstorm":
            return "thunderstorm";
        case "drizzle":
            return "drizzle";
        case "rain":
            return "rainy";
        case "snow":
            return "snowy";
        case "mist":
        case "smoke":
        case "haze":
        case "dust":
        case "fog":
        case "sand":
        case "dust":
        case "ash":
            return "foggy";
        case "squall":
        case "tornado":
            return "tornado";
    }
}