var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();


// Spotify API

var input = process.argv.splice(3).join("+");
var command = process.argv[2];
if (command === "spotify-this-song") {
    spotifyThis(input);
}
function spotifyThis(input) {
    if (!input) {
        input = "The Sign"
    }

    spotify.search({
        type: 'track', query: input,
        limit: 10
    },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name)
            console.log("Track name: " + data.tracks.items[0].name)
            console.log("Album: " + data.tracks.items[0].album.name)
            console.log("Spotify link: " + data.tracks.items[0].album.external_urls.spotify)

        });


}
// OMDB instance
if (command === "movie-this") {
    movieThis(input);
}
function movieThis(input) {
    if (!input) {
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

        var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
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
if (command === "concert-this") {
    concertThis(input);
}
function concertThis(input) {
    if (!input) {
        console.log("Please enter a band name")
        return;
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function (response) {
            if (response.data.length === 0) {
                console.log("There are no concerts for this artist")
            } else {
                for (var i = 0; i < 6; i++) {
                    var m = moment(response.data[i].datetime, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
                    var momentParse = m.format("MM-DD-YYYY");
                    console.log("Venue: " + response.data[i].venue.name)
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region)
                    console.log("Showtime: " + momentParse)
                    console.log(queryUrl)
                }
            }
        }
    );
}
// Do this instance
if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        var randomText = data.split(',')[0].trim();
        input = data.split(',')[1].trim();
        if (err) {
            console.log("Error occured: " + err)
        }
        if (randomText === "spotify-this-song") {
            spotifyThis(input)
        } else if (randomText === "movie-this") {
            movieThis(input);
        } else if (randomText === "concert-this") {
            concertThis(input);
        }
    })
}