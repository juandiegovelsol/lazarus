import React from "react";
import Section from "./Section";
import "./Content.css";

const Content = () => {
  return (
    <div className="content">
      <Section id="section1">
        <h1>Section 1</h1>
        <p>Content for section 1.</p>
        <p>Content for section 1.</p>
        <p>Content for section 1.</p>
        <p>Content for section 1.</p>
        <p>Content for section 1.</p>
      </Section>
      <Section id="section2">
        <h1>Section 2</h1>
        <p>Content for section 2.</p>
        <p>Content for section 2.</p>
        <p>Content for section 2.</p>
        <p>Content for section 2.</p>
        <p>Content for section 2.</p>
      </Section>
      <Section id="section3">
        <h1>Section 3</h1>
        <p>Content for section 3.</p>
        <p>Content for section 3.</p>
        <p>Content for section 3.</p>
        <p>Content for section 3.</p>
        <p>Content for section 3.</p>
      </Section>
    </div>
  );
};

export default Content;
