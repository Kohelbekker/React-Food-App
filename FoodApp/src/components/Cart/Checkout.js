import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const postalRegex = /^\d+$/;
const containNumRegex = /\d/;

const stringIsValid = (val) => val.trim().length !== 0;

const postalIsValid = (code) => code.length === 5 && postalRegex.test(code);

const streetIsValid = (val) => stringIsValid(val) && containNumRegex.test(val);

const Checkout = (props) => {
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const formHandler = (e) => {
    e.preventDefault();

    const nameValue = nameRef.current.value;
    const streetValue = streetRef.current.value;
    const postalValue = postalRef.current.value;
    const cityValue = cityRef.current.value;

    setFormIsValid({
      name: stringIsValid(nameValue),
      street: streetIsValid(streetValue),
      postal: postalIsValid(postalValue),
      city: stringIsValid(cityValue),
    });

    const formIsValid =
      stringIsValid(nameValue) &&
      streetIsValid(streetValue) &&
      postalIsValid(postalValue) &&
      stringIsValid(cityValue);

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: nameValue,
      street: streetValue,
      postal: postalValue,
      city: cityValue,
    });
  };

  const inputStyles = (inputName) => {
    return `${classes.control} ${
      formIsValid[inputName] ? '' : classes.invalid
    }`;
  };

  return (
    <form className={classes.form} onSubmit={formHandler}>
      <div className={inputStyles('name')}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formIsValid.name && (
          <p className={classes['error-text']}>Please enter a valid name</p>
        )}
      </div>
      <div className={inputStyles('street')}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formIsValid.street && (
          <p className={classes['error-text']}>Please enter a valid street</p>
        )}
      </div>
      <div className={inputStyles('postal')}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!formIsValid.postal && (
          <p className={classes['error-text']}>
            Please enter a valid postal code (5 characters long)
          </p>
        )}
      </div>
      <div className={inputStyles('city')}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formIsValid.city && (
          <p className={classes['error-text']}>Please enter a valid city</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
