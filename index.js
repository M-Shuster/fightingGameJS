const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.6;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './Assets/background.png',
});

const shop = new Sprite({
  position: {
    x: 620,
    y: 160,
  },
  imageSrc: './Assets/shop.png',
  scale: 2.5,
  framesMax: 6,
});

const Neo = new Fighter({
  position: { x: 50, y: 0 },
  velocity: { x: 0, y: 0 },
  color: 'LemonChiffon',
  offsetSword: { x: 0, y: 0 },
  offsetKick: { x: 0, y: 100 },
  imageSrc: './Assets/Hero/Idle.png',
  framesMax: 10,
  scale: 2.25,
  offset: { x: 196 , y: 76 },
});

const Smith = new Fighter({
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

decreaseTimer();

function endlessFight() {
  window.requestAnimationFrame(endlessFight);
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  Neo.update();
  // Smith.update();

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