import {Circle} from "../handle/Circle.js";

// function detectCollisions() {
//   let obj1;
//   let obj2;

//   // Reset collision state of all objects
//   for (let i = 0; i < gameObjects.length; i++) {
//     gameObjects[i].isColliding = false;
//   }

//   // Start checking for collisions
//   for (let i = 0; i < gameObjects.length; i++) {
//     obj1 = gameObjects[i];
//     for (let j = i + 1; j < gameObjects.length; j++) {
//       obj2 = gameObjects[j];

//       // Compare object1 with object2
//       if (
//         rectIntersect(
//           obj1.x,
//           obj1.y,
//           obj1.width,
//           obj1.height,
//           obj2.x,
//           obj2.y,
//           obj2.width,
//           obj2.height
//         )
//       ) {
//         obj1.isColliding = true;
//         obj2.isColliding = true;
//       }
//     }
//   }
// }

// function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
//   // Check x and y for overlap
//   if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
//     return false;
//   }
//   return true;
// }

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let gameObjects;
let oldTimeStamp = 0;
let secondsPassed;

function detectCircleCollision() {
  let obj1;
  let obj2;

  // Reset collision state of all objects
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].isColliding = false;
  }

  // Start checking for collisions
  for (let i = 0; i < gameObjects.length; i++) {
    obj1 = gameObjects[i];
    for (let j = i + 1; j < gameObjects.length; j++) {
      obj2 = gameObjects[j];

      // Compare object1 with object2
      if (
        circleIntersect(
          obj1.x,
          obj1.y,
          obj1.radius,
          obj2.x,
          obj2.y,
          obj2.radius
        )
      ) {
        obj1.isColliding = true;
        obj2.isColliding = true;

        physic(obj1, obj2);
      }
    }
  }
}

function circleIntersect(x1, y1, r1, x2, y2, r2) {
  // Calculate the distance between the two circles
  let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

  // When the distance is smaller or equal to the sum
  // of the two radius, the circles touch or overlap
  return squareDistance <= (r1 + r2) * (r1 + r2);
}

function physic(obj1, obj2) {
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
  let impulse = (2 * speed) / (obj1.mass + obj2.mass);
  obj1.vx -= impulse * obj2.mass * vCollisionNorm.x;
  obj1.vy -= impulse * obj2.mass * vCollisionNorm.y;
  obj2.vx += impulse * obj1.mass * vCollisionNorm.x;
  obj2.vy += impulse * obj1.mass * vCollisionNorm.y;
}
const restitution = 0.9;

function detectEdgeCollisions() {
  let obj;
  for (let i = 0; i < gameObjects.length; i++) {
    obj = gameObjects[i];

    // Check for left and right
    if (obj.x < obj.radius) {
      obj.vx = Math.abs(obj.vx) * restitution;
      obj.x = obj.radius;
    } else if (obj.x > canvas.width - obj.radius) {
      obj.vx = -Math.abs(obj.vx) * restitution;
      obj.x = canvas.width - obj.radius;
    }

    // Check for bottom and top
    if (obj.y < obj.radius) {
      obj.vy = Math.abs(obj.vy) * restitution;
      obj.y = obj.radius;
    } else if (obj.y > canvas.height - obj.radius) {
      obj.vy = -Math.abs(obj.vy) * restitution;
      obj.y = canvas.height - obj.radius;
    }
  }
}


function createCircle() {
  gameObjects = [
    new Circle(context, 250, 50, 0, 50, 25, 100, 0.3),
    new Circle(context, 650, 300, 0, -50, 25, 100),
    new Circle(context, 100, 50, 25, 50, 10, 40, 0),
    new Circle(context, 700, 50, -25, 50, 20, 80),
    new Circle(context, 50, 200, 50, 0, 15, 60),
    new Circle(context, 750, 200, -50, 0, 15, 60),
    new Circle(context, 550, 0, 0, 50, 30, 120, 1),
    new Circle(context, 400, 300, 0, -50, 25, 100, 0.5),
    new Circle(context, 400, 50, 0, 50, 25, 100),
    new Circle(context, 200, 350, 25, -50, 25, 90),
    new Circle(context, 600, 350, -25, -50, 25, 90),
    new Circle(context, 50, 100, 50, 25, 20, 75, 0),
    new Circle(context, 750, 100, -50, 25, 20, 75, 0),
    new Circle(context, 300, 300, 10, -40, 25, 100),
    new Circle(context, 500, 300, -10, -40, 25, 100),
    new Circle(context, 350, 50, 0, 60, 25, 90),
    new Circle(context, 450, 50, 0, 60, 20, 80),
    new Circle(context, 150, 250, 50, -30, 10, 40, 1),
    new Circle(context, 650, 250, -50, -30, 10, 40, 1),
    new Circle(context, 100, 350, 60, -60, 10, 50),
    new Circle(context, 700, 350, -60, -60, 10, 50),
    new Circle(context, 300, 0, 20, 50, 25, 100),
  ];
}

function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Loop over all game objects
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update(secondsPassed);
  }
  detectCircleCollision();
  detectEdgeCollisions();
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Do the same to draw
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].draw();
  }

  window.requestAnimationFrame(gameLoop);
}

// createWorld();
createCircle();
window.requestAnimationFrame(gameLoop);
