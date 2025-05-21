'use strict'

 

var gBoard

var time

var gTimeInterval




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

             lives:3,

             isHint:false,

             secPassed:0,

             safeClick:{isSafeClick:false,safeClicks:3},

             isDarkMode:true

}

 

function restart(SIZE,MINES){

    gLevel.SIZE = SIZE

    gLevel.MINES = MINES

    gGame.lives = 3

    gGame.safeClick.safeClicks = 3

    gGame.markedCount = 0

    hideHintColor()

    gGame.revealedCount = 0

    onInit()

}

 

manageModes()

 

function onInit(){

      gGame.isVictory = false

      gGame.isOn = true

      gBoard = buildBoard()

      addMines()

      renderBoard()

      showLives()

      startTime()

      showSmily()

      showHints()

      showSafeClick()

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

    if(gGame.safeClick.isSafeClick)return

 

    if(gGame.isHint) handleHint(i,j)

 

    var cellClicked=gBoard[i][j]

 

    if(cellClicked.isRevealed)return

 

    if(cellClicked.isMarked)return

 

    if(cellClicked.isMine)return handleMineClicked(elCell,i,j)

    if(!cellClicked.minesAround) handleEmptyCellClicked(elCell,i,j)

 

    handleCellClicked(elCell,i,j)

 

}

 

 

 

function onCellRightClicked(ev,elCell,i,j){

 

    if(!gGame.isOn) return

    if(gGame.safeClick.isSafeClick)return

 

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

    gGame.markedCount++

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

    stopTime()

 

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

 

function showAllMines(){

  for(var i=0;gBoard.length>i;i++){

    for(var j=0;gBoard[i].length>j;j++){

        var cell = gBoard[i][j]

        var cellLocation = {i,j}

        if(cell.isMine){

          cell.isRevealed = true

          renderCell(cellLocation,MINE)

          }

      }

}

 

}

 

function startTime(){

  stopTime()

  time = Date.now()

  gTimeInterval=setInterval(renderTime,100)

}

function renderTime(){

  var currTime = Date.now()

  var diff = currTime - time

  gGame.secPassed = diff

  var elTimer = document.querySelector('.timer span')

  elTimer.innerHTML = (gGame.secPassed/1000).toFixed(3)

}

 

function stopTime(){

  clearInterval(gTimeInterval)

}

 

function handleEmptyCellClicked(elCell,idx,jdx){

    for(var i=idx-1;idx+1>=i;i++){

 

        if(0>i||i>=gBoard.length) continue

 

        for(var j=jdx-1;jdx+1>=j;j++){

 

            if(0>j||j>=gBoard[i].length)continue

 

            if(i===idx&&j===jdx) continue

 

             if(!gBoard[i][j].isMine){

              if(gBoard[i][j].isRevealed)return

              var negsCell = gBoard[i][j]

              var negsCellLoc = {i,j}

              negsCell.isRevealed = true

              gGame.revealedCount++

              var value = (negsCell.minesAround)? negsCell.minesAround : EMPTY  

              renderCell(negsCellLoc,value)

             }

            }

      }

}

 

function showSafeClick(){

  var elSafeClick = document.querySelector('.safeClick')

  elSafeClick.style.display = 'block'

}

 

function onSafeClick(){

  if(!gGame.isOn) return

  if(0>=gGame.safeClick.safeClicks)return

  gGame.safeClick.safeClicks--

  gGame.safeClick.isSafeClick = true

  handleSafeClick()

}

 

function handleSafeClick(){

  var safeCells = getSafeCells()

  var randSafeCellIdx = getRandInt(0,safeCells.length)

  var randSafeCell = safeCells[randSafeCellIdx]

  safeCells.splice(randSafeCellIdx,1)

  addSafeCell(randSafeCell)

}

 

function getSafeCells(){

  var safeCells = []

    for(var i=0;gLevel.SIZE>i;i++){

        for(var j=0;gLevel.SIZE>j;j++){

            var cell = gBoard[i][j]

            var cellLocation = {i,j}

            if(!cell.isMine&&!cell.isRevealed) safeCells.push(cellLocation)

        }

 

    }

    return safeCells

}

 

function addSafeCell(safeCellLocation){

  setTimeout(() => {

 

    gGame.safeClick.isSafeClick = false

    renderCell(safeCellLocation,EMPTY)

 

}, 1500);

 

renderCell(safeCellLocation,EMPTY)

}

 

function manageModes(){

  // gGame.isDarkMode = !gGame.isDarkMode

  // if(gGame.isDarkMode)handleDarkMode()

  // else handleLightMode()

  // var elButton = document.querySelector('.changeMode span')

  // elButton.innerHTML = (gGame.isDarkMode)? 'Turn to LIGHTMODE' : 'Turn to DARKMODE'

}

function handleLightMode(){

  var elBody = document.querySelector('body')

  elBody.style.backgroundColor = 'antiquewhite'

}

function handleDarkMode(){

  var elBody = document.querySelector('body')

  elBody.style.backgroundColor = 'rgb(36, 37, 38)'

}

 