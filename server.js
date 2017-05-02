(function() {
    "use strict";
    var express= require('express');
    var app = express();
    
    var start = function() {
        setUpExpress();  
        dealWithMongo();
    };
    
    
    var setUpExpress = function() {
        app.use('/', express.static(__dirname));
        app.get('/Creators', function(req, res) {
           res.sendFile(__dirname + '\\creators.html'); 
        });
        app.listen(3000, function() {
            console.log("server running.");
        });
        
    };
     
    var dealWithMongo = function() {
        var mongoose = require('mongoose');
        //Official Database
        mongoose.connect('mongodb://Server:server@ds113841.mlab.com:13841/recipes');
        //Testing Database
        //mongoose.connect('mongodb://localhost/test');
        
        var recipeScheme = mongoose.Schema({
            collect: String,
            title: String, 
            url: String, 
            description: String,
        });
        var moreScheme = mongoose.Schema({
            collect: String,
            title: String, 
            description: String,
            ingredients: String,
            direction: String
        });
        
        var recipeModel = mongoose.model('recipe',recipeScheme );
        var moreModel = mongoose.model('learnmore',moreScheme );

        var querry = mongoose.model('recipe');
        var bodyParser = require('body-parser')
        app.use(bodyParser.json());
        
        //Code to add a recipe to the database
        app.post("/addToDB", function (req, res) {
            var rec = "";
            if (req.body.collect === "learnmores") {
                var rec = new moreModel(req.body);
            } else {
                var rec = new recipeModel(req.body);
            }
            rec.save(function(err, rec) {
               if (err) return console.error(err); 
            });
            res.send('complete');
        });
        
        //Returns an array of found items.
        app.post("/getDataBase", function (req, res) {
            mongoose.connection.db.collection('recipes', function (err, collection) {
                collection.find().toArray(function(err, results) {
                    console.log(results);
                    res.send(results);
                });
            });
        });
        
        //return array when you search for a title
        app.post("/getDataBaseBySearch", function (req, res) {
            var id = req.body.id;
            var sear = req.body.search;
            var collection = "";
            var sort = {};
            if (id === "title") {
                sort = {title: {$regex : sear}};
                collection = "recipes";
            } else if (id === "ingredients") {
                sort = {ingredients: {$regex : sear}};
                collection = "learnmores";
            } else {
                sort = {title: sear};
                collection = req.body.collection;
                console.log("colect : " + collection);
            }
            console.log(sort);
            mongoose.connection.db.collection(collection, function (err, collection) {
                collection.find(sort).toArray(function(err, results) {
                    console.log(results);
                    res.send(results);
                });
            });
        });
    };
    
   start();
}())