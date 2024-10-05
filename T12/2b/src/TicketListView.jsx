import React, { useState, useEffect } from "react";

function TicketListView({ controller }) {
  const [tickets, setTickets] = useState([]);
  const [averageGrade, setAverageGrade] = useState(0);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    controller.updateView();
  }, [controller]);

  const handleFilterChange = (e) => {
    controller.onFilterChange(e.target.value);
  };

  const handleAcknowledge = (id) => {
    controller.onAcknowledge(id);
  };

  const update = (tickets, averageGrade) => {
    setTickets(tickets);
    setAverageGrade(averageGrade);
  };

  controller.view = {
    onFilterChange: handleFilterChange,
    onAcknowledge: handleAcknowledge,
    update,
  };

  return (
    <div>
      <select value={filter} onChange={handleFilterChange}>
        <option value="">All Apps</option>
        <option value="App 1">App 1</option>
        <option value="App 2">App 2</option>
        <option value="App 3">App 3</option>
      </select>
      <h2>Ticket List</h2>
      <p>Average Grade: {averageGrade.toFixed(2)}</p>
      <ul>
        {tickets
          .sort((a, b) => a.grade - b.grade)
          .map((ticket) => (
            <li key={ticket.id}>
              <p>App Name: {ticket.appName}</p>
              <p>Ticket ID: {ticket.id}</p>
              <p>Grade: {ticket.grade}</p>
              <p>Feedback: {ticket.feedback}</p>
              <button onClick={() => handleAcknowledge(ticket.id)}>
                Acknowledge
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TicketListView;
