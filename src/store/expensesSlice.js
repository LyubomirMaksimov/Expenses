import { createSlice } from "@reduxjs/toolkit";

const expensesState = [];

const expensesSlice = createSlice({
  name: "expenses",
  initialState: expensesState,
  reducers: {
    getExpenses(state) {},
    createExpense(state, action) {
      const title = action.payload.title;
      const amount = action.payload.amount;
      const date = action.payload.date;
    },
  },
});

export const expenseActions = expensesSlice.actions;
export default expensesSlice.reducer;
