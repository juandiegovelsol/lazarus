import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CharacterSection from "./CharacterSection";
import "./Content.css";

const Content = ({ characters }) => {
  return (
    <div className="content">
      <Routes>
        <Route
          path="/:id"
          element={<CharacterSection characters={characters} />}
        />
        <Route path="*" element={<Navigate to="/1" replace />} />
      </Routes>
    </div>
  );
};

export default Content;
