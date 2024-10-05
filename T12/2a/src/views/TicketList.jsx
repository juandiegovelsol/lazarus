// src/views/TicketList.js
import React from "react";

function TicketList({ tickets, onAcknowledge }) {
  return (
    <ul>
      {tickets.map((ticket) => (
        <li key={ticket.id}>
          <p>App Name: {ticket.appName}</p>
          <p>Ticket ID: {ticket.id}</p>
          <p>Grade: {ticket.grade}</p>
          <p>Feedback: {ticket.feedback}</p>
          {onAcknowledge && (
            <button onClick={() => onAcknowledge(ticket.id)}>
              Acknowledge
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TicketList;
