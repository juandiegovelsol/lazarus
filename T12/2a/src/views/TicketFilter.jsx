// src/views/TicketFilter.js
import React from "react";

function TicketFilter({ value, onChange }) {
  return (
    <select value={value} onChange={onChange}>
      <option value="">All Apps</option>
      <option value="App 1">App 1</option>
      <option value="App 2">App 2</option>
      <option value="App 3">App 3</option>
    </select>
  );
}

export default TicketFilter;
