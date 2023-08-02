import { useState } from 'react';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';

function App() {
  const [showCart, setCart] = useState(false);

  const showCartHandler = () => {
    setCart(true);
  };

  const hideCartHandler = () => {
    setCart(false);
  };

  const modalHandler = () => {};

  return (
    <CartProvider>
      {showCart && <Cart onClose={hideCartHandler} />}
      <Header
        headerText="Kebab Dash"
        modalHandler={modalHandler}
        onCartClick={showCartHandler}
      />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
