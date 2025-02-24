import { Player } from "../object/Player.js";
import { InputController } from "../handle/InputController.js";
import { Bullet } from "../object/Bullet.js";
import { Enemy } from "../object/Enemy.js";
import { Box } from "../object/Box.js";
import { LevelManager } from "../level/LevelManager.js";
import { CollisionManager } from "../handle/CollisionManager.js";
import { AudioManager } from "../handle/AudioManager.js";
import { BoxManager } from "../manager/box_manager.js";
import { EnemyManager } from "../manager/enemy_manager.js";
import { GameManager } from "../handle/GameManager.js";
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let gameManager = new GameManager();
let inputController = new InputController();
let collisionManager = new CollisionManager();
let audioManager = new AudioManager();
let levelMng = new LevelManager();
let boxManager = new BoxManager();
let enemyManager = new EnemyManager();
let menuIcon = document.getElementById("menuIcon");
let pauseMenu = document.getElementById("pauseMenu");
let resume_btn = document.getElementById("resumeButton");
let restartButton = document.getElementById("restartButton");
let gameOverScreen = document.getElementById("gameOver");
let retryButton = document.getElementById("retryButton");
let winScreen = document.getElementById("winScreen");
let playAgain = document.getElementById("playAgainButton");

window.onload = init;
window.dt = 0;
let lastTime = performance.now();
async function init() {
  initSound();
  initEvent();
  levelMng.startLevel();
  window.requestAnimationFrame(loop);
}

function loop() {
  if (gameManager.state === "playing") {
    context.clearRect(0, 0, canvas.width, canvas.height);
    update();
    collisionManager.checkCollisions();
    draw();
    let now = performance.now();
    window.dt = now - lastTime;
    lastTime = now;
  } else if (gameManager.state === "gameover") {
    gameOverScreen.classList.toggle("show");
    return;
  } else if (gameManager.state === "win") {
    winScreen.classList.toggle("show");
    return;
  }

  requestAnimationFrame(loop);
}

function draw() {
  if (levelMng.currentLevel) {
    levelMng.currentLevel.draw(context);
  }
}

function update() {
  if (levelMng.currentLevel) {
    levelMng.currentLevel.update(inputController);
  }
}

function initSound() {
  audioManager.loadSound("shoot2", "../asset/audio/shoot2.mp3");
  audioManager.loadSound("slime_death", "../asset/audio/slime_death.mp3");
  audioManager.loadSound("player_hurt", "../asset/audio/player_hurt.mp3");
}

function initEvent() {
  menuIcon.addEventListener("click", () => {
    pauseMenu.classList.toggle("show");
    if (gameManager.state === "playing") {
      gameManager.setState("pause");
    } else {
      gameManager.setState("playing");
    }
  });

  resume_btn.addEventListener("click", () => {
    gameManager.setState("playing");
    pauseMenu.classList.toggle("show");
  });
  restartButton.addEventListener("click", () => {
    gameManager.setState("pause");
    gameManager.resetGame();
    gameManager.setState("playing");
    pauseMenu.classList.toggle("show");
  });

  retryButton = retryButton.addEventListener("click", () => {
    location.reload();
  });
   playAgain.addEventListener("click", () => {
    location.reload();
  });
}
