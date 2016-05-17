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
	return((higher)? "winning number is higher":"winning number is lower");
}

// Check if the Player's Guess is the winning number 

function checkGuess(winNum, guess){
	return (winNum === guess)? true:false;
}

//return a string that will be used in the DOM message when the checkGuess function is invoked.
function guessMessage(){

}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}

//constructor
var Player = function(){
	this.numGuess = 0;
	this.guesses = [];
}

Player.prototype.filterGuess = function(guess){
	console.log(this.guesses);
	if(this.guesses.indexOf(guess)> -1){
		return false;
	}
	this.numGuess++;
	this.guesses.push(guess);
	return true;
}

$(document).ready(function(){
	var player = new Player();
	var winningNumber = generateWinningNumber();
	console.log("winning number "+winningNumber);

	$('#guess').on('click', function(){
		var guess = playersGuessSubmission();
		console.log("your guess "+guess);
		//check guess
		if(player.filterGuess(guess)){
			var result = checkGuess(winningNumber, guess);
			if(result){
				//guessesd the right number!
				alert("congrats! you won");
			}else{
				lowerOrHigher(winningNumber, guess);
			}
		}else{
			//duplicate guess
			alert("duplicate guess!");
		}
	});




});

/* **** Event Listeners/Handlers ****  */