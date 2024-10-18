var imageUpload = document.getElementById("image-upload");
var imagePreview = document.getElementById("image-preview");
var topTextInput = document.getElementById("top-text");
var bottomTextInput = document.getElementById("bottom-text");
var downloadBtn = document.getElementById("download-btn");
imageUpload.addEventListener("change", function (event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    imagePreview.src = e.target.result;
  };
  reader.readAsDataURL(file);
});
downloadBtn.addEventListener("click", function () {
  domtoimage
    .toPng(document.getElementById("meme-container"))
    .then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-meme.png";
      link.href = dataUrl;
      link.click();
    });
});
