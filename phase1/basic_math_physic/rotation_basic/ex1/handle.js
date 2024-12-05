let canvas;
let context;
let shapes;

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  shapes = [
    new Rectangle(context, 400, 200, 100, 50,0.05),
    new Rectangle(context, 100, 200, 100, 50,0.02),
    new Rectangle(context, 250, 200, 100, 50,0.1),
    new Rectangle(context, 550, 200, 100, 50,0.08),
  ];

  window.addEventListener("keydown", (event) => keydown(event, shapes[0]));
  window.addEventListener("keyup", (event) => keyup(event, shapes[0]));

  window.requestAnimationFrame(gameLoop); // Start the game loop
}

// Rectangle class
class Rectangle {
  constructor(context, x, y, width, height,speed) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width || 70;
    this.height = height || 50;
    this.direction = 1;
    this.rotation = 0;
    this.acceleration = 0;
    this.speed = speed;
  }

  draw() {
    this.context.save();

    this.context.translate(this.x, this.y);
    this.context.rotate(this.rotation);

    this.context.fillStyle = "green";
    this.context.fillRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    this.context.restore();
  }

  update() {
    this.speed += this.acceleration;
    if (this.speed < 0) this.speed = 0;
    this.rotation += this.direction * this.speed;
  }
}



function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].update();
  }

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].draw();
  }
  window.requestAnimationFrame(gameLoop);
}
function keydown(event, shape) {
  switch (event.key) {
    case "ArrowUp":
      shape.acceleration += 0.005;
      break;
    case "ArrowDown":
      shape.acceleration -= 0.005;
      break;
    case "ArrowLeft":
      shape.direction = -1;
      break;
    case "ArrowRight":
      shape.direction = 1;
      break;
    default:
      break;
  }
}

function keyup(event, shape) {
  switch (event.key) {
    case "ArrowUp":
    case "ArrowDown":
      shape.acceleration = 0;
      break;
    default:
      break;
  }
}