// Set number of rows and columns
var numberOfColumns = 7;
var numberOfRows = 6;

// Create a board of 6*7 filled with 0s
var board = Array(numberOfRows)
  .fill(0)
  .map(() => Array(numberOfColumns).fill(0));

// Handle the players order
const handleOrder = () => {
  const orderEl = document.getElementById("header");
  if (orderEl.textContent === "Player - 1") {
    orderEl.textContent = "Player - 2";
  } else orderEl.textContent = "Player - 1";
};

// Handle the click on the board
const handleClick = (id) => {
  const clickedCell = document.getElementById(id).querySelector("div");
  document.getElementById(id).querySelector("div");
  const orderEl = document.getElementById("header");

  const row = parseInt(id / numberOfColumns);
  const column = id % numberOfColumns;

  if (board[row][column] === 0) {
    if (orderEl.textContent === "Player - 1") {
      clickedCell.style.display = "block";
      clickedCell.style.backgroundColor = "#34c471";

      board[row][column] = 1;
    } else {
      clickedCell.style.display = "block";
      clickedCell.style.backgroundColor = "#df3670";

      board[row][column] = 2;
    }

    if (checkWinner(row, column)) {
      setTimeout(() => {
        alert(`Player ${board[row][column]} wins!`);
        resetGame();
      }, 200);
    } else if (checkDraw()) {
      setTimeout(() => {
        alert("It's a draw!");
        resetGame();
      }, 200);
    }
    handleOrder();
  }
};

// Check for the winner
const checkWinner = (row, column) => {
  const player = board[row][column];

  return (
    checkDirection(row, column, 1, 0, player) || // Moves vertically
    checkDirection(row, column, 0, 1, player) || // Moves horizontally
    checkDirection(row, column, 1, 1, player) || // Moves topLeft-bottomRight
    checkDirection(row, column, 1, -1, player) // Moves topRight-bottomLeft
  );
};

// Check player moves in 4 directions
const checkDirection = (row, column, rowIncrement, colIncrement, player) => {
  let countCells = 1;

  // Count the cells in one direction
  countCells += countCellsInDirection(
    row,
    column,
    rowIncrement,
    colIncrement,
    player
  );

  // Count the cells in the opposite to above direction
  countCells += countCellsInDirection(
    row,
    column,
    -rowIncrement,
    -colIncrement,
    player
  );

  return countCells === 4;
};

// Count player moves in one direction
const countCellsInDirection = (
  row,
  column,
  rowIncrement,
  colIncrement,
  player
) => {
  let counter = 0;

  // Does not count the last clicked cell
  let r = row + rowIncrement;
  let c = column + colIncrement;

  while (
    r >= 0 &&
    r < numberOfRows &&
    c >= 0 &&
    c < numberOfColumns &&
    board[r][c] === player
  ) {
    counter++;
    r += rowIncrement;
    c += colIncrement;
  }
  return counter;
};

// Reset the game
const resetGame = () => {
  // Set board array to 0
  board = Array(numberOfRows)
    .fill(0)
    .map(() => Array(numberOfColumns).fill(0));
  // Set board divs to display none
  const cells = document.querySelectorAll(".board-item div");
  cells.forEach((cell) => (cell.style.display = "none"));

  // Set header to "Player - 1"
  const orderEl = document.getElementById("header");
  orderEl.textContent = "Player - 1";
};

// Check if it is draw
const checkDraw = () => {
  return board.every((row) => row.every((cell) => cell !== 0));
};
