import React, { useEffect, useRef, useState } from "react";
import "./Sky.css";

const celestialObjects = [
  {
    name: "Ursa Major",
    x: 100,
    y: 100,
    info: "Ursa Major is one of the most recognizable constellations in the night sky. In Greek mythology, it represents Callisto, transformed into a bear by Zeus.",
  },
  {
    name: "Jupiter",
    x: 300,
    y: 200,
    info: "Jupiter is the largest planet in the Solar System. It has 79 known moons and a Great Red Spot which is actually a giant storm.",
  },
  {
    name: "Orion Nebula",
    x: 500,
    y: 150,
    info: "The Orion Nebula is a cloud of gas and dust where new stars are forming. It is visible to the naked eye in the night sky.",
  },
];

const Sky = ({ telescopeX, telescopeY, moveTelescope, checkObjects }) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

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

    const handleMouseDown = (e) => {
      setIsDragging(true);
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        moveTelescope(x - telescopeX, y - telescopeY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    drawSky();
  }, [telescopeX, telescopeY, moveTelescope, isDragging]);

  useEffect(() => {
    checkObjects();
  }, [telescopeX, telescopeY, checkObjects]);

  return <canvas ref={canvasRef} width={600} height={400} className="sky" />;
};

export default Sky;
