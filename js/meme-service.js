"use strict";

var gKeywords = { happy: 0, animal: 0 };

var gImgs = [];
var gMeme = {
  selectedImgId: undefined,
  selectedLineIdx: undefined,

  lines: [
    {
      text: undefined,
      size: 20,
      align: "center",
      color: "red",
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
  gImgs.push(addImg("/img/1.jpg"));
  gImgs.push(addImg("/img/2.jpg"));
  gImgs.push(addImg("/img/3.jpg"));
  gImgs.push(addImg("/img/4.jpg"));
  gImgs.push(addImg("/img/5.jpg"));
  gImgs.push(addImg("/img/6.jpg"));
  gImgs.push(addImg("/img/7.jpg"));
  gImgs.push(addImg("/img/8.jpg"));
  gImgs.push(addImg("/img/9.jpg"));
  gImgs.push(addImg("/img/10.jpg"));
  gImgs.push(addImg("/img/11.jpg"));
  gImgs.push(addImg("/img/12.jpg"));
  gImgs.push(addImg("/img/13.jpg"));
  gImgs.push(addImg("/img/14.jpg"));
  gImgs.push(addImg("/img/15.jpg"));
  gImgs.push(addImg("/img/16.jpg"));
  gImgs.push(addImg("/img/17.jpg"));
  gImgs.push(addImg("/img/18.jpg"));
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
