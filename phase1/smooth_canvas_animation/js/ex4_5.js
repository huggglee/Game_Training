"use strict";
let canvas;
let context;
let secondsPassed = 0;
let oldTimeStamp = 0;
let x = 100;
let y = 250;
let speed = 5;
let fps;

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

  fps = Math.round(1 / secondsPassed);

  update(secondsPassed);
  draw();
  window.requestAnimationFrame(gameLoop);
}

function update(secondsPassed) {
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowUp":
        y -= speed * secondsPassed;
        break;
      case "ArrowDown":
        y += speed * secondsPassed;
        break;
      case "ArrowLeft":
        x -= speed * secondsPassed;
        break;
      case "ArrowRight":
        x += speed * secondsPassed;
        break;
    }
  });
}

function draw() {
  context.fillStyle = "yellow";
  context.fillRect(250, 200, 50, 300);
  context.fillRect(450, 0, 50, 300);
  context.fillRect(650, 200, 50, 300);

  context.beginPath();
  context.fillStyle = "red";
  context.arc(x, y, 20, 0, 2 * Math.PI);
  context.fill();

  context.fillStyle = "black";
  context.font = "20px Arial";
  context.fillText("FPS: " + fps, 20, 20);
}
