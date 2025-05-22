'use strict'

var negsArr

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
function showNegs(idx,jdx){
    negsArr = []
    var cellClicked = gBoard[idx][jdx]
    for(var i=idx-1;idx+1>=i;i++){
        if(0>i||i>=gBoard.length) continue
        for(var j=jdx-1;jdx+1>=j;j++){
            if(0>j||j>=gBoard[i].length)continue
            var negsCell = gBoard[i][j]
            var negsCellLoc = {i,j}
            if(negsCell.isRevealed||negsCell.isMarked) continue
            negsArr.push(negsCellLoc)
        }
    }
showCell(negsArr)
}
function hideNegs(arr){
    for(var i = 0 ; arr.length > i ; i++){
        var negsCellLoc = arr[i]
        var negsCell = gBoard[negsCellLoc.i][negsCellLoc.j]
        negsCell.isRevealed = false
        renderCell(negsCellLoc,EMPTY)
    }
}

 

 
