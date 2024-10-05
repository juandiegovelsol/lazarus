// TicketLog.js
import React from "react";

const TicketLog = ({ tickets, acknowledgeTicket, appFilter }) => {
  const filteredTickets = tickets.filter((ticket) => {
    if (!appFilter) return true;
    return ticket.appName === appFilter;
  });

  const averageGrade =
    filteredTickets.reduce((sum, ticket) => sum + ticket.grade, 0) /
      filteredTickets.length || 0;

  const sortedTickets = filteredTickets.sort((a, b) => a.grade - b.grade);

  return (
    <div>
      <h2>Tickets</h2>
      <p>Average Grade: {averageGrade.toFixed(2)}</p>
      <ul>
        {sortedTickets.map((ticket) => (
          <li key={ticket.ticketId}>
            <p>App Name: {ticket.appName}</p>
            <p>Ticket ID: {ticket.ticketId}</p>
            <p>Grade: {ticket.grade}</p>
            <p>Feedback: {ticket.feedback}</p>
            <button onClick={() => acknowledgeTicket(ticket.ticketId)}>
              Acknowledge
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketLog;
