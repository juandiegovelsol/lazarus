const imageUploads: HTMLInputElement = document.getElementById(
  "image-uploads"
) as HTMLInputElement;
const collageContainer: HTMLDivElement = document.getElementById(
  "collage-container"
) as HTMLDivElement;
const downloadBtn: HTMLButtonElement = document.getElementById(
  "download-btn"
) as HTMLButtonElement;

let selectedImage: HTMLDivElement | null = null;
let offsetX: number = 0;
let offsetY: number = 0;

imageUploads.addEventListener("change", (event: Event) => {
  const files: FileList = (event.target as HTMLInputElement).files!;
  collageContainer.innerHTML = "";

  for (let i = 0; i < files.length; i++) {
    const file: File = files[i];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      imageContainer.style.top = `${i * 100}px`;
      imageContainer.style.left = `${(i % 3) * 150}px`;
      imageContainer.innerHTML = `<img src="${e.target!.result}" alt="Image ${i + 1}">`;
      collageContainer.appendChild(imageContainer);

      imageContainer.addEventListener("mousedown", (event: MouseEvent) => {
        selectedImage = imageContainer;
        offsetX = event.clientX - imageContainer.offsetLeft;
        offsetY = event.clientY - imageContainer.offsetTop;
      });
    };
    reader.readAsDataURL(file);
  }
});

document.addEventListener("mousemove", (event: MouseEvent) => {
  if (selectedImage) {
    selectedImage.style.top = `${event.clientY - offsetY}px`;
    selectedImage.style.left = `${event.clientX - offsetX}px`;
  }
});

document.addEventListener("mouseup", () => {
  selectedImage = null;
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
