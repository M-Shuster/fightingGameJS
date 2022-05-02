class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1}) {
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
    }

  draw() {
    context.drawImage(
      this.image, 
      (this.image.width / this.framesMax) * this.framesCurrent,
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x, 
      this.position.y, 
      (this.image.width / this.framesMax) * this.scale, 
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.framesElapsed ++;
    if(this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent ++;
      } else {
      this.framesCurrent = 0;  
      }
    }
  }
};

class Fighter {
  constructor({ position, velocity, color, offsetSword, offsetKick }) {
    this.position = position;
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
  };

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);

    // attack box drawn here
    if (this.isSwordAttacking) {
      context.fillStyle = 'dodgerblue';
      context.fillRect(this.swordBox.position.x, this.swordBox.position.y, this.swordBox.width, this.swordBox.height);
    }
    if (this.isKickAttacking) {
      context.fillStyle = 'gold';
      context.fillRect(this.kickBox.position.x, this.kickBox.position.y, this.kickBox.width, this.kickBox.height);
    }
  }

  update() {
    this.draw();
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