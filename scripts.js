let  gameBoard = (() => {
  let board = ["","","","","","","","",""];

  let markerChoiceState = "X";
  let turnsCount = 0;
  let tableEnabled = false;
  return {
    board,
    markerChoiceState,
    turnsCount,
    tableEnabled
  }
})();

let Player = () => {
  return {}
}

// Wining/Losing logic
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

      if (container.children[i].textContent === "" && gameBoard.tableEnabled) {
        container.children[i].textContent = gameBoard.markerChoiceState
        gameBoard.board[i] = gameBoard.markerChoiceState

        gameBoard.turnsCount++;

        // working on single character match
        if (correct.result(gameBoard.board, gameBoard.markerChoiceState) && container.children[i].textContent != "") {

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

// Change X and O state with buttons
(function() {
  let xBtn = document.querySelector(".x-btn")
  let oBtn = document.querySelector(".o-btn")

  xBtn.addEventListener('click', () => {
    gameBoard.markerChoiceState = "X";
  })

  oBtn.addEventListener('click', () => {
    gameBoard.markerChoiceState = "O";
  })
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

  let startBtnToggle = true

  startBtn.addEventListener('click', (e) => {
    if (player1.value === "" || player2.value === "") {
      warningElem.textContent = "Please enter player names/name"
    } else {
      if (startBtnToggle) {
        gameBoard.tableEnabled = true;

        warningElem.textContent = ""
  
        player1.style.display = "none";
        player2.style.display = "none";
  
        player1Display.textContent = player1.value
        player2Display.textContent = player2.value
  
        startBtn.textContent = "Restart"
        startBtnToggle = false;
      } else if (!startBtnToggle) {
        gameBoard.tableEnabled = false;
        gameBoard.board = ["","","","","","","","",""];
        gameBoard.markerChoiceState = "X";
        gameBoard.turnsCount = 0;

        warningElem.textContent = "Enter Player names"
  
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
  
        startBtn.textContent = "Start"
        startBtnToggle = true;
      }
    }
  })

})();

/*
ideas:
-start with just 'start' button
  and player1/player 2 form for names
 then make X & O buttons appear
 at the end(tie or win), display result
  and have the 'restart' button

1. Done
2. Done
3. Done
4. Done
5. Done
6. Clean up interface
    allow to put names each player
    start/reset game button
    congrats thing for winning player
      pop up
      or animation
      or "Congrats {User} you win!" text
      etc.
7. create AI to play agaisnt CPU
    a. make computer do random legal moves
    b. make computer unbeatable
        use the minimax algorithm

later:
-make it look real clean with css

*/