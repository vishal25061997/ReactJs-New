import React, { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import classes from "./ShowExpense.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { expensesActions } from "../../Store/expense";
import EditExpense from "./EditExpense";
export default function ShowExpenses() {
  // console.log(props.candies);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState([]);
  const email = localStorage.getItem("email");
  const endPoint = email.replace(/[@,.]/g, "");
  console.log(endPoint, "aGJ");
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expenses.items);
  const getData = async () => {
    const response = await axios.get(
      `https://expense-tracker-6e3d7-default-rtdb.firebaseio.com/items/${endPoint}.json`
    );
    console.log("initialdata", response);
    if (response.status === 200) {
      if (response.data) {
        const expensesArray = Object.keys(response.data).map((expenseID) => ({
          id: expenseID,
          expenseDescription: response.data[expenseID].expenseDescription,
          expenseMoney: response.data[expenseID].expenseMoney,
          expenseName: response.data[expenseID].expenseName,
        }));
        console.log(expensesArray, "aaaaa");

        const prices = expensesArray.map((item) => item.expenseMoney);
        const initialTotal = prices.reduce((pre, cur) => {
          return +pre + +cur;
        }, 0);
        dispatch(expensesActions.updateTotal(initialTotal));
        dispatch(expensesActions.initialExpense(expensesArray));
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  function getSingleEditData(obj) {
    console.log(obj);
    setEditData(obj);
    setShowEdit(true);
  }

  const showCancle = () => {
    setShowEdit(false);
  };
  const expenseItems = expense.map((item) => {
    return (
      <ExpenseItem
        key={item.id}
        id={item.id}
        expenseName={item.expenseName}
        expenseDescription={item.expenseDescription}
        expenseMoney={item.expenseMoney}
        getSingleEditData={getSingleEditData}
      />
    );
  });
  return (
    <div>
      {showEdit && <EditExpense editData={editData} showCancle={showCancle} />}
      <div className={classes.form}>
        <table>
          <tbody>
            <tr className={classes.row}>
              <th>Name</th>
              <th>Description</th>
              <th>Money Expand</th>
            </tr>
            {expenseItems}
          </tbody>
        </table>
      </div>
    </div>
  );
}