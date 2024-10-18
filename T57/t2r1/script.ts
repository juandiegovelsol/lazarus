const imageUploads: HTMLInputElement = document.getElementById(
  "image-uploads"
) as HTMLInputElement;
const imageUploadsLabel: HTMLLabelElement = document.getElementById(
  "image-uploads-label"
) as HTMLLabelElement;
const collageContainer: HTMLDivElement = document.getElementById(
  "collage-container"
) as HTMLDivElement;
const downloadBtn: HTMLButtonElement = document.getElementById(
  "download-btn"
) as HTMLButtonElement;

let selectedImage: HTMLDivElement | null = null;
let offsetX: number = 0;
let offsetY: number = 0;
let imageCount: number = 0;

imageUploads.addEventListener("change", (event: Event) => {
  const files: FileList = (event.target as HTMLInputElement).files!;
  imageUploadsLabel.textContent = "Add more files";

  Array.from(files).forEach((file) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      const containerRect = collageContainer.getBoundingClientRect();
      const maxTop = containerRect.height - 100;
      const maxLeft = containerRect.width - 100;
      let top = Math.min(imageCount * 100, maxTop);
      let left = Math.min((imageCount % 3) * 150, maxLeft);
      imageContainer.style.top = `${top}px`;
      imageContainer.style.left = `${left}px`;
      imageContainer.style.width = "100px";
      imageContainer.style.height = "100px";
      imageContainer.style.overflow = "hidden";
      imageContainer.style.display = "flex";
      imageContainer.style.alignItems = "center";
      imageContainer.style.justifyContent = "center";
      imageContainer.style.cursor = "move";
      imageContainer.style.userSelect = "none";

      const img = document.createElement("img");
      img.src = e.target!.result as string;
      img.alt = `Image ${imageCount + 1}`;
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.style.pointerEvents = "none";

      imageContainer.appendChild(img);
      collageContainer.appendChild(imageContainer);

      imageContainer.addEventListener("mousedown", startDragging);

      imageCount++;
    };
    reader.readAsDataURL(file);
  });
  imageUploads.value = "";
});

function startDragging(event: MouseEvent) {
  selectedImage = event.currentTarget as HTMLDivElement;
  offsetX = event.clientX - selectedImage.offsetLeft;
  offsetY = event.clientY - selectedImage.offsetTop;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDragging);
}

function drag(event: MouseEvent) {
  if (selectedImage) {
    event.preventDefault();
    const containerRect = collageContainer.getBoundingClientRect();
    let newLeft = event.clientX - offsetX;
    let newTop = event.clientY - offsetY;

    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - selectedImage.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, containerRect.height - selectedImage.offsetHeight));

    selectedImage.style.top = `${newTop}px`;
    selectedImage.style.left = `${newLeft}px`;
  }
}

function stopDragging() {
  selectedImage = null;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDragging);
}

downloadBtn.addEventListener("click", () => {
  html2canvas(collageContainer, {
    allowTaint: true,
    useCORS: true,
  }).then((canvas: HTMLCanvasElement) => {
    const link = document.createElement("a");
    link.download = "my-collage.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});