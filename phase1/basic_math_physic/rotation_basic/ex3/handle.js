let canvas;
let context;
let shapes;
let mouseX;
let mouseY;
let rect;

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  rect = new Rectangle(context, 400, 250, 150, 20, 0.05);
  window.addEventListener("mousemove", (event)=>updateRotationToMouse(event,rect));
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

function updateRotationToMouse(event) {
  const mouseX = event.clientX - canvas.offsetLeft; // Tọa độ x của chuột trên canvas
  const mouseY = event.clientY - canvas.offsetTop; // Tọa độ y của chuột trên canvas
  console.log(mouseX);

  // Tính toán sự chênh lệch giữa vị trí hình chữ nhật và chuột
  const dx = mouseX - rect.x;
  const dy = mouseY - rect.y;

  // Tính toán góc quay từ hình chữ nhật đến chuột bằng hàm atan2
  rect.rotation = Math.atan2(dy, dx); // Góc quay từ hình chữ nhật đến chuột
}

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  //   for (let i = 0; i < shapes.length; i++) {
  //     shapes[i].update();
  //   }

  rect.draw();

  window.requestAnimationFrame(gameLoop);
}
