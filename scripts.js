let gameBoard = (() => {
  // All the defaults
  let board = ["","","","","","","","",""];

  let markerChoiceState = "X";
  let turnsCount = 0;
  let tableEnabled = false;
  let mode = "";
  let startBtnToggle = true;
  let scores = [3, 2, 3, 2, 4, 2, 3, 2, 3];
  let indexOfMissing = 0;
  return {
    board,
    markerChoiceState,
    turnsCount,
    tableEnabled,
    mode,
    startBtnToggle,
    scores,
    indexOfMissing
  }
})();

// Winning/Losing logic
let correct = (() => {

  let result = (board,marker) => 
    board[0] === `${marker}` && board[1] === `${marker}` && board[2] === `${marker}` ||
    board[3] === `${marker}` && board[4] === `${marker}` && board[5] === `${marker}` ||
    board[6] === `${marker}` && board[7] === `${marker}` && board[8] === `${marker}` ||
    board[0] === `${marker}` && board[3] === `${marker}` && board[6] === `${marker}` ||
    board[1] === `${marker}` && board[4] === `${marker}` && board[7] === `${marker}` ||
    board[2] === `${marker}` && board[5] === `${marker}` && board[8] === `${marker}` ||
    board[0] === `${marker}` && board[4] === `${marker}` && board[8] === `${marker}` ||
    board[2] === `${marker}` && board[4] === `${marker}` && board[6] === `${marker}`;

  return {result}
})();

// If clicked add an x and displays board
(function() {
  let container = document.querySelector(".container");
  let warningElem = document.querySelector(".warning")
  let player1 = document.getElementById("player1")
  let player2 = document.getElementById("player2")

  for (let i = 0; i < container.children.length; i++) {
    container.children[i].addEventListener('click', (e) => {

      if (container.children[i].textContent === "" && gameBoard.tableEnabled && gameBoard.mode === "player") {
        container.children[i].textContent = gameBoard.markerChoiceState
        gameBoard.board[i] = gameBoard.markerChoiceState

        gameBoard.turnsCount++;

        if (correct.result(gameBoard.board, gameBoard.markerChoiceState) && container.children[i].textContent != "") {
          gameBoard.tableEnabled = false
          console.log("first")

          if (gameBoard.markerChoiceState === "X") {
            warningElem.textContent = `${player1.value} wins!`
          } else if (gameBoard.markerChoiceState === "O") {
            warningElem.textContent = `${player2.value} wins!`
          }
        } else if (gameBoard.turnsCount === 9) {

          warningElem.textContent = "TIE"
        }

        if (gameBoard.markerChoiceState === "X") {
          gameBoard.markerChoiceState = "O"
        } else if (gameBoard.markerChoiceState === "O") {
          gameBoard.markerChoiceState = "X"
        }
      }
    });
  }
})();

// Start menu
(function() {
  let player1 = document.getElementById("player1")
  let player1Display = document.getElementById("player1-display")
  let player2 = document.getElementById("player2")
  let player2Display = document.getElementById("player2-display")
  let startBtn = document.querySelector(".start-btn")
  let container = document.querySelector(".container");
  let warningElem = document.querySelector(".warning")
  let cpuBtn = document.querySelector(".cpu-btn")

  // Events after start button clicked
  startBtn.addEventListener('click', (e) => {
    if (player1.value === "" || player2.value === "") {
      warningElem.textContent = "Please enter player names/name"
    } else {
      if (gameBoard.startBtnToggle) {
        gameBoard.tableEnabled = true;
        gameBoard.mode = "player"

        warningElem.textContent = ""
  
        player1.style.display = "none";
        player2.style.display = "none";
        cpuBtn.style.display = "none";
  
        player1Display.textContent = player1.value
        player2Display.textContent = player2.value
  
        startBtn.textContent = "Restart"
        gameBoard.startBtnToggle = false;
      } else if (!gameBoard.startBtnToggle) {
        gameBoard.board = ["","","","","","","","",""];
        gameBoard.markerChoiceState = "X";
        gameBoard.turnsCount = 0;
        gameBoard.tableEnabled = false;
        gameBoard.mode = "";
        gameBoard.startBtnToggle = true;
        gameBoard.scores = [3, 2, 3, 2, 4, 2, 3, 2, 3];
        gameBoard.indexOfMissing = 0;

        warningElem.textContent = "Enter Player names or play CPU"
  
        // Reset Xs and Os on table
        for (let i = 0; i < container.children.length; i++) {
          container.children[i].textContent = ""; 
        }
  
        player1.style.display = "";
        player2.style.display = "";
  
        player1Display.textContent = ""
        player2Display.textContent = ""
  
        player1.value = ""
        player2.value = ""
        cpuBtn.style.display = "";
  
        startBtn.textContent = "Pass & Play"
        console.log("startBtn")
        gameBoard.startBtnToggle = true;
      }
    }
  })

})();

// CPU Start Menu
(function () {
  let cpuBtn = document.querySelector(".cpu-btn")
  let player1 = document.getElementById("player1")
  let player1Display = document.getElementById("player1-display")
  let player2 = document.getElementById("player2")
  let player2Display = document.getElementById("player2-display")
  let startBtn = document.querySelector(".start-btn")
  let container = document.querySelector(".container");
  let warningElem = document.querySelector(".warning")

  // Events after 'Play CPU' button clicked
  cpuBtn.addEventListener('click', (e) => {

    if (gameBoard.startBtnToggle) {
      gameBoard.tableEnabled = true;
      gameBoard.mode = "cpu"

      cpuMatch.run()

      // warningElem.textContent = "";

      player1.style.display = "none";
      player2.style.display = "none";
      cpuBtn.style.display = "none";

      player1.value = "Player 1"
      player1Display.textContent = player1.value

      player2.value = "CPU"
      player2Display.textContent = player2.value

      startBtn.textContent = "Restart"
      gameBoard.startBtnToggle = false;
    } else if (!gameBoard.startBtnToggle) {
      gameBoard.board = ["","","","","","","","",""];
      gameBoard.markerChoiceState = "X";
      gameBoard.turnsCount = 0;
      gameBoard.tableEnabled = false;
      gameBoard.mode = "";
      gameBoard.startBtnToggle = true;
      gameBoard.scores = [3, 2, 3, 2, 4, 2, 3, 2, 3];
      gameBoard.indexOfMissing = 0;

      warningElem.textContent = "Enter player names or play CPU"

      // Reset Xs and Os on table
      for (let i = 0; i < container.children.length; i++) {
        container.children[i].textContent = ""; 
      }

      player1.style.display = "";
      player2.style.display = "";
      cpuBtn.style.display = "";

      player1Display.textContent = ""
      player2Display.textContent = ""

      player1.value = ""
      player2.value = ""

      startBtn.textContent = "Pass & Play"
      gameBoard.startBtnToggle = true;
    }
  })
})();

let closeStates = (() => {
  let rowsColsDia = [{index0: gameBoard.board[0],index1: gameBoard.board[1],index2: gameBoard.board[2]},
  {index3: gameBoard.board[3],index4: gameBoard.board[4],index5: gameBoard.board[5]},
  {index6: gameBoard.board[6],index7: gameBoard.board[7],index8: gameBoard.board[8]},
  {index0: gameBoard.board[0],index3: gameBoard.board[3],index6: gameBoard.board[6]},
  {index1: gameBoard.board[1],index4: gameBoard.board[4],index7: gameBoard.board[7]},
  {index2: gameBoard.board[2],index5: gameBoard.board[5],index8: gameBoard.board[8]},
  {index0: gameBoard.board[0],index4: gameBoard.board[4],index8: gameBoard.board[8]},
  {index2: gameBoard.board[2],index4: gameBoard.board[4],index6: gameBoard.board[6]}]

  let findState = () => {
    let hasTwoSameMarkers = false;

    for (let i = 0; i < rowsColsDia.length; i++) {
      if(Object.values(rowsColsDia[i]).join('') === "XX" || Object.values(rowsColsDia[i]).join('') === "OO") {
        hasTwoSameMarkers = true;

        for (let j = 0; j < 3; j++) {
          if (rowsColsDia[i][Object.keys(rowsColsDia[i])[j]] == "") {
            gameBoard.indexOfMissing = Number(Object.keys(rowsColsDia[i])[j].slice(-1));
            break;
          }
        }
      }
    }

    return hasTwoSameMarkers
  }

  return {
    findState,
  }
});

// CPU Match logic
let cpuMatch = (() => {
  let run = () => {
    let container = document.querySelector(".container");
    let warningElem = document.querySelector(".warning")

    function random2() {
      return Math.floor(Math.random() * 2)
    }
    let choice = random2()

    let startCPUMatch = (() => {
      for (let i = 0; i < container.children.length; i++) {

        container.children[i].addEventListener('click', (e) => {
    
          // My X's logic
          if (container.children[i].textContent === "" && gameBoard.tableEnabled && gameBoard.mode === "cpu") {
            container.children[i].textContent = gameBoard.markerChoiceState
            gameBoard.board[i] = gameBoard.markerChoiceState
            gameBoard.scores[i] = null

            if (closeStates().findState()) {
              gameBoard.scores[gameBoard.indexOfMissing] += 10
            }
    
            gameBoard.turnsCount++;
            gameBoard.markerChoiceState = "O";
    
            // checking results
            if (correct.result(gameBoard.board, gameBoard.markerChoiceState) && container.children[i].textContent != "") {
              warningElem.textContent = "X wins";
              gameBoard.tableEnabled = false
            } else if (gameBoard.turnsCount === 9) {
              warningElem.textContent = "TIE";
              gameBoard.tableEnabled = false
            }
          }

          // CPU O's logic, CPU delay for a natural look
          setTimeout(() => {
            cpuTurn.run()
          }, 500)
        });
      }
    })

    if (gameBoard.mode == "cpu" && choice == 1) {
      warningElem.textContent = "Player 1 first";

      // The actual running of the match
      startCPUMatch()
    } else if (gameBoard.mode == "cpu" && choice == 0) {
      // CPU O's logic, CPU delay for a natural look
      warningElem.textContent = "CPU first";
      gameBoard.markerChoiceState = "O"
      cpuTurn.run()

      // The actual running of the match
      startCPUMatch()
    }
  }
  return {
    run
  }
})();

let cpuTurn = (() => {
  let run = () => {

    let container = document.querySelector(".container");
    let warningElem = document.querySelector(".warning");

    if (gameBoard.tableEnabled && gameBoard.mode === "cpu") {
  
      let high = Math.max(...gameBoard.scores)
      let index = gameBoard.scores.indexOf(high);

      if (!!container.children[index] && container.children[index].textContent == "" && gameBoard.markerChoiceState == "O") {

        if (gameBoard.turnsCount == 3 &&
          ((gameBoard.board[0] == 'X' && gameBoard.board[8]) ||
          (gameBoard.board[2] == 'X' && gameBoard.board[6]))) {
            
          container.children[1].textContent = "O"
          gameBoard.board[1] = "O"
          gameBoard.scores[1] = null
          
        } else {
          container.children[index].textContent = "O"
          gameBoard.board[index] = "O"
          gameBoard.scores[index] = null
          
        }

        if (closeStates().findState()) {
          // Priotize a win over a save
          gameBoard.scores[gameBoard.indexOfMissing] += 15
        }

        gameBoard.turnsCount++;
        gameBoard.markerChoiceState = "X";

        // checking results
        if (correct.result(gameBoard.board, "O")) {
          warningElem.textContent = "O wins";
          gameBoard.tableEnabled = false
        } else if (gameBoard.turnsCount === 9) {
          warningElem.textContent = "TIE";
          gameBoard.tableEnabled = false
        }
      }
    }
  }

  return {
    run
  }
})();