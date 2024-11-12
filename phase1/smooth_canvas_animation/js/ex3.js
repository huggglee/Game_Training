"use strict";
let canvas;
let context;
let secondsPassed = 0;
let oldTimeStamp = 0;

let rectWidth = 80;
let rectHeight = 50;
let x = 100;
let y = 100;
let speedX = 200;
let speedY = 200;

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  secondsPassed = Math.min(secondsPassed, 0.1);
  oldTimeStamp = timeStamp;

  update(secondsPassed);
  draw();
  window.requestAnimationFrame(gameLoop);
}

function update(secondsPassed) {
  x += speedX * secondsPassed;
  y += speedY * secondsPassed;

  if (y + rectHeight >= canvas.height || y <= 0) {
    speedY = -speedY;
  }
  if (x + rectWidth >= canvas.width || x <= 0) {
    speedX = -speedX;
  }
}

function draw() {
  // Draw the rectangle
  context.fillStyle = "red";
  context.fillRect(x, y, rectWidth, rectHeight);
}
