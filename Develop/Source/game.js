// let game = [
// 	{	
// 		player1: {
// 			active: 1,
// 			move: 0
// 		},
// 		player2: {
// 			active: 0,
// 			move: 0
// 		}
// 	}
// ];


/* TRYING NODE */ 
watch('game.json', { recursive: true }, function(evt, name) {
  console.log('%s changed.', name);
});


// watch('./', function(evt, name) {
 
//   if (evt == 'update') {
//     // on create or modify 
//   }
 
//   if (evt == 'remove') {
//     // on delete 
//   }
 
// });