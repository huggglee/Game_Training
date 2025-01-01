import { RectCollider } from "../handle/RectCollider.js";

export class Player extends RectCollider {
  constructor(x, y, imgSrc) {
    super(x, y);
    this.speed = 3;
    this.img = new Image();
    this.direction = "right";
    this.loadImage(imgSrc);
    this.gravity = 0;
    this.isOnGround = false;
  }

  update(inputController, grounds) {
    // console.log(this.isOnGround);
    console.log(this.jumpCount);
    
    this.checkIsOnGround(grounds);

    if (this.isOnGround) {
      this.gravity = 0;
      this.img.src = "../asset/img/player/gun/idle/idle.png";

    } else {
      this.gravity +=0.5;
    }

    this.y += this.gravity;

    if (inputController.isKeyPressed("ArrowLeft")) {
      this.x -= this.speed;
      this.direction = "left";
    }
    if (inputController.isKeyPressed("ArrowRight")) {
      this.x += this.speed;
      this.direction = "right";
    }

    if (inputController.isKeyPressed("ArrowUp")&& this.isOnGround ) {
        this.y -= 120; 
        this.img.src = "../asset/img/player/gun/jump/jump.png";
      
    } 

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }
  }

  loadImage(imgSrc) {
    this.img.src = imgSrc;
    this.img.onload = () => {
      this.width = this.img.width / 4;
      this.height = this.img.height / 4;
    };
    
  }

  draw(context) {
    context.save();
    if (this.direction === "left") {
      context.translate(this.x + this.width / 2, this.y + this.height / 2);
      context.scale(-1, 1); 
      context.translate(
        -(this.x + this.width / 2),
        -(this.y + this.height / 2)
      );
    }
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
    context.restore();

    // Vẽ hitbox
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
  }

  checkIsOnGround(grounds) {
    this.isOnGround = false;

    grounds.forEach((ground) => {
      const isHorizontallyAligned =
        this.x + this.width > ground.x && this.x < ground.x + ground.width;
      const isVerticallyAligned =
        this.y + this.height >= ground.y &&
        this.y + this.height <= ground.y + ground.height;

      if (isHorizontallyAligned && isVerticallyAligned) {
        this.isOnGround = true;
        this.y = ground.y - this.height; 
      }
    });
  }
}
