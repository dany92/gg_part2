//Player Object. Constructor
var Player = function(){
	this.numGuess = 0;
	this.guessLeft = 0;
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