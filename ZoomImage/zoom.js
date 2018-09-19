var img = new Image();
img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
img.onload = function() {
  draw(img);
};
var warpper = document.getElementById('canvas-warpper');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var zoomctx = document.getElementById('zoom').getContext('2d');
var block = document.getElementById('canvas-block');
var blockctx = block.getContext('2d');
function draw(img) {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
}

function drawRectTangle(x, y) {
  blockctx.globalAlpha = '0.4';
  blockctx.fillStyle = "red";
  blockctx.fillRect(x, y, 60, 45.4);
  blockctx.fill();
}

var zoom = function(event) {
    var x = event.layerX;
    var y = event.layerY;
    zoomctx.clearRect(0,0, 1000,1000);
    zoomctx.drawImage(canvas, x - 30,  y - 20, 60, 45.4, 0, 0, 300, 227);
};

function moveTheRectTangle(e) {
  blockctx.clearRect(0,0, 1000, 1000);
  drawRectTangle(e.layerX - 30, e.layerY - 20);
}

function combination(e) {
  moveTheRectTangle(e);
  zoom(e);
}

function hideRectTangle() {
  blockctx.clearRect(0, 0, 1000,1000);
  zoomctx.clearRect(0,0, 1000,1000);
}

warpper.addEventListener('mousemove', combination);
warpper.addEventListener('mouseout', hideRectTangle);