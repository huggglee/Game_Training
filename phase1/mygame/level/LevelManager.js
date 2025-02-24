import { GameManager } from "../handle/GameManager.js";
import { Player } from "../object/Player.js";
import { Level } from "./Level.js";
import { LevelLoader } from "./LevelLoader.js";

export class LevelManager {
  static instance = null;
  constructor() {
    this.currentLevel = null;
    this.levelLoader = new LevelLoader();
    this.currentLevelId = 1;
    this.player = null;
    LevelManager.instance = this;
  }
  async loadLevel() {
    console.log(this.currentLevelId);
    // Cleanup current level if exists
    if (this.currentLevel) {
      this.unloadCurrentLevel();
    }
    const levelData = await this.levelLoader.loadLevel(this.currentLevelId);

    this.currentLevel = new Level();
    this.currentLevel.init(levelData);
  }
  unloadCurrentLevel() {
    // Cleanup resources
    this.currentLevel = null;
  }

  startLevel() {
    this.loadLevel();
  }

  loadNextLevel() {
    console.log(this.currentLevelId);
    if (this.currentLevelId < 3) {
      this.currentLevelId++;
      this.loadLevel();
    } else {
      GameManager.instance.setState("victory");
    }
  }
}
