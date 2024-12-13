import { GameManager } from "./GameManager.js";
import { InputController } from "./InputController.js";
import { RectCollider } from "./RectCollider.js";
import { AudioManager } from "./AudioManager.js";

let canvas;
let context;
let player;
let inputController;
let gameManager;
let audioManager;
let Fishs = [];
let timeGap = 4500;
let fishInterval;
let fishSpeed = 1;
// let reset_btn;

class Player extends RectCollider {
  constructor(x, y, width, height, speed, imgSrc) {
    super(x, y, width, height);
    this.speed = speed;
    this.img = new Image();
    this.img.src = imgSrc;
    this.direction = "right";
  }

  update(inputController) {
    if (inputController.isKeyPressed("ArrowLeft")) {
      this.x -= this.speed;
      this.direction = "left";
    }
    if (inputController.isKeyPressed("ArrowRight")) {
      this.x += this.speed;
      this.direction = "right";
    }
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > canvas.width){
      this.x = canvas.width -this.width;
    }
  }

  draw(context) {
    context.save();
    context.translate(this.x + this.width / 2, this.y + this.height / 2); // Di chuyển điểm gốc đến giữa player
    if (this.direction === "left") {
      context.scale(-1, 1); // Lật hình ảnh theo trục X
    }
    context.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    context.restore();

    // // Vẽ hitbox
    // context.beginPath();
    // context.rect(this.x, this.y, this.width, this.height);
    // context.stroke();
  }
}

//Fish
class Fish extends RectCollider {
  constructor(x, y, width, height, speed, imgSrc) {
    super(x, y, width, height);
    this.speed = speed;
    this.img = new Image();
    this.img.src = imgSrc;
  }

  update() {
    this.y += this.speed;
  }

  draw(context) {
    context.drawImage(this.img, this.x, this.y, this.width, this.height);

    // Vẽ hitbox
    // context.beginPath();
    // context.rect(this.x, this.y, this.width, this.height);
    // context.stroke();
  }
}

window.onload = init;
function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  inputController = new InputController();
  gameManager = new GameManager();
  audioManager = new AudioManager();
  // reset_btn = document.getElementById("resetButton")
  // reset_btn.addEventListener('click', gameManager.resetGame);
  player = new Player(
    canvas.width / 2,
    canvas.height - 115,
    80,
    120,
    5,
    "./img/player.png"
  );
  audioManager.loadSound("background", "./audio/background.mp3");
  audioManager.loadSound("collect", "./audio/collect.mp3");
  audioManager.loadSound("gameOver", "./audio/game_over.mp3");

  // Tạo ngôi sao ban đầu
  // for (let i = 0; i < 5; i++) {
  //   createFish();
  // }
  // player.img.onload = () => {
  //   gameLoop();

  //   // audioManager.playSound("background");
  // };
  createFish();
  fishInterval = setInterval(createFish, timeGap);

  requestAnimationFrame(gameLoop);
}

function createFish() {
  const x = Math.random() * (canvas.width - 50);
  const y = -50;
  const width = 50;
  const height = 25;
  const speed = fishSpeed + Math.random();
  const imgSrc = "./img/fish.jpg";
  const fish = new Fish(x, y, width, height, speed, imgSrc);
  Fishs.push(fish);
}
function updateFishInterval() {
  clearInterval(fishInterval); // Xóa khoảng cách cũ
  fishInterval = setInterval(createFish, timeGap); // Thiết lập khoảng cách mới
}

function gameLoop() {
  if (gameManager.state === "gameover") {
    audioManager.playSound("gameOver");
    // drawGameOver();

    return;
  }
  if (gameManager.score > 50 && gameManager.score <= 100) {
    if (timeGap !== 3000) {
      fishSpeed = 1.5;
      timeGap = 3000;
      updateFishInterval();
    }
  } else if (gameManager.score > 100 && gameManager.score <= 200) {
    if (timeGap !== 2000) {
      fishSpeed = 1.8;
      timeGap = 2000;
      updateFishInterval();
    }
  } else if (gameManager.score > 200) {
    if (timeGap !== 1000) {
      fishSpeed = 2.2;
      timeGap = 1000;
      updateFishInterval();
    }
  }
  context.clearRect(0, 0, canvas.width, canvas.height);

  player.update(inputController);
  player.draw(context);

  for (let i = Fishs.length - 1; i >= 0; i--) {
    const Fish = Fishs[i];
    Fish.update();
    Fish.draw(context);

    if (player.checkCollision(Fish)) {
      audioManager.playSound("collect");
      Fishs.splice(i, 1); // Loại bỏ fish khỏi mảng
      gameManager.updateScore(10);
    }

    if (Fish.y > canvas.height) {
      Fishs.splice(i, 1);
      gameManager.live--;
      if (gameManager.live <= 0) {
        gameManager.setState("gameover");
      }
    }
  }

  drawHUD();

  requestAnimationFrame(gameLoop);
}

function drawHUD() {
  context.fillStyle = "black";
  context.font = "20px Arial";
  context.fillText("Score: " + gameManager.score, 10, 20);
  context.fillText("Lives: " + gameManager.live, 10, 50);
}

// function drawGameOver() {
//   context.fillStyle = "red";
//   context.font = "50px Arial";
//   context.fillText("Game Over", canvas.width / 2 - 150, canvas.height / 2);
// }
