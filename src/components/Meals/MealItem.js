import React,{useContext} from "react";
import styles from "./MealItem.module.css";
import ItemModal from "../UI/ItemModal";
import CartContext from "../Store/CartContext";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const addToCartHandler = amount => {
    cartCtx.addItem({
      id:props.id,
      name:props.name,
      amount:amount,
      price:props.price
    })
  }

  return (
    <div>
      <ItemModal>
        <div className={styles.meal}>
          <h3>{props.name}</h3>
          <p className={styles.description}>{props.description}</p>
          <h3 className={styles.price}>${props.price}</h3>
          <div>
          <MealItemForm id= {props.id} onAddToCart = {addToCartHandler}/>
          </div>
        </div>
        
      </ItemModal>
    </div>
  );
};
export default MealItem;