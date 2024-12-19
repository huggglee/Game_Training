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
  player = new Player(200, 350, "../asset/img/Player/Gun/Idle/Idle.png");

  initMap();
  window.requestAnimationFrame(loop);
}

function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(context);
  player.update(inputController);
  map.draw(context);
  requestAnimationFrame(loop);
}

function initMap() {
  map = new Map("../asset/img/Background/Background2.jpg");
  map.addGround(200, 400, 270, 60, "../asset/img/Ground/grasstop.png");
  map.addGround(730, 400, 270, 60, "../asset/img/Ground/grasstop.png");
  map.addGround(330, 260, 540, 60, "../asset/img/Ground/grasstop.png");
  map.addGround(120, 120, 300, 60, "../asset/img/Ground/grasstop.png");
  map.addGround(780, 120, 300, 60, "../asset/img/Ground/grasstop.png");
  map.addGround(525, 120, 150, 60, "../asset/img/Ground/grasstop.png");
}