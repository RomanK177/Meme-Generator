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
      yMod: 0,
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
  var img = gImgs.find(function (img) {
    return imgId === img.id;
  });
  return img;
}
function selectImg(imgId) {
  gMeme.selectedImgId = imgId;
}
function updateTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].text = txt;
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
    yMod: 0,
  });
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}
function nextLine() {
  gMeme.selectedLineIdx++;
  if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
}
function lineUp() {
  gMeme.lines[gMeme.selectedLineIdx].yMod -= 5;
}
function lineDown() {
  gMeme.lines[gMeme.selectedLineIdx].yMod += 5;
}
function delLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  gMeme.selectedLineIdx--;
  if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = 0;
  if (gMeme.lines.length <= 0) addLine();
}
function increaseTxt() {
  gMeme.lines[gMeme.selectedLineIdx].size += 5;
}
function decreaseTxt() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 5;
}
function alignLeft() {
  gMeme.lines[gMeme.selectedLineIdx].align = "left";
}
function alignCenter() {
  gMeme.lines[gMeme.selectedLineIdx].align = "center";
}
function alignRight() {
  gMeme.lines[gMeme.selectedLineIdx].align = "right";
}
function changeFont(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font;
}
function fillChange(color) {
  gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
}
function strokeChange(color) {
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}
function updateSelectedLineInx(line) {
  gMeme.selectedLineIdx = gMeme.lines.indexOf(line);
}
