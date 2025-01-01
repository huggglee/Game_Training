import { Player } from "../object/Player.js";
import { Map } from "../object/Map.js";
import { InputController } from "../handle/InputController.js";
import { Bullet } from "../object/Bullet.js";
import { Enemy } from "../object/Enemy.js";
import { Box } from "../object/Box.js";

let canvas;
let context;
let player;
let map;
let inputController;
let enemies = [];

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  inputController = new InputController();
  map = new Map();
  initComp();
  window.requestAnimationFrame(loop);
}

function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  update();
  checkCollisions();
  requestAnimationFrame(loop);
}

function draw() {
  map.draw(context);
  player.draw(context);
  player.bullets.forEach((bullet) => bullet.draw(context));
  enemies.forEach((enemy) => enemy.draw(context));
}

function update() {
  player.update(inputController);
  player.bullets.forEach((bullet) => bullet.update());
  enemies.forEach((enemy) => {
    enemy.changeTarget(player.x, player.y);
    enemy.update();
  });
}

function checkCollisions() {
  checkCollisionsBullet_Enemy();
  checkCollisionBullet_Box();
  checkCollisionsPlayer_Enemy();
  checkCollisionPlayer_Box();
  checkCollisionEnemy_Box();
}

function checkCollisionsBullet_Enemy() {
  player.bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (bullet.checkCollision(enemy)) {
        enemy.health -= bullet.damage;
        player.bullets.splice(bulletIndex, 1);
        if (enemy.health <= 0) {
          // enemy.isAlive = false
          enemies.splice(enemyIndex, 1);
        }
      }
    });
  });
}

function checkCollisionBullet_Box() {
  player.bullets.forEach((bullet, bulletIndex) => {
    map.boxs.forEach((box, boxIndex) => {
      if (bullet.checkCollision(box)) {
        box.health -= bullet.damage;
        player.bullets.splice(bulletIndex, 1);
      }
      if (box.health <= 0) {
        map.boxs.splice(boxIndex, 1);
      }
    });
  });
}

function checkCollisionsPlayer_Enemy() {
  enemies.forEach((enemy, enemyIndex) => {
    if (player.checkCollision(enemy)) {
      player.health -= 10;
      enemies.splice(enemyIndex, 1);
    }
  });
}

function checkCollisionPlayer_Box() {
  map.boxs.forEach((box) => {
    if (player.checkCollision(box)) {
      // Tính toán hướng va chạm
      const dx = player.x + player.width / 2 - (box.x + box.width / 2);
      const dy = player.y + player.height / 2 - (box.y + box.height / 2);
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx > absDy) {
        // Va chạm theo trục x
        if (dx > 0) {
          player.x = box.x + box.width;
        } else {
          player.x = box.x - player.width;
        }
      } else {
        // Va chạm theo trục y
        if (dy > 0) {
          player.y = box.y + box.height;
        } else {
          player.y = box.y - player.height;
        }
      }
    }
  });
}

function checkCollisionEnemy_Box() {
  map.boxs.forEach((box) => {
    enemies.forEach((enemy) => {
      if (enemy.checkCollision(box)) {
        const dx = enemy.x + enemy.width / 2 - (box.x + box.width / 2);
        const dy = enemy.y + enemy.height / 2 - (box.y + box.height / 2);
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx > absDy) {
          // Va chạm theo trục x
          if (dx > 0) {
            enemy.x = box.x + box.width;
          } else {
            enemy.x = box.x - player.width;
          }
        } else {
          // Va chạm theo trục y
          if (dy > 0) {
            enemy.y = box.y + box.height;
          } else {
            enemy.y = box.y - player.height;
          }
        }
      }
    });
  });
}

function initComp() {
  player = new Player(400, 500, "../asset/img/player/x1.png");
  map.initMap();
  enemies = [new Enemy(100, 200), new Enemy(1000, 100), new Enemy(100, 300)];
}
