import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, show }) =>
  show
    ? ReactDOM.createPortal(
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              {children}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

export default Modal;
