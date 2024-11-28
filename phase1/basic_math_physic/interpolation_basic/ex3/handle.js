let canvas;
let context;
window.onload = init;

let rectangle = {
  x: 0, // Sẽ được tính toán lại
  y: 0, // Sẽ được tính toán lại
  width: 50,
  height: 50,
};

let circle = {
  x: 200, // Tâm hình tròn
  y: 200, // Tâm hình tròn
  radius: 100, // Bán kính quỹ đạo
};

let animation = {
  duration: 2000, // Thời gian di chuyển một vòng (millisecond)
  startTime: null,
};

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  window.requestAnimationFrame(animateRectangle); // Bắt đầu vòng lặp
}

function animateRectangle(time) {
  if (!animation.startTime) animation.startTime = time;

  const elapsed = time - animation.startTime;
  let t = Math.min(elapsed / animation.duration, 1);

  // Tính góc (theta) theo thời gian t (quay 360°/chu kỳ)
  let theta = t * 2 * Math.PI;

  // Tính tọa độ hình chữ nhật trên quỹ đạo tròn
  // x = xC+ R*cos(a)
  rectangle.x = circle.x + circle.radius * Math.cos(theta) - rectangle.height/2 ;
  rectangle.y = circle.y + circle.radius * Math.sin(theta) - rectangle.width/2;


  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle(circle);
  drawRect(rectangle);

  if (t >= 1) {
    const temp = animation.start;
    animation.start = animation.end;
    animation.end = temp;
    animation.startTime = null; 
  }
  requestAnimationFrame(animateRectangle);
}

function drawRect(rect) {
  context.fillStyle = "green";
  context.fillRect(rect.x, rect.y, rect.width, rect.height);
}

function drawCircle(circle){
  context.beginPath();
  context.strokeStyle="gray";
  context.arc(circle.x,circle.y,circle.radius,0,2*Math.PI);
  context.stroke();
  context.closePath();
}
