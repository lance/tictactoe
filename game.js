var System            = java.lang.System;
var Reader            = java.io.BufferedReader;
var InputStreamReader = java.io.InputStreamReader;

var input             = new Reader( new InputStreamReader( System.in ) );

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

var Player = function(mark) {
  var nextMove = null;
  var that     = this;

  that.mark = mark;
  that.move = function(board) {
    do {
      board.display();
      System.out.print("[" + that.mark + "]'s turn: ");
      nextMove = new Move( that.mark );
    } while( !board.play( nextMove ) );
  }
}

var Move = function(mark) {
  var that  = this;

  that.mark = mark;
  that.x    = NaN;
  that.y    = NaN;

  that.isValid = function() {
    return !isNaN(that.x) && !isNaN(that.y);
  }

  var getInput = function() {
    possibleMove = input.readLine();
    coordinates = possibleMove.split(',');
    if ( coordinates.length == 2 ) {
      that.x = coordinates[0].trim();
      that.y = coordinates[1].trim();
    }
  }
  getInput();
}

var Board = function() {
  var that   = this;
  var board  = [ [], [], [] ];
  var moves  = [];

  that.hasWinner = function() {
    return rowWins(0)    || rowWins(1)    || rowWins(2)    || 
           columnWins(0) || columnWins(1) || columnWins(2) || 
           diagonalWins();
  }

  that.display = function() {
    print("");
    print(" 2  " + markOrBlank(0,2) + " | " + markOrBlank(1,2) + " | " + markOrBlank(2,2));
    print("    -----------");
    print(" 1  " + markOrBlank(0,1) + " | " + markOrBlank(1,1) + " | " + markOrBlank(2,1));
    print("    -----------");
    print(" 0  " + markOrBlank(0,0) + " | " + markOrBlank(1,0) + " | " + markOrBlank(2,0));
    print("    0   1   2");
    print("");
  }

  that.play = function(move) {
    if (that.gameOver()) {
      // game is over
      print("The game is already over.");
      return false;
    }
    if (!move.isValid()) {
      print("Move is not valid.");
      return false;
    }
    if (board[move.x] && board[move.x][move.y]) {
      // space is taken
      print("Can't move there, the space is already taken!");
      return false;
    }
    if (move.x < 0 || move.x > 2 || move.y < 0 || move.y > 2) {
      // move is out of bounds
      print("Move is out of bounds.");
      return false;
    }
    board[move.x][move.y] = move.mark;
    moves.push(move);
    return moves.length;
  }

  that.moves = function() {
    return moves.length;
  }

  that.gameOver = function() {
    return that.hasWinner() || moves.length == 9;
  }

  var rowWins = function(y) {
    return (board[0][y] == board[1][y]) && (board[1][y] == board[2][y]) && board[2][y] != null;
  }

  var columnWins = function(x) {
    return (board[x][0] == board[x][1]) && (board[x][1] == board[x][2]) && board[x][2] != null;
  }

  var diagonalWins = function() {
    return ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2]) && board[2][2] != null) ||
           ((board[0][2] == board[1][1]) && (board[1][1] == board[2][0]) && board[2][0] != null);
  }

  var markOrBlank = function(x,y) {
    return (board[x][y] == undefined) ? " " : board[x][y];
  }
}

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
