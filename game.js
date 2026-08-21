const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const statusElement = document.getElementById("status");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restartButton");

const player = {
  x: canvas.width / 2 - 15,
  y: canvas.height / 2 - 15,
  width: 30,
  height: 30,
  speed: 5
};

const keys = {};
let enemies = [];
let gameOver = false;
let score = 0;
let lastEnemySpawn = 0;
let lastScoreUpdate = 0;

document.addEventListener("keydown", (event) => {
  keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.key.toLowerCase()] = false;
});

restartButton.addEventListener("click", restartGame);

function updatePlayer() {
  if (keys["arrowup"] || keys["w"]) {
    player.y -= player.speed;
  }

  if (keys["arrowdown"] || keys["s"]) {
    player.y += player.speed;
  }

  if (keys["arrowleft"] || keys["a"]) {
    player.x -= player.speed;
  }

  if (keys["arrowright"] || keys["d"]) {
    player.x += player.speed;
  }

  player.x = Math.max(
    0,
    Math.min(canvas.width - player.width, player.x)
  );

  player.y = Math.max(
    0,
    Math.min(canvas.height - player.height, player.y)
  );
}

function spawnEnemy() {
  const size = 24;
  const side = Math.floor(Math.random() * 4);

  let x;
  let y;

  if (side === 0) {
    x = Math.random() * (canvas.width - size);
    y = -size;
  } else if (side === 1) {
    x = canvas.width;
    y = Math.random() * (canvas.height - size);
  } else if (side === 2) {
    x = Math.random() * (canvas.width - size);
    y = canvas.height;
  } else {
    x = -size;
    y = Math.random() * (canvas.height - size);
  }

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;

  const dx = centerX - x;
  const dy = centerY - y;
  const distance = Math.hypot(dx, dy);

  enemies.push({
    x,
    y,
    width: size,
    height: size,
    vx: (dx / distance) * 2.2,
    vy: (dy / distance) * 2.2
  });
}

function updateEnemies() {
  for (const enemy of enemies) {
    enemy.x += enemy.vx;
    enemy.y += enemy.vy;

    if (isColliding(player, enemy)) {
      gameOver = true;
      statusElement.textContent = "Game Over";
    }
  }
}

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function drawPlayer() {
  ctx.fillStyle = "#22c55e";
  ctx.fillRect(
    player.x,
    player.y,
    player.width,
    player.height
  );
}

function drawEnemies() {
  ctx.fillStyle = "#ef4444";

  for (const enemy of enemies) {
    ctx.fillRect(
      enemy.x,
      enemy.y,
      enemy.width,
      enemy.height
    );
  }
}

function drawGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "48px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "GAME OVER",
    canvas.width / 2,
    canvas.height / 2
  );
}

function restartGame() {
  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height / 2 - player.height / 2;

  enemies = [];
  gameOver = false;
  score = 0;
  lastEnemySpawn = performance.now();
  lastScoreUpdate = performance.now();

  statusElement.textContent = "Survive!";
  scoreElement.textContent = "Score: 0";
}

function gameLoop(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameOver) {
    updatePlayer();
    updateEnemies();

    if (timestamp - lastEnemySpawn > 900) {
      spawnEnemy();
      lastEnemySpawn = timestamp;
    }

    if (timestamp - lastScoreUpdate > 1000) {
      score += 1;
      scoreElement.textContent = `Score: ${score}`;
      lastScoreUpdate = timestamp;
    }
  }

  drawPlayer();
  drawEnemies();

  if (gameOver) {
    drawGameOver();
  }

  requestAnimationFrame(gameLoop);
}

restartGame();
requestAnimationFrame(gameLoop);