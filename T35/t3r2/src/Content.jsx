import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CharacterSection from "./CharacterSection";
import EpisodeSection from "./EpisodeSection";
import "./Content.css";

const Content = () => {
  return (
    <div className="content">
      <Routes>
        <Route path="/:id" element={<CharacterSection />} />
        <Route path="/episode/:id" element={<EpisodeSection />} />
        <Route path="*" element={<Navigate to="/1" replace />} />
      </Routes>
    </div>
  );
};

export default Content;
