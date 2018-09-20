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
            alert(result);
            console.log(result); 
            // $button.trigger("click"); 
            $inputId.val(""); 
        }).fail(function(jqXHR, textStatus, error) {
            //console.log(jqXHR); 
            // console.log(textStatus); 
            //console.log(error.constructor.name); 
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
            window.location = "http://localhost:1234?" + url; 
            // for now 
            var $aTag = $("<a>");
            $aTag.attr("href", "javascript:window.location"); 
            $aTag.text("Go to main page");  
            $("main .content").append($aTag); 
            
        
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