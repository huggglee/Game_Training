import { Rectangle } from "../handle/Rectangle.js";
import { Circle } from "../handle/Circle.js";

let canvas;
let context;
let gameObjects;
let oldTimeStamp = 0;
let secondsPassed;
let potentialCollisions;
const cellSize = 50; // Size of each cell in the grid

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  createWorld();
  drawGrid();
  initGrid();
  // Start the first frame request
  window.requestAnimationFrame(gameLoop);
}

function createWorld() {
  gameObjects = [
    new Circle(context, 50, 50, 100, 150, 20, 1, 1),
    new Circle(context, 100, 50, 70, 70, 20, 1, 1),
    new Circle(context, 400, 300, -70, 100, 20, 1, 1),
    new Rectangle(context, 200, 300, -60, -100, 1, 1),
    new Rectangle(context, 400, 100, 80, 100, 1, 1),
    new Rectangle(context, 500, 50, -50, -100, 1, 1),
    new Rectangle(context, 30, 300, -50, -100, 1, 1),
  ];
}

function drawGrid() {
  const cols = Math.ceil(canvas.width / cellSize);
  const rows = Math.ceil(canvas.height / cellSize);
  context.strokeStyle = "gray";
  context.lineWidth = 0.5;

  // Draw vertical lines
  for (let x = 0; x <= canvas.width; x += cellSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  // Draw horizontal lines
  for (let y = 0; y <= canvas.height; y += cellSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }
}

let grid = []; // Lưới chứa các ô
function initGrid() {
  const cols = Math.ceil(canvas.width / cellSize);
  const rows = Math.ceil(canvas.height / cellSize);
  grid = Array.from({ length: cols * rows }, () => []);
}

// function getCellIndex(x, y) {
//   const col = Math.floor(x / cellSize);
//   const row = Math.floor(y / cellSize);
//   const cols = Math.ceil(canvas.width / cellSize);
//   return row * cols + col;
// }

// Gán đối tượng vào ô trong lưới
function addObjectToGrid(object) {
  const cells = getHighlightCells(object);
  cells.forEach((cell) => {
    if (grid[cell]) grid[cell].push(object);
  });
}

function areCellsOverlapping(cells1, cells2) {
  const set1 = new Set(cells1);
  for (const cell of cells2) {
    if (set1.has(cell)) return true;
  }
  return false;
}

function getHighlightCells(object) {
  const startCol = Math.floor((object.x - (object.radius || 0)) / cellSize);
  const endCol = Math.floor(
    (object.x + (object.width || object.radius )) / cellSize
  );
  const startRow = Math.floor((object.y - (object.radius || 0)) / cellSize);
  const endRow = Math.floor(
    (object.y + (object.height || object.radius )) / cellSize
  );

  const cols = Math.ceil(canvas.width / cellSize);
  const cells = [];

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (
        row >= 0 &&
        col >= 0 &&
        row < canvas.height / cellSize &&
        col < canvas.width / cellSize
      ) {
        cells.push(row * cols + col);
      }
    }
  }

  return cells;
}

function broadPhaseDetection() {
  potentialCollisions = [];

  // Reset lưới trước
  grid.forEach((cell) => (cell.length = 0));

  // Thêm tất cả các đối tượng vào lưới
  gameObjects.forEach((obj) => addObjectToGrid(obj));

  // Kiểm tra các ô và tìm cặp va chạm
  for (let i = 0; i < grid.length; i++) {
    const objectsInCell = grid[i];
    if (objectsInCell.length > 1) {
      for (let j = 0; j < objectsInCell.length - 1; j++) {
        for (let k = j + 1; k < objectsInCell.length; k++) {
          const obj1 = objectsInCell[j];
          const obj2 = objectsInCell[k];

          // Lấy danh sách các ô mà các đối tượng chiếm dụng
          const cellsObj1 = getHighlightCells(obj1);
          const cellsObj2 = getHighlightCells(obj2);

          // Kiểm tra nếu các ô highlight của chúng chồng lấn
          if (areCellsOverlapping(cellsObj1, cellsObj2)) {
            potentialCollisions.push([obj1, obj2]);
          }
        }
      }
    }
  }

  return potentialCollisions;
}

function detect_collision() {
  let obj1;
  let obj2;

  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].isColliding = false;
  }

  potentialCollisions = broadPhaseDetection();
  console.log(potentialCollisions);
  for (let i = 0; i < potentialCollisions.length; i++) {
    [obj1, obj2] = potentialCollisions[i];
    if (obj1 instanceof Rectangle && obj2 instanceof Rectangle) {
      if (rectIntersect(obj1, obj2)) {
        obj1.isColliding = true;
        obj2.isColliding = true;
        handleCollision(obj1, obj2);
      }
    } else if (obj1 instanceof Circle && obj2 instanceof Circle) {
      if (circleIntersect(obj1, obj2)) {
        obj1.isColliding = true;
        obj2.isColliding = true;
        handleCollision(obj1, obj2);
      }
    } else if (
      (obj1 instanceof Rectangle && obj2 instanceof Circle) ||
      (obj1 instanceof Circle && obj2 instanceof Rectangle)
    ) {
      let rect = obj1 instanceof Rectangle ? obj1 : obj2;
      let cir = obj1 instanceof Circle ? obj1 : obj2;

      if (rectCirIntersect(rect, cir)) {
        obj1.isColliding = true;
        obj2.isColliding = true;
        handleCollision(obj1, obj2);
      }
    }
  }
}

function handleCollision(obj1, obj2) {
  let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
  let distance = Math.sqrt(
    (obj2.x - obj1.x) * (obj2.x - obj1.x) +
      (obj2.y - obj1.y) * (obj2.y - obj1.y)
  );
  let vCollisionNorm = {
    x: vCollision.x / distance,
    y: vCollision.y / distance,
  };
  let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
  let speed =
    vRelativeVelocity.x * vCollisionNorm.x +
    vRelativeVelocity.y * vCollisionNorm.y;
  speed *= Math.min(obj1.restitution, obj2.restitution);
  if (speed < 0) return;
  let impulse = (2 * speed) / (obj1.mass + obj2.mass);
  obj1.vx -= impulse * obj2.mass * vCollisionNorm.x;
  obj1.vy -= impulse * obj2.mass * vCollisionNorm.y;
  obj2.vx += impulse * obj1.mass * vCollisionNorm.x;
  obj2.vy += impulse * obj1.mass * vCollisionNorm.y;
}

//detection rectangle
function rectIntersect(rect1, rect2) {
  // Check x and y for overlap
  if (
    rect1.x + rect1.width > rect2.x &&
    rect1.x < rect2.x + rect2.width &&
    rect1.y + rect1.height > rect2.y &&
    rect1.y < rect2.y + rect2.height
  ) {
    return true;
  } else return false;
}

// dectection circle
function circleIntersect(cir1, cir2) {
  // Calculate the distance between the two circles
  let squareDistance =
    (cir1.x - cir2.x) * (cir1.x - cir2.x) +
    (cir1.y - cir2.y) * (cir1.y - cir2.y);

  // When the distance is smaller or equal to the sum
  // of the two radius, the circles touch or overlap
  return squareDistance <= (cir1.radius + cir2.radius) * (cir1.radius + cir2.radius);
}

function rectCirIntersect(rect, cir) {
  // temporary variables to set edges for testing
  let testX = cir.x;
  let testY = cir.y;

  // which edge is closest?
  if (cir.x < rect.x) {
    testX = rect.x;
  } // test left edge
  else if (cir.x > rect.x + rect.width) {
    testX = rect.x + rect.width; // right edge
  }
  if (cir.y < rect.y) {
    testY = rect.y; // top edge
  } else if (cir.y > rect.y + rect.height) {
    testY = rect.y + rect.height; // bottom edge
  }

  // get distance from closest edges

  let distX = cir.x - testX;
  let distY = cir.y - testY;
  let distance = Math.sqrt(distX * distX + distY * distY);

  // if the distance is less than the radius, collision!
  if (distance <= cir.radius) {
    return true;
  }
  return false;
}

function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Loop over all game objects
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update(secondsPassed);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  detect_collision();
  // Do the same to draw
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].draw();
    gameObjects[i].highlight(context, cellSize);
  }

  window.requestAnimationFrame(gameLoop);
}