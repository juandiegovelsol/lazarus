// App.js
import React, { useState } from "react";
import TicketLog from "./TicketLog";
import AcknowledgedTickets from "./AcknowledgedTickets";

function App() {
  const [tickets, setTickets] = useState([
    { appName: "App1", ticketId: 1, grade: 3, feedback: "Good job" },
    { appName: "App1", ticketId: 2, grade: 4, feedback: "Excellent work" },
    { appName: "App2", ticketId: 3, grade: 2, feedback: "Needs improvement" },
    { appName: "App2", ticketId: 4, grade: 5, feedback: "Outstanding" },
    { appName: "App3", ticketId: 5, grade: 1, feedback: "Poor performance" },
  ]);

  const [acknowledgedTickets, setAcknowledgedTickets] = useState([]);
  const [appFilter, setAppFilter] = useState("");

  const acknowledgeTicket = (ticketId) => {
    const ticketToAcknowledge = tickets.find(
      (ticket) => ticket.ticketId === ticketId
    );
    setAcknowledgedTickets([...acknowledgedTickets, ticketToAcknowledge]);
    setTickets(tickets.filter((ticket) => ticket.ticketId !== ticketId));
  };

  const handleFilterChange = (e) => {
    setAppFilter(e.target.value);
  };

  return (
    <div>
      <h1>Ticket Log</h1>
      <select value={appFilter} onChange={handleFilterChange}>
        <option value="">All Apps</option>
        <option value="App1">App1</option>
        <option value="App2">App2</option>
        <option value="App3">App3</option>
      </select>
      <TicketLog
        tickets={tickets}
        acknowledgeTicket={acknowledgeTicket}
        appFilter={appFilter}
      />
      <AcknowledgedTickets
        tickets={acknowledgedTickets}
        appFilter={appFilter}
      />
    </div>
  );
}

export default App;
