import React, { useEffect, useRef } from "react";
import Button from "../Button/Button";
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
        <h1>Welcome to our landing page</h1>
        <Button>Learn More</Button>
      </div>
    </section>
  );
};

export default Welcome;
