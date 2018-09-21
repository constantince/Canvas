var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var WIDTH = 500;
var HEIGHT = 300;

var ballX = 100;
var ballY = 100;
var ballRadius = 20;

var dx = 1;
var dy = 1;




canvas.width = WIDTH;
canvas.height = HEIGHT;

function createStaicBall() {
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(200, 200, 50, 0, Math.PI / 180 * 360, false);
  ctx.closePath();
  ctx.fill();
}

function distance(x, y, x1, y1) {
    var dx = Math.pow(Math.abs(x - x1), 2);
    var dy = Math.pow(Math.abs(y - y1), 2);
    return Math.sqrt(dx + dy);
}


function Balls (x, y, dx, dy, radius, color = 'orange') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
}

Balls.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360);
  ctx.closePath();
  ctx.fill();
}

Balls.prototype.move = function() {
  
  for(let i=0; i<ballStack.length; i++) {
    if(ballStack[i] !== this && distance(this.x, this.y, ballStack[i].x, ballStack[i].y) < this.radius + ballRadius) {
      // console.log('......')
        this.dx = -this.dx;
        this.dy = -this.dy;
    }
  }
  
  if(this.x + this.radius >= WIDTH || this.x - this.radius < 0) {
      this.dx = -this.dx;
  }
  
  if(this.y + this.radius >= HEIGHT || this.y - this.radius < 0 ) {
      this.dy = -this.dy;
  }
  
  this.x += this.dx;
  this.y += this.dy;
}


function createStartPoint(x) {
  return Math.floor(Math.random() * (x - 2 * ballRadius));;
}

var ballStack = [];
var number = 2;

for(let i=0; i<number; i++) {
  let ball = new Balls(createStartPoint(WIDTH), createStartPoint(HEIGHT), dx, dy, ballRadius);
  ballStack.push(ball);
}


function animation(e) {
  ctx.clearRect(0, 0, 1000, 1000);
  for(let i=0; i<ballStack.length; i++) {
    ballStack[i].draw();
    ballStack[i].move();
  }
  requestAnimationFrame(animation);
}


 animation();



//createStaicBall();
//document.addEventListener('mousemove', animation);








