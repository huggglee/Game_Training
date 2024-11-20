import { Rectangle } from "../handle/Rectangle.js";
import { Circle } from "../handle/Circle.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let gameObjects;
let oldTimeStamp = 0;
let secondsPassed;

function detect_collision(rectX, rectY, rectW, rectH, cirX, cirY, radius) {
  const nearestX = Math.max(rectX, Math.min(cirX, rectX + rectW));
  const nearestY = Math.max(rectY, Math.min(cirY, rectY + rectH));

  const dx = cirX - nearestX;
  const dy = cirY - nearestY;
  const distanceSquared = dx * dx + dy * dy;

  // Kiểm tra va chạm
  if (distanceSquared <= radius * radius) {
    const distance = Math.sqrt(distanceSquared);
    const normalVector = { x: dx / distance, y: dy / distance }; // Chuẩn hóa vector pháp tuyến
    return {
      collision: true,
      collisionPoint: { x: nearestX, y: nearestY },
      normalVector: normalVector,
    };
  }

  // Không có va chạm
  return {
    collision: false,
    collisionPoint: null,
    normalVector: null,
  };
}

function createWorld() {
  gameObjects = [
    new Circle(context, 200, 10, 20, 100, 20, 30),
    new Rectangle(context, 350, 150, -100, -30),
  ];
}

function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  let circle = gameObjects[0];
  let rectangle = gameObjects[1];

  // Loop over all game objects
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update(secondsPassed);
  }

  const collisionResult = detect_collision(
    rectangle.x,
    rectangle.y,
    rectangle.width,
    rectangle.height,
    circle.x,
    circle.y,
    circle.radius
  );

  console.log(collisionResult);
  
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Do the same to draw
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].draw();
  }

  window.requestAnimationFrame(gameLoop);
}

createWorld();
window.requestAnimationFrame(gameLoop);
