/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
var game;

//Fetch players guess
function playersGuessSubmission(){
	var guess = +$('#guess').val();
	$('#guess').val('');
	return guess;
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(winNum, guess){
	//Display the result on the DOM. For now, alert
	var higher = (winNum > guess) ? true:false;
	return((higher)? "Winning number is higher!":"Winning number is lower!");
}

// Check if the Player's Guess is the winning number 

function checkGuess(player, winNum, guess){
	var message ="";
	if(player.filterGuess(guess)){
			if(winNum === guess){
				//guessesd the right number!
				message = "Congrats! You won";
			}else{
				message = lowerOrHigher(winNum, guess);
			}
	}else{
		//duplicate guess
		message ="Duplicate Guess!";
	}
	return guessMessage(player, message);
}

//return a string that will be used in the DOM message when the checkGuess function is invoked.
function guessMessage(player, msg){
	var infoPlayer = playerInfo(player);
	return infoPlayer + msg;
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here

}


function playAgain(){
	// add code here
	var numPlayers = $('#numPlayer').val() || 1;
	$('#numPlayer').val('');
	game = new Game();
	for (var i = 0; i< numPlayers; i++){
		var p = new Player();
		game.addPlayer(p);
	}
	game.updatePlayerList();
	game.setCurrentPlayer(0);
}

//initialize game. New player, New winning number.
function playerInfo(player){
	var identity = '<h2> Player: '+player.getPlayerNum()+'</h2> \n';
	var turn = '<p>Number of guesses: ' + player.numGuess + '</p>\n';
	return identity+turn;
}

function displayMessage(message){
	$('.result').empty();
	$('.result').append(message);
	$('.result').find('h2').addClass('highlight');
}


$(document).ready(function(){
	var currentPlayer;
	$('#start').on('click', function(){
		playAgain();
		console.log("NEW ROUND");
		currentPlayer = game.getCurrentPlayer();
		//$(this).attr('disabled','disabled'); //disable button
		$('.preset').toggleClass('hide');
		console.log(game.getWinningNumber());
	});

	$('#submit').on('click', function(){
		var guess = playersGuessSubmission();
		console.log("Your guess " + guess);
		//run checkGuess but the message will be from guessMessage()
		var message = "";
		if(currentPlayer.getNumGuess() < game.getLimit()){
			message += checkGuess(currentPlayer, game.getWinningNumber(), guess);
		}else{
			message += "Sorry. You ran out of turns";
		}
		displayMessage(message);
		game.nextPlayer();
		currentPlayer = game.getCurrentPlayer();
	});

	$('#replay').on('click',function(){
		$('.preset').toggleClass('hide');
		//$('#start').removeAttr('disabled');
	});
});
