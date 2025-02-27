import { Level } from "../level/Level.js";
import { LevelManager } from "../level/LevelManager.js";
import { BoxManager } from "./box_manager.js";
import { EnemyManager } from "./enemy_manager.js";

export class GameManager {
    static instance = null;
    constructor() {
      this.state = "playing";
      GameManager.instance = this;
    }
  
    setState(newState) {
      this.state = newState;
    }
  
    resetGame() {
      this.state = "playing";
      LevelManager.instance.currentLevelId =1;
      EnemyManager.instance.enemies = [];
      BoxManager.instance.boxs =[];
      LevelManager.instance.startLevel();
      Level.playerInstance =null;
    }
  }
  