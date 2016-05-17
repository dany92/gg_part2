//Game Object
var Game = function(){
	this.limit = 5; //number of tries allowed
	this.players = []; //list of players
	this.winningNum = 100; //winning number
	this.init();
}

Game.prototype.init = function(){
	this.setWinningNumber();
}

Game.prototype.addPlayer = function(player){
	player.guessLeft = this.limit;
	this.players.push(player);
}

Game.prototype.setWinningNumber = function(){
	this.winningNum = generateWinningNumber();
}