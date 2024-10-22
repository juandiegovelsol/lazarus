import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const card = document.getElementById("card") as HTMLElement;
const addElementBtn = document.getElementById("add-element") as HTMLButtonElement;
const exportBtn = document.getElementById("export-btn") as HTMLButtonElement;
const textInput = document.getElementById("text") as HTMLInputElement;
const penThicknessInput = document.getElementById("pen-thickness") as HTMLInputElement;
const penToggleInput = document.getElementById("pen-toggle") as HTMLInputElement;
const eraserToggleInput = document.getElementById("eraser-toggle") as HTMLInputElement;
const canvas = document.getElementById("drawingCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

interface Segment {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  thickness: number;
  color: string;
}

interface Stroke {
  segments: Segment[];
}

const strokes: Stroke[] = [];
let currentStroke: Stroke | null = null;

let isDown = false;
let offset: [number, number] = [0, 0];
let currentElement: HTMLElement | null = null;
let drawing = false;
let lastX: number, lastY: number;

canvas.width = card.offsetWidth;
canvas.height = card.offsetHeight;

function toggleTools(enable: boolean): void {
  addElementBtn.disabled = !enable;
  penToggleInput.disabled = !enable;
  textInput.disabled = !enable;
  penThicknessInput.disabled = !enable;
}

function redrawCanvas(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const stroke of strokes) {
    for (const segment of stroke.segments) {
      ctx.beginPath();
      ctx.moveTo(segment.startX, segment.startY);
      ctx.lineTo(segment.endX, segment.endY);
      ctx.strokeStyle = segment.color;
      ctx.lineWidth = segment.thickness;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }
}

addElementBtn.addEventListener("click", () => {
  const element = document.createElement("div");
  element.classList.add("element");
  element.textContent = textInput.value;


  const randomX = Math.random() * (card.offsetWidth - 100 - 20);
  const randomY = Math.random() * (card.offsetHeight - 50 - 20);
  element.style.left = `${randomX}px`;
  element.style.top = `${randomY}px`;
  card.appendChild(element);

  element.addEventListener("mousedown", (e: MouseEvent) => {
    if (!penToggleInput.checked && !eraserToggleInput.checked) {
      isDown = true;
      offset = [
        element.offsetLeft - e.clientX,
        element.offsetTop - e.clientY,
      ];
      currentElement = element;
      e.preventDefault();
    }
  });
});

card.addEventListener("mousedown", (e: MouseEvent) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (penToggleInput.checked) {
    drawing = true;
    lastX = Math.max(0, Math.min(x, rect.width));
    lastY = Math.max(0, Math.min(y, rect.height));
    currentStroke = { segments: [] };
    strokes.push(currentStroke);
    e.preventDefault();
  } else if (eraserToggleInput.checked) {
    const target = e.target as HTMLElement;
    if (target.classList.contains("element")) {
      target.remove();
    } else if (target === canvas) {
      const point = { x, y };
      for (let i = strokes.length - 1; i >= 0; i--) {
        const stroke = strokes[i];
        for (const segment of stroke.segments) {
          const dist = Math.hypot(segment.startX - point.x, segment.startY - point.y);
          if (dist < 10) {
            strokes.splice(i, 1);
            redrawCanvas();
            return;
          }
          const distEnd = Math.hypot(segment.endX - point.x, segment.endY - point.y);
          if (distEnd < 10) {
            strokes.splice(i, 1);
            redrawCanvas();
            return;
          }
        }
      }
    }
  }
});

card.addEventListener("mousemove", (e: MouseEvent) => {
  if (drawing) {
    const rect = card.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    if (currentStroke) {
      const segment: Segment = {
        startX: lastX,
        startY: lastY,
        endX: x,
        endY: y,
        thickness: Number(penThicknessInput.value),
        color: "black",
      };
      currentStroke.segments.push(segment);
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = Number(penThicknessInput.value);
    ctx.lineCap = "round";
    ctx.stroke();

    lastX = x;
    lastY = y;
  } else if (isDown && currentElement) {
    const rect = card.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(e.clientX - rect.left, rect.width - currentElement.offsetWidth)
    );
    const y = Math.max(
      0,
      Math.min(e.clientY - rect.top, rect.height - currentElement.offsetHeight)
    );
    currentElement.style.left = `${x}px`;
    currentElement.style.top = `${y}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDown = false;
  drawing = false;
  currentStroke = null;
});

exportBtn.addEventListener("click", () => {
  domtoimage.toBlob(card).then((blob: Blob) => {
    saveAs(blob, "business-card.png");
  });
});

eraserToggleInput.addEventListener("change", (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    toggleTools(false);
    penToggleInput.checked = false;
  } else {
    toggleTools(true);
  }
});

penToggleInput.addEventListener("change", (e: Event) => {
  if ((e.target as HTMLInputElement).checked) {
    eraserToggleInput.checked = false;
  }
});