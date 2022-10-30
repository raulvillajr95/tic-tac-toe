let  gameBoard = (() => {
  // might delete this soon
  let board = ["","","","","","","","",""];

  let markerChoiceState = "";
  let turnsCount = 0;
  return {
    board,
    markerChoiceState,
    turnsCount
  }
})();

let Player = () => {
  return {}
}

// Displays board to .container
// (function() {
//   let container = document.querySelector(".container");

//   for (let i = 0; i < container.children.length; i++) {
//     container.children[i].textContent = gameBoard.board()[i];
//   }
// })();

let correct = (() => {

  let result = (board,marker) => 
    board[0] === `${marker}` && board[4] === `${marker}` ||
    board[1] === `${marker}` && board[3] === `${marker}`;

  return {result}
})();

/*
Winning places for 4x4
-["X","X","","",""]
-["","","","X","X"]
-["X","","","X",""]
-["","X","","","X"]
-["X","","","","X"]
-["","X","","X",""]
*/

// If clicked add an x
(function() {
  let container = document.querySelector(".container");

  for (let i = 0; i < container.children.length; i++) {
    container.children[i].addEventListener('click', (e) => {

      if (container.children[i].textContent === "") {
        container.children[i].textContent = gameBoard.markerChoiceState
        gameBoard.board[i] = gameBoard.markerChoiceState

        gameBoard.turnsCount++;

        // working on single character match
        if (correct.result(gameBoard.board, gameBoard.markerChoiceState) && container.children[i].textContent != "") {

          console.log(`${gameBoard.markerChoiceState}'s won!`)
        } else if (gameBoard.turnsCount === 9) {
          console.log("Tie")
        }
      }

      gameBoard.markerChoiceState = ""
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

/*
Winning places on board:
-["X","X","X","","","","","",""]
-["","","","X","X","X","","",""]
-["","","","","","","X","X","X"]
-["X","","","X","","","X","",""]
-["","X","","","X","","","X",""]
-["","","X","","","X","","","X"]
-["X","","","","X","","","","X"]
-["","","X","","X","","X","",""]
-also for Os ⬆️
-the empty stops can be anything

*/

/*
ideas:
-I may be able to combine the 3 anonymous functions
-possibly add if else statement to for X's and O'x
 when adding event listeners to grid

1. Done
2. Done
3. Done
4. Done
5. Logic for game over
    3 in a row
    tie
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