var Board  = require('board');
var Player = require('player');

var Game = function() {
  var that    = this;
  var board   = new Board();
  var players = [new Player('X', board), new Player('O', board)];
  var gameOver = function() {
    print("Game over.");
  }

  that.play = function() {
    print("Play some tic tac toe.");
    print("Enter moves as x,y coordinates. For example: 0,2");
    print("Type CTL-C to quit.");

    while( !board.gameOver() ) {
      nextPlayer = players[parseInt(board.moves()%2)];
      nextPlayer.move( board );
    }
    gameOver( board, nextPlayer );
  }

  that.onGameOver = function(callback) {
    gameOver = callback;
  }

}

module.exports = Game;
