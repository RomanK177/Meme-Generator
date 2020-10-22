"use strict";
var gCanvas;
var gCtx;
var gTxtSize = 150;

function onInit() {
  gCanvas = document.querySelector("#my-canvas");
  gCtx = gCanvas.getContext("2d");
  addImages();
  renderImgs();
  // drawImgFromlocal();
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
  document.querySelector(".meme-editor").classList.toggle("hidden");
  //   document.querySelector(".gallery").classList.toggle("hidden");
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
      line.y = idx * (line.size + 40) + line.size + line.yMod;
    } else {
      line.x = idx * (line.size + 40) + 20;
      line.y = idx * (line.size + 40) + 20;
    }

    gCtx.strokeStyle = gMeme.lines[gMeme.selectedLineIdx].color;
    gCtx.fillStyle = "white";
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
}
function onNextLine() {
  nextLine();
  document.querySelector(".txt-input").value =
    gMeme.lines[gMeme.selectedLineIdx].text;
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
