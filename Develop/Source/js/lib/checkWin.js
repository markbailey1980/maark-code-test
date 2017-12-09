/* eslint "max-statements": "off" */
'use strict';

/*
	This file is sad.
	If you know a better way to do this,
	please, please, please let me know!

	Jesse@gunDB.io
*/

function outOfBounds (col, row, game) {
	var vertical = row < 0 || row >= game.rows;
	var horizontal = col < 0 || col >= game.cols;

	return vertical || horizontal;
}

function number (num, fallback) {
	if (typeof num === 'number') {
		return num;
	}

	return fallback;
}

/*
	Takes initial game coordinates,
	tracks back along an axis until
	it finds a point where the player hasn't played,
	and moves forward until it reaches the end
	of that players streak. If the streak makes
	it four plays long, the game is ended and
	the player is chosen as the game winner.
*/
function scan (coord, game, settings) {
	if (game.ended) {
		return;
	}
	var col, row, player, left, top, atLeftMost, atTopMost, back, forward;
	left = col = coord.col;
	top = row = coord.row;
	player = game.get(col, row);

	// find the furthest back that is still that player
	while (!atLeftMost && !atTopMost) {
		if (outOfBounds(left, top, game)) {
			break;
		}
		back = settings.back(left, top);
		left = number(back.col, left);
		top = number(back.row, top);
		if (game.get(left, top) !== player) {
			atLeftMost = atTopMost = true;
		}
	}

	// now travel forward
	for (var index = 0; index < 4; index += 1) {
		forward = settings.forward(left, top);
		left = number(forward.col, left);
		top = number(forward.row, top);
		if (outOfBounds(left, top, game)) {
			return;
		}
		if (game.get(left, top) !== player) {
			return;
		}
	}

	game.end(player);
}

function checkWin (player, coord, game) {
	// left to right
	scan(coord, game, {
		back: function (col) {
			return {
				col: col - 1
			};
		},
		forward: function (col) {
			return {
				col: col + 1
			};
		}
	});

	// top-left to bottom-right
	scan(coord, game, {
		back: function (col, row) {
			return {
				col: col - 1,
				row: row + 1
			};
		},
		forward: function (col, row) {
			return {
				col: col + 1,
				row: row - 1
			};
		}
	});

	// top to bottom
	scan(coord, game, {
		back: function (col, row) {
			return {
				row: row + 1
			};
		},
		forward: function (col, row) {
			return {
				row: row - 1
			};
		}
	});

	// top-right to bottom-left
	scan(coord, game, {
		back: function (col, row) {
			return {
				col: col + 1,
				row: row + 1
			};
		},
		forward: function (col, row) {
			return {
				col: col - 1,
				row: row - 1
			};
		}
	});
}

/* not using modules for my version so commented this out -Mark */
/* module.exports = checkWin; */
