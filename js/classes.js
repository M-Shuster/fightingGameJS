class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

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