export class GameManager {
    static instance = null;
    constructor() {
      this.score = 0;
      this.live = 3;
      this.state = "playing";
      GameManager.instance = this;
    }
  
    setState(newState) {
      this.state = newState;
    }
  
    updateScore(point) {
      this.score += point;
    }
  
    resetGame() {
      this.score = 0;
      this.live =3;
      this.state = "playing";
    }
  }
  