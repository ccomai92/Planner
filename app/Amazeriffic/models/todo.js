var mongoose = require("mongoose"); 
// mongoose.connect('mongodb://localhost/Amazeriffic'); 
// this is our mongoose model for todo 

var ObjectId = mongoose.Schema.Types.ObjectId; 
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [String],
    owner: {type: ObjectId, ref: "User"}
}); 

var ToDo = mongoose.model("ToDo", ToDoSchema); 

module.exports = ToDo; 