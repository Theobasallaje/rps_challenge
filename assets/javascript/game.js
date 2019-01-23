var database = firebase.database();

//variables
var options = $(".option");
var ties = 0;
var me;
//player 1
var playerOne;
var PlayerOneWins = 0;
var PlayerOneLosses = 0;
// var p1Rock = $("#p1Rock");
// var p1Paper = $("#p1Paper");
// var p1Scissors = $("#p1Scissors");
//player 2
var playerTwo;
var PlayerTwoWins = 0;
var PlayerTwoLosses = 0;
// var p2Rock = $("#p2Rock");
// var p2Paper = $("#p2Paper");
// var p2Scissors = $("#p2Scissors");

//functions
$("#start").on("click", function(){
    database.ref('players').once('value', function(snapshot){
        const players = snapshot.val();
        const newPlayer = $('#name').val();
        if(players.playerOne.name == "null") {
            alert('add new player')
            playerOne = newPlayer
            me = 'playerOne'
            meName = newPlayer
            database.ref('players/playerOne').set({
                name: playerOne,
              
            }) 
        } else if(players.playerTwo.name == "null"){
            playerTwo = newPlayer;
            me = 'playerTwo'
            meName = newPlayer
            database.ref('players/playerTwo').set({
                name: playerTwo,
            }) 
        }
    })
});

database.ref("players").on("value", function(snapshot) {
    var playerOnePick = snapshot.val().playerOne.pick;
    var playerTwoPick = snapshot.val().playerTwo.pick;
    console.log(snapshot.val());
    playerOne = snapshot.val().playerOne.name;
    playerTwo = snapshot.val().playerTwo.name;
    $('#playerOne').html(`<span>${playerOne}</span>`)
    $('#playerTwo').html(`<span>${playerTwo}</span>`)

    if(playerOnePick && playerTwoPick){
        // rock paper scissors logic
        // create new collection for wins, losses, and ties in firebase
        // dispaly winner on html/dom
        // reset the game

        //player one chooses ROCK
        if (playerOnePick === "rock" && playerTwoPick === "scissors"){
            //playerOneWins++;
            //playerTwoLosses++;
            //diplay to DOM
        } else if (playerOnePick === "rock" && playerTwoPick === "paper") {
            //playerOneLosses++
            //playerTwoWins++
            //display to DOM
        } else {
            //ties++;
            //display to DOM
        }

        //player one chooses PAPER
        if (playerOnePick === "paper" && playerTwoPick === "rock"){
            //playerOneWins++;
            //playerTwoLosses++;
            //diplay to DOM
        } else if (playerOnePick === "paper" && playerTwoPick === "scissors") {
            //playerOneLosses++
            //playerTwoWins++
            //display to DOM
        } else {
            //ties++;
            //display to DOM
        }

        //player one chooses SCISSORS
        if (playerOnePick === "scissors" && playerTwoPick === "paper"){
            //playerOneWins++;
            //playerTwoLosses++;
            //diplay to DOM
        } else if (playerOnePick === "scissors" && playerTwoPick === "rock") {
            //playerOneLosses++
            //playerTwoWins++
            //display to DOM
        } else {
            //ties++;
            //display to DOM
        }
        
    }
});
// input box
// a place to display the messages
// create new collection
// when you hit enter -- you would use the meName variable to make a new record
// create a event listner

$('.option').on('click', function(){
   var pick =  $(this).text()
   database.ref('players/'+ me).set({
       name: meName,
       pick: pick 
   })
})
