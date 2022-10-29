let  gameBoard = (() => {
  // might delete this soon
  let board = () => ["X","O","X","X","O","O","X","X","O"];

  let markerChoiceState = "";
  return {
    board,
    markerChoiceState,
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

// If clicked add an x
(function() {
  let container = document.querySelector(".container");

  for (let i = 0; i < container.children.length; i++) {
    container.children[i].addEventListener('click', (e) => {
      console.log(`box${i+1} clicked!`)

      if (container.children[i].textContent === "") {
        container.children[i].textContent = gameBoard.markerChoiceState
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
ideas:
-I may be able to combine the 3 anonymous functions
-possibly add if else statement to for X's and O'x
 when adding event listeners to grid

1. Done
2. Done
3. Done
4. Build functions that allow players to add marks
    if clicked add an X
    add 2 buttons, X and O
      tap one(X or O) 
        then save it to put on square
        once tapped reset for a new tap
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