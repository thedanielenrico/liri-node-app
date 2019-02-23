var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);






var bandName = process.argv[3]
for (var i = 4; i < process.argv.length; i++) {
    bandName = bandName + "+" + process.argv[i];
}


var movieName = process.argv[3];
for (var i = 4; i < process.argv.length; i++) {
    movieName = movieName + "+" + process.argv[i];
}
// Spotify API
if (process.argv[2] === "spotify-this-song") {
    spotify.search({
        type: 'track', query: process.argv[3],
        limit: 10
    },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(data);
            // console.log(data.tracks.items[0]);
            // console.log("Artist: " + data.tracks.items[0].artists.name)
            console.log("Album: " + data.tracks.items[0].album)

        });
}
// OMDB instance
if (process.argv[2] === "movie-this") {
    if (movieName === "") {
        var queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Release year: " + response.data.Year);
                console.log("The movie's IMDB rating is: " + response.data.imdbRating);
                console.log("Production: " + response.data.Production);
                console.log("Language: " + response.data.Language);
                console.log("Plot summary: " + response.data.Plot);
                console.log(queryUrl)
            }
        );

    } else {

        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Release year: " + response.data.Year);
                console.log("The movie's IMDB rating is: " + response.data.imdbRating);
                console.log("Production: " + response.data.Production);
                console.log("Language: " + response.data.Language);
                console.log("Plot summary: " + response.data.Plot);
                console.log(queryUrl)
            }
        );
    }
}
// Bands in Town instance
if (process.argv[2] === "concert-this") {
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data[0].venue.name)
            console.log(response.data[0].datetime)
            console.log(queryUrl)
        }
    );
}