const canvas = document.getElementById('gravity');
const ctx = canvas.getContext('2d');
const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;
canvas.width = innerWidth;
canvas.height = innerHeight;

var x = 100;
var y = 100;
var radius = 30;
var dy = 10;
var gravity = 10;
var balls = [];
var valocity = 0.8;
const COLOR = ['#f17c67', '#495a80', '#edd0be', '#9966cc', '#7f1874', '#495a80', '#25c6fc'];

document.addEventListener('click', function() {
	balls.push(new Ball(undefined, undefined, radius, dy));
}, false);

function Ball(x, y, radius, dy) {
	this.x = x || Math.floor(Math.random() * (innerWidth - radius));
	this.y = y || Math.floor(Math.random() * (innerHeight - radius));
	this.radius = radius;
	this.dy = dy;
	this.color = COLOR[Math.floor(Math.random() * COLOR.length)];
}

Ball.prototype.draw = function() {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
	ctx.fillStyle = this.color;
	ctx.closePath();
	ctx.fill();
};

Ball.prototype.update = function() {
	if(this.y + this.radius + gravity + this.dy >= innerHeight) {
		this.dy = -this.dy * valocity;
	} else {
		this.dy += gravity; 
	}

	this.y += this.dy;
};

for (let i = 0; i < 1; i++) {
	balls.push(new Ball(x, y, radius, dy))
}

function animation() {
	
	ctx.clearRect(0, 0, innerWidth, innerHeight)
	for(let i=0; i<balls.length; i++) {
		balls[i].draw()
		balls[i].update();
	}
	requestAnimationFrame(animation);
}