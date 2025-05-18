'use strict'

var gBoard
const SMILY_NORMAL =  `<img class="smily"  onclick="restart()" src="img/smily normal.png"/>`
const SMILY_GLASSES = `<img class="smily"  onclick="restart()" src="img/glasses.png"/>`
const SMILY_EXPLODE = `<img class="smily"  onclick="restart()" src="img/explode .png"/>`
const SMILY_THINK = `<img class="smily"    src="img/thinking smily.png"/>`
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
             lives:3    
}

function restart(){
    gGame.lives = 3
    gGame.markedCount = 0
    gGame.revealedCount = 0
    onInit()
}

function onInit(){
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
            gBoard[i][j].minesAround = negsCnt
            strHTML+=`<td class="cell"oncontextmenu="onCellRightClicked(event,this,${i},${j})" onclick="onCellClicked(this,${i},${j})"></td>`
        }
    strHTML+=`</tr>`
    }
elBoard.innerHTML = strHTML
}

function onCellClicked(elCell,i,j){
    if(!gGame.isOn) return
    var cellClicked=gBoard[i][j]
    if(cellClicked.isRevealed)return
    if(cellClicked.isMine)return handleMineClicked(elCell)
    handleCellClicked(elCell,i,j)
    console.log('gGame.markedCount-',gGame.markedCount)
    console.log('gGame.revealedCount',gGame.revealedCount)
}

function onCellRightClicked(ev,elCell,i,j){
    if(!gGame.isOn) return
    ev.preventDefault()
    var cellClicked = gBoard[i][j]
    if(cellClicked.isRevealed) return
    if(cellClicked.isMarked){
        cellClicked.isMarked=false
        elCell.innerHTML = EMPTY
        gGame.markedCount--
        elCell.style.backgroundColor = 'antiquewhite'
    }else{cellClicked.isMarked=true
          elCell.innerHTML = RED_FLAG
          gGame.markedCount++
          elCell.style.backgroundColor = 'orange'
        }
        console.log('gGame.markedCount-',gGame.markedCount)
        console.log('gGame.revealedCount',gGame.revealedCount)
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

function getRandInt(min,max){
    var min = Math.ceil(min)
    var max = Math.floor(max)
    return Math.floor(Math.random()*(max-min)+min)
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

function handleMineClicked(elCell){
    elCell.innerHTML = MINE
    elCell.style.backgroundColor = 'red'
    gGame.lives--
    showLives()
    if(!gGame.lives){
        gGame.isVictory = false
        gameOver()
    }
}

function gameOver(){
    console.log('game over')
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
    var negsCnt = checkNegsCount(i,j)
    gBoard[i][j].isRevealed = true
    gGame.revealedCount++
    elCell.innerHTML = (gBoard[i][j].minesAround)? negsCnt:EMPTY
    elCell.style.backgroundColor = 'green'
    checkGameOver()
}

function showLives(){
    var elDisplay = document.querySelector('.display span')
    elDisplay.innerHTML = `${gGame.lives} LIVES LEFT`
    console.log('eee')
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
