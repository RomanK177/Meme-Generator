"use strict";
var gCanvas;
var gCtx;

function onInit() {
  gCanvas = document.querySelector("#my-canvas");
  gCtx = gCanvas.getContext("2d");
  addImages();
  renderImgs();
}

function renderImgs() {
  let images = getImgs();
  var strHtmls = images.map(function (img) {
    return `
    <img onclick="onImgClk(${img.id})"  src="${img.url}" alt="" />
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
function onImgClk(imgId) {
  document.querySelector(".fill-color").value = "#FFFFFF";
  selectImg(imgId);
  drawImgFromlocal(imgId, getCurrLine().text);
  document.querySelector(".meme-editor").classList.remove("hidden");
  document.querySelector(".gallery").classList.add("hidden");
  document.querySelector(".txt-input").focus();
}

function onGalleryOpen() {
  document.querySelector(".meme-editor").classList.add("hidden");
  document.querySelector(".gallery").classList.remove("hidden");
}

function onTxtInput(txt) {
  changeProp("text", txt);
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

    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fillColor;
    gCtx.lineWidth = "1";
    gCtx.font = `${line.size}px ${font}`;
    gCtx.textAlign = line.align;
    gCtx.strokeText(line.text, line.x, line.y);
    gCtx.fillText(line.text, line.x, line.y);
    if (idx === gMeme.selectedLineIdx) drawRect(line.x, line.y, line.size);
  });
}
function drawRect(textX, textY, textSize) {
  const x = 0;
  const y = textY - textSize;
  gCtx.beginPath();
  gCtx.rect(x, y, gCanvas.width, textSize + 10);
  gCtx.strokeStyle = "black";
  gCtx.stroke();
  // gCtx.fillStyle = "orange";
  // gCtx.fillRect(x, y, 150, 150);
}

function onAddLine() {
  addLine();
  document.querySelector(".txt-input").value = "";
  document.querySelector(".txt-input").focus();
  document.querySelector(".fill-color").value = "#FFFFFF";
  drawImgFromlocal(getSelectedImgId());
}
// function onNextLine() {
//   nextLine();
//   document.querySelector(".txt-input").value = getCurrLine().text;
//   document.querySelector(".fill-color").value = getCurrLine().fillColor;
//   drawImgFromlocal(getSelectedImgId());
//   document.querySelector(".txt-input").focus();
// }
function onLineMove(value) {
  changeProp("y", value);
  drawImgFromlocal(getSelectedImgId());
}

function onDelLine() {
  delLine();
  drawImgFromlocal(getSelectedImgId());
  document.querySelector(".txt-input").value = getCurrLine().text;
  document.querySelector(".txt-input").focus();
}

function onTxtChange(value) {
  changeProp("size", value);
  drawImgFromlocal(getSelectedImgId());
}
function onAlignChange(align) {
  changeProp("align", align);
  drawImgFromlocal(getSelectedImgId());
}

function onFontChange(font) {
  changeProp("font", font);
  drawImgFromlocal(getSelectedImgId());
}
function onFillChange(color) {
  changeProp("fillColor", color);
  drawImgFromlocal(getSelectedImgId());
}
function onStokeChange(color) {
  changeProp("strokeColor", color);
  drawImgFromlocal(getSelectedImgId());
}
function downloadCanvas(elLink) {
  const data = gCanvas.toDataURL();
  elLink.href = data;
  elLink.download = "meme.jpg";
}
function canvasClicked(ev) {
  const { offsetX, offsetY } = ev;
  const { clientX, clientY } = ev;

  const clickedLine = gMeme.lines.find((line) => {
    return offsetY > line.y - line.size && offsetY < line.y;
  });

  if (clickedLine) {
    updateSelectedLineInx(clickedLine);
    document.querySelector(".txt-input").value = getCurrLine().text;
    document.querySelector(".fill-color").value = getCurrLine().fillColor;
  }
  drawImgFromlocal(getSelectedImgId());
}
// function openModal() {
//   const elModal = document.querySelector(".modal");
//   elModal.style.display = "block";
//   const width = gCanvas.width;
//   const height = gMeme.lines[gMeme.selectedLineIdx].size;
//   // const canLeft = document.querySelector("canvas").left;
//   // console.log(canLeft);
//   elModal.style.width = width + "px";
//   elModal.style.height = height - 20 + "px";
//   const x = gMeme.lines[gMeme.selectedLineIdx].x;
//   const y = gMeme.lines[gMeme.selectedLineIdx].y;
//   debugger;
//   elModal.style.top = y + 35 + "px";
//   elModal.style.left = x - 155 + "px";
// }
