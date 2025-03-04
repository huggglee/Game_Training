"use strict";
let canvas;
let context;

window.onload = init;

function init() {
  // Get a reference to the canvas
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  drawClock();
}

function drawClock() {
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;
  // console.log(hours);

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw clock face
  context.beginPath();
  context.arc(400, 200, 100, 0, 2 * Math.PI);
  context.stroke();

  // Draw center point
  context.beginPath();
  context.arc(400, 200, 5, 0, 2 * Math.PI);
  context.fill();

  // Draw clock numbers
  context.font = "20px Arial";
  context.textAlign = "center";
  for (let num = 1; num <= 12; num++) {
    const angle = (num * Math.PI) / 6 - Math.PI / 2;
    const x = 400 + 85 * Math.cos(angle);
    const y = 200 + 85;
    context.fillText(num, x, y);
  }

  // Calculate angles for each hand
  const secondAngle = (seconds * Math.PI) / 30;
  const minuteAngle = (minutes * Math.PI) / 30;
  const hourAngle = (hours * Math.PI) / 6;

  // Draw hour hand
  context.beginPath();
  context.moveTo(400, 200);
  context.lineTo(
    400 + 50 * Math.cos(hourAngle - Math.PI / 2),
    200 + 50 * Math.sin(hourAngle - Math.PI / 2)
  );
  context.lineWidth = 6;
  context.stroke();

  // Draw minute hand
  context.beginPath();
  context.moveTo(400, 200);
  context.lineTo(
    400 + 70 * Math.cos(minuteAngle - Math.PI / 2),
    200 + 70 * Math.sin(minuteAngle - Math.PI / 2)
  );
  context.lineWidth = 4;
  context.stroke();

  // Draw second hand
  context.beginPath();
  context.moveTo(400, 200);
  context.lineTo(
    400 + 90 * Math.cos(secondAngle - Math.PI / 2),
    200 + 90 * Math.sin(secondAngle - Math.PI / 2)
  );
  context.lineWidth = 2;
  context.strokeStyle = "red";
  context.stroke();

  // Reset line width and color for other drawings
  context.lineWidth = 1;
  context.strokeStyle = "black";

  // Request to draw the next frame
  requestAnimationFrame(drawClock);
}
