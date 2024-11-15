const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const gravity = 0.5;

let ball = {
  position: { x: 200, y: 50 }, // Starting near the top
  velocity: { x: 2, y: 0 }, // Initial velocity
  radius: 20, // Size of the ball
  color: "blue",
};


function drawBall(ball) {
  context.beginPath();
  context.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = ball.color;
  context.fill();
  context.closePath();
}

function applyGravity(ball) {
  ball.velocity.y += gravity;

  ball.position.x += ball.velocity.x;
  ball.position.y += ball.velocity.y;
}

function checkCollision(ball) {
  // Check if ball hits the bottom of the canvas
  if (ball.position.y + ball.radius > canvas.height) {
    // Reverse the velocity to simulate a bounce
    ball.velocity.y *= -0.7; // 0.7 to lose energy each bounce
    ball.position.y = canvas.height - ball.radius; // Keep the ball above the floor
  }
  if (ball.position.x + ball.radius > canvas.width) {
    ball.position.x = canvas.width - ball.radius;
  }
}

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  drawBall(ball);
  applyGravity(ball);
  checkCollision(ball);

  requestAnimationFrame(gameLoop); // Continue the loop
}

function controlBall(event) {
  switch (event.key) {
    case "ArrowUp":
      // Make the ball "jump" by setting a negative y velocity
      ball.velocity.y = -10;
      break;
    case "ArrowLeft":
      // Move the ball left by adjusting x velocity
      ball.velocity.x = Math.max(ball.velocity.x - 1, -5); // Limit left speed
      break;
    case "ArrowRight":
      // Move the ball right by adjusting x velocity
      ball.velocity.x = Math.min(ball.velocity.x + 1, 5); // Limit right speed
      break;
    default:
      break;
  }
}

function stopBall(event) {
  switch (event.key) {
    case "ArrowRight":
    case "ArrowLeft":
      ball.velocity.x = 0;
  }
}

gameLoop();
document.addEventListener("keydown", controlBall);
document.addEventListener("keyup", stopBall);
