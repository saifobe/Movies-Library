'use strict';

const { json } = require("express/lib/response");
const fs = require("fs");
const read = fs.readFileSync("./Movie Data/data.json");
console.log(JSON.parse(read));
const movieData = JSON.parse(read)

function ResData(title,poster_path,overview)
{
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

//import the express framework
const express = require('express');
const server = express();
//import cors
const cors = require('cors');
server.use(cors());

const PORT = 3000;

server.listen(PORT, () =>{
    console.log(`listening on ${PORT} : The Server is ready`);
})

// http://localhost:3000/
server.get('/',(req,res)=>{
res.status(200).send(new ResData(movieData.title,movieData.poster_path,movieData.overview));

})

// http://localhost:3000/favorite
server.get('/favorite',(req,res)=>{
    let str = "Welcome to Favorite Page";
    res.status(200).send(str);
})

server.get('*',(req,res)=>{
    res.status(404).send(handleErorr(404));
})

function handleErorr(status)
{
    switch(status){
        case 500:
            return "Sorry, something went wrong";
            break;
        case 404:
            return "page not found error";
            break;
        default:
            return "everything good"    
    }

}