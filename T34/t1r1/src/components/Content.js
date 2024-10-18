import React from "react";
import styles from "./Content.module.css";

const Content = ({ children, shift }) => {
  return (
    <div className={`${styles.content} ${shift ? styles.shift : ""}`}>
      {children}
    </div>
  );
};

export default Content;
