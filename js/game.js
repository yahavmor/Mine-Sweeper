'use strict'

var gBoard

const MINE =`<img class="element" src="img/Mine.png"/>`

const RED_FLAG =`<img class="element" src="img/Red_Flag.png"/>`

const EMPTY = ''

 

var gLevel = {MINES : 2,

              SIZE : 4

             }

 

var gGame = {isOn:false,

             isFirstClick:true,

             isVictory:false,

             markedCount:0,

             revealedCount:0,

             lives:1,

             isHint:false,

   

}

 

function restart(){

    gGame.lives = 1

    gGame.markedCount = 0

    gGame.revealedCount = 0

    onInit()

}

 

function onInit(){
    hideHintColor()


      showLives()

      gGame.isVictory = false

      gGame.isOn = true

      showSmily()

      gBoard = buildBoard()

      addMines()

      renderBoard()


}

 

function buildBoard(){

    var board = []

    for(var i=0;gLevel.SIZE>i;i++){

        board[i] = []

        for(var j=0;gLevel.SIZE>j;j++){

            var cell =  {isMine:false,

                         isRevealed:false,

                         isMarked:false,

                         minesAround:0

                        }

            board[i][j] = cell                                    

            }

 

    }

return board

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

    if(cellClicked.isMarked)return

    if(cellClicked.isMine)return handleMineClicked(elCell,i,j)

    handleCellClicked(elCell,i,j)

}

 

function onCellRightClicked(ev,elCell,i,j){

    if(!gGame.isOn) return

    ev.preventDefault()

    var cellClicked = gBoard[i][j]

    var cellLocation = {i,j}

    if(cellClicked.isRevealed) return

    if(cellClicked.isMarked){

        renderCell(cellLocation,EMPTY)

        cellClicked.isMarked = false

        gGame.markedCount--

    }else{

        renderCell(cellLocation,RED_FLAG)

        cellClicked.isMarked = true

        gGame.markedCount++

    }  

checkVictory()

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

    var cellClicked = gBoard[i][j]

    cellClicked.isRevealed = true

    gGame.revealedCount++      

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

    showDisplay()

    showSmily()

}

function checkVictory(){

    var cellsOnBoard = gLevel.SIZE**2

    var minesOnBoard = gLevel.MINES

    if(gGame.markedCount===gLevel.MINES&&gGame.revealedCount===cellsOnBoard-minesOnBoard){

       gGame.isVictory =true

       gameOver()

    }

}

function handleCellClicked(elCell,i,j){

    var cellLocation = {i,j}

    var cellClicked = gBoard[i][j]

    cellClicked.isRevealed = true

    gGame.revealedCount++

    if(!cellClicked.minesAround) renderCell(cellLocation,EMPTY)

    else renderCell(cellLocation,cellClicked.minesAround)

    checkVictory()

}

function showCell(arr){
    for(var i = 0 ; arr.length > i ; i++){
        var negsCellLoc = arr[i]
        var negsCell = gBoard[negsCellLoc.i][negsCellLoc.j]
        negsCell.isRevealed = true
        var value = (negsCell.isMine)? MINE : (negsCell.minesAround)? negsCell.minesAround : EMPTY
        renderCell(negsCellLoc,value)
    }
}


 
 

 