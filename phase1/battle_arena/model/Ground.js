import { RectCollider } from "../handle/RectCollider.js";

export class Ground extends RectCollider {
  constructor(x, y, width, height, imgSrc) {
    super(x, y, width, height);
    this.img = new Image();
    this.img.src = imgSrc;
  }

  draw(context) {
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
