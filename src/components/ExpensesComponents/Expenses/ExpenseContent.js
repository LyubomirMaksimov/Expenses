import React from "react";

import Expenses from "../ExpensesBoard/Expenses";
import NewExpense from "../NewExpense/NewExpense";

const ExpenseContent = () => {
  return (
    <div>
      <NewExpense></NewExpense>
      <Expenses></Expenses>
    </div>
  );
};

export default ExpenseContent;
