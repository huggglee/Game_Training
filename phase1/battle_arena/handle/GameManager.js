export class GameManager {
    constructor() {
      this.score = 0;
      this.live = 3;
      this.state = "playing";
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
  