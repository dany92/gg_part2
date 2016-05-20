var game;

//Fetch players guess
function playersGuessSubmission(){
	var guess = +$('#guess').val();
	$('#guess').val('');
	return guess;
}

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(winNum, guess){
	var higher = (winNum > guess) ? true:false;
	var message = (higher)? '<p>Guess higher!':'<p>Guess lower!';
	message = calcDistance(winNum, guess, message);
	return message;
}

function calcDistance(winNum, guess, message){
	var diff = Math.abs(winNum-guess);
	var msg=message;
	switch(true){
		case (diff<=5):
			msg += ' Within 5 digits of winning number!</p>';
			break;
		case (diff<=10):
			msg += ' Within 10 digits of winning number!</p>';
			break;
		case (diff<=25):
			msg += ' Within 25 digits of winning number!</p>';
			break;
		default:
			msg += ' Greater than 25 digits of winning number!</p>';
	}
	return msg;
}

// Check if the Player's Guess is the winning number 
function checkGuess(player, winNum, guess){
	var message ="";
	if(winNum === guess){
		message = '<h1>Congrats! Player ' + (player.getPlayerNum()+1) + ' won!!</h1>';
		finish(message);
	}else{
		if(player.getNumGuess() >= game.getLimit() && player.getPlayerNum()===game.getNumPlayers()-1){
			message = '<h1>Game Over. No more turns.</h1>';
			finish(message);
		}else{
			game.nextPlayer();
			guessMessage(player, lowerOrHigher(winNum, guess));
		}
	}
}

function finish(msg){
	$('.result').empty();
	$('.begin').addClass('hide');
	$('.postset').removeClass('hide');
	$('.result').append(msg);
	$('.result').find('h1').addClass('ending').animate({fontSize: '6vw'}, "slow");
}

//return a string that will be used in the DOM message when the checkGuess function is invoked.
function guessMessage(player, msg){
	var infoPlayer = playerInfo(player);
	var nextPlayer = '<div class="next-line"><h2>Now it is Player '+(game.getCurrentPlayer().getPlayerNum()+1)+'\'s turn.</h2></div>';
	displayMessage(nextPlayer + infoPlayer + msg);
}

function displayMessage(message){
	$('.result').empty();
	$('.result').append(message);
	$('.result').find('h2').addClass('highlight');
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(n){
	var position = Math.floor(Math.random()*n);
	var result = [];
	for(var i=0; i<n; i++){
		result[i] = (i === position)? game.getWinningNumber() : Math.floor((Math.random()*100)+1);
	} 
	return result;
}


function playAgain(){
	game = new Game();
	$('.result').empty();
	var numPlayers = $('#numPlayer').val() || 1;
	$('#numPlayer').val('');
	for (var i = 0; i< numPlayers; i++){
		var p = new Player();
		game.addPlayer(p);
	}
	game.updatePlayerList();
	game.setCurrentPlayer(0);
}

function playerInfo(player){
	var identity = '\n<h3> Player: '+(player.getPlayerNum()+1)+'</h3> \n';
	var turn = '<p>Guesses Left: ' + (game.getLimit()-player.numGuess) + '</p>\n';
	return identity+turn;
}

function processGuess(player){
	var guess = playersGuessSubmission();
	if(player.filterGuess(guess)){
		checkGuess(player, game.getWinningNumber(), guess);
	}else{
		message ='<p>Duplicate Guess!</p>';
		displayMessage(message);
	}
	console.log("Your guess " + guess);
	//run checkGuess but the message will be from guessMessage()
}

$(document).ready(function(){
	var currentPlayer;
	$('#start').on('click', function(){
		playAgain();
		console.log("NEW ROUND");
		currentPlayer = game.getCurrentPlayer();
		$('.preset').toggleClass('hide');
		console.log(game.getWinningNumber());
	});

	$('#guess').keydown(function (event){
	    if(event.keyCode == 13){
	        processGuess(currentPlayer);
	        currentPlayer = game.getCurrentPlayer();
	    }
	});
	
	$('#submit').on('click', function(){
		processGuess(currentPlayer);
		currentPlayer = game.getCurrentPlayer();
	});

	$('#hint').on('click', function(){
		var hints = provideHint(3).join(', ');
		displayMessage(hints);
	});

	$('#replay').on('click',function(){
		$('.begin').removeClass('hide');
		$('.postset').addClass('hide');
		$('.preset').toggleClass('hide');
	});
});
