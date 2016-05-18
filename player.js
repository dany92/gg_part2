//Player Object. Constructor
var Player = function(){
	this.playerNum = 0;
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

Player.prototype.setPlayerNum = function(num){
	this.playerNum = num;
}

Player.prototype.getPlayerNum = function(){
	return this.playerNum;
}

Player.prototype.getNumGuess = function(){
	return this.numGuess;
}