var User = reuquire("../models/user.js"),
    mongoose = require("mongoose"); 

var UserController = {};

UserController.index = function(req, res) {
    console.log("index action called"); 
    res.send(200); 
}; 

UserController.show = function(req, res) {
    console.log("show action called"); 
    res.send(200); 
}; 

UserController.create = function(req, res) {
    console.log("create action called"); 
    res.send(200); 
}; 

UserController.update = function(req, res) {
    console.log("update action called"); 
    res.send(200); 
};

UserController.destroy = function(req, res) {
    console.log("destroy action called"); 
    res.send(200); 
}; 