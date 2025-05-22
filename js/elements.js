'use strict'

var coordsArr = []
var cnt = 0

const SMILY_NORMAL =  `<img class="smily"  onclick="restart(${gLevel.SIZE},${gLevel.MINES})" src="img/smily normal.png"/>`
const SMILY_GLASSES = `<img class="smily"  onclick="restart(${gLevel.SIZE},${gLevel.MINES})" src="img/glasses.png"/>`
const SMILY_EXPLODE = `<img class="smily"  onclick="restart(${gLevel.SIZE},${gLevel.MINES})" src="img/explode .png"/>`
const SMILY_THINK = `<img class="smily"    src="img/thinking smily.png"/>`

function showLives(){
    var elDisplay = document.querySelector('.display span')
    elDisplay.innerHTML = `${gGame.lives} LIVES LEFT`
}
function showSmily(){
    var elSmily = document.querySelector('.button')
    elSmily.innerHTML = (gGame.isVictory)? SMILY_GLASSES:(gGame.isOn)? SMILY_NORMAL : SMILY_EXPLODE
}
function showThinkingSmily(i,j){
    if(!gGame.isOn) return
    if(gBoard[i][j].isRevealed)return
    var elSmily = document.querySelector('.button')
    elSmily.innerHTML = SMILY_THINK
}
function hintClicked(elBulb){
    if(elBulb.style.backgroundColor === 'yellow') return
    if(!gGame.isOn) return
    elBulb.style.backgroundColor = 'yellow'
    gGame.isHint = true
}
function handleHint(idx,jdx){
    setTimeout(() => {
        hideNegs(negsArr)
    }, 1500);
    showNegs(idx,jdx)
    gGame.isHint = false
}
function hideHintColor(){
    var elHint = document.querySelectorAll('.hint')
    for(var i = 0 ; elHint.length > i ; i++){
        var hint = elHint[i]
        hint.style.backgroundColor= 'antiquewhite'
    }
}
function showDisplay(){
    var elDisplay = document.querySelector('.display span')
    var msg = (gGame.isVictory)? 'You Won!!!':'You Lost!!!'
    elDisplay.innerHTML = msg
    if(!gGame.isVictory) showAllMines()
}
function showHints(){
    var elHint = document.querySelectorAll('.hint')
    for(var i = 0 ; elHint.length > i ; i++){
        var hint = elHint[i]
        hint.style.display = 'block'
    }
}
function showMegaHint(){
    var elMegaHint = document.querySelector('.megaHint')
    elMegaHint.style.display = 'block'
}
function onMegaHint(){
    gGame.isMegaHint = true
}
function handleMegaHint(elCell,i,j){
    if(2>cnt){
        var cellLocation = {i,j}
        coordsArr.push(cellLocation)
        cnt++
    }if(cnt===2){
        gGame.isMegaHint=false
        createArea(coordsArr)
        coordsArr=[]
        cnt=0
    }  
}
function createArea(startStopArr){
    var startCell = startStopArr[0]
    var stopCell = startStopArr[1]
    var startI = Math.min(startCell.i,stopCell.i)
    var stopI = Math.max(startCell.i,stopCell.i)
    var startJ = Math.min(startCell.j,stopCell.j)
    var stopJ = Math.max(startCell.j,stopCell.j)
    setTimeout(() => {
        hideArea(startI,stopI,startJ,stopJ)
        hideMegaHint()
        
        
    }, 2000);
    revealArea(startI,stopI,startJ,stopJ)
}
function revealArea(startI,stopI,startJ,stopJ){
    for(var i = startI;stopI>=i;i++){
        for(var j=startJ;stopJ>=j;j++){
            var cell = gBoard[i][j]
            cell.isRevealed = true
            var value = (cell.isMine)? MINE : (cell.minesAround)? cell.minesAround : EMPTY
            renderCell({i,j},value)
        }
    }  
}
function hideArea(startI,stopI,startJ,stopJ){
    for(var i = startI;stopI>=i;i++){
        for(var j=startJ;stopJ>=j;j++){
            var cell = gBoard[i][j]
            cell.isRevealed = false
            renderCell({i,j},EMPTY)
        }
    }  
}
function hideMegaHint(){
    var elMegaHint = document.querySelector('.megaHint')
    elMegaHint.style.display = 'none'
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
  
  
 