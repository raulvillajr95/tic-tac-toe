let gameBoard = (() => {
  let board = ["","","","","","","","",""];

  let markerChoiceState = "X";
  let turnsCount = 0;
  let tableEnabled = false;
  let mode = "";
  return {
    board,
    markerChoiceState,
    turnsCount,
    tableEnabled,
    mode
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

      if (container.children[i].textContent === "" && gameBoard.tableEnabled && gameBoard.mode === "player") {
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
        gameBoard.mode = "player"

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
        gameBoard.mode = ""

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
  
        startBtn.textContent = "Start"
        startBtnToggle = true;
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

  // change to cpuBtnToggle
  let startBtnToggle = true

  cpuBtn.addEventListener('click', (e) => {
    if (player1.value === "") {
      warningElem.textContent = "Please enter player 1 name"
    } else {
      if (startBtnToggle) {
        gameBoard.tableEnabled = true;
        gameBoard.mode = "cpu"

        cpuMatch.run()

        warningElem.textContent = ""
  
        player1.style.display = "none";
        player2.style.display = "none";
  
        player1Display.textContent = player1.value

        player2.value = "CPU"
        player2Display.textContent = player2.value
  
        startBtn.textContent = "Restart"
        startBtnToggle = false;
      } else if (!startBtnToggle) {
        gameBoard.tableEnabled = false;
        gameBoard.board = ["","","","","","","","",""];
        gameBoard.markerChoiceState = "X";
        gameBoard.turnsCount = 0;
        gameBoard.mode = "";

        warningElem.textContent = "Enter player names or play CPU"
  
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

// CPU Match logic
let cpuMatch = (() => {
  let run = () => {
    let container = document.querySelector(".container");

    if (gameBoard.mode = "cpu") {
      for (let i = 0; i < container.children.length; i++) {
        console.log("CPU")

        container.children[i].addEventListener('click', (e) => {
    
          // My X's logic
          if (container.children[i].textContent === "" && gameBoard.tableEnabled && gameBoard.mode === "cpu") {
            container.children[i].textContent = gameBoard.markerChoiceState
            gameBoard.board[i] = gameBoard.markerChoiceState

            console.log("X's logic")
    
            gameBoard.turnsCount++;
    
            // checking results
            if (correct.result(gameBoard.board, gameBoard.markerChoiceState) && container.children[i].textContent != "") {
              console.log("o wins")
            } else if (gameBoard.turnsCount === 9) {
    
              console.log("TIE")
            }
          }

          /////// CPU O's logic
          let choice = (() => Math.floor(Math.random() * 9))();
          console.log(choice)
          console.log(choice)
          // choice = Math.floor(Math.random() * 9);
          console.log(choice)
          console.log(choice)

          if (gameBoard.tableEnabled && gameBoard.mode === "cpu") {
            while (true) {
  
              console.log(choice)
  
              choice = Math.floor(Math.random() * 9);
  
              if (container.children[choice].textContent == "") {
                container.children[choice].textContent = "O"
                gameBoard.board[choice] = "O"

                gameBoard.turnsCount++;

                // checking results
                if (correct.result(gameBoard.board, "O") && container.children[choice].textContent != "") {
                  console.log("O wins")
                } else if (gameBoard.turnsCount === 9) {
        
                  console.log("TIE")
                }
  
                break;

              } else if (container.children[choice].textContent !== "") {
                if (gameBoard.turnsCount == 9) {
                  break;
                }
                choice = Math.floor(Math.random() * 9);
              }
            }
          }
        });
      }
    }
  }
  return {
    run
  }
})();

/*
ideas:
-after my X, place a random O
  randomly in any of the boxes left
    i could do a while loop
      while place filled, new choice and
      run again pick another random spot

1. Done
2. Done
3. Done
4. Done
5. Done
6. Done
7. create AI to play agaisnt CPU
    a. make computer do random legal moves
    b. make computer unbeatable
        use the minimax algorithm

later:
-make it look real clean with css
-when playing CPU randomly choose who goes first

*/