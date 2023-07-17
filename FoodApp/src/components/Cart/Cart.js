import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem/CartItem';
import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';

const Cart = props => {
  const cartCtx = useContext(CartContext);

  const cartItemAdd = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemove = id => {
    cartCtx.removeItem(id);
  };

  return (
    <Modal onClose={props.onClose}>
      <ul className={classes['cart-items']}>
        {cartCtx.items.map(item => (
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
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {cartCtx.items.length > 0 && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
