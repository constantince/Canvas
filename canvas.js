var canvas = document.getElementById('canvas');
var innerHeight = window.innerHeight;
var innerWidth = window.innerWidth;
canvas.height = innerHeight;
canvas.width = innerWidth;
var ctx = canvas.getContext("2d");

var mouse = {
	x: 0,
	y: 0
}

var timer = 'start';

function createCicle (e) {
	// console.log(e);
	var x = mouse.x + radius;
	var y = mouse.y + radius;
	var dx = (Math.random() - 0.5 ) * 8;
	var dy = (Math.random() - 0.5 ) * 8;
	var colors = color[Math.floor(Math.random() * 6)];
	circleArray.push(new createCircle(x, y, dx, dy, radius, colors));
	if(timer !== null) {
		setTimeout(function() {
			createCicle(e);
		}, 50);
	}
}

document.addEventListener('mousemove', function(e){
	mouse.x = e.clientX;
	mouse.y = e.clientY;
}, false);

document.addEventListener('mousedown', function(e){
	timer = 'start';
	createCicle(e);
	
}, false);

document.addEventListener('mouseup', function(e){
	timer = null;
}, false)



// ctx.fillStyle = "rgb(200,0,0)";
// ctx.strokeRect(10, 10, 55, 50);
// ctx.fillRect (10, 10, 55, 50);
// ctx.clearRect(0, 10, 55, 50);
// var x = 0;
// var width = 50;
// var speed = 5;



var x = 200;
var y = 200;
var speedx= 5;
var speedy = 5;
var radius = 10;
var sanlie = 20;
var circleLimit = 30;
const color = ['#f17c67', '#495a80', '#edd0be', '#9966cc', '#7f1874', '#495a80', '#25c6fc'];

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
		// ctx.strokeStyle = 'red';
		// ctx.stroke();
	}

	this.update = function() {
		// console.log(this.x, this.y, this.radius);
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		if((this.x - mouse.x <= this.radius + sanlie && this.x - mouse.x >= -this.radius - sanlie ) && (this.y - mouse.y <= this.radius + sanlie && this.y - mouse.y >= -this.radius - sanlie) && this.radius <= circleLimit) {
			this.radius += 2;
		} else if(this.radius > radius ){
			this.radius += -1;
		}


		this.x += this.dx;
		this.y += this.dy;

		this.draw()
	}
}

var circleArray = [];
var number = 1;
for(var i=0; i<number; i++) {
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerWidth - radius * 2) + radius;
	var dx = (Math.random() - 0.5 ) * 8;
	var dy = (Math.random() - 0.5 ) * 8;
	var colors = color[Math.floor(Math.random() * 6)];
	circleArray.push(new createCircle(x, y, dx, dy, radius, colors));
}

function animation () {
	ctx.clearRect(0, 0, innerWidth,innerHeight,  Math.PI * 2, false);
	requestAnimationFrame(animation);
	
	for(var i=0; i<circleArray.length; i++) {
		circleArray[i].update();
	}

	
}

animation();



