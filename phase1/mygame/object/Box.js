import { CollisionManager } from "../handle/CollisionManager.js";
import { RectCollider } from "../handle/RectCollider.js";
import { Bullet } from "./Bullet.js";
import { Player } from "./Player.js";

export class Box {
  constructor(x, y) {
    this.x =x ;
    this.y =y;
    // this.type = type;
    this.health=30;
    this.img = new Image();
    this.img.src = `../asset/img/box/box_2.png`;
    this.width = this.img.width ;
    this.height = this.img.height ;
    // this.loadImage();

    this.collider = new RectCollider (x,y,this.width,this.height,this.onCollision.bind(this),this);
    CollisionManager.instance.addCollider(this.collider);
  }
  
  draw(context) {
    context.drawImage(this.img,this.x,this.y,this.width,this.height);
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    context.closePath();
  }
  
  loadImage() {
    this.img.onload = () => {
      this.width = this.img.width ;
      this.height = this.img.height ;
      // console.log(this.width);
      // console.log(this.height);
    };
    
  }

  onCollision(otherCollider){
    if(otherCollider.owner instanceof Bullet){
      this.health -= otherCollider.damage;
    } else if(otherCollider.owner instanceof Player){
      return;
    }
  }
}
