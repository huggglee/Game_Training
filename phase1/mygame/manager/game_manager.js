import { Level } from "../level/Level.js";
import { LevelManager } from "../level/LevelManager.js";
import { BoxManager } from "./box_manager.js";
import { CollisionManager } from "./collision_manager.js";
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
      CollisionManager.instance.clear();
      EnemyManager.instance.enemies = [];
      BoxManager.instance.boxs =[];
      Level.playerInstance =null;
      LevelManager.instance.startLevel();
    }
  }
  