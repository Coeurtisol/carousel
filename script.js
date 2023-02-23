import images from "./images.js";
const imgContainer = document.querySelector("#img-container");
const leftBtn = document.querySelector("#toLeft");
const rightBtn = document.querySelector("#toRight");
const imgPickerContainer = document.querySelector("#img-picker");


images.forEach((image, i) => {
  const imgElement = `<div class="divImage"><img src=${image.src} alt=${image.alt}></div>`;
  imgContainer.insertAdjacentHTML("beforeend", imgElement);
  const imgPick = `<span data-imgid=${i}>✧</span>`;
  imgPickerContainer.insertAdjacentHTML("beforeend", imgPick);
});

let position = 0;
let x = 0;

let timer;
function setTimer() {
  timer = setTimeout(toRight, 3000);
}
setTimer();

[...imgPickerContainer.children].forEach((e) =>
  e.addEventListener("click", handleClick)
);
leftBtn.addEventListener("click", handleClick);
rightBtn.addEventListener("click", handleClick);

function handleClick(e) {
  const { target } = e;
  if (target.id === "toLeft") return toLeft();
  if (target.id === "toRight") return toRight();
  const imgId = target.dataset.imgid;
  moveTo(imgId);
}

function toLeft() {
  if (position === 0) {
    position = images.length - 1;
    moveTo(position);
    return;
  }
  position--;
  moveTo(position);
}

function toRight() {
  if (position === images.length - 1) {
    position = 0;
    moveTo(position);
    return;
  }
  position++;
  moveTo(position);
}

function moveTo(position) {
  clearTimeout(timer);
  const x = -800 * position;
  imgContainer.style.left = x + "px";
  colorizePicker(position);
  setTimer();
}

function colorizePicker(position) {
  [...imgPickerContainer.children].forEach((e) => e.classList.remove("active"));
  document.querySelector(`[data-imgid="${position}"]`).classList.add("active");
}
