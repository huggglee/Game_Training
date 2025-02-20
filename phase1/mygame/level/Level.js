import { BoxManager } from "../manager/box_manager.js";
import { EnemyManager } from "../manager/enemy_manager.js";
import { Player } from "../object/Player.js";
import { LevelManager } from "./LevelManager.js";
import {Boss} from "../object/Boss.js"
export class Level {
  static playerInstance = null;
  constructor() {
    this.isLoaded = false;
    this.isPaused = false;
    this.boss = null;
  }

  init(data) {
    if (!Level.playerInstance) { 
      Level.playerInstance = new Player(data.player.x, data.player.y); 
    } else {
      Level.playerInstance.x = data.player.x;
      Level.playerInstance.y = data.player.y;
    }
    this.boss = new Boss(500,200);
    BoxManager.instance.initMap(data.boxes);
    EnemyManager.instance.init(data.enemies, 3, 3000);
  }

  draw(context) {
    BoxManager.instance.draw(context);
    this.boss.draw(context);
    EnemyManager.instance.draw(context);
    Level.playerInstance.draw(context);
    Level.playerInstance.drawHUD(context);
  }

  update(inputController) {
    BoxManager.instance.update();
    this.boss.update()
    EnemyManager.instance.update(Level.playerInstance.x, Level.playerInstance.y);
    Level.playerInstance.update(inputController);
    if (EnemyManager.instance.checkClearEnemies()) {
      this.onWon();
    }
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  // Event handlers
  onLoaded() {
    this.isLoaded = true;
  }

  onWon() {
    // console.log("win");
    LevelManager.instance.loadNextLevel();
  }

  onLose() {
    // Handle level failure
  }
}
