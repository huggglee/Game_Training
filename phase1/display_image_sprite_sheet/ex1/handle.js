const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Đối tượng tàu
let ship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    image: new Image(),
};

// Tải hình ảnh tàu
ship.image.src = "../img/Spaceship.webp";

// Cập nhật góc xoay của tàu
function update(mouseX, mouseY) {
    let dx = mouseX - ship.x;
    let dy = mouseY - ship.y;
    ship.angle = Math.atan2(dy, dx)+Math.PI/2; // Góc theo trục tọa độ
    console.log(ship.angle);
}

// Vẽ tàu
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(ship.x, ship.y); // Dịch gốc tọa độ tới vị trí tàu
    context.rotate(ship.angle); // Xoay tàu theo góc
    context.drawImage(ship.image, -ship.image.width / 2, -ship.image.height / 2); // Vẽ ảnh tàu
    context.restore();
}

// Lắng nghe sự kiện di chuyển chuột
canvas.addEventListener("mousemove", (event) => {
    // Tính tọa độ chuột trong canvas
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    update(mouseX, mouseY); // Cập nhật góc tàu
    draw(); // Vẽ lại tàu
});

// Khi hình ảnh tải xong, vẽ lần đầu tiên
ship.image.onload = draw;
