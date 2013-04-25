var System            = java.lang.System;
var Reader            = java.io.BufferedReader;
var InputStreamReader = java.io.InputStreamReader;
var input             = new Reader( new InputStreamReader( System.in ) );

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

module.exports = Move
