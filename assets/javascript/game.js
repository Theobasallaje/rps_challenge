var database = firebase.database();

//variables
var options = $(".option");
//player 1
var playerOne;
var p1Rock = $("#p1Rock");
var p1Paper = $("#p1Paper");
var p1Scissors = $("#p1Scissors");
//player 2
var playerTwo;
var p2Rock = $("#p2Rock");
var p2Paper = $("#p2Paper");
var p2Scissors = $("#p2Scissors");

//functions
$("#request").on("click", function(){
    alert("request clicked");
});

database.ref("players").on("value", function(snapshot) {
    console.log(snapshot.val());
});

