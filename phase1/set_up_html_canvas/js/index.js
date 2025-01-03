"use strict";
let canvas;
let context;

window.onload = init;

function init() {
  // Get a reference to the canvas
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  drawCircle();
  // draw();
  // drawCirclesWithoutBeginPath();
  // drawShapesWithoutBeginPath();
  // drawCircleWithoutStroke();
  canvas.addEventListener("click", drawCircle);
}

function getRandomRGB() {
  const r = Math.floor(Math.random() * 256); // Red
  const g = Math.floor(Math.random() * 256); // Green
  const b = Math.floor(Math.random() * 256); // Blue
  return `rgb(${r}, ${g}, ${b})`;
}

function draw() {
  let color1 = getRandomRGB();
  let color2 = getRandomRGB();
  let color3 = getRandomRGB();

  const gradient = context.createLinearGradient(
    0,
    0,
    canvas.width,
    canvas.height
  );
  gradient.addColorStop(0, color1);
  gradient.addColorStop(0.5, color2);
  gradient.addColorStop(1, color3);

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCircle() {
  let randomColor = getRandomRGB();
  context.beginPath();
  context.arc(100, 75, 50, 0, 2 * Math.PI);
  context.stroke();
  context.fillStyle = randomColor;
  context.fill();
}

function drawCirclesWithoutBeginPath() {
  context.arc(100, 75, 50, 0, 2 * Math.PI);

  context.arc(200, 150, 50, 0, 2 * Math.PI);
  context.stroke();
}
function drawShapesWithoutBeginPath() {
  context.rect(20, 20, 50, 50);

  context.arc(100, 75, 30, 0, 2 * Math.PI);
  context.stroke();
}
function drawCircleWithoutStroke() {
  context.beginPath();
  context.arc(100, 75, 50, 0, 2 * Math.PI);
}
