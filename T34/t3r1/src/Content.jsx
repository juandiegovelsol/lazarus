import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CharacterCard from "./CharacterCard";
import "./Content.css";

const Content = () => {
  const location = useLocation();

  return (
    <div className="content">
      <Routes>
        <Route path="/:id" element={<CharacterCard />} />
      </Routes>
    </div>
  );
};

export default Content;
