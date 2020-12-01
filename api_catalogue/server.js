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

/*CatalogueModel.deleteMany({}, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});*/

CatalogueModel.find({ nom: "Disque 1" }, function (err, res) {
  if (!res.length) {
	  var disk = new CatalogueModel({ nom: 'Disque 1', description: "techno", prix: 20});
		disk.save(function(err) {
		if (err) throw err;
		 
		console.log('User successfully saved.');
		}
	);
  }

});
CatalogueModel.find({ nom: "Disque 2" }, function (err, res) {
  if (!res.length) {
	  var disk = new CatalogueModel({ nom: 'Disque 2', description: "rock", prix: 15});
		disk.save(function(err) {
		if (err) throw err;
		 
		console.log('User successfully saved.');
		}
	);
  }

});
CatalogueModel.find({ nom: "Disque 3" }, function (err, res) {
  if (!res.length) {
	  var disk = new CatalogueModel({ nom: 'Disque 3', description: "electro", prix: 10});
		disk.save(function(err) {
		if (err) throw err;
		 
		console.log('User successfully saved.');
		}
	);
  }

});
CatalogueModel.find({ nom: "Disque 4" }, function (err, res) {
  if (!res.length) {
	  var disk = new CatalogueModel({ nom: 'Disque 4', description: "rap", prix: 15});
		disk.save(function(err) {
		if (err) throw err;
		 
		console.log('User successfully saved.');
		}
	);
  }

});

/*
	CatalogueModel.insertMany([
		{ nom: 'Disque 1', description: "techno", prix: 20}, 
		{ nom: 'Disque 2', description: "rock", prix: 15}, 
		{ nom: 'Disque 3', description: "electro", prix: 10},
		{ nom: 'Disque 4', description: "rap", prix: 15}
	]).then(function(){ 
		console.log("Data inserted")  // Success
	}).catch(function(error){ 
		console.log(error)      // Failure
	});*/


app.get("/catalogue", async (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
    try {
        var result = await CatalogueModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/disk/:idDisk", async (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
    try {
        var result = await CatalogueModel.find({_id: request.params.idDisk}).exec();
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
