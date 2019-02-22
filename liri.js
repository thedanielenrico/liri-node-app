var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");



require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


var movieName = "";
for (var i = 3; i < process.argv.length; i++){
    movieName = movieName + "+" + process.argv[i];
}
if (process.argv[2] === "movie-this") {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release year: " + response.data.Year);
            console.log("The movie's IMDB rating is: " + response.data.imdbRating);
            // console.log("The movie's Rotten Tomatoes rating is: " + response.data.Ratings[1].Value);
            console.log("Production: " + response.data.Production);
            console.log("Language: " + response.data.Language);
            console.log("Plot summary: " + response.data.Plot);
            
            




            console.log(queryUrl)
        }
    );
}