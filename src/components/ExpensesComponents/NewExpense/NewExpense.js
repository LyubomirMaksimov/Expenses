import React, { useState } from "react";
import "./NewExpense.css";

import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  const [openForm, setOpenForm] = useState(false);

  const onSaveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    props.addExpense(expenseData);
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
