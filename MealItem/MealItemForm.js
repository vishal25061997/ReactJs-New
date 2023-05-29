import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css"

const MealItemForm=props=>{
return <form className={classes.form}>
   <Input label="Amount" input={{
     id: 'amount',
     type:'amount',
     min:'1' ,
     max:'5',
     step:'1',
     defaultValue:'1'
   }}/>
   <input/>
   <button>Add</button>
</form>
}

export default MealItemForm;