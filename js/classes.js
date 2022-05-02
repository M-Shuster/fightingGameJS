class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 6;
    this.offset = offset;
    }

  draw() {
    context.drawImage(
      this.image, 
      (this.image.width / this.framesMax) * this.framesCurrent,
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y, 
      (this.image.width / this.framesMax) * this.scale, 
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed ++;

    if(this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent ++;
      } else {
      this.framesCurrent = 0;  
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
};

class Fighter extends Sprite {
  constructor({ position, 
    velocity, 
    color, 
    offsetSword, 
    offsetKick, 
    imageSrc, 
    scale = 1, 
    framesMax = 1, 
    offset = { x: 0, y: 0 }
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    })
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey
    this.swordBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offsetSword,
      width: 80,
      height: 50,
    }
    this.kickBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offsetKick,
      width: 100,
      height: 50,
    }
    this.color = color;
    this.isSwordAttacking;
    this.isKickAttacking;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 6;
  };

  update() {
    this.draw();
    this.animateFrames();
    this.swordBox.position.x = this.position.x + this.swordBox.offsetSword.x;
    this.swordBox.position.y = this.position.y
    this.kickBox.position.x = this.position.x + this.kickBox.offsetKick.x;
    this.kickBox.position.y = this.position.y + 100;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
    } else 
    this.velocity.y += gravity;
  }

  attack() {
    this.isSwordAttacking = true;
    setTimeout(() => {
      this.isSwordAttacking = false;
    }, 100);
  }
  kickAttack() {
    this.isKickAttacking = true;
    setTimeout(() => {
      this.isKickAttacking = false;
    }, 100);
  }
}