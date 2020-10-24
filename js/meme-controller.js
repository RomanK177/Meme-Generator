"use strict";
var gCanvas;
var gCtx;

function onInit() {
  gCanvas = document.querySelector("#my-canvas");
  gCtx = gCanvas.getContext("2d");
  addImages();
  renderImgs();
  document.querySelector(".fill-color").value = "#FFFFFF";
}

function renderImgs() {
  let images = getImgs();
  // console.log(images)
  var strHtmls = images.map(function (img) {
    return `
    <img onclick="onImgClk(this, ${img.id})"  src="${img.url}" alt="" />
        `;
  });

  document.querySelector(".gallery-images").innerHTML = strHtmls.join("");
}
function drawImgFromlocal(id) {
  var img = new Image();
  img.src = "./" + getImgById(id).url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend
    drawText();
  };
}
function onImgClk(ev, imgId) {
  selectImg(imgId);
  drawImgFromlocal(imgId, gMeme.lines[gMeme.selectedLineIdx].text);
  document.querySelector(".meme-editor").classList.remove("hidden");
  document.querySelector(".gallery").classList.add("hidden");
}
function onGalleryClk() {
  document.querySelector(".meme-editor").classList.add("hidden");
  document.querySelector(".gallery").classList.remove("hidden");
}

function onTxtInput(txt) {
  clearCanvas();
  updateTxt(txt);
  drawImgFromlocal(getSelectedImgId());
}

function drawText() {
  let font = document.getElementById("text-select").value;

  gMeme.lines.forEach((line, idx) => {
    if (line.align === "center") {
      line.x = gCanvas.width / 2;
    } else if (line.align === "right") {
      line.x = gCanvas.width - 20;
    } else line.x = 20;

    if (idx === 0) {
      line.y = line.size + line.yMod;
    } else if (idx === 1) {
      line.y = gCanvas.height - 10 + line.yMod;
    } else line.y = gCanvas.height / 2 + line.yMod;

    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fillColor;
    gCtx.lineWidth = "1";
    gCtx.font = `${line.size}px ${font}`;
    gCtx.textAlign = line.align;
    gCtx.strokeText(line.text, line.x, line.y);
    gCtx.fillText(line.text, line.x, line.y);
  });
}
function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  // You may clear part of the canvas
  // gCtx.clearRect(50, 50, 225, 225)
}
function onAddLine() {
  addLine();
  document.querySelector(".txt-input").value = "";
  document.querySelector(".fill-color").value = "#FFFFFF";
}
function onNextLine() {
  nextLine();
  document.querySelector(".txt-input").value =
    gMeme.lines[gMeme.selectedLineIdx].text;
  document.querySelector(".fill-color").value =
    gMeme.lines[gMeme.selectedLineIdx].fillColor;
}
function onLineUp() {
  clearCanvas();
  lineUp();
  drawImgFromlocal(getSelectedImgId());
}
function onLineDown() {
  clearCanvas();
  lineDown();
  drawImgFromlocal(getSelectedImgId());
}
function onDelLine() {
  clearCanvas();
  delLine();
  drawImgFromlocal(getSelectedImgId());
  document.querySelector(".txt-input").value =
    gMeme.lines[gMeme.selectedLineIdx].text;
}
function onIncreaseTxt() {
  clearCanvas();
  increaseTxt();
  drawImgFromlocal(getSelectedImgId());
}
function onDecreaseTxt() {
  clearCanvas();
  decreaseTxt();
  drawImgFromlocal(getSelectedImgId());
}
function onAlignLeft() {
  clearCanvas();
  alignLeft();
  drawImgFromlocal(getSelectedImgId());
}
function onAlignCenter() {
  clearCanvas();
  alignCenter();
  drawImgFromlocal(getSelectedImgId());
}
function onAlignRight() {
  clearCanvas();
  alignRight();
  drawImgFromlocal(getSelectedImgId());
}
function onFontChange(font) {
  clearCanvas();
  changeFont(font);
  drawImgFromlocal(getSelectedImgId());
}
function onFillChange(color) {
  clearCanvas();
  fillChange(color);
  drawImgFromlocal(getSelectedImgId());
}
function onStokeChange(color) {
  clearCanvas();
  strokeChange(color);
  drawImgFromlocal(getSelectedImgId());
}
function downloadCanvas(elLink) {
  const data = gCanvas.toDataURL();
  // console.log(data);
  elLink.href = data;
  elLink.download = "meme.jpg";
}
function canvasClicked(ev) {
  const { offsetX, offsetY } = ev;
  const { clientX, clientY } = ev;
  // console.log(offsetX, offsetY);

  const clickedLine = gMeme.lines.find((line) => {
    return offsetY > line.y - line.size && offsetY < line.y;
  });
  // console.log(clickedLine);

  if (clickedLine) {
    updateSelectedLineInx(clickedLine);
    document.querySelector(".txt-input").value =
      gMeme.lines[gMeme.selectedLineIdx].text;
    document.querySelector(".fill-color").value =
      gMeme.lines[gMeme.selectedLineIdx].fillColor;
    // openModal(clientX, clientY);
    // openModal();
  }
}
// function openModal() {
//   const elModal = document.querySelector(".modal");
//   elModal.style.display = "block";
//   let width = gCanvas.width;
//   let height = gMeme.lines[gMeme.selectedLineIdx].size;
//   elModal.style.width = width + "px";
//   elModal.style.height = height - 20 + "px";
//   let x = gMeme.lines[gMeme.selectedLineIdx].x;
//   let y = gMeme.lines[gMeme.selectedLineIdx].y;
//   elModal.style.top = y + 35 + "px";
//   elModal.style.left = x - 155 + "px";
// }
