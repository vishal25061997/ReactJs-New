import { createSlice } from "@reduxjs/toolkit";
const defaultExpense = { items: [], totalAmount: 0, isPremium: false };
const expensesSlice = createSlice({
  name: "expense",
  initialState: defaultExpense,
  reducers: {
    initialExpense(state, action) {
      let total = 0;
      state.items = action.payload;
    },
    addExpense(state, action) {
      state.items.push(action.payload);
      state.totalAmount += Number(action.payload.expenseMoney);
    },
    editExpense(state, action) {
      // console.log(action.payload.expenseMoney);
      const id = action.payload.id;
      const index = state.items.findIndex((item) => item.id === id);

      if (index !== -1) {
        state.totalAmount =
          +state.totalAmount -
          Number(state.items[index].expenseMoney) +
          Number(action.payload.expenseMoney);
        state.items[index] = action.payload;
      }
    },
    removeExpense(state, action) {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.totalAmount -= +state.items[index].expenseMoney;
      state.items.splice(index, 1);
    },
    updateTotal(state, action) {
      console.log(action.payload, "totalAmount");
      state.totalAmount = action.payload;
    },
  },
});

export default expensesSlice.reducer;
export const expensesActions = expensesSlice.actions;