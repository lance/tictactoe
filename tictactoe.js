var Game = require('game');

var gameOverFunc = function(board, winner) {
  board.display();
  if (board.hasWinner()) {
    print("Winner is " + winner.mark + ", in " + board.moves() + " moves.");
  } else {
    print("The game was a tie.");
  }
  newGame();
}

var newGame = function() {
  game = new Game();
  game.onGameOver( gameOverFunc );
  game.play();
}

newGame();

