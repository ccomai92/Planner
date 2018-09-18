var main = function() {
    "use strict";
    /*var makeTabActive = function(tabNumber) {
        // construct the selector from the tabNumber
        var tabSelector = ".tabs a:nth-child(" + tabNumber + ") span";
        $(".tabs span").removeClass("active"); 
        $(tabSelector).addClass("active"); 
        $("main .content").empty(); 
    };    

    $(".tabs a:nth-child(1)").on("click", function() {
        makeTabActive(1); 
        return false;
    });

    $(".tabs a:nth-child(2)").on("click", function() {
        makeTabActive(2); 
        return false;
    });

    $(".tabs a:nth-child(3)").on("click", function() {
        makeTabActive(3); 
        return false;
    });*/

    /*
    for (tabNumber = 1; tabNumber <=3; tabNumber++) {
        var tabSelector = ".tabs a:nth-child(" + tabNumber + ") span";
        $(tabSelector).on("click", function(event) {
            $(".tabs span").removeClass("active");
            $("event.target").addClass("active");
            return false; 
        });
    }
    */

    /*
    var organizedByTag = [
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
    ]; */


    setInterval(function() {
        $.getJSON("/todos.json", function(response) {
            var toDoObjects = response; 
            $(".tabs a span").toArray().forEach(function (element) {
                $(element).on("click", function() {
                    var $element = $(element); 
                    var $content; 
                    var toDos; 

                    $(".tabs a span").removeClass("active"); 
                    $element.addClass("active"); 
                    $("main .content").empty();

                    console.log(toDoObjects); 
                    console.log(toDoObjects.constructor.name); 

                    toDos = toDoObjects.map(function(todo) {
                        return todo.description; 
                    }); 
                    
                    console.log(toDos.constructor.name); 


                    if ($element.parent().is(":nth-child(1)")) {
                        console.log("First Tab"); 
                        $content = $("<ul>");
                        toDos.slice().reverse().forEach(function(todo) {
                            $content.append($("<li>").text(todo)); 
                        });
                        $("main .content").append($content); 
                    } else if ($element.parent().is(":nth-child(2)")) {
                        console.log("Second Tab"); 
                        $content = $("<ul>"); 
                        toDos.forEach(function (todo) {
                            $content.append($("<li>").text(todo));
                        }); 
                        $("main .content").append($content); 
                    } else if ($element.parent().is(":nth-child(3)")) {
                        var organizedByTag = organizedByTags(toDoObjects); 
                        console.log(organizedByTag); 
                        organizedByTag.forEach(function(tag) {
                            var $tagName = $("<h3>").text(tag.name); 
                            $content = $("<ul>"); 

                            tag.toDos.forEach(function (description) {
                                var $li = $("<li>").text(description);
                                $content.append($li); 
                            }); 

                            $("main .content").append($tagName); 
                            $("main .content").append($content); 
                        }); 

                    } else if ($element.parent().is(":nth-child(4)")){
                        
                        var $input = $("<input>").addClass("description"),
                            $inputLabel= $("<p>").text("Description: "),
                            $tagInput = $("<input>").addClass("tags"),
                            $tagLabel = $("<p>").text("Tags: "),
                            $button = $("<button>").text("+"); 

                        $button.on("click", function(event) { 
                            addInput($input, $tagInput, toDos); 
                        }); 
                
                        $input.on("keypress", function(event){
                            if (event.keyCode === 13) {
                                addInput($input, $tagInput, toDos); 
                            }
                        }); 

                        $content = $("<div>").append($inputLabel)
                                            .append($input)
                                            .append($tagLabel)
                                            .append($tagInput)
                                            .append($button); 
                        $("main .content").append($content); 
                    }

                    return false; 
                }); 
        // fake click on first tab
                $(".tabs a:first-child span").trigger("click");
        
            }); 
        });
    }, 3000);

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

    var addInput = function($input, $tagInput, toDos) {
        if ($input.val() !== "") {
            var description = $input.val(),
                tags = $tagInput.val().split(","); 
            var newToDo = {"description": description, "tags": tags}; 
            toDoObjects.push(newToDo); 
            

            $.post("todos", newToDo, function(response) {
                console.log(response); 
            });

            toDos = toDoObjects.map(function(toDo) {
                return toDo.description; 
            }); 
            $input.val(""); 
            $tagInput.val(""); 
        }
    }

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
        console.log(tagObjects); 
        return tagObjects; 
    };

    
    


}

$(document).ready(main);