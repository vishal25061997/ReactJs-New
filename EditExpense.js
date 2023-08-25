import React, { useRef } from "react";
import { CSVLink } from 'react-csv';
import classes from "./EditExpense.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../../Store/expense";

function EditExpense(props) {
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.premium.isDarkMode);

  console.log("checking props", props);
  const titleRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const url = "https://expense-tracker-6e3d7-default-rtdb.firebaseio.com";
  const email = localStorage.getItem("email").replace(/[@.]/g, "");

  async function editHandler(e) {
    e.preventDefault();
    const endPoint = localStorage.getItem("email").replace(/[@,.]/g, "");
    const data = {
      expenseName: titleRef.current.value,
      expenseDescription: categoryRef.current.value,
      expenseMoney: priceRef.current.value,
    };
    const id = props.editData.id;
    console.log(id);
    const response = await axios.put(
      `https://expense-tracker-6e3d7-default-rtdb.firebaseio.com/items/${endPoint}/${id}.json`,
      data
    );
    if (response.status === 200) {
      dispatch(
        expensesActions.editExpense({
          ...data,
          id: props.editData.id,
        })
      );
      props.showCancle();
    }
  }
  const darkClass = dark ? `${classes.dark}` : "";
  return (
    <div className={`${classes.container} ${darkClass}`}>
      <form className={classes.form} onSubmit={editHandler}>
        <label>Expense Title:</label>
        <input
          defaultValue={props.editData.expenseName}
          ref={titleRef}
          type="text"
          placeholder="Enter Expense Title"
          className={classes.style}
        />

        <label>Category:</label>
        <input
          defaultValue={props.editData.expenseDescription}
          ref={categoryRef}
          type="text"
          placeholder="Enter Category"
          className={classes.style}
        />

        <label>Price:</label>
        <input
          defaultValue={props.editData.expenseMoney}
          ref={priceRef}
          type="number"
          placeholder="Enter Price"
          className={classes.style}
        />

        <div>
          <button className={classes.btn}>Update</button>
        </div>
      </form>
      <button onClick={props.showCancle} className={classes.btn}>
        Cancel
      </button>
    </div>
  );
}

export default EditExpense;