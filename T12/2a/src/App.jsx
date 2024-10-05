// src/App.js
import React, { useState, useEffect } from "react";
import TicketController from "./controllers/TicketController";
import TicketList from "./views/TicketList";
import TicketFilter from "./views/TicketFilter";

function App() {
  const [ticketController] = useState(new TicketController());
  const [unacknowledgedTickets, setUnacknowledgedTickets] = useState([]);
  const [acknowledgedTickets, setAcknowledgedTickets] = useState([]);
  const [unacknowledgedFilter, setUnacknowledgedFilter] = useState("");
  const [acknowledgedFilter, setAcknowledgedFilter] = useState("");

  useEffect(() => {
    setUnacknowledgedTickets(
      ticketController.getFilteredTickets("unacknowledged")
    );
    setAcknowledgedTickets(ticketController.getFilteredTickets("acknowledged"));
  }, [unacknowledgedFilter, acknowledgedFilter]);

  const handleAcknowledge = (id) => {
    ticketController.acknowledgeTicket(id);
    setUnacknowledgedTickets(
      ticketController.getFilteredTickets("unacknowledged")
    );
    setAcknowledgedTickets(ticketController.getFilteredTickets("acknowledged"));
  };

  const handleFilterChange = (type, filter) => {
    if (type === "unacknowledged") {
      ticketController.updateFilter(type, filter);
      setUnacknowledgedFilter(filter);
    } else {
      ticketController.updateFilter(type, filter);
      setAcknowledgedFilter(filter);
    }
  };

  return (
    <div>
      <h2>Unacknowledged Tickets</h2>
      <TicketFilter
        value={unacknowledgedFilter}
        onChange={(e) => handleFilterChange("unacknowledged", e.target.value)}
      />
      <p>
        Average Grade:{" "}
        {ticketController.getAverageGrade("unacknowledged").toFixed(2)}
      </p>
      <TicketList
        tickets={unacknowledgedTickets}
        onAcknowledge={handleAcknowledge}
      />
      <h2>Acknowledged Tickets</h2>
      <TicketFilter
        value={acknowledgedFilter}
        onChange={(e) => handleFilterChange("acknowledged", e.target.value)}
      />
      <p>
        Average Grade:{" "}
        {ticketController.getAverageGrade("acknowledged").toFixed(2)}
      </p>
      <TicketList tickets={acknowledgedTickets} />
    </div>
  );
}

export default App;
