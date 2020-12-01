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

const UserModel = mongoose.model("user", {
    mail: String,
    pwd: String
});

/*UserModel.deleteMany({}, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});*/

UserModel.find({ mail: "admin@admin.com" }, function (err, res) {
  if (!res.length) {
	  var admin = new UserModel({
		mail: 'admin@admin.com',
		pwd: 'admin'
	});

	admin.save(function(err) {
		if (err) throw err;
		 
		console.log('User successfully saved.');
		}
	);
  }

});

app.get("/users", async (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
    try {
        var result = await UserModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/user/:mail", async (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
    try {
        var user = await UserModel.find({mail: request.params.mail}).exec();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/user", async (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
    try {
        var user = new UserModel(request.body);
        var result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});
