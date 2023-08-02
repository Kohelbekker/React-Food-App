import { useRef } from 'react';
import Input from '../../UI/Input/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
  const amountInputRef = useRef();

  const mealSubmitHandler = e => {
    e.preventDefault();

    const amount = amountInputRef.current.value;

    if (amount.trim().length === 0 || +amount < 1 || +amount > 100) return;

    props.onAddToCart(+amount);
  };

  return (
    <form className={classes.form} onSubmit={mealSubmitHandler}>
      <Input
        label="Amount"
        ref={amountInputRef}
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '100',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
