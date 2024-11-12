"use strict";
let canvas;
let context;
let x = 100;
let speed = 2;

window.onload = init;

function init() {
  // Get a reference to the canvas
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  animate();
}
function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(x, 100, 50, 0, 2 * Math.PI);
  context.stroke();
  context.fillStyle = "red";
  context.fill();

  x += speed;
  if (x > canvas.width) {
    x = 30;
  }
  requestAnimationFrame(animate);
}
