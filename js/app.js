"use strict";

var gBoard;

const SMILY_NORMAL = `<img class="smily"  onclick="restart()" src="img/smily normal.png"/>`;

const SMILY_GLASSES = `<img class="smily"  onclick="restart()" src="img/glasses.png"/>`;

const SMILY_EXPLODE = `<img class="smily"  onclick="restart()" src="img/explode .png"/>`;

const SMILY_THINK = `<img class="smily"    src="img/thinking smily.png"/>`;

const MINE = `<img class="element" src="img/Mine.png"/>`;

const RED_FLAG = `<img class="element" src="img/Red_Flag.png"/>`;

const EMPTY = "";

var gLevel = {
  MINES: 2,

  SIZE: 4,
};
var gGame = {
  isOn: false,

  isFirstClick: true,

  isVictory: false,

  markedCount: 0,

  revealedCount: 0,

  lives: 3,

  isHint: false,
};
function restart() {
  gGame.lives = 3;

  gGame.markedCount = 0;

  gGame.revealedCount = 0;

  onInit();
}
function onInit() {
  showLives();

  gGame.isVictory = false;

  gGame.isOn = true;

  showSmily();

  gBoard = buildBoard();

  addMines();

  renderBoard();
}
function renderBoard(board){

    var strHTML = ''

    var elBoard = document.querySelector('.board')

    for (var i=0;gLevel.SIZE>i;i++){

        strHTML+=`<tr>`

        for(var j=0;gLevel.SIZE>j;j++){

            var negsCnt = checkNegsCount(i,j)

            var className = getClassName(i,j)

            gBoard[i][j].minesAround = negsCnt

            strHTML+=`<td class="cell ${className}

                     "oncontextmenu="onCellRightClicked(event,this,${i},${j})"

                      onmouseenter="showThinkingSmily(${i},${j})"

                      onmouseleave="showSmily()"

                      onclick="onCellClicked(this,${i},${j})">

                      </td>`

                  }

    strHTML+=`</tr>`

    }

elBoard.innerHTML = strHTML

}
function onCellClicked(elCell,i,j){

    if(!gGame.isOn) return

    if(gGame.isHint) handleHint(i,j)

    var cellClicked=gBoard[i][j]

    if(cellClicked.isRevealed)return

    if(cellClicked.isMine)return handleMineClicked(elCell,i,j)

    handleCellClicked(elCell,i,j)

}
function onCellRightClicked(ev,elCell,i,j){

    if(!gGame.isOn) return

    ev.preventDefault()

    var cellClicked = gBoard[i][j]

    var cellLocation = {i,j}

    if(cellClicked.isRevealed&&!cellClicked.isMine) return

    if(cellClicked.isMarked){

      var value = (cellClicked.isMine)? MINE : EMPTY

      if(value===MINE) renderCell(cellLocation,MINE)

      else if(value) renderCell(cellLocation,EMPTY)

      else renderCell(cellLocation,value)

      gGame.markedCount--

      elCell.style.backgroundColor = 'antiquewhite'

      cellClicked.isMarked=false

    }else{cellClicked.isMarked=true

          renderCell(cellLocation,RED_FLAG)

          gGame.markedCount++

        }

checkGameOver()

}    
function checkNegsCount(idx,jdx){

    var negsCnt = 0

    for(var i=idx-1;idx+1>=i;i++){

        if(0>i||i>=gBoard.length) continue

        for(var j=jdx-1;jdx+1>=j;j++){

            if(0>j||j>=gBoard[i].length)continue

            if(i===idx&&j===jdx) continue

             if(gBoard[i][j].isMine)negsCnt++

            }

      }

return negsCnt

}
function addMines(){

    var emptyCells = getEmptyCells()

    for(var i=0;gLevel.MINES>i;i++){

        var randIdx = getRandInt(0,emptyCells.length)

        var randCell = emptyCells[randIdx]

        gBoard[randCell.i][randCell.j].isMine = true

        emptyCells.splice(randIdx,1)

      }

}
function handleMineClicked(elCell,i,j){

    var mineLocation = {i,j}

    gBoard[i][j].isRevealed = true      

    renderCell(mineLocation,MINE)

    gGame.lives--

    showLives()

    if(!gGame.lives){

        gGame.isVictory = false

        gameOver()

      }

}
function gameOver(){

    gGame.isOn=false

  var elDisplay = document.querySelector('.display span')

  var msg = (gGame.isVictory)? 'You Won!!!':'You Lost!!!'

  elDisplay.innerHTML = msg

  showSmily()

}
function checkGameOver(){

  if(gGame.markedCount===gLevel.MINES&&gGame.revealedCount===(gLevel.SIZE**2)-gLevel.MINES){

     gGame.isVictory =true

     gameOver()

  }

}
function handleCellClicked(elCell,i,j){

  var cellLocation = {i,j}

  var negsCnt = checkNegsCount(i,j)

  gBoard[i][j].isRevealed = true

  gGame.revealedCount++

  if(!negsCnt)negsCnt=EMPTY

  renderCell(cellLocation,negsCnt)

  checkGameOver()

}
function showLives(){

  var elDisplay = document.querySelector('.display span')

  elDisplay.innerHTML = `${gGame.lives} LIVES LEFT`

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
function showSmily(){

  var elSmily = document.querySelector('.button')

  elSmily.innerHTML = (gGame.isVictory)? SMILY_GLASSES:(gGame.isOn)? SMILY_NORMAL : SMILY_EXPLODE

}
function showThinkingSmily(i,j){

  if(gBoard[i][j].isRevealed)return

  var elSmily = document.querySelector('.button')

  elSmily.innerHTML = SMILY_THINK

}
function renderCell(location,value){

    var cell=gBoard[location.i][location.j]

    var selcector = `.cell-${location.i}-${location.j}`

    var elCell = document.querySelector(selcector)

    elCell.innerHTML = value

    if(cell.isMarked){

          elCell.style.backgroundColor = 'orange'

    }

    if(cell.isMine){

          if(cell.isMarked) return

          elCell.style.backgroundColor = 'red'

    }

    if(cell.isRevealed){

          if(cell.isMine)return

          else elCell.style.backgroundColor = 'darkgray'

    }else elCell.style.backgroundColor = 'antiquewhite'            

}
function getClassName(i,j){

    return `cell-${i}-${j}`

}
function hintClicked(elBulb){

    elBulb.style.backgroundColor = 'yellow'

    gGame.isHint = true

}
function handleHint(idx,jdx){

    setTimeout(() => {

          gGame.isHint = false

          hideNegs(idx,jdx)

          console.log('hint over!!!')

    }, 1500);

    showNegs(idx,jdx)

   

}
function showNegs(idx,jdx){

    var cellClicked = gBoard[idx][jdx]

    for(var i=idx-1;idx+1>=i;i++){

          if(0>i||i>=gBoard.length) continue

          for(var j=jdx-1;jdx+1>=j;j++){

              if(0>j||j>=gBoard[i].length)continue

              var negsCell = gBoard[i][j]

              negsCell.isRevealed = true

              var location = {i,j}

              if(negsCell.isMine)renderCell(location,MINE)

              else renderCell(location,negsCell.minesAround)

          }

    }

}
function hideNegs(idx,jdx){

    var cellClicked = gBoard[idx][jdx]

    for(var i=idx-1;idx+1>=i;i++){

          if(0>i||i>=gBoard.length) continue

          for(var j=jdx-1;jdx+1>=j;j++){

              if(0>j||j>=gBoard[i].length)continue

              var negsCell = gBoard[i][j]

              negsCell.isRevealed = false

              var location = {i,j}

              renderCell(location,EMPTY)

          }

    }

}

