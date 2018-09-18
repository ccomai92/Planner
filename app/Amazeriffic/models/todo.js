var mongoose = require("mongoose"); 
// mongoose.connect('mongodb://localhost/Amazeriffic'); 
// this is our mongoose model for todo 
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [String]
}); 

var ToDo = mongoose.model("ToDo", ToDoSchema); 

module.exports = ToDo; 