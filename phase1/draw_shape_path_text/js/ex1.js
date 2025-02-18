"use strict";
let canvas;
let context;

window.onload = init;

function init() {
  // Get a reference to the canvas
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  drawHouse();
}

function drawHouse() {
  context.strokeRect(150, 150, 200, 130);

  context.beginPath();
  context.moveTo(120, 150);
  context.lineTo(250, 80);
  context.lineTo(380, 150);
  context.lineTo(120, 150);
  context.stroke();

  context.strokeRect(230, 220, 40, 60); //door

  context.strokeRect(170, 200, 30, 30); //window
  context.strokeRect(300, 200, 30, 30);

  context.beginPath();
  context.arc(240, 250, 4, 0, 2 * Math.PI);
  context.fill();
}
