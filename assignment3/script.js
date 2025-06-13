const canvas1 = document.querySelector("#canvas1");
const ctx1 = canvas1.getContext("2d");
const canvas2 = document.querySelector("#canvas2");
const ctx2 = canvas2.getContext("2d");
const spacing = 10;
const profile = document.querySelector("#profile");

window.addEventListener("resize", loadCanvas);
loadCanvas();
resizeCanvas();
drawImage();
drawHair();

function loadCanvas() {}

function resizeCanvas() {
  canvas1.width = canvas1.clientWidth;
  canvas1.height = canvas1.clientHeight;
  canvas2.width = canvas2.clientWidth;
  canvas2.height = canvas2.clientHeight;
}

function drawImage() {
  console.log("Drawing image onto canvas.");
  //centering the image
  ctx2.drawImage(
    profile,
    canvas2.width / 2 - profile.width / 2,
    canvas2.height / 2 - profile.height / 2 - 30
  );
}

//checking if the image has finished loading

if (profile.complete) {
  drawImage();
} else {
  profile.addEventListener("load", drawImage);
}

function drawHair() {
  for (
    let i = canvas1.width / 2 - profile.width + profile.width / 5;
    i <= (canvas1.width - spacing) / spacing;
    i++
  ) {
    j = i * spacing;
    ctx1.moveTo(j, 100);
    ctx1.lineTo(j, 500);
    ctx1.stroke();
  }
}

function getMousePos(canvas1, event) {
  const rect = canvas1.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

let mouseup = true;

canvas1.addEventListener("mousedown", () => {
  mouseup = false;
  console.log(mouseup);
});

canvas1.addEventListener("mouseup", () => {
  mouseup = true;
  console.log(mouseup);
});

canvas1.addEventListener("mousemove", (event) => {
  if (mouseup === false) {
    const mousePos = getMousePos(canvas1, event);

    ctx1.clearRect(mousePos.x, mousePos.y, 10, canvas1.height);
  }
});
