
/* I should really move this VUE and FIREBASE stuff into my JS object but we'll see if I have time */
/* ------------
VUE 
------------ */

/* just messing around with view to update the turn indicator */
let vGame = new Vue({
	el: '#player-turn-counter',
	data: {
		turn: '1'
	},
	ready: function() {
		this.setTurn();
	},
	methods: {
		setTurn: function(player) {
			if (player != 'active') {
				this.turn = 2;
			} else {
				this.turn = 1
			}
			console.log(`turn = ${this.turn}`);
		}
	}
});


/* ------------
FIREBASE 
------------ */
let database = firebase.database();

/* write each players' move to DB */
function writePlayerData(playerId, move, turn) {
	firebase.database().ref(`players/${playerId}`).set({
		move: move,
		turn: turn
	});
}

/* listen for changes and return move */
let gameMoveUpdate = firebase.database().ref(`players/player${vGame.turn}/move`);
gameMoveUpdate.on('value', function(snapshot) {
	let lastMove = snapshot.val();
	console.log(`watch for val change ${lastMove}`);

	/* update the game board */
	App.updateMove(lastMove);
});

let gameTurnUpdate = firebase.database().ref(`players/player1/turn`);
gameTurnUpdate.on('value', function(snapshot) {
	let player1Turn = snapshot.val();
	console.log(`watch for turn change ${player1Turn}`);

	/* also update the turn counter */
	vGame.setTurn(player1Turn);
});

/* set a variable so we can change to active or inactive turn and clear out the last move */
var otherTurn;
if (vGame.turn == 1) {
	otherTurn = 2;
} else {
	otherTurn = 1;
}


/* ------------
JS OBJECT 
------------ */
document.addEventListener('DOMContentLoaded', function() {
	var App = {
		init: function() {
			this.setupElements();
			this.bindEvents();
		},
		setupElements: function(){
			this.window = $(window);
			this.$column = $('article');
			this.playerTurn = 0;
			this.$playerTurnCounter = $('#player-turn-counter');
			this.$startOver = $('#start-over');
			this.$game = $('#connect-four-game');
		},
		bindEvents: function() {
			App.window.on('load', App.clearData);
			App.$column.on('click', App.dropPiece);
			App.$startOver.on('click', App.clearData);
		},
		clearData: function() {
			/* start by making sure our firebase data is clean */
			writePlayerData(`player1`, '', 'active');
			writePlayerData(`player2`, '', 'inactive');
		},
		dropPiece: function(e, div) {
			console.log(e);

			console.log($(this).attr('id'));
			/* drop game piece drop to first open spot */		
			$(this).find('div.open:last').removeClass('open').addClass(`turn-${currentPlayer}`);		

			/* update firebase with clicked selector */
			writePlayerData(`player${currentPlayer}`, $(this).attr('id'), 'active');
			writePlayerData(`player${otherTurn}`, '', 'inactive');
 
			/* set player turn after we've made a move */
			vGame.setTurn();
			App.waitTurn('wait');
		},
		updateMove: function(div) {
			if(div) {
				console.log(`data has been updated = #player${otherTurn} #${div}`);
				$(`#player${otherTurn} #${div}`).find('div.open:last').removeClass('open').addClass(`turn-${otherTurn}`);
				App.waitTurn('clear');
			}
		},
		waitTurn: function(event) {
			/* set up some indicator that we have to wait our turn - maybe add class and use pseudo class content to declare "wait" */
			if(event == 'wait') {
				console.log('wait for the other player');
				App.$game.addClass('wait');
			} else if (event == 'clear') {
				console.log('your turn');
				App.$game.removeClass('wait');
			}
		},
		winConditions: function() {
			console.log('check win conditions');

			/* look for winning combos and stop game */	
		}
	};
	App.init();
	window.App = App;
});
