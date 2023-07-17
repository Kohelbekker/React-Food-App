import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import classes from './Modal.module.css';

const Modal = props => {
  const portalElem = document.getElementById('overlays');

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classes.backdrop} onClick={props.onClose} />,
        portalElem
      )}
      {ReactDOM.createPortal(
        <div className={classes.modal}>{props.children}</div>,
        portalElem
      )}
    </Fragment>
  );
};

export default Modal;
