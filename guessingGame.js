/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor((Math.random()*100)+1);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	return +$('input').val();
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
		message ="duplicate guess!";
	}
	return guessMessage(player, message);
}

//return a string that will be used in the DOM message when the checkGuess function is invoked.
function guessMessage(player, msg){
	var infoPlayer = "Number of guesses: " + player.numGuess + "\n";
	return infoPlayer+ msg;
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}

//initialize game. New player, New winning number.
function initialize(){

}

//Player Object. Constructor
var Player = function(){
	this.numGuess = 0;
	this.guesses = [];
}

//Methods
Player.prototype.filterGuess = function(guess){
	if(this.guesses.indexOf(guess)> -1){
		return false;
	}
	this.numGuess++;
	this.guesses.push(guess);
	console.log(this.guesses);
	return true;
}

$(document).ready(function(){
	var player = new Player();
	var winningNumber = generateWinningNumber();
	console.log("Winning number "+winningNumber);

	$('#guess').on('click', function(){
		var guess = playersGuessSubmission();
		console.log("Your guess "+guess);
		//run checkGuess but the message will be from guessMessage()
		var message = checkGuess(player, winningNumber, guess);
		console.log(message);
	});

	$('#play').on('click',function(){
		player = new Player();
		winningNumber = generateWinningNumber();
		console.log("Winning number "+winningNumber);
	});

});

/* **** Event Listeners/Handlers ****  */