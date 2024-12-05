let canvas;
let context;
let gameObjects = [];
let currentFrame = 0;

class GameObject {
  constructor(context, x, y, vx, vy, mass) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.mass = mass;
    this.isColliding = false;
    this.restitution = 0.9; // Độ đàn hồi (giảm tốc sau va chạm)
  }
}

class Circle extends GameObject {
  static numColumns = 5;
  static numRows = 2;
  static frameWidth = 0;
  static frameHeight = 0;
  static sprite = null;

  constructor(context, x, y, vx, vy, mass) {
    super(context, x, y, vx, vy, mass);
    this.radius = 30; // Bán kính hitbox
    this.currentFrame = 0; // Frame hiện tại
    this.loadImage();
  }

  loadImage() {
    if (!Circle.sprite) {
      Circle.sprite = new Image();
      Circle.sprite.onload = () => {
        Circle.frameWidth = Circle.sprite.width / Circle.numColumns;
        Circle.frameHeight = Circle.sprite.height / Circle.numRows;
      };
      Circle.sprite.src = "../img/sprite_animation.webp"; // Sprite URL
    }
  }

draw() {
  if (!Circle.sprite) return;

  let maxFrame = Circle.numColumns * Circle.numRows - 1;
  if (this.currentFrame > maxFrame) {
    this.currentFrame = 0;
  }

  let column = this.currentFrame % Circle.numColumns;
  let row = Math.floor(this.currentFrame / Circle.numColumns);

  // Xoay hình ảnh và vẽ sprite
  this.context.save(); // Lưu trạng thái ban đầu
  this.context.translate(this.x, this.y); // Chuyển đến vị trí đối tượng
  this.context.rotate((Math.PI / 180) * this.angle); // Xoay theo góc
  this.context.translate(-this.x, -this.y); // Quay lại vị trí gốc

  this.context.drawImage(
    Circle.sprite,
    column * Circle.frameWidth,
    row * Circle.frameHeight,
    Circle.frameWidth,
    Circle.frameHeight,
    this.x - this.radius,
    this.y - this.radius - this.radius * 0.4,
    this.radius * 2,
    this.radius * 2.42
  );

  this.context.restore(); // Khôi phục trạng thái ban đầu

  // Vẽ hitbox
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  this.context.lineWidth = 2;
  this.context.strokeStyle = "red";
  this.context.stroke();
}


  update(secondsPassed) {
    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;
    let radians = Math.atan2(this.vy, this.vx);
    this.angle = 180 * radians / Math.PI;
    // Bật ngược khi chạm biên
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.vx = -this.vx;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.vy = -this.vy;
    }
    if(this.isColliding){
      this.currentFrame++;
    }
  }
}

function detectCollision() {
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].isColliding = false;
  }

  for (let i = 0; i < gameObjects.length; i++) {
    let obj1 = gameObjects[i];
    for (let j = i + 1; j < gameObjects.length; j++) {
      let obj2 = gameObjects[j];

      if (circleIntersect(obj1, obj2)) {
        obj1.isColliding = true;
        obj2.isColliding = true;
        handleCollision(obj1, obj2);
      }
    }
  }
}

function circleIntersect(cir1, cir2) {
  let squareDistance =
    (cir1.x - cir2.x) * (cir1.x - cir2.x) +
    (cir1.y - cir2.y) * (cir1.y - cir2.y);

  return (
    squareDistance <= (cir1.radius + cir2.radius) * (cir1.radius + cir2.radius)
  );
}

function handleCollision(obj1, obj2) {
  let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
  let distance = Math.sqrt(vCollision.x * vCollision.x + vCollision.y * vCollision.y);
  let vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance };
  let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
  let speed =
    vRelativeVelocity.x * vCollisionNorm.x +
    vRelativeVelocity.y * vCollisionNorm.y;

  if (speed < 0) return;

  let impulse = (2 * speed) / (obj1.mass + obj2.mass);

  obj1.vx -= impulse * obj2.mass * vCollisionNorm.x;
  obj1.vy -= impulse * obj2.mass * vCollisionNorm.y;
  obj2.vx += impulse * obj1.mass * vCollisionNorm.x;
  obj2.vy += impulse * obj1.mass * vCollisionNorm.y;
}

function createWorld() {
  gameObjects = [
    new Circle(context, 100, 100, 100, 30, 1),
    new Circle(context, 300, 200, -40, -50, 1),
    new Circle(context, 50, 50, 100, 150, 1),
    new Circle(context, 100, 50, 70, 70, 1),
    new Circle(context, 400, 300, -70, 100, 1),
  ];
}

function gameLoop(timestamp) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  let secondsPassed = 0.016; // Giả lập thời gian mỗi frame (60 FPS)

  detectCollision();

  gameObjects.forEach((obj) => {
    obj.update(secondsPassed);
    obj.draw();
  });

  requestAnimationFrame(gameLoop);
}

window.onload = init;
function init(){
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  createWorld();
  requestAnimationFrame(gameLoop);
};
