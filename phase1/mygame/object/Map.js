import { Box } from "./Box.js";

export class Map {
  constructor() {
    this.background = new Image();
    this.boxs = [];
    console.log(this.background.width);
    console.log(this.background.height);
  }

  addBox(x, y, type) {
    let box = new Box(x, y, type);
    this.boxs.push(box);
  }
  draw(context) {
    context.drawImage(this.background, 0, 0);
    this.boxs.forEach((box) => box.draw(context));
  }

  initMap() {
    this.background.src = "../asset/img/background/background.png";
    this.addBox(430,273);
    this.addBox(430,328);

    this.addBox(500,218);
    this.addBox(570,218);

    this.addBox(500,273);
    this.addBox(570,273);

    this.addBox(500,328);
    this.addBox(570,328);

    this.addBox(500,383);
    this.addBox(570,383);

    this.addBox(640,273);
    this.addBox(640,328);

  }
}
