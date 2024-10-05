class TicketListController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.filter = "";

    this.view.onFilterChange = (filter) => {
      this.filter = filter;
      this.updateView();
    };

    this.view.onAcknowledge = (id) => {
      const acknowledgedTicket = this.model.acknowledgeTicket(id);
      // Send the acknowledged ticket to another controller or model
      // For now, just log it
      // console.log(acknowledgedTicket);
      this.updateView();
    };
  }

  updateView() {
    const filteredTickets = this.model.filterTickets(this.filter);
    const averageGrade = this.model.getAverageGrade();
    this.view.update(filteredTickets, averageGrade);
  }
}

export default TicketListController;
