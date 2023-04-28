import './App.css';
import { useState } from 'react';

import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import CartProvider from './components/Store/CartProvider';


function App() {
  const [isShown, setIsShown] = useState(false);
  const [isCheckoutFormVisible, setIsCheckoutFormVisible] = useState(false);

  const onShowCart = () => {
    setIsShown(true);
  }
  const onHideCart = () => {
    setIsShown(false);
  }
  const showCheckoutFormHandler = () => {
    setIsCheckoutFormVisible(true);
  };
  const hideCheckoutFormHandler = () => {
    setIsCheckoutFormVisible(false);
  };

  return (
    <CartProvider>
      <div className={isCheckoutFormVisible ? "checkout-form-visible" : ""}>
        <Header onShowCart={onShowCart} />
        {isShown && <Cart onCloseCart={onHideCart} />}
      </div>
    </CartProvider>
  );
}

//items={cartItems} onAddItem={onAddItemHandler}
export default App;
