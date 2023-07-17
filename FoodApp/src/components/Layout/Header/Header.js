import { Fragment } from 'react';
import HeaderButton from '../HeaderCartButton/HeaderCartButton';
import classes from './Header.module.css';
import mealsImage from '../../../assets/meals.jpg';

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>{props.headerText}</h1>
        <HeaderButton onClick={props.onCartClick} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="Food baner" />
      </div>
    </Fragment>
  );
};

export default Header;
