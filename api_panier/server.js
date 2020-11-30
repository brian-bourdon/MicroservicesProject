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
const PORT = 4002;

mongoose.connect(config.DB, function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});

const PanierModel = mongoose.model("panier", {
    idUser: String,
    idDisk: String
});

PanierModel.deleteMany({}, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});

app.get("/panier/:idUser", async (request, response) => {
	//response.header("Access-Control-Allow-Origin", "*");
    try {
        var result = await PanierModel.find({idUser: request.params.idUser}).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/panier/delete/:idPanier", async (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
    try {
        var result = await PanierModel.deleteOne({_id: request.params.idPanier}).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/panier", async (request, response) => {
	//response.header("Access-Control-Allow-Origin", "*");
    try {
        var panier = new PanierModel(request.body);
        var result = await panier.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});
