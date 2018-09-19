// Later, modify in legit authentication method

var main = function() {
    "use strict"; 
    var $elements; 
    var $idLabel = $("<p>").text("ID: "); 
    var $inputId = $("<input>");
    // var $pwLabel = $("<p>").text("Password: ");
    // var $inputPw = $("<input>"); 
    var $button = $("<button>").text("Log in"); 
    var $createAccount = $("<button>").text("Sign Up"); 

    $createAccount.on("click", function() {
        var id = {
            "id": $inputId.val()
        }; 
        $.post("/users", id, function(result) {
            alert("Successfully created account");
            console.log(result); 
            // $button.trigger("click"); 
        }).fail(function(jqXHR, textStatus, error) {
            alert(error);
            $inputId.val(""); 
        });
    }); 

    $button.on("click", function() {
        var id = $inputId.val(); 
        // var pw = $inputPw.val(); 
        var url = "/users/" + id; 

        $.get(url, id, function(result) {
            // $inputPw.val(""); 
            // console.log(result); 
            
            // for now 
            window.location.replace("http://localhost:1234"); 
        
        }).fail(function(jqXHR, textStatus, error) {
            alert(error);
            $inputId.val(""); 
        }); 
    });
    $elements = $("<div>").addClass("login").append($idLabel)
        .append($inputId).append($button).append($createAccount); 
     
    $("main .content").append($elements); 
}; 
$(document).ready(main); 