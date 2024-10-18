import React, { useState, useEffect, useRef } from "react";
import "./Reviews.css";
import Card from "./Card";

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
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
};

export default Reviews;
