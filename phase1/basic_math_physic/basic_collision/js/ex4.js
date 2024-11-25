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
    new Rectangle(context, 100, 290, 1000, 0, 1, 0.6, 40, 20), //bullet
    new Rectangle(context, 600, 100, 0, 0, 1, 0, 3, 300), //target
  ];
}

function getBulletBox(obj1) {
  const x1 = obj1.x;
  const y1 = obj1.y;
  const x2 = obj1.x + obj1.vx;
  const y2 = obj1.y + obj1.vy;

  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);
  const right = Math.max(x1 + obj1.width, x2 + obj1.width);
  const bottom = Math.max(y1 + obj1.height, y2 + obj1.height);

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
}

function handleCollision(obj1, obj2) {
  //   let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
  //   let distance = Math.sqrt(
  //     (obj2.x - obj1.x) * (obj2.x - obj1.x) +
  //       (obj2.y - obj1.y) * (obj2.y - obj1.y)
  //   );
  //   let vCollisionNorm = {
  //     x: vCollision.x / distance,
  //     y: vCollision.y / distance,
  //   };
  //   let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
  //   let speed =
  //     vRelativeVelocity.x * vCollisionNorm.x +
  //     vRelativeVelocity.y * vCollisionNorm.y;
  //   speed *= Math.min(obj1.restitution, obj2.restitution);
  //   if (speed < 0) return;
  //   let impulse = (2 * speed) / (obj1.mass + obj2.mass);
  //   obj1.vx -= impulse * obj2.mass * vCollisionNorm.x;
  //   obj1.vy -= impulse * obj2.mass * vCollisionNorm.y;
  //   obj2.vx += impulse * obj1.mass * vCollisionNorm.x;
  //   obj2.vy += impulse * obj1.mass * vCollisionNorm.y;
  context.font = "50px serif";
  context.fillStyle="black";
  context.fillText("Đã xảy ra va chạm", 200, 50);
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
      let bulletBox = getBulletBox(obj1);
      if (rectIntersect(bulletBox, obj2)) {
        obj2.isColliding = true;
        handleCollision(obj1, obj2);
      }
    }
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

function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].updateV(secondsPassed);
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  detect_collision();
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].draw();
  }

  window.requestAnimationFrame(gameLoop);
}
