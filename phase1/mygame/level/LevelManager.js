import { Player } from "../object/Player.js";
import { Level } from "./Level.js";
import { LevelLoader } from "./LevelLoader.js";

export class LevelManager {
  static instance =null;
  constructor() {
    this.currentLevel = null;
    this.levelLoader = new LevelLoader();
    this.currentLevelId=1;
    this.player = null;
    LevelManager.instance = this
  }
  async loadLevel() {
    console.log(this.currentLevelId);
    // Cleanup current level if exists
    if (this.currentLevel) {
      this.unloadCurrentLevel();
    }
    const levelData = await this.levelLoader.loadLevel(this.currentLevelId);

    if(!this.player){
      this.player = new Player(levelData.player.x,levelData.player.y);
    } else {
      this.player.x = levelData.player.x;
      this.player.y = levelData.player.y;
    }
    this.currentLevel = new Level();
    this.currentLevel.init(levelData,this.player);
  }
  unloadCurrentLevel() {
    // Cleanup resources
    this.currentLevel = null;
  }
  
  startLevel(){
    this.loadLevel();
  }

  loadNextLevel(){
    this.currentLevelId++;
    this.loadLevel();
  }
}
