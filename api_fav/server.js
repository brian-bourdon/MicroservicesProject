const express = require('express');
const mongodb = require('mongodb');

var mongoose = require('mongoose');
const BodyParser = require("body-parser");

const app = express();
var cors = require('cors');
app.use(cors())
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


const config = require('./db');
const PORT = 4003;

mongoose.connect(config.DB, function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});

const FavModel = mongoose.model("fav", {
    idUser: String,
    idDisk: String
});

app.get("/fav/:idUser", async (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
    try {
        var result = await FavModel.find({idUser: request.params.idUser}).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/fav", async (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
    try {
        var fav = new FavModel(request.body);
        var result = await fav.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});