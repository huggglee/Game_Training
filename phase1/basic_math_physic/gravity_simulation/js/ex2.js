const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const gravity = 0.5;

let balls = [
  {
    position: { x: 200, y: 30 }, // Starting near the top
    velocity: { x: 2, y: 0 }, // Initial velocity
    radius: 20, // Size of the ball
    color: "blue",
  },
  {
    position: { x: 250, y: 50 }, // Starting near the top
    velocity: { x: 2, y: 0 }, // Initial velocity
    radius: 20, // Size of the ball
    color: "red",
  },
  {
    position: { x: 100, y: 80 }, // Starting near the top
    velocity: { x: 2, y: 0 }, // Initial velocity
    radius: 10, // Size of the ball
    color: "gray",
  },
  {
    position: { x: 300, y: 100 }, // Starting near the top
    velocity: { x: 2, y: 0 }, // Initial velocity
    radius: 20, // Size of the ball
    color: "green",
  },
];

function drawBalls(balls) {
  balls.forEach((ball) => {
    context.beginPath();
    context.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
  });
}

function applyGravity(balls) {
  balls.forEach((ball) => {
    ball.velocity.y += gravity;

    ball.position.x += ball.velocity.x;
    ball.position.y += ball.velocity.y;
  });
}

function checkCollision(balls) {
  balls.forEach((ball) => {
    if (ball.position.y + ball.radius > canvas.height) {
      // Reverse the velocity to simulate a bounce
      ball.velocity.y *= -0.7; // 0.7 to lose energy each bounce
      ball.position.y = canvas.height - ball.radius; // Keep the ball above the floor
    }

    if (ball.position.y - ball.radius < 0) {
      ball.position.y = 0;
    }
    if (ball.position.x + ball.radius > canvas.width) {
      ball.position.x = canvas.width - ball.radius;
    }
    if (ball.position.x - ball.radius < 0) {
      ball.position.x = 0;
    }
  });
}

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  drawBalls(balls);
  applyGravity(balls);
  checkCollision(balls);

  requestAnimationFrame(gameLoop); // Continue the loop
}

gameLoop();
