/* ------------
JS OBJECT 
------------ */
document.addEventListener('DOMContentLoaded', function() {
	var Logic = {
		init: function() {
			this.setupElements();
			this.bindEvents();
		},
		setupElements: function(){},
		bindEvents: function() {},
		checkWin: function(){

			/* Wait four turns each player before we start to look for a winner since */

			/* look at last piece dropped */

			/* traverse down and left right (conditionally in case it's the first or last column) */

			/* then looks diagonally (this will probably be harder) */

			/* if winner, pause game */

		}
	};
	Logic.init();
	window.Logic = Logic;
});
