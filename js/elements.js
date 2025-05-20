'use strict'


const SMILY_NORMAL =  `<img class="smily"  onclick="restart()" src="img/smily normal.png"/>`

const SMILY_GLASSES = `<img class="smily"  onclick="restart()" src="img/glasses.png"/>`

const SMILY_EXPLODE = `<img class="smily"  onclick="restart()" src="img/explode .png"/>`

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
    if(!gGame.isOn) return

    elBulb.style.backgroundColor = 'yellow'

    gGame.isHint = true

}

function handleHint(idx,jdx){

      setTimeout(() => {

            gGame.isHint = false

            hideNegs(negsArr)

      }, 1500);

      showNegs(idx,jdx)

     

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

}

 