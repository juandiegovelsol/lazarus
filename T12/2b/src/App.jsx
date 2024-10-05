import React from "react";
import TicketListModel from "./TicketListModel";
import TicketListController from "./TicketListController";
import TicketListView from "./TicketListView";

function App() {
  const unacknowledgedTickets = [
    { id: 1, appName: "App 1", grade: 4, feedback: "Great job!" },
    { id: 2, appName: "App 1", grade: 3, feedback: "Good job!" },
    { id: 3, appName: "App 2", grade: 5, feedback: "Excellent job!" },
    { id: 4, appName: "App 2", grade: 2, feedback: "Fair job!" },
    { id: 5, appName: "App 3", grade: 4, feedback: "Great job!" },
  ];

  const acknowledgedTickets = [];

  const unacknowledgedModel = new TicketListModel(unacknowledgedTickets);
  const acknowledgedModel = new TicketListModel(acknowledgedTickets);

  const unacknowledgedController = new TicketListController(
    unacknowledgedModel
  );
  const acknowledgedController = new TicketListController(acknowledgedModel);

  return (
    <div>
      <TicketListView controller={unacknowledgedController} />
      <TicketListView controller={acknowledgedController} />
    </div>
  );
}

export default App;
