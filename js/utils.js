'use strict'

function buildBoard() {
    var board = [];
  
    for (var i = 0; gLevel.SIZE > i; i++) {
      board[i] = [];
  
      for (var j = 0; gLevel.SIZE > j; j++) {
        var cell = {
          isMine: false,
  
          isRevealed: false,
  
          isMarked: false,
  
          minesAround: 0,
        };
  
        board[i][j] = cell;
      }
    }
  
    return board;
}
function getRandInt(min,max){

    var min = Math.ceil(min)

    var max = Math.floor(max)

    return Math.floor(Math.random()*(max-min)+min)

}
