// TicketLog.jsx
import React from "react";

function TicketLog({ title, tickets, onAcknowledge }) {
  const averageGrade =
    tickets.reduce((sum, ticket) => sum + ticket.grade, 0) / tickets.length ||
    0;

  return (
    <div>
      <h2>{title}</h2>
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
              {onAcknowledge && (
                <button onClick={() => onAcknowledge(ticket.id)}>
                  Acknowledge
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TicketLog;
