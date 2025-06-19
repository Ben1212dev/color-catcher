const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");
const scoreEl = document.getElementById("score");

let score = 0;
let gameInterval;
let ballInterval;
let isGameOver = false;

document.addEventListener("keydown", (e) => {
  if (isGameOver) return;
  const left = parseInt(window.getComputedStyle(player).left);
  if (e.key === "ArrowLeft" && left > 0) {
    player.style.left = `${left - 20}px`;
  } else if (e.key === "ArrowRight" && left < 340) {
    player.style.left = `${left + 20}px`;
  }
});

function startGame() {
  clearInterval(ballInterval);
  clearInterval(gameInterval);
  document.querySelectorAll(".ball").forEach(ball => ball.remove());
  score = 0;
  isGameOver = false;
  scoreEl.textContent = score;

  ballInterval = setInterval(createBall, 800);
  gameInterval = setInterval(moveBalls, 20);
}

function createBall() {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  const isGreen = Math.random() < 0.7;
  ball.style.backgroundColor = isGreen ? "green" : "red";
  ball.dataset.color = isGreen ? "green" : "red";
  ball.style.left = `${Math.floor(Math.random() * 380)}px`;
  ball.style.top = "0px";
  gameContainer.appendChild(ball);
}

function moveBalls() {
  const balls = document.querySelectorAll(".ball");
  balls.forEach(ball => {
    let top = parseInt(ball.style.top);
    top += 4;
    ball.style.top = `${top}px`;

    if (top > 580) {
      const playerLeft = parseInt(window.getComputedStyle(player).left);
      const ballLeft = parseInt(ball.style.left);

      if (ballLeft > playerLeft - 20 && ballLeft < playerLeft + 60) {
        if (ball.dataset.color === "green") {
          score += 1;
          scoreEl.textContent = score;
        } else {
          endGame();
        }
        ball.remove();
      } else if (top > 600) {
        ball.remove();
      }
    }
  });
}

function endGame() {
  clearInterval(ballInterval);
  clearInterval(gameInterval);
  isGameOver = true;
  alert("Game Over! Your score: " + score);
}
