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
let canvas;
let context;
let inputController;
let levelMng;
let collisionManager;
let audioManager;
let boxManager;
let enemyManager;
let gameManager;
let menuIcon;
let pauseMenu;
let resume_btn;
let restartButton;
let gameOverScreen;
let retryButton;

window.onload = init;
window.dt = 0;
let lastTime = performance.now();
async function init() {
  initComp();
  //data
  initSound();
  levelMng.startLevel();

  menuIcon = document.getElementById("menuIcon");
  pauseMenu = document.getElementById("pauseMenu");

  menuIcon.addEventListener("click", () => {
    pauseMenu.classList.toggle("show");
    if (gameManager.state === "playing") {
      gameManager.setState("pause");
    } else {
      gameManager.setState("playing");
    }
  });

  resume_btn = document.getElementById("resumeButton");
  restartButton = document.getElementById("restartButton");
  resume_btn.addEventListener("click", () => {
    gameManager.setState("playing");
    pauseMenu.classList.toggle("show");
  });
  restartButton.addEventListener("click", async () => {
    gameManager.setState("pause");
    await gameManager.resetGame();
    gameManager.setState("playing");
    pauseMenu.classList.toggle("show");
  });

  gameOverScreen = document.getElementById("gameOver");
  retryButton = document.getElementById("retryButton");

  retryButton.addEventListener("click", () => {
    location.reload();
  });

  // initComp();
  window.requestAnimationFrame(loop);
}

function loop() {
  if (gameManager.state === "playing") {
    context.clearRect(0, 0, canvas.width, canvas.height);
    update();
    CollisionManager.instance.checkCollisions();
    draw();
    let now = performance.now();
    window.dt = now - lastTime;
    lastTime = now;
  } else if (gameManager.state === "gameover") {
    gameOverScreen.classList.toggle("show");
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

function initComp() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  gameManager = new GameManager();
  inputController = new InputController();
  collisionManager = new CollisionManager();
  audioManager = new AudioManager();
  levelMng = new LevelManager();
  boxManager = new BoxManager();
  enemyManager = new EnemyManager();
}

function initSound() {
  AudioManager.instance.loadSound("shoot", "../asset/audio/shoot.mp3");
  AudioManager.instance.loadSound(
    "slime_death",
    "../asset/audio/slime_death.mp3"
  );
  AudioManager.instance.loadSound(
    "player_hurt",
    "../asset/audio/player_hurt.mp3"
  );
}
