"use strict";
let canvas;
let context;
let secondsPassed = 0;
let oldTimeStamp = 0;
let angle = 0;
let radius = 100;
let speed = 3;
let x1;
let y1;
let x2;
let y2;
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
  angle += speed * secondsPassed;
  x1 = 200 + radius * Math.cos(angle);
  y1 = 200 + radius * Math.sin(angle);

  x2 = 200 + radius * Math.cos(-angle);
  y2 = 200 + radius * Math.sin(-angle);
}

function draw() {
  context.fillStyle = "red";
  context.fillRect(x1, y1, 80, 50);

  context.fillStyle = "green";
  context.fillRect(x2, y2, 80, 50);

  context.beginPath();
  context.arc(200, 200, radius, 0, 2 * Math.PI);
  context.strokeStyle = "gray";
  context.stroke();
}
