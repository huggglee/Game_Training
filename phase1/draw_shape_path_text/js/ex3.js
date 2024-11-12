"use strict";
let canvas;
let context;

window.onload = init;

function chartBoard() {
  context.beginPath();
  context.moveTo(30,30);
  context.lineTo(30,450);
  context.lineTo(600,450);
  context.stroke();

  context.beginPath();
  context.moveTo(23,30);
  context.lineTo(30,23);
  context.lineTo(37,30);
  context.fill();

  context.beginPath();
  context.moveTo(600,443);
  context.lineTo(607,450);
  context.lineTo(600,457);
  context.fill();


  context.fillStyle = '#0b8efc';
  context.fillRect(80,350,50,100);
  context.fillRect(180,300,50,150);
  context.fillRect(280,250,50,200);
  context.fillRect(380,200,50,250);
  context.fillRect(480,150,50,300);

  context.fillStyle='black';
  context.font='18px Arial';
  context.fillText("2004",85,470);
  context.fillText("2008",185,470);
  context.fillText("2012",285,470);
  context.fillText("2016",385,470);
  context.fillText("2020",485,470);
  context.fillText("(Năm)",575,470);
}

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  chartBoard();
}