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
let isDragging: boolean = false;

imageUploads.addEventListener("change", (event: Event) => {
  const files: FileList = (event.target as HTMLInputElement).files!;
  collageContainer.innerHTML = "";

  Array.from(files).forEach((file, i) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      imageContainer.style.position = "absolute";
      imageContainer.style.top = `${i * 100}px`;
      imageContainer.style.left = `${(i % 3) * 150}px`;
      imageContainer.style.width = "100px";
      imageContainer.style.height = "100px";
      imageContainer.style.overflow = "hidden";
      imageContainer.style.display = "flex";
      imageContainer.style.alignItems = "center";
      imageContainer.style.justifyContent = "center";

      const img = document.createElement("img");
      img.src = e.target!.result as string;
      img.alt = `Image ${i + 1}`;
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";

      imageContainer.appendChild(img);
      collageContainer.appendChild(imageContainer);

      imageContainer.addEventListener("mousedown", (event: MouseEvent) => {
        selectedImage = imageContainer;
        offsetX = event.clientX - imageContainer.offsetLeft;
        offsetY = event.clientY - imageContainer.offsetTop;
        isDragging = true;
      });
    };
    reader.readAsDataURL(file);
  });
});

document.addEventListener("mousemove", (event: MouseEvent) => {
  if (isDragging && selectedImage) {
    selectedImage.style.top = `${event.clientY - offsetY}px`;
    selectedImage.style.left = `${event.clientX - offsetX}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  selectedImage = null;
});

downloadBtn.addEventListener("click", () => {
  html2canvas(collageContainer, {
    allowTaint: true,
    useCORS: true,
  }).then((canvas: HTMLCanvasElement) => {
    const link = document.createElement("a");
    link.download = "my-meme.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});