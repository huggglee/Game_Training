import { Player } from "../model/Player.js";
import { Map } from "../model/Map.js";
import { InputController } from "../handle/InputController.js";

let canvas;
let context;
let player;
let map;
let inputController;

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  inputController = new InputController();
  player = new Player(200, 370, "../asset/img/player/gun/idle/idle.png");
  initMap();
  window.requestAnimationFrame(loop);
}

function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  map.draw(context);
  player.draw(context);
  player.update(inputController, map.getGrounds());
  requestAnimationFrame(loop);
}

function initMap() {
  map = new Map("../asset/img/background/background.jpg");
  // map.addGround(200, 440, 270, 60, "../asset/img/ground/grasstop.png");
  // map.addGround(810, 440, 270, 60, "../asset/img/ground/grasstop.png");
  // map.addGround(370, 280, 540, 60, "../asset/img/ground/grasstop.png");
  // map.addGround(120, 120, 300, 60, "../asset/img/ground/grasstop.png");
  // map.addGround(860, 120, 300, 60, "../asset/img/ground/grasstop.png");
  // map.addGround(565, 120, 150, 60, "../asset/img/ground/grasstop.png");
  map.addGround(250,700, 1100, 200, "../asset/img/ground/grasstop.png");
  map.addGround(450,570, 230, 50, "../asset/img/ground/grasstop.png");
  map.addGround(920,570, 230, 50, "../asset/img/ground/grasstop.png");
  map.addGround(600,440, 400, 50, "../asset/img/ground/grasstop.png");
  map.addGround(685,310, 230, 50, "../asset/img/ground/grasstop.png");
  map.addGround(250,310, 250, 50, "../asset/img/ground/grasstop.png");
  map.addGround(1100,310, 250, 50, "../asset/img/ground/grasstop.png");
  map.addGround(450,180, 700, 50, "../asset/img/ground/grasstop.png");
}
