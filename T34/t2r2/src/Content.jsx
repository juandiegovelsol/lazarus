import React from "react";
import Section from "./Section";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import "./Content.css";

const Content = () => {
  const location = useLocation();
  const params = useParams();

  const sections = [
    { id: "section1", title: "Section 1" },
    { id: "section2", title: "Section 2" },
    { id: "section3", title: "Section 3" },
  ];

  return (
    <div className="content">
      <Routes>
        {sections.map((section, index) => (
          <Route
            key={index}
            path={`/${section.id}`}
            element={
              <Section id={section.id} title={section.title}>
                <h1>{section.title}</h1>
                <p>Content for {section.title}.</p>
                <p>Content for {section.title}.</p>
                <p>Content for {section.title}.</p>
                <p>Content for {section.title}.</p>
                <p>Content for {section.title}.</p>
              </Section>
            }
          />
        ))}
        <Route
          path="/"
          element={
            <Section id="section1" title="Section 1">
              <h1>Section 1</h1>
              <p>Content for Section 1.</p>
              <p>Content for Section 1.</p>
              <p>Content for Section 1.</p>
              <p>Content for Section 1.</p>
              <p>Content for Section 1.</p>
            </Section>
          }
        />
      </Routes>
    </div>
  );
};

export default Content;
