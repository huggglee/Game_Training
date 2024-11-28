let canvas;
let context;
window.onload = init;

let rectangle = {
  x: 100,
  y: 100,
  width: 50,
  height: 50,
};

let animation = {
  start: { x: 50, y: 50 },
  end: { x: 400, y: 400 },
  duration: 2000, // in milliseconds
  startTime: null,
};

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  window.requestAnimationFrame(animateSquare); // Start the game loop
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
    return 1 - ((-2 * t + 2) * (-2 * t + 2)) / 2;
  }
}

let lastTime = 0;

function animateSquare(time) {
  if (!animation.startTime) animation.startTime = time;

  const deltaTime = time - lastTime;
  lastTime = time;

  const elapsed = time - animation.startTime;
  let t = Math.min(elapsed / animation.duration, 1);

  // Áp dụng easing (hoặc không)
  t = easeInOutQuad(t);

  // Điều chỉnh kích thước hình chữ nhật
  rectangle.width = lerp(animation.start.x, animation.end.x, t);
  rectangle.height = lerp(animation.start.y, animation.end.y, t);

  context.clearRect(0, 0, canvas.width, canvas.height);
  draw(rectangle);

  // Khi hoạt ảnh hoàn tất, đảo chiều (phóng to -> thu nhỏ hoặc ngược lại)
  if (t >= 1) {
    const temp = animation.start;
    animation.start = animation.end;
    animation.end = temp;
    animation.startTime = null; // Reset thời gian bắt đầu
  }
  console.log(t);
  requestAnimationFrame(animateSquare);
}

function draw(rect) {
  context.fillStyle = "green";
  context.fillRect(rect.x, rect.y, rect.width, rect.height);
}
