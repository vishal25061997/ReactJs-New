import React from "react";
import classes from "./ExpenseItem.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { expensesActions } from "../../Store/expense";

const ExpenseItem = (props) => {
  const dispatch = useDispatch();
  const endPoint = localStorage.getItem("email").replace(/[@,.]/g, "");
  const editExpenseHandeler = async (name, description, money, id) => {
    console.log("nitya is my vision ");

    const data = {
      id: id,
      expenseName: name,
      expenseDescription: description,
      expenseMoney: money,
    };
    props.getSingleEditData(data);
  };
  const removeExpenseHandeler = async (id) => {
    console.log("remove funcc work");

    try {
      const response = await axios.delete(
        `https://expense-tracker-6e3d7-default-rtdb.firebaseio.com/items/${endPoint}/${id}.json`
      );
      // console.log(response);
      //   const expenseItem = localStorage.get('expenses');
      //   console.log(expenseItem,'aaya');
      localStorage.removeItem("expensesItem");
      dispatch(expensesActions.removeExpense(id));
    } catch (e) {}
  };

  return (
    <tr className={classes.table}>
      <td>{props.expenseName}</td>
      <td>{props.expenseDescription}</td>
      <td>{props.expenseMoney}</td>

      <td>
        <button
          onClick={() => {
            editExpenseHandeler(
              props.expenseName,
              props.expenseDescription,
              props.expenseMoney,
              props.id
            );
          }}
          className={classes.button1}>
          Edit Expense
        </button>
        <button
          onClick={() => {
            removeExpenseHandeler(props.id);
          }}
          className={classes.button2}>
          Remove Expense
        </button>
      </td>
    </tr>
  );
};

export default ExpenseItem;