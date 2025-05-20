'use strict'

function getRandInt(min,max){

      var min = Math.ceil(min)

      var max = Math.floor(max)

      return Math.floor(Math.random()*(max-min)+min)

}

function getClassName(i,j){

      return `cell-${i}-${j}`

}

function getEmptyCells(){

    var emptyCells = []

    for(var i=0;gLevel.SIZE>i;i++){

        for(var j=0;gLevel.SIZE>j;j++){

            var cell = {i,j}

            emptyCells.push(cell)

        }

    }

return emptyCells

}

function renderCell(location,value){

    var cell = gBoard[location.i][location.j]

    var selcector = `.cell-${location.i}-${location.j}`

    var elCell = document.querySelector(selcector)

    elCell.innerHTML = value

    if(cell.isRevealed){

      elCell.style.backgroundColor = (gBoard[location.i][location.j].isMine)? 'red':'darkgrey'    

    }else elCell.style.backgroundColor = 'antiquewhite'            

}


 