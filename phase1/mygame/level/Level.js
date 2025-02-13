import {BoxManager} from "../manager/box_manager.js";
import { EnemyManager } from "../manager/enemy_manager.js";
import { Player } from "../object/Player.js";
import { LevelManager } from "./LevelManager.js";
export class Level {
  constructor() {
    this.isLoaded = false;
    this.isPaused = false;
    this.player = null;
  }

  init(data,player) {
    this.player = player;
    BoxManager.instance.initMap(data.boxes);
    EnemyManager.instance.init(data.enemies,3,3000);
  }

  draw(context) {
    BoxManager.instance.draw(context);
    EnemyManager.instance.draw(context);
    this.player.draw(context);
    this.player.drawHUD(context);
  }
  update(inputController) {
    EnemyManager.instance.update(this.player.x,this.player.y);
    this.player.update(inputController);
    BoxManager.instance.update();
    if(EnemyManager.instance.checkClearEnemies()){
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
