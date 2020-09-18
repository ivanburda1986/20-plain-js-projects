const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

//Create ball properties
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

//Create paddle properties
const paddle = {
  x: canvas.width / 2 - 40, //the paddle width is going to be 80px and to move it to the middle we use the -40
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0, //the paddle is going to move only on the x-axis, so only dx, not the dy is needed
};

//Create brick properties
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

//Create bricks
let bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}
//Draw the ball on the canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

//Draw the paddle on the canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

//Draw bricks on the canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

//Draw score on the canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

//Move paddle on the canvas
function movePaddle() {
  paddle.x += paddle.dx;

  //Wall detection
  if (paddle.x + paddle.w > canvas.width - 5) {
    paddle.x = canvas.width - paddle.w - 5;
  }
  if (paddle.x < 5) {
    paddle.x = 5;
  }
}

//Move the ball on the canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  //Wall collision detection (right and left walls)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; //this notation is the same as ball.dx = ball.dx * -1;
  }

  //Wall collision detection (top and bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
  //Paddle collision detection
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  //Brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible === true) {
        if (
          ball.x - ball.size > brick.x && //left brick-side check
          ball.x + ball.size < brick.x + brick.w && //right brick-side check
          ball.y + ball.size > brick.y && //top brick-side check
          ball.y - ball.size < brick.y + brick.h //bottom brick-side check
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });

  //Hit bottom of the canvas -> loose the game
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

//Increase score
function increaseScore() {
  score++;
  if (score % (brickRowCount * brickColumnCount) === 0) {
    showAllBricks();
  }
}

//Make all bricks appear
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

//Draw everything
function draw() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  drawScore();
  drawBricks();
}

//Update canvas drawing and animation
function update() {
  moveBall();
  movePaddle();

  draw();

  //Request animation frame
  requestAnimationFrame(update);
}
update();

//keyDown event
function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

//keyUp event
function keyUp(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = 0;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = 0;
  }
}

//Keyboard event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//Event listened
rulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));
