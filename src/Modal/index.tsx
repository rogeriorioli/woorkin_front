import React, { ButtonHTMLAttributes } from "react";
import { MdClose } from "react-icons/md";
import { ModalContainer } from "./style";

// import { Container } from './styles';

interface modalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  stateClass: "fade-in" | `fade-out`;
}

const Modal: React.FC<modalProps> = ({ children, stateClass, ...props }) => {
  return (
    <ModalContainer>
      <div className={`overlay  ${stateClass}`}>
        <div className="modal">
          <div className="modal-header">
            <button {...props}>
              <MdClose size={26} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </ModalContainer>
  );
};

export default Modal;
