import { InputController } from "../handle/InputController.js";
import { LevelManager } from "../level/LevelManager.js";
import { CollisionManager } from "../manager/collision_manager.js";
import { AudioManager } from "../manager/audio_manager.js";
import { BoxManager } from "../manager/box_manager.js";
import { EnemyManager } from "../manager/enemy_manager.js";
import { GameManager } from "../manager/game_manager.js";

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
  // setTimeout(()=>{
  //   gameManager.setState("gameover")
  // },3000);
  window.requestAnimationFrame(loop);
}

function loop() {
  if (gameManager.state === "playing") {
    update();
    collisionManager.checkCollisions();
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    let now = performance.now();
    window.dt = now - lastTime;
    lastTime = now;
  } else if (gameManager.state === "gameover") {
    gameOverScreen.classList.toggle("show");
    audioManager.playSound("gameover");
    return;
  } else if (gameManager.state === "victory") {
    audioManager.playSound("victory");
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
  audioManager.loadSound("victory", "../asset/audio/victory.mp3");
  audioManager.loadSound("gameover", "../asset/audio/fail.mp3");
  audioManager.loadSound("level_up", "../asset/audio/level_up.mp3");
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
    lastTime = performance.now();
  });
  restartButton.addEventListener("click", () => {
    gameManager.setState("pause");
    gameManager.resetGame();
    pauseMenu.classList.toggle("show");
  });

  retryButton.addEventListener("click", () => {
    console.log("retry");
    gameManager.resetGame();
    gameOverScreen.classList.toggle("show");
    window.requestAnimationFrame(loop);
  });
  playAgain.addEventListener("click", () => {
    console.log("again");
    gameManager.resetGame();
    winScreen.classList.toggle("show");
    window.requestAnimationFrame(loop);
  });
}
