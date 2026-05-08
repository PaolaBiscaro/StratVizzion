import React from "react";
import "./modal.css"

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fade" onClick={onClose} />

      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-modal text-button" onClick={onClose}>
            Voltar
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;