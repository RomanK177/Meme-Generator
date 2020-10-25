"use strict";

var gKeywords = { happy: 0, animal: 0 };

var gImgs = [];
var gMeme = {
  selectedImgId: undefined,
  selectedLineIdx: 0,

  lines: [
    {
      text: "",
      size: 40,
      align: "center",
      strokeColor: "#000000",
      fillColor: "#FFFFFF",
      // x: 20,
      y: 40,
    },
  ],
};
var gId = 0;

function addImg(url) {
  return {
    id: ++gId,
    url,
  };
}
function addImages() {
  gImgs.push(addImg("img/1.jpg"));
  gImgs.push(addImg("img/2.jpg"));
  gImgs.push(addImg("img/3.jpg"));
  gImgs.push(addImg("img/4.jpg"));
  gImgs.push(addImg("img/5.jpg"));
  gImgs.push(addImg("img/6.jpg"));
  gImgs.push(addImg("img/7.jpg"));
  gImgs.push(addImg("img/8.jpg"));
  gImgs.push(addImg("img/9.jpg"));
  gImgs.push(addImg("img/10.jpg"));
  gImgs.push(addImg("img/11.jpg"));
  gImgs.push(addImg("img/12.jpg"));
  gImgs.push(addImg("img/13.jpg"));
  gImgs.push(addImg("img/14.jpg"));
  gImgs.push(addImg("img/15.jpg"));
  gImgs.push(addImg("img/16.jpg"));
  gImgs.push(addImg("img/17.jpg"));
  gImgs.push(addImg("img/18.jpg"));
}
function getImgs() {
  return gImgs;
}

function getImgById(imgId = 1) {
  return gImgs.find((img) => imgId === img.id);
}

function selectImg(imgId) {
  gMeme.selectedImgId = imgId;
}

function getSelectedImgId() {
  return gMeme.selectedImgId;
}
function addLine() {
  gMeme.lines.push({
    text: "",
    size: 40,
    align: "center",
    strokeColor: "#000000",
    fillColor: "#FFFFFF",
  });
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
  // const newLineX;
  let newLineY;
  if (gMeme.lines.indexOf(getCurrLine()) === 0) {
    newLineY = getCurrLine().size + 10;
  } else if (gMeme.lines.indexOf(getCurrLine()) === 1) {
    newLineY = gCanvas.height - 10;
  } else {
    newLineY = gCanvas.height / 2;
  }
  getCurrLine().y = newLineY;
}
// function nextLine() {
//   gMeme.selectedLineIdx++;
//   if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
// }

function delLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  gMeme.selectedLineIdx--;
  if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = 0;
  if (gMeme.lines.length <= 0) addLine();
}

function changeProp(prop, val) {
  if (prop === "size" || prop === "y") getCurrLine()[prop] += val;
  else getCurrLine()[prop] = val;
}

function updateSelectedLineInx(line) {
  gMeme.selectedLineIdx = gMeme.lines.indexOf(line);
}
function getCurrLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}
