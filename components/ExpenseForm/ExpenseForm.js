import React, { useRef, useEffect, useState } from "react";
import ShowExpenses from "./ShowExpenses";
import classes from "./ExpenseForm.module.css";
import { CSVLink } from "react-csv";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../../Store/expense";
import { premiumAction } from "../../Store/premium";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const ExpenseItem = useSelector((state) => state.expenses.items);
  const isPremium = useSelector((state) => state.expenses.totalAmount);
  const isActivate = useSelector((state) => state.premium.activated);
  const dark = useSelector((state) => state.premium.isDarkMode);
  console.log("total aay", isPremium);

  const email = localStorage.getItem("email");
  const endPoint = email.replace(/[@,.]/g, "");
  console.log(endPoint, "aGJ");

  const expenseNameRef = useRef();
  const expenseDescriptionRef = useRef();
  const expenseMoneyRef = useRef();

  const submitHandeler = async (e) => {
    e.preventDefault();
    const expense = {
      expenseName: expenseNameRef.current.value,
      expenseDescription: expenseDescriptionRef.current.value,
      expenseMoney: expenseMoneyRef.current.value,
    };
    expenseNameRef.current.value = "";
    expenseDescriptionRef.current.value = "";
    expenseMoneyRef.current.value = "";
    try {
      const response = await axios.post(
        `https://expense-tracker-6e3d7-default-rtdb.firebaseio.com/items/${endPoint}.json`,
        expense
      );

      // console.log('nitya',response);

      const data = response.data;
      console.log("response", response.data);
      // console.log(data,'nitty');
      const id = data.name;
      const serverItem = {
        ...expense,
        id,
      };
      dispatch(expensesActions.addExpense(serverItem));
      // console.log(expenses);
    } catch (e) {}
  };
  const premiumHandeler = () => {
    console.log("running");
    dispatch(premiumAction.activatePremium());
  };

  const headers = [
    {
      label: "Name",
      key: "expenseName",
    },
    {
      label: "Price",
      key: "expenseMoney",
    },
    {
      label: "Description",
      key: "expenseDescription",
    },
  ];

  const csvLink = {
    headers: headers,
    data: ExpenseItem,
    filename: "expenses.csv",
  };

  const themeClass = dark ? `${classes.dark}` : "";
  return (
    <div>
      {!isActivate && (
        <div>
          {isPremium >= 10000 ? (
            <button className={classes.premiumbtn} onClick={premiumHandeler}>
              Activate Premium
            </button>
          ) : (
            ""
          )}
        </div>
      )}
      {isActivate && (
        <button className={classes.csvBtn}>
          <CSVLink {...csvLink}>Export To CVS</CSVLink>
        </button>
      )}
      <div className={`${classes.form} ${themeClass} `}>
        <form onSubmit={submitHandeler}>
          <label>1. ExpenseName -- </label>
          <input
            type="text"
            ref={expenseNameRef}
            className={classes.style}
            required
          />
          <label>2. Description -- </label>
          <input
            type="text"
            ref={expenseDescriptionRef}
            required
            className={classes.style}
          />
          <label>3. Money Expand -- </label>
          <input
            type="number"
            ref={expenseMoneyRef}
            required
            className={classes.style}
          />
          <button className={classes.btn}>Add</button>
        </form>
      </div>
      <ShowExpenses />
    </div>
  );
};

export default ExpenseForm;