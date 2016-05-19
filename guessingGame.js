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
	return((higher)? "Guess higher!":"Guess lower!");
}

// Check if the Player's Guess is the winning number 
function checkGuess(player, winNum, guess){
	var message ="";
	if(winNum === guess){
		message = '<p>Congrats! You won</p>';
		finish(message);
	}else{
		if(player.getNumGuess() >= game.getLimit() && player.getPlayerNum()===game.getNumPlayers()-1){
			message = '<p>Game Over. No more turns.</p>';
			finish(message);
		}else{
			guessMessage(player, lowerOrHigher(winNum, guess));
		}
	}
}

function finish(msg){
	$('.result').empty();
	$('.begin').addClass('hide');
	$('.postset').removeClass('hide');
	$('.result').append(msg);
}

//return a string that will be used in the DOM message when the checkGuess function is invoked.
function guessMessage(player, msg){
	var infoPlayer = playerInfo(player);
	displayMessage(infoPlayer + msg);
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
	var identity = '<h2> Player: '+(player.getPlayerNum()+1)+'</h2> \n';
	var turn = '<p>Guesses Left: ' + (game.getLimit()-player.numGuess) + '</p>\n';
	return identity+turn;
}

function displayMessage(message){
	$('.result').empty();
	$('.result').append(message);
	$('.result').find('h2').addClass('highlight');
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
		//enter is only handled after the start button has been pressed
		$(document).keydown(function (event){
		    if(event.keyCode == 13){
		        processGuess(currentPlayer);
				game.nextPlayer();
				currentPlayer = game.getCurrentPlayer();
		    }
		});
	});

	$('#submit').on('click', function(){
		processGuess(currentPlayer);
		game.nextPlayer();
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
