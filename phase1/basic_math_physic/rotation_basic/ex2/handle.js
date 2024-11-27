let canvas;
let context;
let shapes;

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  shapes = [new Rectangle(context, 400, 250, 150, 20, 0.05)];
  window.requestAnimationFrame(gameLoop); // Start the game loop
}

// Rectangle class
class Rectangle {
  constructor(context, x, y, width, height, speed) {
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
    this.context.fillRect(0, 0, this.width, this.height);

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
