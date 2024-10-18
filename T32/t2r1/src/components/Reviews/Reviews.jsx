import React, { useEffect, useRef } from "react";
import Card from "../Card/Card";
import "./Reviews.css";

const Reviews = () => {
  const reviewsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          reviewsRef.current.classList.add("show");
        }
      },
      { threshold: 1 }
    );
    observer.observe(reviewsRef.current);
  }, []);

  return (
    <section className="reviews" ref={reviewsRef}>
      <div className="reviews-container">
        <Card
          image="https://picsum.photos/200/300"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex."
        />
        <Card
          image="https://picsum.photos/200/301"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex."
        />
        <Card
          image="https://picsum.photos/200/302"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex."
        />
      </div>
    </section>
  );
};

export default Reviews;
