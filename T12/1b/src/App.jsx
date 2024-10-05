// App.jsx
import React, { useState } from "react";
import TicketLog from "./TicketLog";

function App() {
  const [tickets, setTickets] = useState({
    acknowledged: [],
    unacknowledged: [
      { id: 1, appName: "App 1", grade: 4, feedback: "Great job!" },
      { id: 2, appName: "App 1", grade: 3, feedback: "Good job!" },
      { id: 3, appName: "App 2", grade: 5, feedback: "Excellent job!" },
      { id: 4, appName: "App 2", grade: 2, feedback: "Fair job!" },
      { id: 5, appName: "App 3", grade: 4, feedback: "Great job!" },
    ],
  });

  const [filter, setFilter] = useState("");

  const handleAcknowledge = (id) => {
    const acknowledgedTicket = tickets.unacknowledged.find(
      (ticket) => ticket.id === id
    );
    setTickets({
      acknowledged: [...tickets.acknowledged, acknowledgedTicket],
      unacknowledged: tickets.unacknowledged.filter(
        (ticket) => ticket.id !== id
      ),
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <select value={filter} onChange={handleFilterChange}>
        <option value="">All Apps</option>
        <option value="App 1">App 1</option>
        <option value="App 2">App 2</option>
        <option value="App 3">App 3</option>
      </select>
      <TicketLog
        title="Unacknowledged Tickets"
        tickets={tickets.unacknowledged.filter((ticket) =>
          ticket.appName.includes(filter)
        )}
        onAcknowledge={handleAcknowledge}
      />
      <TicketLog
        title="Acknowledged Tickets"
        tickets={tickets.acknowledged.filter((ticket) =>
          ticket.appName.includes(filter)
        )}
      />
    </div>
  );
}

export default App;
