var Move = require('move');

var Player = function(mark) {
  var nextMove = null;
  var that     = this;

  that.mark = mark;
  that.move = function(board) {
    do {
      board.display();
      java.lang.System.out.print("[" + that.mark + "]'s turn: ");
      nextMove = new Move( that.mark );
    } while( !board.play( nextMove ) );
  }
}

module.exports = Player;

