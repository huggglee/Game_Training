const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Gravity acceleration (in pixels per frame squared)
const gravity = 0.5;

// Object properties
let ball1 = {
  position: { x: 200, y: 50 }, // Starting near the top
  velocity: { x: 2, y: 0 }, // Initial velocity
  radius: 20, // Size of the ball
  color: "blue",
};

let ball2 = {
  position: { x: 200, y: 50 }, // Starting near the top
  velocity: { x: 2, y: 0 }, // Initial velocity
  radius: 20, // Size of the ball
  color: "red",
};

function drawBall(ball) {
  context.beginPath();
  context.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = ball.color;
  context.fill();
  context.closePath();
}

function applyGravity(ball) {
  // Apply gravity to the velocity
  ball.velocity.y += gravity;

  // Update position by the velocity
  ball.position.x += ball.velocity.x;
  ball.position.y += ball.velocity.y;
  //   ball.velocity.y -= 0.1;
}

function airResistance(ball) {
  ball.velocity.y -= 0.3;
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

  applyGravity(ball1);
  checkCollision(ball1);

  applyGravity(ball2);
  checkCollision(ball2);

  airResistance(ball2);

  drawBall(ball1);
  drawBall(ball2);

  requestAnimationFrame(gameLoop); // Continue the loop
}

gameLoop();
