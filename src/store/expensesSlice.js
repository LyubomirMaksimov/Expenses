import { createSlice } from "@reduxjs/toolkit";

const expensesState = { expenses: [] };

const expenseSlice = createSlice({
  name: "exp",
  initialState: expensesState,
  reducers: {
    createExpense(state, action) {
      const id = action.payload.id;
      const title = action.payload.title;
      const amount = action.payload.amount;
      const date = action.payload.date;

      const newExpense = {
        id: id,
        title: title,
        amount: amount,
        date: new Date(date),
      };

      state.expenses.push(newExpense);
    },
    setExpenses(state, action) {
      const expenses = action.payload;
      console.log(expenses);

      const array = [];
      expenses.forEach((el) => {
        console.log(`element ${el}`);
        const obj = {
          id: el.id,
          amount: el.amount,
          date: new Date(el.date),
          title: el.title,
        };
        array.push(obj);
      });

      console.log(array);
      state.expenses = array;
      console.log("state", state.expenses);
    },
  },
});

export const expActions = expenseSlice.actions;
export default expenseSlice.reducer;
