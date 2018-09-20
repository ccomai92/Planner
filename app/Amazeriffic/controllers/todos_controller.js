var ToDo = require("../models/todo.js");
var User = require("../models/user.js")
var ToDosController = {}; 

ToDosController.index = function(req, res) {
    var username = req.params.username || null,
    respondWithToDos; 

    respondWithToDos = function(query) {
        ToDo.find(query, function (err, toDos) {
            if (err !== null) {
                res.json(500, err); 
            } else {
                res.json(200, toDos); 
            }
        }); 
    } 

    if (username !== null) {
        User.find({"username": username}, function(err, result) {
            if (err !== null) {
                res.send(500, err); 
            } else if (result.length === 0) {
                // no user 
                res.send(404); 
                console.log("not found"); 
            } else {
                respondWithToDos({"owner": result[0].id});
            }
        });
    } else {
        respondWithToDos({}); 
    }
}; 

ToDosController.create = function(req, res) {
    var username = req.params.username || null; 
    var newToDo = new ToDo({
        "description": req.body.description,
        "tags": req.body.tags
    });

    User.find({"username": username}, function(err, result) {
        if (err) {
            res.send(500); 
        } else {
            if (result.length === 0) {
                newToDo.owner = null; 
            } else {
                newToDo.owner = result[0]._id; 
            }

            newToDo.save(function(err, result) {
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

ToDosController.update = function(req, res) {
    console.log("todoController update called"); 
};

ToDosController.destroy = function(req, res) {
    console.log("todoController destroy called"); 
    var username = req.params.username; 
    var objectId = req.params.id; 
    // console.log(username); 
    // console.log(objectId); 
    ToDo.remove({"_id": objectId}, function(err, result) {
        if (err) {
            res.send(500, err); 
        } else {
            res.send(200); 
        }
    });
}; 

/*
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
};*/  

module.exports = ToDosController; 