var imageUploads = document.getElementById("image-uploads");
var collageContainer = document.getElementById("collage-container");
var downloadBtn = document.getElementById("download-btn");
imageUploads.addEventListener("change", function (event) {
    var files = event.target.files;
    collageContainer.innerHTML = "";
    var _loop_1 = function (i) {
        var file = files[i];
        var reader = new FileReader();
        reader.onload = function (e) {
            var imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");
            imageContainer.innerHTML = "<img src=\"".concat(e.target.result, "\" alt=\"Image ").concat(i + 1, "\">");
            collageContainer.appendChild(imageContainer);
        };
        reader.readAsDataURL(file);
    };
    for (var i = 0; i < files.length; i++) {
        _loop_1(i);
    }
});
downloadBtn.addEventListener("click", function () {
    // @ts-ignore -  dom-to-image has no typings
    html2canvas(collageContainer, {
        allowTaint: true,
        useCORS: true,
    }).then(function (canvas) {
        var link = document.createElement("a");
        link.download = "my-meme.png";
        link.href = canvas.toDataURL();
        link.click();
    });
    /* domtoimage.toPng(collageContainer)
          .then((dataUrl: string) => {
              const link = document.createElement('a');
              link.download = 'my-collage.png';
              link.href = dataUrl;
              link.click();
          }); */
});
