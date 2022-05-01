const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

class Sprite {
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

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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

const Neo = new Sprite({
  position: { x: 50, y: 0 },
  velocity: { x: 0, y: 0 },
  color: 'LemonChiffon',
  offsetSword: { x: 0, y: 0 },
  offsetKick: { x: 0, y: 100 },
});

const Smith = new Sprite({
  position: { x: 924, y: 0 },
  velocity: { x: 0, y: 0 },
  color: 'DarkSalmon',
  offsetSword: { x: -30, y: 0 },
  offsetKick: { x: -50, y: 100 },
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

function swordCollision({rectangle1, rectangle2}) {
  return (
    rectangle1.swordBox.position.x + rectangle1.swordBox.width >= rectangle2.position.x && rectangle1.swordBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.swordBox.position.y + rectangle1.swordBox.height >= rectangle2.position.y && rectangle1.swordBox.position.y <= rectangle2.position.y + rectangle2.height && rectangle1.isSwordAttacking)
}

function kickCollision({rectangle3, rectangle4}) {
  return (
    rectangle3.kickBox.position.x + rectangle3.kickBox.width >= rectangle4.position.x && rectangle3.kickBox.position.x <= rectangle4.position.x + rectangle4.width && rectangle3.kickBox.position.y + rectangle3.kickBox.height >= rectangle4.position.y && rectangle3.kickBox.position.y <= rectangle4.position.y + rectangle4.height && rectangle3.isKickAttacking)
}

function determineWinner({Neo, Smith, timerId}) {
  clearTimeout(timerId);
  document.querySelector('#gameResult').style.display = 'flex';
  if (Neo.health === Smith.health) {
    document.querySelector('#gameResult').innerHTML = 'Tie, Nobody wins, try harder next time...';
  } else if (Neo.health > Smith.health) {
    document.querySelector('#gameResult').innerHTML = 'Neo wins';
  } else if (Neo.health < Smith.health) {
    document.querySelector('#gameResult').innerHTML = 'Smith wins';
  }
}

let timer = 60;
let timerId
function decreaseTimer() {
  timerId = setTimeout(decreaseTimer, 1000);
  if (timer > 0) {
    timer --
    document.querySelector('#gameTimer').innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner ({Neo, Smith, timerId});
  }
}

decreaseTimer();

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
  if (swordCollision({rectangle1: Neo, rectangle2: Smith}) && Neo.isSwordAttacking) {
    Neo.isSwordAttacking = false;
    Smith.health -= 10;
    document.querySelector('#SmithHealth').style.width = Smith.health + '%';
    console.log('Neo Hit Smith');
  }

  if (kickCollision({rectangle3: Neo, rectangle4: Smith}) && Neo.isKickAttacking) {
    Neo.isKickAttacking = false;
    Smith.health -= 10;
    document.querySelector('#SmithHealth').style.width = Smith.health + '%';
    console.log('Neo Hit Smith');
  }

  if (swordCollision({rectangle1: Smith, rectangle2: Neo}) && Smith.isSwordAttacking) {
    Smith.isSwordAttacking = false;
    Neo.health -= 10;
    document.querySelector('#NeoHealth').style.width = Neo.health + '%';
    console.log('Smith Hit Neo');
  }

  if (kickCollision({rectangle3: Smith, rectangle4: Neo}) && Smith.isKickAttacking) {
    Smith.isKickAttacking = false;
    Neo.health -= 10;
    document.querySelector('#NeoHealth').style.width = Neo.health + '%';
    console.log('Smith Hit Neo');
  }

  // end game based on health
  if (Neo.health <= 0 || Smith.health <= 0) {
    determineWinner ({Neo, Smith, timerId});
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
    case 't':
      Neo.kickAttack();
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
    case 'p':
      Smith.kickAttack();
      break;
  }
});

window.addEventListener('keyup', (event) => {
  // console.log(event.key);
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