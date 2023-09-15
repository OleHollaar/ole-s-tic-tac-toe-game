let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let currentPlayer = 'X';
let gameOver = false;

function setup() {
  createCanvas(600,600);
  drawBoard();
}

function drawBoard() {
  background('lightgreen');
  strokeWeight(5);

  //verticale lijnen
  line(200,0,200,600);
  line(400,0,400,600);

  //horizontale lijnen
  line(600,200,0,200);
  line(600,400,0,400);

  //symbolen op het bord
textSize(64);
textAlign(CENTER, CENTER);
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let x = i * width / 3 + width / 6;
    let y = j * height / 3 + height / 6;
    let symbol = board[i][j];
    text(symbol, x, y);
  }
}
}

function checkWinner() {
//Controleer horizontale en verticale overwinning
for (let i = 0; i < 3; i++) {
  if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
    return board[i][0];
  }
  if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
    return board[0][i];
  }
}

//Controleer diagonale overwinning
if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
  return board[0][0];
}
if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
  return board[0][2];
}

//Controleer op gelijkspel
let isFull = true;
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (board[i][j] === '') {
      isFull = false;
      break;
    }
  }
}
if (isFull) {
  return 'gelijkspel';
}

return null;
}

//klik op een vakje
function mousePressed() {
if (gameOver) {
  return;
}

let i = floor(mouseX / (width / 3));
let j = floor(mouseY / (height / 3));
if (i >= 0 && i < 3 && j >= 0 && j < 3 && board[i][j] === '') {
  board[i][j] = currentPlayer;
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  drawBoard();
  
  //melding
  let winner = checkWinner();
  if (winner !== null) {
    gameOver = true;
    if (winner === 'gelijkspel') {
      alert('Gelijkspel!');
    } else {
      alert(winner + ' heeft gewonnen!');
    }
  }
}
}