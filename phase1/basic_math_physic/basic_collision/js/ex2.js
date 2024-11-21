import { Rectangle } from "../handle/Rectangle.js";

let canvas;
let context;
let gameObjects;
let oldTimeStamp = 0;
let secondsPassed;

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  createWorld();
  // Start the first frame request
  window.requestAnimationFrame(gameLoop);
}

function createWorld() {
  gameObjects = [
    new Rectangle(context, 100, 100, 100, 100, 100, 0.9),
    new Rectangle(context, 300, 300, -50, -50, 50, 0.9),
  ];
}

function detect_collision() {
  let obj1;
  let obj2;

  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].isColliding = false;
  }

  for (let i = 0; i < gameObjects.length; i++) {
    obj1 = gameObjects[i];
    for (let j = i + 1; j < gameObjects.length; j++) {
      obj2 = gameObjects[j];

      if (rectIntersect(obj1, obj2)) {
        obj1.isColliding = true;
        obj1.isColliding = true;
        handleCollision(obj1, obj2);
      }
    }
  }
}


function handleCollision(obj1, obj2) {
    // Tính độ chồng lấn giữa các hình chữ nhật
    let overlapX =
      Math.min(obj1.x + obj1.width - obj2.x, obj2.x + obj2.width - obj1.x);
    let overlapY =
      Math.min(obj1.y + obj1.height - obj2.y, obj2.y + obj2.height - obj1.y);
  
    // Chọn trục ít chồng lấn nhất
    if (overlapX < overlapY) {
      // Trục X
      if (obj1.x < obj2.x) {
        obj1.x -= overlapX / 2;
        obj2.x += overlapX / 2;
      } else {
        obj1.x += overlapX / 2;
        obj2.x -= overlapX / 2;
      }
      // Xử lý vận tốc theo trục X
      let relativeVelocityX = obj1.vx - obj2.vx;
      let restitution = Math.min(obj1.restitution, obj2.restitution);
      let impulseX = (2 * relativeVelocityX) / (obj1.mass + obj2.mass);
      obj1.vx -= impulseX * obj2.mass * restitution;
      obj2.vx += impulseX * obj1.mass * restitution;
    } else {
      // Trục Y
      if (obj1.y < obj2.y) {
        obj1.y -= overlapY / 2;
        obj2.y += overlapY / 2;
      } else {
        obj1.y += overlapY / 2;
        obj2.y -= overlapY / 2;
      }
      // Xử lý vận tốc theo trục Y
      let relativeVelocityY = obj1.vy - obj2.vy;
      let restitution = Math.min(obj1.restitution, obj2.restitution);
      let impulseY = (2 * relativeVelocityY) / (obj1.mass + obj2.mass);
      obj1.vy -= impulseY * obj2.mass * restitution;
      obj2.vy += impulseY * obj1.mass * restitution;

      document.getElementById('vx1').textContent = obj1.vx.toFixed(2);
      document.getElementById('vy1').textContent = obj1.vy.toFixed(2);
      document.getElementById('vx2').textContent = obj2.vx.toFixed(2);
      document.getElementById('vy2').textContent = obj2.vy.toFixed(2);
    }
  }
  
  
  
function rectIntersect(rect1, rect2) {
  // Check x and y for overlap
  if (
    rect1.x + rect1.width > rect2.x &&
    rect1.x < rect2.x + rect2.width &&
    rect1.y + rect1.height > rect2.y &&
    rect1.y < rect2.y + rect2.height
  ) {
    return true;
  } else return false;
}

function detectEdgeCollisions() {
  let obj;
  for (let i = 0; i < gameObjects.length; i++) {
    obj = gameObjects[i];

    if (obj.x < 0) {
      obj.vx = Math.abs(obj.vx) * obj.restitution;
      obj.x = 0;
    } else if (obj.x + obj.width > canvas.width) {
      obj.vx = -Math.abs(obj.vx) * obj.restitution;
      obj.x = canvas.width - obj.width;
    }

    if (obj.y < 0) {
      obj.vy = Math.abs(obj.vy) * obj.restitution;
      obj.y = 0;
    } else if (obj.y + obj.height > canvas.height) {
      obj.vy = -Math.abs(obj.vy) * obj.restitution;
      obj.y = canvas.height - obj.height;
    }
  }
}

function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Loop over all game objects
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update(secondsPassed);
  }
  detect_collision();
  detectEdgeCollisions();
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Do the same to draw
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].draw();
  }

  window.requestAnimationFrame(gameLoop);
}
