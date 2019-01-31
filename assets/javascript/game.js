var database = firebase.database();

//variables
var options = $(".option");
var reset = $("#reset");
var rematch = $("#rematch");
var pOptions1 = $("#playerOneOptions");
var pOptions2 = $("#playerTwoOptions");
var ties = 0;
var me;
var meName;
var meName1;
var meName2;
var clickCount = 0;
//player 1
var playerOne;
var playerOneWins = 0;
var playerOneLosses = 0;
var playerOnePick;
var p1Rock = $("#p1Rock");
var p1Paper = $("#p1Paper");
var p1Scissors = $("#p1Scissors");
//player 2
var playerTwo;
var playerTwoWins = 0;
var playerTwoLosses = 0;
var playerTwoPick;
var p2Rock = $("#p2Rock");
var p2Paper = $("#p2Paper");
var p2Scissors = $("#p2Scissors");

//functions
$("#start").on("click", function () {
    database.ref('players').once('value', function (snapshot) {
        const players = snapshot.val();
        const newPlayer = $('#name').val();
        console.log(fireP2Scissors);
        // clickCount++;
        // clickCount = snapshot.val().clickCount;
        // console.log(clickCount);
        // database.ref('clickCount').set(clickCount);
        if (players.playerOne.name == "Finding Player 1...") {
            console.log('add new player');
            playerOne = newPlayer;
            me = 'playerOne';
            meName = newPlayer;
            meName1 = newPlayer;
            database.ref('players/playerOne').set({
                name: playerOne,

            })
        } else if (players.playerTwo.name == "Finding Player 2...") {
            playerTwo = newPlayer;
            me = 'playerTwo';
            meName = newPlayer;
            meName2 = newPlayer;
            database.ref('players/playerTwo').set({
                name: playerTwo,
            })
        }
    })
});

"Version: " + navigator.appVersion + "\n" 

database.ref("players").on("value", function (snapshot) {
    console.log("in players value listener");
    const players = snapshot.val();
    fireP1Rock = snapshot.val().rock;
    fireP1Paper = snapshot.val().paper;
    fireP1Scissors = snapshot.val().scissors;
    fireP2Rock = snapshot.val().rock;
    fireP2Paper = snapshot.val().paper;
    fireP2Scissors = snapshot.val().scissors;
    playerOnePick = snapshot.val().playerOne.pick;
    playerTwoPick = snapshot.val().playerTwo.pick;
    playerOne = snapshot.val().playerOne.name;
    playerTwo = snapshot.val().playerTwo.name;
    playerOneWins = snapshot.val().playerOneWins;
    playerOneLosses = snapshot.val().playerOneLosses;
    playerTwoWins = snapshot.val().playerTwoWins;
    playerTwoLosses = snapshot.val().playerTwoLosses;
    ties = snapshot.val().ties;
    $('#playerOneName').html(`<span>${playerOne}</span>`)
    $('#playerTwoName').html(`<span>${playerTwo}</span>`)
    console.log(players.playerOne.pick);
    if (!(players.playerTwo.name == "Finding Player 2...")) {
        $("#choose1").html("Select Rock, Paper, or Scissors Below:");
        p1Rock.html(fireP1Rock);
        p1Paper.html(fireP1Paper);
        p1Scissors.html(fireP1Scissors);
    }

    if (playerOnePick === "Rock" || playerOnePick === "Paper" || playerOnePick === "Scissors") {
        console.log("in players else if for p1");
        $("#choose2").html("Select Rock, Paper, or Scissors Below:");
        p2Rock.html(fireP2Rock);
        p2Paper.html(fireP2Paper);
        p2Scissors.html(fireP2Scissors);
        pOptions1.html("Player 1 Picked");
    }

    if ((playerOnePick === "Rock" || playerOnePick === "Paper" || playerOnePick === "Scissors") && 
        (playerTwoPick === "Rock" || playerTwoPick === "Paper" || playerTwoPick === "Scissors")) {
        console.log("in players else if for if p1 & p2 selected");
        pOptions1.html(playerOnePick);
        pOptions2.html(playerTwoPick);
        console.log(ties);
        console.log(playerOneWins);
        $("#wins1").html("Wins: " + playerOneWins);
        $("#losses1").html("Losses: " + playerOneLosses);
        $("#ties1").html("Ties: " + ties);
        $("#wins2").html("Wins: " + playerTwoWins);
        $("#losses2").html("Losses: " + playerTwoLosses);
        $("#ties2").html("Ties: " + ties);
    }

    rematch.on("click", function(){
        database.ref('players/playerOne').set({
            name: "Finding Player 1...",
        });
        database.ref('players/playerTwo').set({
            name: "Finding Player 2...",
        });
        location.reload();
    });
    
    reset.on("click", function () {
        database.ref('players/playerOne').set({
            name: "Finding Player 1...",
        });
        database.ref('players/playerTwo').set({
            name: "Finding Player 2...",
        });
        database.ref('players/playerTwoWins').set(0);
        database.ref('players/playerTwoLosses').set(0);
        database.ref('players/playerOneWins').set(0);
        database.ref('players/playerOneLosses').set(0);
        database.ref('players/ties').set(0);
        database.ref('players/clickCount').set(0);
        database.ref('/chat').set({});
        location.reload();
    });
});
// input box
// a place to display the messages
// create new collection
// when you hit enter -- you would use the meName variable to make a new record
// create a event listner

$(".option1").on('click', function () {
    // alert("clicked");
    var pick = $(this).text()
    database.ref('players/playerOne').set({
        name: meName1,
        pick: pick
    });
});

$('.option2').on('click', function () {
    var pick = $(this).text()
    database.ref('players/playerTwo').set({
        name: meName2,
        pick: pick
    });

    console.log(playerOnePick);
    console.log(playerTwoPick);

    if ((playerOnePick && playerTwoPick) != "null") {
        console.log("in rps logic");
        // rock paper scissors logic
        // create new collection for wins, losses, and ties in firebase
        // dispaly winner on html/dom
        // reset the game

        //player one chooses ROCK
        if (playerOnePick === "Rock" && playerTwoPick === "Scissors") {
            console.log("in rock");
            playerOneWins++;
            database.ref('players/playerOneWins').set(playerOneWins);
            playerTwoLosses++;
            database.ref('players/playerTwoLosses').set(playerTwoLosses);

        } else if (playerOnePick === "Rock" && playerTwoPick === "Paper") {
            console.log("in rock");
            playerTwoWins++;
            console.log('player 1 losses', playerOneLosses);
            console.log('player 2 wins', playerTwoWins);
            database.ref('players/playerTwoWins').set(playerTwoWins);
            playerOneLosses++; //need to put this after the first write to the database since the database event listener resets this variable since I am using global variables
            database.ref('players/playerOneLosses').set(playerOneLosses);

        } else if (playerOnePick === "Rock" && playerTwoPick === "Rock") {
            ties++;
            database.ref('players/ties').set(ties);
        }

        //player one chooses PAPER
        if (playerOnePick === "Paper" && playerTwoPick === "Rock") {
            console.log("in paper");
            playerOneWins++;
            database.ref('players/playerOneWins').set(playerOneWins); 
            playerTwoLosses++; 
            database.ref('players/playerTwoLosses').set(playerTwoLosses);

        } else if (playerOnePick === "Paper" && playerTwoPick === "Scissors") {
            console.log("in paper");
            playerTwoWins++
            database.ref('players/playerTwoWins').set(playerTwoWins);
            playerOneLosses++
            database.ref('players/playerOneLosses').set(playerOneLosses);

        } else if (playerOnePick === "Paper" && playerTwoPick === "Paper") {
            ties++;
            database.ref('players/ties').set(ties);
        }

        //player one chooses SCISSORS
        if (playerOnePick === "Scissors" && playerTwoPick === "Paper") {
            console.log("in scissors");
            playerOneWins++;
            database.ref('players/playerOneWins').set(playerOneWins);
            playerTwoLosses++;
            database.ref('players/playerTwoLosses').set(playerTwoLosses);

        } else if (playerOnePick === "Scissors" && playerTwoPick === "Rock") {
            console.log("in scissors");
            playerTwoWins++
            database.ref('players/playerTwoWins').set(playerTwoWins);
            playerOneLosses++
            database.ref('players/playerOneLosses').set(playerOneLosses);

        } else if (playerOnePick === "Scissors" && playerTwoPick === "Scissors") {
            ties++;
            database.ref('players/ties').set(ties);
        }

    }
    pOptions2.html(pick);
});


//chat logic
$("#send").on("click", function(){
    var message = $("#chatInput").val();
    console.log(message)
    console.log(meName)
    database.ref('/chat').push(
        {
            message: message,
            name: meName
        }
    )
});

database.ref('/chat').on("child_added", function(snapshot){
    console.log(snapshot.val());
    const messageObj = snapshot.val();
    $('#chat').append(`<div>${messageObj.name} : ${messageObj.message}</div>`)
});

