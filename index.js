console.log("SCRIPT LOADED SUCCESS>.");

var myX =
  '<svg width = "46" height = "46" viewBox = "0 0 46 46" fill = "none" xmlns = "http://www.w3.org/2000/svg" ><path d="M42.1039 3L22.5519 22.552M2.99994 42.104L22.5519 22.552M22.5519 22.552L42.1039 42.104M22.5519 22.552L2.99994 3" stroke="#565656" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var myO =
  '<svg width = "59" height = "59" viewBox = "0 0 59 59" fill = "none" xmlns = "http://www.w3.org/2000/svg" ><circle cx="29.3482" cy="29.7402" r="26.2176" stroke="#565656" stroke-width="6" /></svg >';

var players = [
  { value: "X", sign: myX },
  { value: "O", sign: myO },
];
var defaultBoard = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
var elementList = [];
var totalGrid = 9;
var flagger = 0;
var winner = "";
var playerSwitch = false;
var currentPlayer = "";
var scoreBoard = {
  player_x: 0,
  player_o: 0,
};

var result = document.createElement("h1");
var player_x = document.getElementById("player_x");
var player_o = document.getElementById("player_o");
var restart_btn = document.getElementById("restart_btn");
var reset_btn = document.getElementById("reset_btn");

var getCurrentPlayer = () => {
  playerSwitch = !playerSwitch;
  return playerSwitch ? players[0] : players[1];
};

var restart_game = () => {
  console.log("restarting game..", elementList, elementList.length);
  elementList.forEach((e) => {
    e.innerHTML = "";
    e.onclick = clickFunction;
  });
  flagger = 0;
  defaultBoard = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]; //2
};

var reset_game = () => {
  console.log("resetting game...", elementList, elementList.length);
  elementList.forEach((e) => {
    e.innerHTML = "";
    e.onclick = clickFunction;
  });
  flagger = 0;
  defaultBoard = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]; //2
  scoreBoard = {
    player_x: 0,
    player_o: 0,
  };
  player_x.innerHTML = "--";
  player_o.innerHTML = "--";
};

var cleanup = (tie) => {
  if (elementList.length > 0) {
    elementList.forEach((e) => {
      e.onclick = () => {};
    });
  }
  if (!tie) {
    console.log("NOt a tie");
    if (currentPlayer.value == "X") {
      scoreBoard.player_x += 1;
      console.log(scoreBoard.player_x);
      player_x.innerHTML = scoreBoard.player_x;
      playsound("winner");
      setTimeout(() => {
        alert("X is winner");
        restart_game();
      }, 250);
    }
    if (currentPlayer.value == "O") {
      scoreBoard.player_o += 1;
      player_o.innerHTML = scoreBoard.player_o;
      playsound("winner");
      setTimeout(() => {
        alert("O is winner");
        restart_game();
      }, 250);
    }
  } else {
    setTimeout(() => {
      alert("GAME IS TIED");
      restart_game();
    }, 250);
  }
};

var checkIfWinner = () => {
  if (
    (defaultBoard[0] === defaultBoard[1] &&
      defaultBoard[1] === defaultBoard[2]) ||
    (defaultBoard[3] === defaultBoard[4] &&
      defaultBoard[4] === defaultBoard[5]) ||
    (defaultBoard[6] === defaultBoard[7] && defaultBoard[7] === defaultBoard[8])
  ) {
    cleanup((tie = false));
  } else if (
    (defaultBoard[0] === defaultBoard[3] &&
      defaultBoard[3] === defaultBoard[6]) ||
    (defaultBoard[1] === defaultBoard[4] &&
      defaultBoard[4] === defaultBoard[7]) ||
    (defaultBoard[2] === defaultBoard[5] && defaultBoard[5] === defaultBoard[8])
  ) {
    cleanup((tie = false));
  } else if (
    (defaultBoard[0] === defaultBoard[4] &&
      defaultBoard[4] === defaultBoard[8]) ||
    (defaultBoard[6] === defaultBoard[4] && defaultBoard[4] === defaultBoard[2])
  ) {
    cleanup((tie = false));
  } else {
    console.log(flagger, totalGrid);
    if (flagger == totalGrid) {
      cleanup((tie = true));
    }
  }
  return false;
};

function clickFunction(e) {
  flagger += 1;
  currentPlayer = getCurrentPlayer();
  if (currentPlayer.value == "X") {
    playsound("tic");
  } else {
    playsound("tac");
  }
  defaultBoard[parseInt(e.target.id)] = currentPlayer.value;
  // e.target.innerHTML = currentPlayer.sign
  e.target.insertAdjacentHTML("beforeend", currentPlayer.sign);

  e.target.onclick = () => {};
  console.log(defaultBoard);
  checkIfWinner();
}

function playsound(melody) {
  var path =
    "https://raw.githubusercontent.com/KaushikSathvara/tic_tac_toe/ui-update/assets/sounds/";
  var snd = new Audio(path + melody + ".wav");
  snd.play();
}

// Getting 9 different elements
for (let i = 0; i < totalGrid; i++) {
  var myElement = document.getElementById(i.toString());
  elementList[i] = myElement;
  myElement.onclick = clickFunction;
}
restart_btn.onclick = restart_game;
reset_btn.onclick = reset_game;
