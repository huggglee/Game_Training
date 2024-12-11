import { GameManager } from "./gameManager.js";
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

class Player extends RectCollider {
  constructor(x, y, width, height, speed, imgSrc) {
    super(x, y, width, height);
    this.speed = speed;
    this.img = new Image();
    this.img.src = imgSrc;
    this.direction = "right";
    this.score = 0;
    this.lives = 3;
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
  player = new Player(
    canvas.width / 2,
    canvas.height - 115,
    80,
    120,
    5,
    "./img/player.png"
  );
  player.img.onload = () => {
    gameLoop();
    audioManager.loadSound("background", "./audio/background.mp3");
    audioManager.loadSound("collect", "./audio/collect.mp3");
    audioManager.loadSound("gameOver", "./audio/game_over.mp3");
    // audioManager.playSound("background");
  };
  // Tạo ngôi sao ban đầu
  for (let i = 0; i < 5; i++) {
    createFish();
  }
}

function createFish() {
  const x = Math.random() * canvas.width;
  const y = -50;
  const width = 50;
  const height = 25;
  const speed = 2 + Math.random() * 2;
  const imgSrc = "./img/fish.jpg";
  const fish = new Fish(x, y, width, height, speed, imgSrc);
  Fishs.push(fish);
}

function gameLoop() {
  if (gameManager.state === "gameover") {
    audioManager.playSound("gameOver");
    drawGameOver();
    return;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  player.update(inputController);
  player.draw(context);

  // Cập nhật và vẽ các ngôi sao
  for (let i = Fishs.length - 1; i >= 0; i--) {
    const Fish = Fishs[i];
    Fish.update();
    Fish.draw(context);

    if (player.checkCollision(Fish)) {
      audioManager.playSound("collect");
      Fishs.splice(i, 1); // Loại bỏ fish khỏi mảng
      player.score += 10;
      gameManager.updateScore(10);
      createFish();
    }

    if (Fish.y > canvas.height) {
      Fishs.splice(i, 1);
      createFish();
      player.lives--;
      if (player.lives <= 0) {
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
  context.fillText("Score: " + player.score, 10, 20);
  context.fillText("Lives: " + player.lives, 10, 50);
}

function drawGameOver() {
  context.fillStyle = "red";
  context.font = "50px Arial";
  context.fillText("Game Over", canvas.width / 2 - 150, canvas.height / 2);
}
