import React, { useEffect } from "react";
import "./ParallaxBackground.css";

const ParallaxBackground = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallaxBackground = document.querySelector(".parallax-background");
      parallaxBackground.style.transform = `translateZ(-1px) scale(2) translateY(-${
        scrollPosition / 2
      }px)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div className="parallax-background" />;
};

export default ParallaxBackground;
