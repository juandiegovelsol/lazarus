class TicketListModel {
  constructor(tickets = []) {
    this.tickets = tickets;
  }

  filterTickets(appName) {
    return this.tickets.filter((ticket) => ticket.appName.includes(appName));
  }

  acknowledgeTicket(id) {
    const acknowledgedTicket = this.tickets.find((ticket) => ticket.id === id);
    this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
    return acknowledgedTicket;
  }

  getAverageGrade() {
    return (
      this.tickets.reduce((sum, ticket) => sum + ticket.grade, 0) /
        this.tickets.length || 0
    );
  }
}

export default TicketListModel;
