import { useContext, useState } from 'react';
import Checkout from './Checkout';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem/CartItem';
import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
  const [isCheckout, setCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const cartItemAdd = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemove = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    await fetch(
      'https://react-tutorial-aa15b-default-rtdb.europe-west1.firebasedatabase.app/uploads.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          order: cartCtx.items,
        }),
      }
    );

    props.onClose();
    cartCtx.removeAll();
  };

  const buttonBlock = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {cartCtx.items.length > 0 && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={cartItemRemove.bind(null, item.id)}
            onAdd={cartItemAdd.bind(null, item)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartCtx.totalAmount.toFixed(2)}$</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && buttonBlock}
    </Modal>
  );
};

export default Cart;
