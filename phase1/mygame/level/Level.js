import { Map } from "../object/Map.js";
import { EnemyManager } from "../manager/enemy_manager.js";
import { Player } from "../object/Player.js";
export class Level {
  constructor() {
    this.isLoaded = false;
    this.isPaused = false;
    this.player = null;
    this.map = new Map();
    this.enemy_mng = new EnemyManager();
  }

  init(data) {
    this.player = new Player(data.player.x,data.player.y);
    this.map.initMap(data.boxes);
    this.enemy_mng.init(data.enemies);
  }

  draw(context) {
    this.map.draw(context);
    this.enemy_mng.draw(context);
    this.player.draw(context);
    this.player.drawHUD(context);
  }
  update(inputController) {
    this.enemy_mng.update(this.player.x,this.player.y);
    this.player.update(inputController);
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
    // Handle level completion
  }

  onLose() {
    // Handle level failure
  }
}
