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
      imageContainer.style.cursor = "move";
      imageContainer.style.userSelect = "none";

      const img = document.createElement("img");
      img.src = e.target!.result as string;
      img.alt = `Image ${i + 1}`;
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.style.pointerEvents = "none";

      imageContainer.appendChild(img);
      collageContainer.appendChild(imageContainer);

      imageContainer.addEventListener("mousedown", startDragging);
    };
    reader.readAsDataURL(file);
  });
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
    const x = Math.min(
      Math.max(event.clientX - offsetX, 0),
      collageContainer.offsetWidth - selectedImage.offsetWidth
    );
    const y = Math.min(
      Math.max(event.clientY - offsetY, 0),
      collageContainer.offsetHeight - selectedImage.offsetHeight
    );
    selectedImage.style.top = `${y}px`;
    selectedImage.style.left = `${x}px`;
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
