import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { expActions } from "../../../store/expensesSlice";
import useHttp, { GetExpensesURL } from "../../../hooks/use-http";

import "./Expenses.css";
import Card from "../UI/Card";

import ExpenseFilter from "../NewExpense/ExpenseFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

const Expenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.exp.expenses);
  const [year, setYear] = useState("2022");
  const { sendRequest: fetchGetExpenses } = useHttp();

  console.log(expenses);
  useEffect(() => {
    const transformTasks = (mealsObj) => {
      const loadedMeals = [];
      for (const mealKey in mealsObj) {
        loadedMeals.push({
          id: mealsObj[mealKey].id,
          title: mealsObj[mealKey].title,
          amount: mealsObj[mealKey].amount,
          date: mealsObj[mealKey].date,
        });
      }
      console.log(loadedMeals);

      dispatch(expActions.setExpenses(loadedMeals));
    };

    fetchGetExpenses(
      {
        url: GetExpensesURL,
      },
      transformTasks
    );
  }, [fetchGetExpenses, dispatch]);

  const yearChangeHandler = (year) => {
    setYear(year);
  };

  const filteredExpenses = expenses;

  console.log(filteredExpenses);
  // const filteredExpenses = expenses.filter((exp) => {
  //   console.log(exp.date);
  //   return true; // exp.date.getFullYear().toString() === year
  // });

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
