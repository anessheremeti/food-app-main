import { useContext ,useState} from 'react';
import CheckOutForm from '../checkOutF/checkOutForm';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../Store/CartContext';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkShown,setcheckShown] = useState(false)
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const checkHandler = () => {
    setcheckShown(true)
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const OrderItemHandler = (e) => {
    e.preventDefault();
    checkHandler();
    console.log('...Ordering');
    
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      <div className={classes.actions}>
      
        <button className={classes['button--alt']} onClick={props.onCloseCart} >
          Close
        </button>
        {hasItems &&   <button onClick={OrderItemHandler} className={classes.button}>Order</button>}
        {checkShown && <CheckOutForm cartItems = {cartCtx.items}orderItem={OrderItemHandler} />}
      </div>
     
    </Modal>
  );
};

export default Cart;
