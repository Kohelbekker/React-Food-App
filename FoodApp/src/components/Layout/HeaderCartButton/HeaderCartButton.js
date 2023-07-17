import { useContext, useEffect, useState } from 'react';
import CartIcon from '../../Cart/CartIcon';
import CartContext from '../../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderButton = props => {
  const [btnAnimation, setBtnAnimation] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfItems = items.reduce((num, item) => num + item.amount, 0);

  useEffect(() => {
    if (items.length === 0) return;

    setBtnAnimation(true);

    const timer = setTimeout(() => {
      setBtnAnimation(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnClasses = `${classes.button} ${btnAnimation ? classes.bump : ''}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderButton;
