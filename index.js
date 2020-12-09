
console.log("SCRIPT LOADED SUCCESS>.");

var myX = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.9302 2.06976L8 8M2.06976 13.9302L8 8M8 8L13.9302 13.9302M8 8L2.06976 2.06976" stroke="#1E5944" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var myO = '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="13.5" stroke="#1E5944" stroke-width="3"/></svg>';


var players = [{value:"X", sign:myX}, {value:"O",sign:myO}]
var winningCondition = [["0", '0', '0']]
var defaultBoard = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'] //2
var elementList = []
var totalGrid = 3 * 3
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

var cleanup = (resultString) => {
    if (elementList.length > 0) {
        elementList.forEach((e) => {
            e.onclick = () => { }
        })
    }
    result.innerHTML = resultString
    console.log(currentPlayer.value);
    if(currentPlayer.value == "X") {
        scoreBoard.player_x += 1
        console.log(scoreBoard.player_x);
        player_x.innerHTML = scoreBoard.player_x
    }
    if(currentPlayer.value == "O") {
        scoreBoard.player_o += 1
        player_o.innerHTML = scoreBoard.player_o
    }
    // document.getElementById('result').appendChild(result)
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
            cleanup("GAME IS Tie")
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



