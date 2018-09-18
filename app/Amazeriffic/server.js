var express = require("express"); 
var http = require("http"); 
var mongoose = require("mongoose"); 
var ToDosController = require("./controllers/todos_controller.js"); 
var usersController = require("./controllers/user_controller.js"); 
var app = express(); 
mongoose.connect('mongodb://localhost/Amazeriffic'); 

/*var toDoObjects = [
    {
        "description": "Finish writing this book",
        "tags": ["writing", "work"]
    },
    {
        "description": "Take Gracie to the park",
        "tags": ["chores", "pets"]
    },
    {
        "description": "Answer emails",
        "tags": ["work"]
    }, 
    {
        "description": "Prep for Monday's class",
        "tags": ["work", "teaching"]
    },
    {
        "description": "Make up some new ToDos",
        "tags": ["writing", "work"]
    },
    {
        "description": "Get Groceries",
        "tags": ["shopping", "chores"]
    }
];*/
/*[
    {
        "name": "shopping",
        "toDos": ["Get groceries"]
    },
    {
        "name": "chores",
        "toDos": ["Get groceries", "Take Gracie to the park"]
    },
    {
        "name": "writing",
        "toDos": ["Make up some new ToDos", "Prep for Monday's class",
                    "Answer emails", "Finish writing this book"]
    },
    {
        "name": "teaching",
        "toDos": ["Prep for Monday's class"]
    },
    {
        "name": "pets",
        "toDos": ["Take Gracie to the park"]
    }
];*/

app.use(express.static(__dirname + "/client")); 

// tell Express to parse incoming 
// JSON objects 
app.use(express.urlencoded()); 

http.createServer(app).listen(3000); 

app.get("/todos.json", ToDosController.index); 
app.get("/todos/:id", ToDosController.show); 
app.post("/todos", ToDosController.create);


app.get("/users/json", usersController.index); 
app.post("/users", usersController.create); 
app.get("users/:username", usersController.show);
app.put("users/:username", usersController.update);
app.del("users/:username", usersController.destroy); 