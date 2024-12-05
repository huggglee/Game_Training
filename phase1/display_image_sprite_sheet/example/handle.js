let canvas;
let context;
let sprite;
let currentFrame = 0; // Đặt ngoài để giữ trạng thái

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  // Lấy sprite từ HTML
  
  sprite = document.getElementById("test");
  setInterval(updateFrame,100);
}

function updateFrame() {
  let numColumns = 5;
  let numRows = 2;
  let frameWidth = sprite.width / numColumns;
  let frameHeight = sprite.height / numRows;

  // Cập nhật frame hiện tại
  currentFrame++;

  let maxFrame = numColumns * numRows - 1;
  if (currentFrame > maxFrame) {
    currentFrame = 0;
  }

  // Tính toán vị trí cột và hàng
  let column = currentFrame % numColumns;
  let row = Math.floor(currentFrame / numColumns);

  // Vẽ frame lên canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    sprite,
    column * frameWidth,
    row * frameHeight,
    frameWidth,
    frameHeight,
    10,
    30,
    frameWidth,
    frameHeight
  );
}
