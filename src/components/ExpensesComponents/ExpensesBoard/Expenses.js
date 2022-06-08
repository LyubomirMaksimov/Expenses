import React, { useState } from "react";

import "./Expenses.css";
import Card from "../UI/Card";

import ExpenseFilter from "../NewExpense/ExpenseFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {
  let expenses = props.expenses;

  const [year, setYear] = useState("2022");

  const yearChangeHandler = (year) => {
    setYear(year);
  };

  const filteredExpenses = expenses.filter(
    (exp) => exp.date.getFullYear().toString() === year
  );

  return (
    <Card className="expenses">
      <ExpenseFilter
        selected={year}
        onYearChange={yearChangeHandler}
      ></ExpenseFilter>
      <ExpensesChart expenses={filteredExpenses}></ExpensesChart>
      <ExpensesList expenses={filteredExpenses} />
    </Card>
  );
};

export default Expenses;
