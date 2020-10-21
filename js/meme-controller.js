"use strict";
var gCanvas;
var gCtx;

function onInit() {
  gCanvas = document.querySelector("#my-canvas");
  gCtx = gCanvas.getContext("2d");
  addImages();
  renderImgs();
  drawImgFromlocal();
}

function renderImgs() {
  let images = getImgs();
  // console.log(images)
  var strHtmls = images.map(function (img) {
    console.log(img.url);
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
  };
}
function onImgClk(ev, imgId) {
  drawImgFromlocal(imgId);
  document.querySelector(".meme-editor").classList.toggle("hidden");
  //   document.querySelector(".gallery").classList.toggle("hidden");
}
