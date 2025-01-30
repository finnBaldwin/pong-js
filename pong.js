// Select the canvas and context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Create the ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speedX: 4,
  speedY: 4,
  color: 'white',
};

// Create the paddles
const paddleWidth = 10;
const paddleHeight = 80;

const leftPaddle = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: 'white',
  speed: 0,
};

const rightPaddle = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: 'white',
  speed: 0,
};

// Draw a rectangle on the canvas (for paddles)
function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// Draw the ball on the canvas
function drawBall(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

// Draw the game (paddles and ball)
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the paddles and ball
  drawRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, leftPaddle.color);
  drawRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, rightPaddle.color);
  drawBall(ball.x, ball.y, ball.radius, ball.color);
}

// Update the ball's position
function updateBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Ball collision with top and bottom walls
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
  }

  // Ball collision with paddles
  if (
    (ball.x - ball.radius < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) ||
    (ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height)
  ) {
    ball.speedX = -ball.speedX;
  }

  // Ball out of bounds (reset position)
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = -ball.speedX;
  }
}

// Update the paddles' positions
function updatePaddles() {
  leftPaddle.y += leftPaddle.speed;
  rightPaddle.y += rightPaddle.speed;

  // Prevent paddles from going off-screen
  if (leftPaddle.y < 0) leftPaddle.y = 0;
  if (leftPaddle.y + leftPaddle.height > canvas.height) leftPaddle.y = canvas.height - leftPaddle.height;

  if (rightPaddle.y < 0) rightPaddle.y = 0;
  if (rightPaddle.y + rightPaddle.height > canvas.height) rightPaddle.y = canvas.height - rightPaddle.height;
}

// Control paddles with keyboard input
function keyDownHandler(e) {
  if (e.key === 'ArrowUp') rightPaddle.speed = -4;
  if (e.key === 'ArrowDown') rightPaddle.speed = 4;
  if (e.key === 'w') leftPaddle.speed = -4;
  if (e.key === 's') leftPaddle.speed = 4;
}

function keyUpHandler(e) {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') rightPaddle.speed = 0;
  if (e.key === 'w' || e.key === 's') leftPaddle.speed = 0;
}

// Event listeners for controlling paddles
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Game loop
function gameLoop() {
  draw();
  updateBall();
  updatePaddles();
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();

