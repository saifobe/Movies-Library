'use strict';

const movieData = require("./Movie Data/data.json");

function ResData(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}

function ReviewData(id, title, release_date, poster_path, overview,vote_average) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
    this.vote_average = vote_average;
}

function PopulerActors(name,popularity,profile_path) {
    this.name = name;
    this.popularity = popularity;
    this.profile_path = profile_path;
}

//import the frameworks
//import express
const express = require('express');
const server = express();
//import cors
const cors = require('cors');
server.use(cors());
// import axios
const axios = require('axios');
//import .env
require('dotenv').config();


const PORT = 3000;

server.listen(PORT, () => {
    console.log(`listening on ${PORT} : The Server is ready`);
})

// http://localhost:3000/
server.get('/', homePage)
// http://localhost:3000/trending
server.get('/trending', trendingHandler)

// http://localhost:3000/favorite
server.get('/favorite', favoritePage)
// http://localhost:3000/search
server.get('/search', searchPage)
// http://localhost:3000/top
server.get('/top', topRatedMovies)
// http://localhost:3000/populer
server.get('/populer', populerMedia)
//any page that doesn't belong to our server
server.get('*', errorHandler404)
server.use(errorHandler500)



//functions

function homePage(req, res) {
    res.send(new ResData(movieData.title, movieData.poster_path, movieData.overview));

}

//..........................................................................................................

function trendingHandler(req, res) {
    try {
        const APIKey = process.env.APIKey;
        const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${APIKey}`;
        axios.get(url)
            .then((result) => {
                let mapResult = result.data.results.map((item) => {
                    let trendingMovies = new ResData(item.id, item.title,item.release_date,item.poster_path,item.overview);
                    return trendingMovies;
                })
                res.send(mapResult);

            })

            .catch((err) => {
                console.log("sorry,something went wrong", err);
                res.status(500).send(err);
            })
    }

    catch (error) {
        errorHandler500(error, req, res);
    }
}

//..........................................................................................................

function favoritePage(req, res) {
    let str = "Welcome to Favorite Page";
    res.status(200).send(str);
}

//..........................................................................................................


function searchPage(req, res) {
    try {
        const APIKey = process.env.APIKey;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=titanic&page=2`;
        axios.get(url)
            .then((result) => {
                let mapResult = result.data.results.map((item) => {
                    let trendingMovies = new ResData(item.id, item.title, item.release_date, item.poster_path, item.overview);
                    return trendingMovies;
                })
                res.send(mapResult);

            })

            .catch((err) => {
                console.log("sorry,something went wrong", err);
                res.status(500).send(err);
            })
    }

    catch (error) {
        errorHandler500(error, req, res);

    }
}

//..........................................................................................................


function topRatedMovies(req,res){
    try{
        const APIKey = process.env.APIKey;
        const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=en-US&page=1`
        axios.get(url)
            .then((result) => {
                let mapResult = result.data.results.map((item) => {
                    let topMovies = new ReviewData(item.id, item.title, item.release_date, item.poster_path, item.overview,item.vote_average);
                    return topMovies;
                })
                res.send(mapResult);

            })

            .catch((err) => {
                console.log("sorry,something went wrong", err);
                res.status(500).send(err);
            })
    }
    catch (error) {
        errorHandler500(error, req, res);

    }
}

//..........................................................................................................

function populerMedia(req,res){
    try{
        const APIKey = process.env.APIKey;
        const url = `https://api.themoviedb.org/3/person/popular?api_key=${APIKey}&language=en-US&page=1`
        axios.get(url)
        .then((result) => {
            let mapResult = result.data.results.map((item) => {
                console.log(item);
                let popular = new PopulerActors(item.name,item.popularity,item.profile_path);
                return popular;
            })
            res.send(mapResult);

        })

        .catch((err) => {
            console.log("sorry,something went wrong", err);
            res.status(500).send(err);
        })
    }
    catch (error) {
        errorHandler500(error, req, res);

    }
}

//..........................................................................................................


//middleware function
function errorHandler500(erorr, req, res) {
    const err = {
        status: 500,
        massage: erorr
    }
    res.status(500).send(err);
}

function errorHandler404(req, res) {
    const err = {
        status:404 ,
        massage: "Page not found",
    }
    res.status(404).send(err);
}