import {useRef,useState} from "react";
import classes from './MealItemForm.module.css';
import Input from './Input';
const MealItemForm = (props) => {
    const[amountIsValid,setAmountIsValid] = useState(true);
    const amountRef = useRef();
    const onSubmitHandler = event => {
        event.preventDefault();
        const ItemAmount = amountRef.current.value;
        const ItemAmountNum = +ItemAmount;
        if(ItemAmount.trim().length === 0 || ItemAmount < 1 || ItemAmount > 5 ){
            setAmountIsValid(false)
            return;
        }
        props.onAddToCart(ItemAmountNum);
    }
    return (
        <form className={classes.form} onSubmit = {onSubmitHandler}>
      <Input
        label='Amount'
        ref = {amountRef}
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
          
        }}
      />
      <button classname={classes.btn}>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
    
    )
}
export default MealItemForm;