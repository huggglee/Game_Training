import { Box } from "./Box.js";
import { Bullet } from "./Bullet.js";

export class Map {
  constructor() {
    this.background = new Image();
    this.boxs = [];
    this.bullets=[];
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

    this.bullets.forEach((bullet)=>{
      bullet.draw(context);
      bullet.update();
    })
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

  shoot(x,y){
    for(let i =0;i<10;i++){
      this.bullets.push(new Bullet(x,y,i*Math.PI/5));
    }
  }
}
