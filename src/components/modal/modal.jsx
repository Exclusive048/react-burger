import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("root-modals");

const Modal = (props) => {
  console.log("Modal show:", props.show);
    useEffect(() => {
      const close = (e) => {
          if (e.key === "Escape") {
              props.onCloseModal();
          }
      };

      if (props.show) {
          window.addEventListener("keydown", close);
      }

      return () => {
          window.removeEventListener("keydown", close);
      };
  }, [props.show]);


    if(!props.show){
        return null;
    }
    
    return createPortal(
    (
      <section>
      <div onClick={(e) => e.stopPropagation()} className={modalStyles.modal}>
        {props.header ? (
          <div className={`${modalStyles.modalHeader} ml-10 mr-10 mt-10`}>
            <p className="text text_type_main-large">{props.header}</p>
            <div className={`${modalStyles.closeModalCursor}`} onClick={props.onCloseModal}>
              <CloseIcon type="primary" />
            </div>
          </div>
        ) : (
          <div>
            <div className={`${modalStyles.closeModalIcon} mr-10 mt-15`} onClick={props.onCloseModal}>
              <CloseIcon className={modalStyles.cursorStyle}type="primary" />
            </div>
          </div>
        )}
        {props.children}
    </div>
    <ModalOverlay onCloseModal={props.onCloseModal}></ModalOverlay>
    </section>
    ), 
    modalRoot
  );
}


Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func,
  header: PropTypes.string,
  children: PropTypes.any
};

export default Modal;