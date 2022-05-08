function swordCollision({rectangle1, rectangle2}) {
  return (
    rectangle1.swordBox.position.x + rectangle1.swordBox.width >= rectangle2.position.x && rectangle1.swordBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.swordBox.position.y + rectangle1.swordBox.height >= rectangle2.position.y && rectangle1.swordBox.position.y <= rectangle2.position.y + rectangle2.height && rectangle1.isSwordAttacking)
}

// function kickCollision({rectangle3, rectangle4}) {
//   return (
//     rectangle3.kickBox.position.x + rectangle3.kickBox.width >= rectangle4.position.x && rectangle3.kickBox.position.x <= rectangle4.position.x + rectangle4.width && rectangle3.kickBox.position.y + rectangle3.kickBox.height >= rectangle4.position.y && rectangle3.kickBox.position.y <= rectangle4.position.y + rectangle4.height && rectangle3.isKickAttacking)
// }

function replayGame () {
  document.querySelector('#replayButton').style.display = 'flex';
  document.querySelector('#replayButton').innerHTML = 'Replay';
  replayButton.addEventListener('click', function () {
    location.reload();
  }
  )
}

function determineWinner({Hero, Villain, timerId}) {
  clearTimeout(timerId);
  replayGame();
  document.querySelector('#gameResult').style.display = 'flex';
  if (Hero.health === Villain.health) {
    document.querySelector('#gameResult').innerHTML = 'Tie, Nobody wins, try harder next time...'
  } else if (Hero.health > Villain.health) {
    document.querySelector('#gameResult').innerHTML = 'Hero wins';
  } else if (Hero.health < Villain.health) {
    document.querySelector('#gameResult').innerHTML = 'Villain wins';
  }
}

let timer = 10;
let timerId
function decreaseTimer() {
  timerId = setTimeout(decreaseTimer, 1000);
  if (timer > 0) {
    timer --
    document.querySelector('#gameTimer').innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner ({Hero, Villain, timerId});
  }
}