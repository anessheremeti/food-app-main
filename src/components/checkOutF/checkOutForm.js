import React, { useState } from "react";
import classes from "./checkOutForm.module.css";
import useInput from "../hooks/Use-input";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../Store/CartContext";
const CheckOutForm = (props) => {
 const cartCtx = useContext(CartContext)
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formIsSubmitted,setFormIsSubmitted] = useState(false);
  const [check,isCheck] = useState(false)

  const submittingRequest = async (name, email, cartItems) => {
    const orderData = {
      name: name,
      email: email,
      cartItems: cartItems,
    };

    const response = await fetch(
      "https://react-http-67fdc-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    console.log(`Order for ${orderData.name}  submitted successfully.`);
    setFormIsSubmitted(true);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const cartItems = props.cartItems;
  
    setIsSubmitting(true);
  
    await submittingRequest(name, email, cartItems);
  
    resetName();
    resetEmail();
    resetNumber();
  
    setIsSubmitting(false);
    setShowForm(false);
    isCheck(true);
    cartCtx.clearCart();
  };

  
  const {
    value: nameInput,
    isValid: nameInputIsValid,
    hasError: nameInputHasError,
    onChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: emailnput,
    isValid: emailnputIsValid,
    hasError: emailnputHasError,
    onChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));
  const {
    value: numberInput,
    isValid: numberIsValid,
    hasError: numberInputHasError,
    onChangeHandler: numberChangeHandler,
    onBlurHandler: numberBlurHandler,
    reset: resetNumber,
  } = useInput((value) => value.trim() !== "");

  const cancelFormHandler = () => {
    setShowForm(false)
  }
  
  let formIsValid = false;
    if (nameInputIsValid && emailnputIsValid && numberIsValid) {
      formIsValid = true;
  }
  else{
    formIsValid = false;
  }

  const errorClasses = nameInputHasError ? `form-control invalid` : " form-control";
  const emailError = emailnputHasError ? "form-control invalid" : "form-control";
  const numberError = numberInputHasError ? "form-control invalid" : " form-control";

  const orderSent = <React.Fragment><p className={classes.order}>The order is successfully sent!</p></React.Fragment>
  

  return (
    <Modal className = {classes.overlay} onClose = {cancelFormHandler}>
    <div >
    {showForm && (
      <form className={classes.form} onSubmit={submitHandler}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          name="name"
          value={nameInput}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && !nameInputIsValid && (
          <p className={errorClasses}> Please enter a valid name</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={emailnput}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailnputHasError && !emailnputIsValid && (
          <p className={emailError}> Please enter a valid Email!</p>
        )}
        <label htmlFor="tel">Your Number</label>
        <input
          type="tel"
          name="tel"
          value={numberInput}
          onChange={numberChangeHandler}
          onBlur={numberBlurHandler}
        />
        {numberInputHasError && !numberIsValid && (
          <p className={numberError}>Please enter a phone Number!</p>
        )}
        <button
        onClick={props.orderItemHandler}
          id="submit-btn"
          className={classes.button}
          type="submit"
          disabled={!formIsValid || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
          
        </button>
        {showForm && <button onClick={cancelFormHandler} className={classes.cancel} >Cancel</button>}
      </form>
    )}
    {!showForm && !check &&(
      <button
        className={classes.checkOut}
        onClick={() => setShowForm(true)}
      >
        Checkout
      </button>
      
    )}
    {!formIsSubmitted && check}
    {formIsSubmitted && orderSent}
  </div>
  </Modal>
  );
};

export default CheckOutForm;
