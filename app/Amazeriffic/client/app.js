var main = function(toDoObjects) {
    "use strict"; 

    var toDos, tabs;  
    
    tabs = []; 
    tabs.push({
        "name": "Newest",
        "content": function(callback) {
            $.getJSON("/todos.json", function(toDoObjects) {
                toDos = toDoObjects.map(function(toDo) {
                    return toDo.description;
                });
                var $content; 
                $content = $("<ul>"); 
                for (var i = toDos.length - 1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i])); 
                }
                callback(null, $content); 
            }).fail(function(jqXHR, textStatus, error) {
                callback(error, null); 
            }); 
        }
    }); 

    tabs.push({
        "name": "Oldest", 
        "content": function(callback) {
            $.getJSON("/todos.json", function(toDoObjects) {
                toDos = toDoObjects.map(function(toDo) {
                    return toDo.description;
                });
                var $content; 
                $content = $("<ul>"); 
                for (var i = 0; i < toDos.length; i++) {
                    $content.append($("<li>").text(toDos[i])); 
                }
                callback(null, $content); 
            }).fail(function(jqXHR, textStatus, error) {
                callback(error, null); 
            }); 
        }
    }); 

    tabs.push({
        "name": "Tags",
        "content": function(callback) {
            $.getJSON("/todos.json", function(toDoObjects) {
                var $content;
                var list = [];  
                var tagObjects = organizedByTags(toDoObjects); 
                tagObjects.forEach(function(tag) {
                    var $tagName = $("<h3>").text(tag.name); 
                    var $ul = $("<ul>");

                    tag.toDos.forEach(function(description) {
                        var $li = $("<li>").text(description);
                        $ul.append($li); 
                    });
                    list.push($tagName.append($ul)); 
                }); 
             
                $content = list[0]; 
                for (var i = 1; i < list.length; i++) {
                    $content.append(list[i]); 
                }
                callback(null, $content); 
            }).fail(function(jqXHR, textStatus, error) {
                callback(error, null); 
            });  
        }
    });

    tabs.push({
        "name": "Add",
        "content": function(callback) {
            $.getJSON("/todos.json", function(toDoObjects) {
                toDos = toDoObjects.map(function(toDo) {
                    return toDo.description;
                });
                var $content;
                var $input = $("<input>").addClass("description"),
                $inputLabel= $("<p>").text("Description: "),
                $tagInput = $("<input>").addClass("tags"),
                $tagLabel = $("<p>").text("Tags: "),
                $button = $("<button>").text("+"); 

                $button.on("click", function() {
                    var description = $input.val(),
                        tags = $tagInput.val().split(","),
                        newToDo = {"description": description, "tags": tags};

                    $.post("todos", newToDo, function(result) {
                        $input.val("");
                        $tagInput.val("");

                        $(".tabs a:first span").trigger("click"); 
                    });
                });

                $tagInput.on("keypress", function(event){
                    if (event.keyCode === 13) {
                        var description = $input.val(),
                        tags = $tagInput.val().split(","),
                        newToDo = {"description": description, "tags": tags};

                        $.post("todos", newToDo, function(result) {
                            $input.val("");
                            $tagInput.val("");

                            $(".tabs a:first span").trigger("click"); 
                        });
                    }
                }); 
                


                $content = $("<div>").append($inputLabel)
                    .append($input)
                    .append($tagLabel)
                    .append($tagInput)
                    .append($button);

                callback(null, $content); 
            }).fail(function(jqXHR, textStatus, error) {
                callback(error, null); 
            }); 
        }
    }); 

    tabs.forEach(function(tab) {
        var $aElement = $("<a>").attr("href", ""),
            $spanElement = $("<span>").text(tab.name); 
        
        $aElement.append($spanElement); 

        $spanElement.on("click", function() {
            var $content; 
            $(".tabs a span").removeClass("active"); 
            $spanElement.addClass("active"); 
            $("main .content").empty();

            tab.content(function(err, $content) {
                if (err !== null) {
                    alert("Whoops, there was a problem with your request: "
                    + err); 
                } else {
                    $("main .content").append($content);
                } 
            }); 

            return false; 
        }); 
        $("main .tabs").append($aElement); 
    }); 

    var organizedByTags = function(toDoObjects) {
        var tags = []; 
        toDoObjects.forEach(function(toDo) {
            toDo.tags.forEach(function(tag) {
                if (tags.indexOf(tag) === -1) {
                    tags.push(tag); 
                }
            }); 
        });
        
        // provided function once for each element in an array, in order.
        var tagObjects = tags.map(function(tag) {
            var toDosWithTag = []; 
            toDoObjects.forEach(function(toDo) {
                if (toDo.tags.indexOf(tag) !== -1) {
                    toDosWithTag.push(toDo.description);    
                }
            });
            return {"name": tag, "toDos": toDosWithTag}; 
        });
        return tagObjects; 
    };

}; 

$(document).ready(main); 