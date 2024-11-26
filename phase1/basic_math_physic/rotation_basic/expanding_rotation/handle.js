let canvas;
let context;
let shapes;

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

   shapes = [
    new Rectangle(context, 300, 200, 100, 50),
    new Circle(context, 100, 200, 50),
  ];

  window.addEventListener("keydown", (event) => keydown(event, shapes[0]));
  window.addEventListener("keyup", (event) => keyup(event, shapes[0]));

  window.requestAnimationFrame(gameLoop); // Start the game loop
}

// Rectangle class
class Rectangle {
  constructor(context, x, y, width, height) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width || 70;
    this.height = height || 50;
    this.direction = 1;
    this.rotation = 0;
    this.acceleration = 0;
    this.speed = 0.05;
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

// Circle class
class Circle {
  constructor(context, x, y, radius) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.direction = 1;
    this.rotation = 0;
    this.acceleration = 0;
    this.speed = 0.05;
  }

  draw() {
    this.context.save();

    this.context.translate(this.x, this.y);
    this.context.rotate(this.rotation);

    this.context.beginPath();
    this.context.arc(0, 0, this.radius, 0, Math.PI );
    this.context.fillStyle = "blue";
    this.context.fill();

    this.context.restore();
  }

  update() {
    this.speed += this.acceleration;
    if (this.speed < 0) this.speed = 0;
    this.rotation += this.direction * this.speed;
  }
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

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(let i =0;i<shapes.length;i++){
    shapes[i].update();
  }
  
  for(let i =0;i<shapes.length;i++){
    shapes[i].draw();
  }
  window.requestAnimationFrame(gameLoop);
}
