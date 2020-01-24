console.log(
  "Your JS is linked up. Be the person you needed when you were little."
);

/*----- constants -----*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*----- app's state (variables) -----*/

let board;
let mark = "X";
let win;

// win =
//   board[0] && board[0] === board[1] && board[0] === board[2] ? board[0] : null;

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll("#board div"));

let messages = document.querySelector("h2");

/*----- event listeners -----*/

squares.forEach((square) => {
  square.addEventListener("click", markSquare);
});

document
  .getElementById("reset-button")
  .addEventListener("click", initializaGame);

/*----- functions -----*/

function initializaGame() {
  board = ["", "", "", "", "", "", "", "", ""];

  render();
}

initializaGame();

function render() {
  board.forEach((squareOfBoard, index) => {
    //this sets the text content of the square of the same position to the mark on the board.
    squares[index].textContent = squareOfBoard;
  });

  setMessageOfWhosTurnItIsOrWhoWon(mark);
}

function markSquare(event) {
  let idx = squares.findIndex((square) => {
    return square === event.target;
  });
  board[idx] = mark;
  mark = mark === "X" ? "O" : "X";
  setMessageOfWhosTurnItIsOrWhoWon(mark);
  win = getWinner();

  render();
}

function setMessageOfWhosTurnItIsOrWhoWon(turn) {
  //   let messages = document.querySelector("h2");
  //   messages.textContent = `It's ${turn}'s turn!`;
  messages.textContent =
    win === "T"
      ? `That's a tie, queen!`
      : win
      ? `${win} wins the game!`
      : `It's ${turn}'s turn!`;
}

function getWinner() {
  let winner = null;
  winningCombos.forEach((combo, index) => {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = board[combo[0]];
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}
