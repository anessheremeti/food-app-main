import React,{useState,useEffect,forwardRef} from "react";
import styles from "./Input.module.css";

const Input = forwardRef((props,ref) => {
  
  const [startingValue,setVal] = useState(0);
  useEffect(() => {
    console.log('The starting value has changed:', startingValue)
  },[startingValue])
  const onChangeHandler = (e) => {
    if ( e.target.value.trim().length > 0) {
      setVal(e.target.value);
    }
  }
  
  return (
    <div className={styles.input}>
        <label style = {{paddingRight:'15px'}}htmlFor={props.input.id}> {props.label}</label>
        <input type="text" ref={props.amountRef  ? props.amountRef : ref} {...props.input} onChange={onChangeHandler} />
      </div>

  );
});

export default Input;