const express = require('express');
const mongodb = require('mongodb');

var mongoose = require('mongoose');
const BodyParser = require("body-parser");

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


const config = require('./db');
const PORT = 4001;

mongoose.connect(config.DB, function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});

const CatalogueModel = mongoose.model("catalogue", {
    nom: String,
    description: String,
	prix: Number
});

CatalogueModel.insertMany([
    { nom: 'Disque 1', description: "techno", prix: 20}, 
    { nom: 'Disque 2', description: "rock", prix: 15}, 
    { nom: 'Disque 3', description: "electro", prix: 10},
	{ nom: 'Disque 4', description: "rap", prix: 15}
]).then(function(){ 
    console.log("Data inserted")  // Success
}).catch(function(error){ 
    console.log(error)      // Failure
}); 

app.get("/catalogue", async (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
    try {
        var result = await CatalogueModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/disk", async (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
    try {
        var disk = new CatalogueModel(request.body);
        var result = await disk.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});
