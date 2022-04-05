const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey 
  };

  draw() {
    context.fillStyle = '#bbb';
    context.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else 
    this.velocity.y += gravity;
  }
}

const Neo = new Sprite({
  position: { x: 50, y: 0 },
  velocity: { x: 0, y: 0 }
});

const Smith = new Sprite({
  position: { x: 924, y: 0 },
  velocity: { x: 0, y: 0 }
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