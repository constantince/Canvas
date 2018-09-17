var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");


var innerHeight = window.innerHeight;
var innerWidth = window.innerWidth;
canvas.height = innerHeight;
canvas.width = innerWidth;


const X = 200
const Y = 200;
const SPEEDX= 5;
const SPEEDY = 5;
const RADIUS = 10;
const DISTANCE = 20;
const CIRCLELIMIT = 30;
const MOUSE = {x: null, y: null}
const NUMBER = 1;
const COLOR = ['#f17c67', '#495a80', '#edd0be', '#9966cc', '#7f1874', '#495a80', '#25c6fc'];
const SPEED = 8;

var circleArray = [];

var timer = 'start';


function createProtoCicle (x, y) {
	const dx = (Math.random() - 0.5 ) * SPEED;
	const dy = (Math.random() - 0.5 ) * SPEED;
	const colors = COLOR[Math.floor(Math.random() * 6)];
	circleArray.push(new createCircle(x, y, dx, dy, RADIUS, colors));
}



function createCicle (e) {
	createProtoCicle(MOUSE.x, MOUSE.y);
	if(timer !== null) {
		setTimeout(function() {
			createCicle(e);
		}, 50);
	}
}

document.addEventListener('mousemove', function(e){
	MOUSE.x = e.clientX;
	MOUSE.y = e.clientY;
}, false);

document.addEventListener('mousedown', function(e){
	timer = 'start';
	createCicle(e);
	
}, false);

document.addEventListener('mouseup', function(e){
	timer = null;
}, false)


function createCircle(x, y, dx, dy, radius, colors) {
	this.x = x;
	this.y = y;
	this.dx = dx; 
	this.dy = dy;
	this.radius = radius;
	this.color = colors;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill()
	}

	this.update = function() {
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		if((this.x - MOUSE.x <= this.radius + DISTANCE && this.x - MOUSE.x >= -this.radius - DISTANCE ) && (this.y - MOUSE.y <= this.radius + DISTANCE && this.y - MOUSE.y >= -this.radius - DISTANCE) && this.radius <= CIRCLELIMIT) {
			this.radius += 2;
		} else if(this.radius > radius ){
			this.radius += -1;
		}


		this.x += this.dx;
		this.y += this.dy;

		this.draw()
	}
}

function animation () {
	ctx.clearRect(0, 0, innerWidth,innerHeight,  Math.PI * 2, false);
	requestAnimationFrame(animation);
	for(var i=0; i<circleArray.length; i++) {
		circleArray[i].update();
	}
}

//animation();



