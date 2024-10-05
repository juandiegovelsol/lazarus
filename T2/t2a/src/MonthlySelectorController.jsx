import React, { useState } from "react";
import MonthlySelectorView from "./MonthlySelectorView";

const MonthlySelectorController = ({ onMonthChange }) => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    onMonthChange(event.target.value);
  };

  return (
    <MonthlySelectorView
      months={months}
      selectedMonth={selectedMonth}
      handleMonthChange={handleMonthChange}
    />
  );
};

export default MonthlySelectorController;
