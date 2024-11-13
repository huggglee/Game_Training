import { vector } from "./vector.js";

let canvas;
let context;

let secondPassed = 0;
let oldTimeStamp = 0;

window.onload = init;

let radius = 30;
let pos1 = new vector(300, 300);
let speed1 = new vector(375, 300);
let velocity1;

let pos2 = new vector(50, 100);
let speed2 = new vector(50, 100);
let velocity2;

let pos3 = new vector(200, 100);
let speed3 = new vector(150, 70);
let velocity3;

// let pos4 = new vector(300, 200);
// let speed4 = new vector(50, 50);
// let velocity4 = new vector(0,0);

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

//   document.addEventListener("keydown", controlDirectionBall);
  window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStap) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  secondPassed = (timeStap - oldTimeStamp) / 1000;
  oldTimeStamp = timeStap;

  draw();
  update(secondPassed);
  window.requestAnimationFrame(gameLoop);
}

function draw() {
  drawCircle(pos1, "red");
  drawCircle(pos2, "green");
  drawCircle(pos3, "yellow");
//   drawCircle(pos4, "blue");
}

function drawCircle(pos, style) {
  context.beginPath();
  context.fillStyle = style;
  context.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
}

function update(secondPassed) {
  velocity1 = vector.multiplyVector(speed1, secondPassed);
  pos1 = vector.addVectors(pos1, velocity1);

  velocity2 = vector.multiplyVector(speed2, secondPassed);
  pos2 = vector.addVectors(pos2, velocity2);

  velocity3 = vector.multiplyVector(speed3, secondPassed);
  pos3 = vector.addVectors(pos3, velocity3);

//   pos4 = vector.addVectors(pos4, velocity4);

  checkBounce(pos1, speed1);
  checkBounce(pos2, speed2);
  checkBounce(pos3, speed3);
}

function checkBounce(pos, speed) {
  if (pos.x + radius >= canvas.width || pos.x - radius <= 0) {
    speed.x = -speed.x;
  }
  if (pos.y + radius >= canvas.height || pos.y - radius <= 0) {
    speed.y = -speed.y;
  }
}



