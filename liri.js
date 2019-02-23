var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


// Spotify API
if (process.argv[2] === "spotify-this-song") {
    var songName = process.argv[3]
    for (var i = 4; i < process.argv.length; i++) {
        songName = songName + "+" + process.argv[i];
    }
    if (!songName) {
        songName = "The Sign"
    }

    spotify.search({
        type: 'track', query: songName,
        limit: 10
    },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(data);
            // console.log(data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name)
            console.log("Track name: " + data.tracks.items[0].name)
            console.log("Album: " + data.tracks.items[0].album.name)
            console.log("Spotify link: " + data.tracks.items[0].album.external_urls.spotify)

        });

}
// OMDB instance
if (process.argv[2] === "movie-this") {
    var movieName = process.argv[3];
    for (var i = 4; i < process.argv.length; i++) {
        movieName = movieName + "+" + process.argv[i];
    }
    if (!movieName) {
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
    var bandName = process.argv[3]
    for (var i = 4; i < process.argv.length; i++) {
        bandName = bandName + "+" + process.argv[i];
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function (response) {
            if (response.data.venue === undefined) {
                console.log("There are no concerts for this artist")
            } else {
                for (var i = 0; i < 6; i++)
                    console.log("Venue: " + response.data[i].venue.name)
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region)
                console.log("Showtime: " + response.data[i].datetime)
                console.log(queryUrl)
            }
        }
    );
}