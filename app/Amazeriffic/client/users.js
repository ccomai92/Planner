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
        var id = $inputId.val(); 
        $.post("/users", id, function(result) {
            
        }).fail(function(jqXHR, textStatus, error) {
            alert("failed" + error); 
            $inputId.val("");
        });
    }); 

    $button.on("click", function() {
        var id = $inputId.val(); 
        // var pw = $inputPw.val(); 

        $.get("/users/:username", id, function(result) {
            // $inputPw.val(""); 
            // console.log(result); 
            result.load(); 
        }).fail(function(jqXHR, textStatus, error) {
            alert("no user" + error);
            $inputId.val(""); 
        }); 
    });
    $elements = $("<div>").addClass("login").append($idLabel)
        .append($inputId).append($button).append($createAccount); 
     
    $("main .content").append($elements); 
}; 
$(document).ready(main); 