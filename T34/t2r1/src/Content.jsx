import React from "react";
import Section from "./Section";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./Content.css";

const Content = () => {
  const location = useLocation();

  return (
    <div className="content">
      <Routes>
        <Route
          path="/"
          element={
            <Section id="section1">
              <h1>Section 1</h1>
              <p>Content for section 1.</p>
              <p>Content for section 1.</p>
              <p>Content for section 1.</p>
              <p>Content for section 1.</p>
              <p>Content for section 1.</p>
            </Section>
          }
        />
        <Route
          path="/section2"
          element={
            <Section id="section2">
              <h1>Section 2</h1>
              <p>Content for section 2.</p>
              <p>Content for section 2.</p>
              <p>Content for section 2.</p>
              <p>Content for section 2.</p>
              <p>Content for section 2.</p>
            </Section>
          }
        />
        <Route
          path="/section3"
          element={
            <Section id="section3">
              <h1>Section 3</h1>
              <p>Content for section 3.</p>
              <p>Content for section 3.</p>
              <p>Content for section 3.</p>
              <p>Content for section 3.</p>
              <p>Content for section 3.</p>
            </Section>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default Content;
