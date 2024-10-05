// src/controllers/TicketController.js
import Ticket from "../models/ticket";

class TicketController {
  constructor() {
    this.tickets = {
      unacknowledged: [
        new Ticket(1, "App 1", 4, "Great job!"),
        new Ticket(2, "App 1", 3, "Good job!"),
        new Ticket(3, "App 2", 5, "Excellent job!"),
        new Ticket(4, "App 2", 2, "Fair job!"),
        new Ticket(5, "App 3", 4, "Great job!"),
      ],
      acknowledged: [],
    };
    this.filters = {
      unacknowledged: "",
      acknowledged: "",
    };
  }

  acknowledgeTicket(id) {
    const acknowledgedTicket = this.tickets.unacknowledged.find(
      (ticket) => ticket.id === id
    );
    this.tickets.acknowledged.push(acknowledgedTicket);
    this.tickets.unacknowledged = this.tickets.unacknowledged.filter(
      (ticket) => ticket.id !== id
    );
  }

  updateFilter(type, filter) {
    this.filters[type] = filter;
  }

  getFilteredTickets(type) {
    return this.tickets[type].filter((ticket) =>
      ticket.appName.includes(this.filters[type])
    );
  }

  getAverageGrade(type) {
    const tickets = this.getFilteredTickets(type);
    return (
      tickets.reduce((sum, ticket) => sum + ticket.grade, 0) / tickets.length ||
      0
    );
  }
}

export default TicketController;
