import React, { useState, useEffect, useRef } from "react";
import "./Welcome.css";

const Welcome = () => {
  const welcomeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          welcomeRef.current.classList.add("show");
        }
      },
      { threshold: 1 }
    );
    observer.observe(welcomeRef.current);
  }, []);

  return (
    <section className="welcome" ref={welcomeRef}>
      <div className="welcome-container">
        <h1 className={`welcome-header`}>Welcome to our landing page</h1>
        <button className={`welcome-button`}>Learn More</button>
      </div>
    </section>
  );
};

export default Welcome;
