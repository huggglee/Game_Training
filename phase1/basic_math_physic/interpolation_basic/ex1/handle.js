let canvas;
let context;
window.onload = init;

let circle = {
  position: { x: 50, y: 200 },
  radius: 20,
  color: "blue",
};

let animation = {
  start: { x: 50, y: 200 },
  end: { x: 500, y: 200 },
  duration: 2000, // in milliseconds
  startTime: null,
};

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  window.requestAnimationFrame(animateCircle); // Start the game loop
}
function lerp(start, end, t) {
  return start + (end - start) * t;
}

function easeOutQuad(t) {
  return t * (2 - t); // Quadratic easing
}
function easeInQuad(t) {
  return t * t;
}

function easeInOutQuad(t) {
  if (t < 0.5) {
    return 2 * t * t;
  } else {
    return 1 - ((-2 * t + 2) * (-2 * t + 2) * (-2 * t + 2)) / 2;
  }
}

let lastTime = 0;

function animateCircle(time) {
  if (!animation.startTime) animation.startTime = time;

  const deltaTime = time - lastTime;
  lastTime = time;

  const elapsed = time - animation.startTime;
  let t = Math.min(elapsed / animation.duration, 1);
  // t = easeOutQuad(t);
  t = easeInOutQuad(t);
  circle.position.x = lerp(animation.start.x, animation.end.x, t);
  circle.position.y = lerp(animation.start.y, animation.end.y, t);

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle(circle);

  if (t < 1) requestAnimationFrame(animateCircle);
}


function drawCircle({ position, radius, color }) {
  context.beginPath();
  context.arc(position.x, position.y, radius, 0, Math.PI * 2);
  context.fillStyle = color;
  context.fill();
}
