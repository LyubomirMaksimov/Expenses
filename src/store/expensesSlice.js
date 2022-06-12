import { createSlice } from "@reduxjs/toolkit";

const DUMMY_DATA = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2022, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const expensesState = [];

const expenseSlice = createSlice({
  name: "exp",
  initialState: expensesState,
  reducers: {
    setExpenses(state, action) {
      const expenses = action.payload;
      state = expenses;
    },
    createExpense(state, action) {
      const id = action.payload.id;
      const title = action.payload.title;
      const amount = action.payload.amount;
      const date = action.payload.date;

      const newExpense = {
        id: id,
        title: title,
        amount: amount,
        date: date,
      };

      state.push(newExpense);
    },
  },
});

export const expActions = expenseSlice.actions;
export default expenseSlice.reducer;
