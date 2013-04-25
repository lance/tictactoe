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

module.exports = Board;
