const express = require('express');
const mongodb = require('mongodb');

var mongoose = require('mongoose');
const BodyParser = require("body-parser");

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


const config = require('./db');
const PORT = 4000;

mongoose.connect(config.DB, function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});

const PersonModel = mongoose.model("person", {
    firstname: String,
    lastname: String
});

app.get("/people", async (request, response) => {
    try {
        var result = await PersonModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/person", async (request, response) => {
    try {
        var person = new PersonModel(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});
