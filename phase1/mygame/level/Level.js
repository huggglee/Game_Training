import { BoxManager } from "../manager/box_manager.js";
import { EnemyManager } from "../manager/enemy_manager.js";
import { Player } from "../object/Player.js";
import { LevelManager } from "./LevelManager.js";
export class Level {
  static playerInstance = null;
  constructor() {
    this.isLoaded = false;
    this.isPaused = false;
    this.text = null;
  }

  init(data) {
    this.text = data.name;
    if (!Level.playerInstance) {
      Level.playerInstance = new Player(data.player.x, data.player.y);
    } else {
      Level.playerInstance.x = data.player.x;
      Level.playerInstance.y = data.player.y;
    }
    BoxManager.instance.initMap(data.boxes);
    EnemyManager.instance.init(data.enemies, 3, 3000);
  }

  draw(context) {
    BoxManager.instance.draw(context);
    this.drawText(context);
    EnemyManager.instance.draw(context);
    Level.playerInstance.draw(context);
    Level.playerInstance.drawHUD(context);
  }

  update(inputController) {
    BoxManager.instance.update();
    EnemyManager.instance.update(
      Level.playerInstance.x,
      Level.playerInstance.y
    );
    Level.playerInstance.update(inputController);
    if (EnemyManager.instance.checkClearEnemies()) {
      this.onWon();
    }
  }

  drawText(context) {
    context.font = "40px Arial";
    context.fillStyle = "white"; 
    context.strokeStyle = "black"; 
    context.lineWidth = 5; 
    context.textBaseline = "middle";
    
    context.strokeText(this.text, 460, 30);
    context.fillText(this.text, 460, 30); 
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
    LevelManager.instance.loadNextLevel();
  }

  onLose() {
    // Handle level failure
  }
}
