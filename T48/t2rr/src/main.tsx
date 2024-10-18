import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FantasyCreatureGenerator from "./FantasyCreatureGenerator.tsx";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FantasyCreatureGenerator />
  </StrictMode>
);
