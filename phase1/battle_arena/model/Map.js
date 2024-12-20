import { Ground } from "./Ground.js";

export class Map {
  constructor(imgBackground) {
    this.grounds = [];
    this.background = new Image();
    this.background.src = imgBackground;
    console.log(this.background.width);
    console.log(this.background.height);
  }

  addGround(x, y, width, height, imgSrc) {
    const ground = new Ground(x, y, width, height, imgSrc);
    this.grounds.push(ground);
  }

  draw(context) {
    // context.imageSmoothingEnabled = true;
    // context.imageSmoothingQuality = "high";
    context.drawImage(
      this.background,
      0,
      0,
    );
    this.grounds.forEach((ground) => ground.draw(context));
  }
  getGrounds(){
    return this.grounds;
  }
}
