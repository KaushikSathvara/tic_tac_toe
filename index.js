
console.log("SCRIPT LOADED SUCCESS>.");

var myX = '<svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.1039 2L21.5519 21.552M1.99994 41.104L21.5519 21.552M21.5519 21.552L41.1039 41.104M21.5519 21.552L1.99994 2" stroke="#303030" stroke-opacity="0.52" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var myO = '<svg width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30.0011" cy="29.2612" r="27.7176" stroke="#303030" stroke-opacity="0.52" stroke-width="3"/></svg>';


var players = [{value:"X", sign:myX}, {value:"O",sign:myO}]
var defaultBoard = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
var elementList = []
var totalGrid = 9
var flagger = 0
var winner = ''
var playerSwitch = false
var currentPlayer = ''
var scoreBoard = {
    player_x: 0,
    player_o: 0
}

var result = document.createElement('h1')
var player_x = document.getElementById("player_x")
var player_o = document.getElementById("player_o")
var restart_btn = document.getElementById('restart_btn')
var reset_btn = document.getElementById('reset_btn')



var getCurrentPlayer = () => {
    playerSwitch = !playerSwitch
    return playerSwitch ? players[0] : players[1]
}


var restart_game = () => {
    console.log("restarting game..",elementList.length);
    if (elementList.length > 0) {
        elementList.forEach((e) => {
            e.innerHTML =''
        })
    }
    elementList = []
    defaultBoard = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'] //2
}


var reset_game = () => {
    if (elementList.length > 0) {
        elementList.forEach((e) => {
            e.innerHTML =''
        })
    }
    scoreBoard = {
        player_x: 0,
        player_o: 0
    }
    elementList = []
    defaultBoard = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'] //2

}

var cleanup = (tie) => {
    if (elementList.length > 0) {
        elementList.forEach((e) => {
            e.onclick = () => { }
        })
    }
    if(!tie){
        
        if(currentPlayer.value == "X") {
            scoreBoard.player_x += 1
            console.log(scoreBoard.player_x);
            player_x.innerHTML = scoreBoard.player_x
        }
        if(currentPlayer.value == "O") {
            scoreBoard.player_o += 1
            player_o.innerHTML = scoreBoard.player_o
        }
    }
}


var checkIfWinner = () => {
    if (
        (defaultBoard[0] === defaultBoard[1] && defaultBoard[1] === defaultBoard[2]) ||
        (defaultBoard[3] === defaultBoard[4] && defaultBoard[4] === defaultBoard[5]) ||
        (defaultBoard[6] === defaultBoard[7] && defaultBoard[7] === defaultBoard[8])) {
        cleanup("Winner is " + currentPlayer.value)
        
    } else if (
        (defaultBoard[0] === defaultBoard[3] && defaultBoard[3] === defaultBoard[6]) ||
        (defaultBoard[1] === defaultBoard[4] && defaultBoard[4] === defaultBoard[7]) ||
        (defaultBoard[2] === defaultBoard[5] && defaultBoard[5] === defaultBoard[8])) {
        cleanup("Winner is " + currentPlayer.value)
    } else if (
        (defaultBoard[0] === defaultBoard[4] && defaultBoard[4] === defaultBoard[8]) ||
        (defaultBoard[6] === defaultBoard[4] && defaultBoard[4] === defaultBoard[2])) {
        cleanup("Winner is " + currentPlayer.value)
    } else {
        if (flagger == totalGrid) {
            cleanup(tie=true)
        }
    }
    return false
}


function clickFunction(e) {
    flagger += 1
    currentPlayer = getCurrentPlayer()
    defaultBoard[parseInt(e.target.id)] = currentPlayer.value
    // e.target.innerHTML = currentPlayer.sign
    e.target.insertAdjacentHTML( 'beforeend', currentPlayer.sign );

    e.target.onclick = () => { }
    console.log(defaultBoard);
    checkIfWinner()
}



// Getting 9 different elements
for (let i = 0; i < totalGrid; i++) {
    var myElement = document.getElementById((i).toString()) 
    elementList[i] = myElement
    myElement.onclick = clickFunction
}
// restart_btn.onclick = restart_game;
// reset_btn.onclick = reset_game;



