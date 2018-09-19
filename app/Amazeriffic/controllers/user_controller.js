var User = require("../models/user.js"),
    mongoose = require("mongoose"); 

var UserController = {};

UserController.index = function(req, res) {
    console.log("index action called"); 

    res.send(200); 
}; 

UserController.show = function(req, res) {
    console.log("show action called"); 
    console.log(req.params.username); 
    User.find({"username": req.params.username}, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.sendfile("./client/index.html"); 
        } else {
            res.send(404); 
        }
    });  
}; 

UserController.create = function(req, res) {
    console.log("create action called"); 
    var username = req.body.id; 
    // console.log(username);
    User.find({"username": username}, function (err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.send(200, "user already exist");
            console.log(err);   
            console.log("user already exist"); 
        } else {
            var newUser = new User({
                "username": username
            });
            newUser.save(function(err, result) {
                console.log(err); 
                if (err !== null) {
                    res.json(500, err); 
                } else {
                    res.json(200, result);
                    console.log(result); 
                }
            });
        }
    }); 
}; 

UserController.update = function(req, res) {
    console.log("update action called"); 
    res.send(200); 
};

UserController.destroy = function(req, res) {
    console.log("destroy action called"); 
    res.send(200); 
}; 

module.exports = UserController; 