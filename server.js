(function() {
    "use strict";
    
    var start = function() {
        setUpExpress();  
        dealWithMongo();
    };
    
    
    var setUpExpress = function() {
        var express= require('express');
        var app = express();
        
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
        mongoose.connect('mongodb://localhost/test');
        
        
        
        var recipeModel = mongoose.model('recipe', {title: String, url: String, description: String, ingredients: String});
        var querry = mongoose.model('recipe');
        var bodyParser = require('body-parser')
        app.use(bodyParser.json());
        
        
        app.post("/addToDB", function (req, res) {
            console.log(req.body);
            
            var rec = new recipeModel(req.body);
            rec.save(function(err, rec) {
               if (err) return console.error(err); 
            });
            res.send('complete');
        });
        
        app.post("/getDataBase", function (req, res) {
            mongoose.connection.db.collection('recipes', function (err, collection) {
                collection.find().toArray(function(err, results) {
                    console.log(results);
                    res.send(results);
                });
            });
        });
        app.post("/getDataBaseBySearch", function (req, res) {
            var id = req.body.id;
            var sear = req.body.search;
            var sort = {};
            if (id === "title") {
                sort = {title: sear};
            } else if (id === "ingredients") {
                sort = {ingredients: sear};
            }
            console.log(sort);
            mongoose.connection.db.collection('recipes', function (err, collection) {
                collection.find(sort).toArray(function(err, results) {
                    console.log(results);
                    res.send(results);
                });
            });
        });
    };
    
   start();
}())