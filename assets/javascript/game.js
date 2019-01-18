var database = firebase.database();


var playerOne;
var playerTwo;

$("#request").on("click", function(){
    alert("request clicked");
});

database.ref("players").on("value", function(snapshot) {
    console.log(snapshot.val());
});

