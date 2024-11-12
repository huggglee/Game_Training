"use strict";
let canvas;
let context;
let y = 80;
let speed = 3;
let isBounc = false;
window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  // Start the first frame request
  window.requestAnimationFrame(gameLoop);
}
function gameLoop(timeStamp) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  if (!isBounc) {
    y += speed;
  } else y -= speed;
  Bounc();
  window.requestAnimationFrame(gameLoop);
}

function Bounc() {
  if (y >= 450) {
    isBounc = true;
  }
  if (y <= 50) {
    isBounc = false;
  }
}
function drawCircle() {
  context.beginPath();
  context.arc(100, y, 50, 0, 2 * Math.PI);
  context.fill();
}