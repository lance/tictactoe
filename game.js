var System            = java.lang.System;
var Reader            = java.io.BufferedReader;
var InputStreamReader = java.io.InputStreamReader;

var input             = new Reader( new InputStreamReader( System.in ) );

var Game = function() {
  var that    = this;
  var board   = new Board();
  var players = [new Player('X', board), new Player('O', board)];

  that.play = function() {
    print("Play some tic tac toe.");
    print("Enter moves as x,y coordinates. For example: 0,2");
    print("Type CTL-C to quit.");

    while( !board.hasWinner() ) {
      if (board.moves() == 9) {
        board.display();
        print("The game was a tie.");
        return;
      }
      nextPlayer = players[parseInt(board.moves()%2)];
      nextPlayer.move();
    }
    board.display();
    print("Winner is " + nextPlayer.mark + ", in " + board.moves() + " moves.");
  }
}

var Player = function(mark, board) {
  var nextMove = null;
  var that     = this;

  that.mark = mark;

  that.move = function() {
    do {
      that.prompt();
      nextMove = new Move(that.mark);
    } while( !board.isValidMove( nextMove ) );

    board.move( nextMove );
  }

  that.prompt = function() {
    board.display();
    System.out.print("[" + that.mark + "]'s turn: ");
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

  var construct = function() {
    possibleMove = input.readLine();
    coordinates = possibleMove.split(',');
    if ( coordinates.length == 2 ) {
      that.x = coordinates[0].trim();
      that.y = coordinates[1].trim();
    }
  }

  construct();
}

var Board = function() {
  var that   = this;
  var board  = [ [], [], [] ];
  var moves  = 0;

  that.hasWinner = function() {
    return rowWins(0)    || rowWins(1)    || rowWins(2)    || 
           columnWins(0) || columnWins(1) || columnWins(2) || 
           diagonalWins();
  }

  that.display = function() {
    // Show the current board
    print("");
    print(" 2  " + markOrBlank(0,2) + " | " + markOrBlank(1,2) + " | " + markOrBlank(2,2));
    print("    -----------");
    print(" 1  " + markOrBlank(0,1) + " | " + markOrBlank(1,1) + " | " + markOrBlank(2,1));
    print("    -----------");
    print(" 0  " + markOrBlank(0,0) + " | " + markOrBlank(1,0) + " | " + markOrBlank(2,0));
    print("    0   1   2");
    print("");
  }

  that.move = function(move) {
    board[move.x][move.y] = move.mark;
    return moves++;
  }

  that.moves = function() {
    return moves;
  }

  that.isValidMove = function(move) {
    if (move == null) {
      return false;
    }
    if (!move.isValid()) {
      // The move wasn't valid for whatever reason
      print("Move is not valid.");
      return false;
    }
    if (that.hasWinner()) {
      // game is over
      print("The game already has a winner: " + that.winner);
      return false;
    }
    if (move.x < 0 || move.x > 2 || move.y < 0 || move.y > 2) {
      // move is out of bounds
      print("Move is out of bounds.");
      return false;
    }
    if (board[move.x] && board[move.x][move.y]) {
      // space is taken
      print("Can't move there, the space is already taken!");
      return false;
    }
    return true;
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

new Game().play();
