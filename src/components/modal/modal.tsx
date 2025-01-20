import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, FC } from "react";
import { createPortal } from "react-dom";
import { TModal } from "../../utils/types/modal";

const modalRoot = document.getElementById("root-modal") as HTMLDivElement;

const Modal: FC<TModal> = (props) => {
  useEffect(() => {
      const close = (e:KeyboardEvent) => {
        if(e.key === "Escape"){
          props.onCloseModal()
        }
      }
      window.addEventListener('keydown', close)
    return () => {
      window.removeEventListener('keydown', close)}
  }, []);
  
  return createPortal(
    (
      <>
      <div onClick={(e) => e.stopPropagation()} className={modalStyles.modal} test-scenario='modal'>
        {props.header ? (
          <div className={`${modalStyles.modalHeader} ml-10 mr-10 mt-10`} test-scenario='modal_title'>
          <p className="text text_type_main-large">{props.header} </p>
          <div className={`${modalStyles.closeModalCursor}`} onClick={props.onCloseModal} test-scenario='close_modal'>
            <CloseIcon type="primary"/>
            </div>
          </div>
        ) : (
          <div>
            <div className={`${modalStyles.closeModalIcon} mr-10 mt-15`} onClick={props.onCloseModal} test-scenario='close_modal'>
              <div className={modalStyles.cursorStyle}>
                <CloseIcon  type="primary"/>
              </div>
            </div>
          </div>
        )}
        {props.children}
    </div>
    <ModalOverlay onCloseModal={props.onCloseModal}></ModalOverlay>
    </>
    ), 
    modalRoot
  );
}

export default Modal;