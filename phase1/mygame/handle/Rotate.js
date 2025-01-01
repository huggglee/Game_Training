export class Rotate {
  constructor() {
    this.angle = 0; 
    this.centerX = 0; 
    this.centerY = 0; 
  }

  
  setRotation(angle, centerX, centerY) {
    this.angle = angle;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  applyRotation(context) {
    context.save(); 
    context.translate(this.centerX, this.centerY); 
    context.rotate(this.angle); 
  }

  
  resetRotation(context) {
    context.restore(); 
  }
}
