<?php 
	if(isset($_GET['player'])) {
		$player = $_GET['player'];
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Connect Four</title>
	
	<!-- build:phpinclude /css/screen.min.css -->
	<link rel="stylesheet" href="/css/screen.css">
	<!-- endbuild -->

	<!-- set variable that will only allow game to be played on games/1/ or games/2/ URLs -->
	<?php if($player > 0) { ?>
	<script>
		let gamePlayable = 1;
		let currentPlayer = <?=$player?>;
	</script>
	<?php } ?>

</head>
<body id="<?php if($player > 0) { ?>player<?=$player?><? } ?>">
	<h1>connect four</h1>

	<?php if($player > 0) { ?>
		<p>you are player <?=$player?></p>
	<?php } else { ?>
		<p>START GAME - <a href="/games/1" target="_blank">PLAYER 1</a> or <a href="/games/2" target="_blank">PLAYER 2</a></p>
	<?php } ?>

	<main>
		<section class="game<?php if($player == 0) { echo ' homepage'; } ?>" id="connect-four-game">
			<article class="col" id="col-1">
				<div class="six open"></div>
				<div class="five open"></div>
				<div class="four open"></div>
				<div class="three open"></div>
				<div class="two open"></div>
				<div class="one open"></div>
			</article>
			<article class="col" id="col-2">
				<div class="six open"></div>
				<div class="five open"></div>
				<div class="four open"></div>
				<div class="three open"></div>
				<div class="two open"></div>
				<div class="one open"></div>
			</article>
			<article class="col" id="col-3">
				<div class="six open"></div>
				<div class="five open"></div>
				<div class="four open"></div>
				<div class="three open"></div>
				<div class="two open"></div>
				<div class="one open"></div>
			</article>
			<article class="col" id="col-4">
				<div class="six open"></div>
				<div class="five open"></div>
				<div class="four open"></div>
				<div class="three open"></div>
				<div class="two open"></div>
				<div class="one open"></div>
			</article>
			<article class="col" id="col-5">
				<div class="six open"></div>
				<div class="five open"></div>
				<div class="four open"></div>
				<div class="three open"></div>
				<div class="two open"></div>
				<div class="one open"></div>
			</article>
			<article class="col" id="col-6">
				<div class="six open"></div>
				<div class="five open"></div>
				<div class="four open"></div>
				<div class="three open"></div>
				<div class="two open"></div>
				<div class="one open"></div>
			</article>
			<article class="col" id="col-7">
				<div class="six open"></div>
				<div class="five open"></div>
				<div class="four open"></div>
				<div class="three open"></div>
				<div class="two open"></div>
				<div class="one open"></div>
			</article>
		</section>
		<section class="info">
			<?php if($player > 0) { ?>
			<h2>PLAYER TURN = <span id="player-turn-counter">{{ turn }}</span></h2>
			<p><a id="start-over" href="/">START OVER</a></p>
			<?php } ?>
		</section>
	</main>
</body>


<script src="https://www.gstatic.com/firebasejs/4.8.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
	apiKey: "AIzaSyACyl7BQB_yTW7y-b995tBfEqkaGLHR27E",
	authDomain: "connectfour-4861f.firebaseapp.com",
	databaseURL: "https://connectfour-4861f.firebaseio.com",
	projectId: "connectfour-4861f",
	storageBucket: "",
	messagingSenderId: "985702249673"
  };
  firebase.initializeApp(config);
</script>

<!-- build:js /js/app.min.js -->
<script src="/js/lib/vue.min.js" data-main="game"></script>
<script src="/js/lib/jquery-3.0.0.js"></script>
<script src="/js/lib/checkWin.js"></script>
<script src="/js/app.js"></script>
<!-- <script src="/js/game.js"></script> -->
<!-- endbuild -->
</html>