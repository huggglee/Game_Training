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
    new Rectangle(context, 100, 100, 150, 70, 100, 0.9),
    new Rectangle(context, 400, 300, -100, -50, 50, 0.9),
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
        obj2.isColliding = true;
        handleCollision(obj1, obj2);
      }
    }
  }
}

function handleCollision(obj1, obj2) {
  let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
  let distance = Math.sqrt(
    (obj2.x - obj1.x) * (obj2.x - obj1.x) +
      (obj2.y - obj1.y) * (obj2.y - obj1.y)
  );
  let vCollisionNorm = {
    x: vCollision.x / distance,
    y: vCollision.y / distance,
  };
  let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
  let speed =
    vRelativeVelocity.x * vCollisionNorm.x +
    vRelativeVelocity.y * vCollisionNorm.y;
  speed *= Math.min(obj1.restitution, obj2.restitution);
  let impulse = (2 * speed) / (obj1.mass + obj2.mass);
  obj1.vx -= impulse * obj2.mass * vCollisionNorm.x;
  obj1.vy -= impulse * obj2.mass * vCollisionNorm.y;
  obj2.vx += impulse * obj1.mass * vCollisionNorm.x;
  obj2.vy += impulse * obj1.mass * vCollisionNorm.y;
  
  document.getElementById("vx1").textContent = obj1.vx.toFixed(2);
  document.getElementById("vy1").textContent = obj1.vy.toFixed(2);
  document.getElementById("vx2").textContent = obj2.vx.toFixed(2);
  document.getElementById("vy2").textContent = obj2.vy.toFixed(2);
  document.getElementById("vnx").textContent = vCollisionNorm.x.toFixed(2);
  document.getElementById("vny").textContent = vCollisionNorm.y.toFixed(2);
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
