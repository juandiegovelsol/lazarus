// Obtén el elemento de la tarjeta
var card = document.getElementById("card");
// Obtén el botón de agregar elemento
var addElementBtn = document.getElementById("add-element");
// Obtén el botón de exportar
var exportBtn = document.getElementById("export-btn");
// Obtén el campo de entrada de texto
var textInput = document.getElementById("text");
// Obtén el campo de grosor del lápiz
var penThicknessInput = document.getElementById("pen-thickness");
// Obtén el checkbox de modo lápiz
var penToggleInput = document.getElementById("pen-toggle");
// Obtén el checkbox de modo borrador
var eraserToggleInput = document.getElementById("eraser-toggle");
// Obtén el canvas
var canvas = document.getElementById("drawingCanvas");
// Obtén el contexto 2D del canvas
var ctx = canvas.getContext("2d");
// Array para almacenar todos los segmentos dibujados
var drawnSegments = [];
// Bandera para rastrear si el mouse está presionado
var isDown = false;
// Desplazamiento del elemento que se está arrastrando
var offset = [0, 0];
// Elemento actual que se está arrastrando
var currentElement = null;
// Bandera para rastrear si el dibujo está en progreso
var drawing = false;
// Últimas coordenadas del dibujo
var lastX, lastY;
canvas.width = card.offsetWidth;
canvas.height = card.offsetHeight;
// Función para habilitar o deshabilitar las herramientas
function toggleTools(enable) {
    addElementBtn.disabled = !enable;
    penToggleInput.disabled = !enable;
    textInput.disabled = !enable;
    penThicknessInput.disabled = !enable;
}
// Función para volver a dibujar todos los segmentos
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    for (var _i = 0, drawnSegments_1 = drawnSegments; _i < drawnSegments_1.length; _i++) {
        var segment = drawnSegments_1[_i];
        ctx.beginPath();
        ctx.moveTo(segment.startX, segment.startY);
        ctx.lineTo(segment.endX, segment.endY);
        ctx.strokeStyle = segment.color;
        ctx.lineWidth = segment.thickness;
        ctx.lineCap = "round";
        ctx.stroke();
    }
}
// Agregar evento al botón de agregar elemento
addElementBtn.addEventListener("click", function () {
    var element = document.createElement("div");
    element.classList.add("element");
    element.textContent = textInput.value;
    // Posicionar aleatoriamente el elemento dentro de los límites de la tarjeta
    var randomX = Math.random() * (card.offsetWidth - 100 - 20);
    var randomY = Math.random() * (card.offsetHeight - 50 - 20);
    element.style.left = "".concat(randomX, "px");
    element.style.top = "".concat(randomY, "px");
    card.appendChild(element);
    // Agregar evento para arrastrar el elemento
    element.addEventListener("mousedown", function (e) {
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
// Evento para iniciar el dibujo o borrar
card.addEventListener("mousedown", function (e) {
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    if (penToggleInput.checked) {
        drawing = true;
        lastX = Math.max(0, Math.min(x, rect.width));
        lastY = Math.max(0, Math.min(y, rect.height));
        e.preventDefault();
    }
    else if (eraserToggleInput.checked) {
        var target = e.target;
        if (target.classList.contains("element")) {
            target.remove();
        }
        else if (target === canvas) {
            for (var i = drawnSegments.length - 1; i >= 0; i--) {
                var segment = drawnSegments[i];
                var dist = Math.hypot(segment.startX - x, segment.startY - y);
                if (dist < 10) {
                    drawnSegments.splice(i, 1);
                    redrawCanvas();
                    break;
                }
            }
        }
    }
});
// Evento para mover el mouse y continuar el dibujo o arrastrar un elemento
card.addEventListener("mousemove", function (e) {
    if (drawing) {
        var rect = card.getBoundingClientRect();
        var x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        var y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "black";
        ctx.lineWidth = Number(penThicknessInput.value);
        ctx.lineCap = "round";
        ctx.stroke();
        drawnSegments.push({
            startX: lastX,
            startY: lastY,
            endX: x,
            endY: y,
            thickness: Number(penThicknessInput.value),
            color: "black",
        });
        lastX = x;
        lastY = y;
    }
    else if (isDown && currentElement) {
        var rect = card.getBoundingClientRect();
        var x = Math.max(0, Math.min(e.clientX - rect.left, rect.width - currentElement.offsetWidth));
        var y = Math.max(0, Math.min(e.clientY - rect.top, rect.height - currentElement.offsetHeight));
        currentElement.style.left = "".concat(x, "px");
        currentElement.style.top = "".concat(y, "px");
    }
});
// Evento para detener el dibujo o arrastre
document.addEventListener("mouseup", function () {
    isDown = false;
    drawing = false;
});
// Exportar la tarjeta como imagen
exportBtn.addEventListener("click", function () {
    domtoimage.toBlob(card).then(function (blob) {
        window.saveAs(blob, "business-card.png");
    });
});
// Habilitar o deshabilitar el borrador
eraserToggleInput.addEventListener("change", function (e) {
    var target = e.target;
    if (target.checked) {
        toggleTools(false);
        penToggleInput.checked = false;
    }
    else {
        toggleTools(true);
    }
});
// Habilitar o deshabilitar el lápiz
penToggleInput.addEventListener("change", function (e) {
    if (e.target.checked) {
        eraserToggleInput.checked = false;
    }
});
