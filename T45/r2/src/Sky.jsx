import React, { useState, useEffect } from "react";
import "./Sky.css";

const Sky = ({ telescopeX, telescopeY, moveTelescope, celestialObjects }) => {
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvasEl = document.getElementById("sky-canvas");
    setCanvas(canvasEl);
    setCtx(canvasEl.getContext("2d"));
  }, []);

  useEffect(() => {
    if (ctx) {
      drawSky();
    }
  }, [ctx, telescopeX, telescopeY]);

  const drawSky = () => {
    ctx.fillStyle = "#000033";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = "white";
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        1,
        1
      );
    }

    celestialObjects.forEach((obj) => {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(telescopeX, telescopeY, 50, 0, Math.PI * 2);
    ctx.stroke();
  };

  const handleMouseDown = () => {
    canvas.isDragging = true;
  };

  const handleMouseMove = (e) => {
    if (canvas.isDragging) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      moveTelescope(x - telescopeX, y - telescopeY);
    }
  };

  const handleMouseUp = () => {
    canvas.isDragging = false;
  };

  return (
    <canvas
      id="sky-canvas"
      width={600}
      height={400}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Sky;
