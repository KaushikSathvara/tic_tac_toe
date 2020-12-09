
console.log("SCRIPT LOADED SUCCESS>.");
var players = ["X", "O"]
var winningCondition = [["0", '0', '0']]
var defaultBoard = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'] //2
var elementList = []
var totalGrid = 3 * 3
var flagger = 0
var winner = ''
var playerSwitch = false
var currentPlayer = ''
var result = document.createElement('h1')

var getCurrentPlayer = () => {
    playerSwitch = !playerSwitch
    return playerSwitch ? players[0] : players[1]
}

var cleanup = (resultString) => {
    if (elementList.length > 0) {
        elementList.forEach((e) => {
            e.onclick = () => { }
        })
    }

    result.innerHTML = resultString
    document.getElementById('result').appendChild(result)
}

var checkIfWinner = () => {
    if (
        (defaultBoard[0] === defaultBoard[1] && defaultBoard[1] === defaultBoard[2]) ||
        (defaultBoard[3] === defaultBoard[4] && defaultBoard[4] === defaultBoard[5]) ||
        (defaultBoard[6] === defaultBoard[7] && defaultBoard[7] === defaultBoard[8])) {
        cleanup("Winner is " + currentPlayer)
    } else if (
        (defaultBoard[0] === defaultBoard[3] && defaultBoard[3] === defaultBoard[6]) ||
        (defaultBoard[1] === defaultBoard[4] && defaultBoard[4] === defaultBoard[7]) ||
        (defaultBoard[2] === defaultBoard[5] && defaultBoard[5] === defaultBoard[8])) {
        cleanup("Winner is " + currentPlayer)
    } else if (
        (defaultBoard[0] === defaultBoard[4] && defaultBoard[4] === defaultBoard[8]) ||
        (defaultBoard[6] === defaultBoard[4] && defaultBoard[4] === defaultBoard[2])) {
        cleanup("Winner is " + currentPlayer)
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
    defaultBoard[parseInt(e.target.id)] = currentPlayer
    e.target.innerHTML = currentPlayer
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




