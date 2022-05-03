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

const Hero = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  imageSrc: './Assets/Hero/Idle.png',
  framesMax: 10,
  scale: 2.25,
  offset: { x: 120 , y: 76 },
  sprites: {
    idle: {
      imageSrc: './Assets/Hero/Idle.png',
      framesMax: 10,
    },
    run: {
      imageSrc: './Assets/Hero/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './Assets/Hero/Jump.png',
      framesMax: 3,
    },
    fall: {
      imageSrc: './Assets/Hero/Fall.png',
      framesMax: 3,
    },
    attack1: {
      imageSrc: './Assets/Hero/Attack1.png',
      framesMax: 7,
    },
    takeHit: {
      imageSrc: './Assets/Hero/TakeHit.png',
      framesMax: 3,
    },
  },
  swordBox: {
    offset: {
      x: 120,
      y: 70,
    },
    width: 80,
    height: 50,
  }
});

const Villain = new Fighter({
  position: { x: 924, y: 0 },
  velocity: { x: 0, y: 0 },
  imageSrc: './Assets/Villain/Idle.png',
  framesMax: 10,
  scale: 2.25,
  offset: { x: 180 , y: 36 },
  sprites: {
    idle: {
      imageSrc: './Assets/Villain/Idle.png',
      framesMax: 10,
    },
    run: {
      imageSrc: './Assets/Villain/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './Assets/Villain/Jump.png',
      framesMax: 3,
    },
    fall: {
      imageSrc: './Assets/Villain/Fall.png',
      framesMax: 3,
    },
    attack1: {
      imageSrc: './Assets/Villain/Attack1.png',
      framesMax: 7,
    },
    takeHit: {
      imageSrc: './Assets/Villain/TakeHit.png',
      framesMax: 3,
    },

  },
  swordBox: {
    offset: {
      x: -175,
      y: 80,
    },
    width: 100,
    height: 60,
  }
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
  Hero.update();
  Villain.update();

  Hero.velocity.x = 0;
  Villain.velocity.x = 0;

  // Hero movement
  if (keys.a.pressed && Hero.lastKey === 'a') {
    Hero.velocity.x = -5;
    Hero.switchSprite('run');
    Hero.framesMax = Hero.sprites.run.framesMax;
  } else if (keys.d.pressed && Hero.lastKey === 'd') {
    Hero.velocity.x = 5;
    Hero.switchSprite('run');
  } else {
    Hero.switchSprite('idle');
  }

  // jumping
  if (Hero.velocity.y < 0) {
    Hero.switchSprite('jump');
  } else if (Hero.velocity.y > 0) {
    Hero.switchSprite('fall');
  }

  // Villain movement
  if (keys.ArrowLeft.pressed && Villain.lastKey === 'ArrowLeft') {
    Villain.velocity.x = -5;
    Villain.switchSprite('run');
    Villain.framesMax = Hero.sprites.run.framesMax;
  } else if (keys.ArrowRight.pressed && Villain.lastKey === 'ArrowRight') {
    Villain.velocity.x = 5;
    Villain.switchSprite('run');
  } else {
    Villain.switchSprite('idle');
  }

  // jumping
  if (Villain.velocity.y < 0) {
    Villain.switchSprite('jump');
  } else if (Villain.velocity.y > 0) {
    Villain.switchSprite('fall');
  }

  // detect collision & enemy gets hit
  if (swordCollision({
    rectangle1: Hero, 
    rectangle2: Villain,
  }) && 
  Hero.isSwordAttacking && 
  Hero.framesCurrent === 4) {
    Villain.takeHit();
    Hero.isSwordAttacking = false;
    document.querySelector('#VillainHealth').style.width = Villain.health + '%';
    console.log('Hero Hit Villain');
  }

  // if Hero misses
  if (Hero.isSwordAttacking && Hero.framesCurrent === 4) {
    Hero.isSwordAttacking = false;
  };

  // if (kickCollision({rectangle3: Hero, rectangle4: Villain}) && Hero.isKickAttacking) {
  //   Hero.isKickAttacking = false;
  //   Villain.health -= 10;
  //   document.querySelector('#VillainHealth').style.width = Villain.health + '%';
  //   console.log('Hero Hit Villain');
  // }

  if (swordCollision({
    rectangle1: Villain,
    rectangle2: Hero,
    }) && 
  Villain.isSwordAttacking && 
  Villain.framesCurrent === 3) {
    Hero.takeHit();
    Villain.isSwordAttacking = false;
    document.querySelector('#HeroHealth').style.width = Hero.health + '%';
    console.log('Villain Hit Hero');
  }

   // if Villain misses
   if (Villain.isSwordAttacking && Villain.framesCurrent === 3) {
    Villain.isSwordAttacking = false;
  };

  // if (kickCollision({rectangle3: Villain, rectangle4: Hero}) && Villain.isKickAttacking) {
  //   Villain.isKickAttacking = false;
  //   Hero.health -= 10;
  //   document.querySelector('#HeroHealth').style.width = Hero.health + '%';
  //   console.log('Villain Hit Hero');
  // }

  // end game based on health
  if (Hero.health <= 0 || Villain.health <= 0) {
    determineWinner ({Hero, Villain, timerId});
  }
}

endlessFight();

window.addEventListener('keydown', (event) => {
  switch (event.key) {

    // Hero Keys
    case 'a':
      keys.a.pressed = true;
      Hero.lastKey = 'a';
      break;
    case 'd':
      keys.d.pressed = true;
      Hero.lastKey = 'd';
      break;
    case 'w':
      Hero.velocity.y = -20;
      break;
    case 'r':
      Hero.attack();
      break;
    // case 't':
    //   Hero.kickAttack();
    //   break;

      // Villain Keys
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      Villain.lastKey = 'ArrowLeft';
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      Villain.lastKey = 'ArrowRight';
      break;
    case 'ArrowUp':
      Villain.velocity.y = -20;
      break;
    case '[':
      Villain.attack();
      break;
    // case 'p':
    //   Villain.kickAttack();
    //   break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    // Hero Keys
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;

      // Villain Keys
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
  }
  }
);