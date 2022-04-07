const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

class Sprite {
  constructor({ position, velocity, color, offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey
    // add kicking to this later and change this to punch/sword attack
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    }
    this.color = color
    this.isAttacking
  };

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);

    // attack box drawn here
    if (this.isAttacking) {
      context.fillStyle = 'dodgerblue';
      context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    }
  }

  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else 
    this.velocity.y += gravity;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const Neo = new Sprite({
  position: { x: 50, y: 0 },
  velocity: { x: 0, y: 0 },
  color: 'LemonChiffon',
  offset: { x: 0, y: 0 },
});

const Smith = new Sprite({
  position: { x: 924, y: 0 },
  velocity: { x: 0, y: 0 },
  color: 'DarkSalmon',
  offset: { x: -50, y: 0 },
});

const keys  = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

function endlessFight() {
  window.requestAnimationFrame(endlessFight);
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  Neo.update();
  Smith.update();

  Neo.velocity.x = 0;
  Smith.velocity.x = 0;

  // Neo movement
  if (keys.a.pressed && Neo.lastKey === 'a') {
    Neo.velocity.x = -5;
  } else if (keys.d.pressed && Neo.lastKey === 'd') {
    Neo.velocity.x = 5;
  } 

  // Smith movement
  if (keys.ArrowLeft.pressed && Smith.lastKey === 'ArrowLeft') {
    Smith.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && Smith.lastKey === 'ArrowRight') {
    Smith.velocity.x = 5;
  }

  // detect collision
  if (Neo.attackBox.position.x + Neo.attackBox.width >= Smith.position.x && Neo.attackBox.position.x <= Smith.position.x + Smith.width && Neo.attackBox.position.y + Neo.attackBox.height >= Smith.position.y && Neo.attackBox.position.y <= Smith.position.y + Smith.height && Neo.isAttacking) {
    Neo.isAttacking = false;
    console.log('collision');
  }
}

endlessFight();

window.addEventListener('keydown', (event) => {
  switch (event.key) {

    // Neo Keys
    case 'a':
      keys.a.pressed = true;
      Neo.lastKey = 'a';
      break;
    case 'd':
      keys.d.pressed = true;
      Neo.lastKey = 'd';
      break;
    case 'w':
      Neo.velocity.y = -20;
      break;
    case 'r':
      Neo.attack();
      break;

      // Smith Keys
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      Smith.lastKey = 'ArrowLeft';
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      Smith.lastKey = 'ArrowRight';
      break;
    case 'ArrowUp':
      Smith.velocity.y = -20;
      break;
    case '[':
      Smith.attack();
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    // Neo Keys
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;

      // Smith Keys
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
  }
  }
);