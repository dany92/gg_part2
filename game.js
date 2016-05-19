//Game Object
var Game = function(){
	this.limit = 5; //number of tries allowed per player
	this.players = []; //list of players
	this.currentPlayer = {};
	this.winningNum = 100; //winning number
	this.losers = 0;
	this.init();
}

Game.prototype.init = function(){
	this.setWinningNumber();
}

Game.prototype.addPlayer = function(player){
	player.setPlayerNum(this.players.length);
	this.players.push(player);
}

Game.prototype.updatePlayerList = function(){
	for(var i = 0; i < this.players.length; i++){
		this.players[i].setPlayerNum(i);
	}
}

Game.prototype.setWinningNumber = function(){
	this.winningNum = this.generateWinningNumber();
}

Game.prototype.getWinningNumber = function(){
	return this.winningNum;
}

Game.prototype.generateWinningNumber = function(){
	return Math.floor((Math.random()*100)+1);
}

Game.prototype.setCurrentPlayer = function(num){
	this.currentPlayer = this.players[num];
}

Game.prototype.getCurrentPlayer = function(){
	if(Object.keys(this.currentPlayer).length === 0){
		this.currentPlayer = this.players[0];
	}
	return this.currentPlayer;
}

Game.prototype.getNumPlayers = function(){
	return this.players.length;
}

Game.prototype.nextPlayer = function(){
	var num = this.currentPlayer.getPlayerNum();
	var next = (num + 1) % this.players.length;
	this.setCurrentPlayer(next);
}

Game.prototype.getLimit = function(){
	return this.limit;
}