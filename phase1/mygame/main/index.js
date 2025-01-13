import { Player } from "../object/Player.js";
import { Map } from "../object/Map.js";
import { InputController } from "../handle/InputController.js";
import { Bullet } from "../object/Bullet.js";
import { Enemy } from "../object/Enemy.js";
import { Box } from "../object/Box.js";
import {LevelManager} from "../level/LevelManager.js";
import { CollisionManager } from "../handle/CollisionManager.js";
let canvas;
let context;
let inputController;
let levelMng;
let collisionManager;
let bullet;

window.onload = init;

async function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  inputController = new InputController();
  collisionManager = new CollisionManager();
  levelMng = new LevelManager();
  //data
  await levelMng.loadLevel(1);
  // initComp();
  window.requestAnimationFrame(loop);
} 

function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  update();
  CollisionManager.instance.checkCollisions();
  requestAnimationFrame(loop);
}

function draw() {
  if (levelMng.currentLevel) {
    levelMng.currentLevel.draw(context);
  }
}

function update() {
  if(levelMng.currentLevel){
    levelMng.currentLevel.update(inputController);
  }
  // player.update(inputController);
  // player.bullets.forEach((bullet) => bullet.update());
  // enemies.forEach((enemy) => {
  //   enemy.changeTarget(player.x, player.y);
  //   enemy.update();
  // });
}
// function initComp() {
//   player = new Player(400, 500,collisionManager);
// }
