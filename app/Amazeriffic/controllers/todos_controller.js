var ToDo = require("../models/todo.js");
var ToDosController = {}; 

ToDosController.index = function(req, res) {
    ToDo.find({}, function(err, todos) {
        res.json(toDos); 
    }); 
}; 

ToDosController.create = function(req, res) {
    var newToDo = new ToDo({
        "description": req.body.description,
        "tags": req.body.tags
    });

    newToDo.save(function(err, result) {
        console.log(err); 
        if (err !== null) {
            console.log(err);
            res.json(500, err); 
        } else {
            res.json(200, result); 
        }
    }); 
}; 

ToDosController.show = function(req, res) {
    var id = req.params.id;
    ToDo.find({"_id": id}, function(err, todo) {
        if (err !== null) {
            res.json(500, err); 
        } else {
            if (todo.length > 0) {
                res.json(200, todo[0]); 
            } else {
                res.send(404); 
            }
        }
    }); 
}; 

module.exports = ToDosController; 