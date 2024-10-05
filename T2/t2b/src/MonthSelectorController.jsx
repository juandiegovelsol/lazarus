import React, { useState } from "react";
import MonthSelectorView from "./MonthSelectorView";

const MonthSelectorController = ({
  months,
  selectedMonth,
  setSelectedMonth,
}) => {
  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  return (
    <MonthSelectorView
      selectedMonth={selectedMonth}
      handleMonthSelect={handleMonthSelect}
      months={months}
    />
  );
};

export default MonthSelectorController;
