import { Player } from "../object/Player.js";
import { InputController } from "../handle/InputController.js";
import { Bullet } from "../object/Bullet.js";
import { Enemy } from "../object/Enemy.js";
import { Box } from "../object/Box.js";
import {LevelManager} from "../level/LevelManager.js";
import { CollisionManager } from "../handle/CollisionManager.js";
import { AudioManager } from "../handle/AudioManager.js";
import { BoxManager } from "../manager/box_manager.js";
import { EnemyManager } from "../manager/enemy_manager.js";
let canvas;
let context;
let inputController;
let levelMng;
let collisionManager;
let audioManager;
let boxManager;
let enemyManager;

window.onload = init;
window.dt = 0;
let lastTime = performance.now();
async function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  inputController = new InputController();
  collisionManager = new CollisionManager();
  audioManager = new AudioManager();
  levelMng = new LevelManager();
  boxManager = new BoxManager();
  enemyManager = new EnemyManager();
  //data
  initSound();
  levelMng.startLevel();
  // initComp();
  window.requestAnimationFrame(loop);
} 

function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  update();
  CollisionManager.instance.checkCollisions();
  draw();
  let now = performance.now()
  window.dt = now - lastTime;
  lastTime = now;

  requestAnimationFrame(loop);
}

function draw() {
  if (levelMng.currentLevel) {
    levelMng.currentLevel.draw(context);
  }
}

function initSound(){
  AudioManager.instance.loadSound("shoot","../asset/audio/shoot.mp3");
  AudioManager.instance.loadSound("slime_death","../asset/audio/slime_death.mp3");
  AudioManager.instance.loadSound("player_hurt","../asset/audio/player_hurt.mp3");
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
