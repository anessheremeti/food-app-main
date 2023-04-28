import { useState } from "react";
const useInput = (validateValue) => {
 const [enteredValue,setEnteredValue] = useState('');
 const [isTouched,setIsTouched] = useState(false);

 const onChangeHandler = (e) => {
    setEnteredValue(e.target.value);
 }
 const onBlurHandler = () => {
    setIsTouched(true);
 }
 const isValid = validateValue(enteredValue);
 const hasError = !isValid && isTouched;
 const reset = () => {
   setEnteredValue('');
   setIsTouched(false);
 };

 return {
    value:enteredValue,
    isValid,
    hasError,
    onBlurHandler,
    onChangeHandler,
    reset
 }
}

export default useInput;