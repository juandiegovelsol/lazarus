const imageUploads: HTMLInputElement = document.getElementById(
  "image-uploads"
) as HTMLInputElement;
const collageContainer: HTMLDivElement = document.getElementById(
  "collage-container"
) as HTMLDivElement;
const downloadBtn: HTMLButtonElement = document.getElementById(
  "download-btn"
) as HTMLButtonElement;

imageUploads.addEventListener("change", (event: Event) => {
  const files: FileList = (event.target as HTMLInputElement).files!;
  collageContainer.innerHTML = "";

  for (let i = 0; i < files.length; i++) {
    const file: File = files[i];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      imageContainer.innerHTML = `<img src="${e.target!.result}" alt="Image ${
        i + 1
      }">`;
      collageContainer.appendChild(imageContainer);
    };
    reader.readAsDataURL(file);
  }
});

downloadBtn.addEventListener("click", () => {
  // @ts-ignore
  html2canvas(collageContainer, {
    allowTaint: true,
    useCORS: true,
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "my-meme.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});
