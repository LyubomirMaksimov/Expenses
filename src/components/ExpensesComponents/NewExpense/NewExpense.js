import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { expActions } from "../../../store/expensesSlice";
import useHttp, { GetExpensesURL } from "../../../hooks/use-http";

import "./NewExpense.css";

import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const { sendRequest: SaveExpenseRequest } = useHttp();

  const onSaveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    SaveExpenseRequest(
      {
        url: GetExpensesURL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: expenseData,
      },
      () => {}
    );

    dispatch(expActions.createExpense(expenseData));
    setOpenForm(false);
  };

  const formHandler = () => {
    setOpenForm(!openForm);
  };

  return (
    <div className="new-expense">
      {!openForm && <button onClick={formHandler}>Add New Expense</button>}
      {openForm && (
        <ExpenseForm
          onSaveExpenseData={onSaveExpenseDataHandler}
          onCancelExpense={formHandler}
        ></ExpenseForm>
      )}
    </div>
  );
};

export default NewExpense;
