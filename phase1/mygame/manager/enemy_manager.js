import { Enemy } from "../object/Enemy.js";
import { CollisionManager } from "../handle/CollisionManager.js";

export class EnemyManager {
  static instance = null;

  constructor() {
    this.enemies = [];
    this.allEnemies = [];
    this.waves = [];
    this.currentWave = 0;
    this.isSpawnComplete = false;
    this.waveInterval = null; 
    EnemyManager.instance = this;
  }

  init(enemiesData, enemiesPerWave, waveDelay) {
    this.enemies = [];
    this.allEnemies = enemiesData;
    this.currentWave = 0;
    this.isSpawnComplete = false;
    this.waves = [];

    for (let i = 0; i < enemiesData.length; i += enemiesPerWave) {
      this.waves.push(enemiesData.slice(i, i + enemiesPerWave));
    }

    this.waveInterval = setInterval(() => {
      this.startWaves();
    }, waveDelay);
  }

  startWaves() {
    if (this.currentWave >= this.waves.length) {
      this.isSpawnComplete = true;
      clearInterval(this.waveInterval); 
      return;
    }
    this.waves[this.currentWave].forEach((enemyData) => {
      this.spawnEnemy(enemyData.x, enemyData.y);
    });
    this.currentWave++;
  }

  update(playerX, playerY) {
    this.enemies.forEach((enemy) => {
      enemy.changeTarget(playerX, playerY);
      enemy.update();
    });

    this.enemies = this.enemies.filter((enemy) => enemy.isAlive);
  }

  spawnEnemy(x, y) {
    let enemy = new Enemy(x, y);
    this.enemies.push(enemy);
  }

  draw(context) {
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
  }

  checkClearEnemies() {
    return this.isSpawnComplete && this.enemies.length === 0;
  }
}
