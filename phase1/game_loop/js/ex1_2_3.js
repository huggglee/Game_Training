"use strict";
let canvas;
let context;
let x = 50;
let speed = 2;
let secondsPassed;
let oldTimeStamp;
let fps;
let isClick = false;
let lastFrameTime = 0;
let fpsButton;
window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  fpsButton = document.getElementById("fpsButton");

  fpsButton.addEventListener("click", clickButton);
  window.requestAnimationFrame(gameLoop);
}

function clickButton() {
  isClick = !isClick;
  fpsButton.innerText = isClick
    ? "Limit fps to 60"
    : "Limit fps to 30";
}

function gameLoop(timeStamp) {
  if (isClick && timeStamp - lastFrameTime < 33) {
    window.requestAnimationFrame(gameLoop);
    return;
  }
  lastFrameTime = timeStamp;

  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Calculate fps
  fps = Math.round(1 / secondsPassed);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = "20px Arial";
  context.fillText("FPS: " + fps, 10, 20);

  drawCircle();

  window.requestAnimationFrame(gameLoop);
}

function drawCircle() {
  context.beginPath();
  context.arc(x, 80, 50, 0, 2 * Math.PI);
  context.fill();

  x += speed;
  if (x > canvas.width + 100) {
    x = -100;
  }
}