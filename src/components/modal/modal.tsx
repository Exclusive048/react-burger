import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Oval } from "react-loader-spinner";
import { PropsWithChildren } from "react";

type ModalProps = PropsWithChildren<{
  onCloseModal: () => void;
  header?: string;
  orderRequest?: boolean;
}>;

const Modal: React.FC<ModalProps> = ({ onCloseModal, header, children, orderRequest = false }) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
    };
  }, [onCloseModal]);

  return createPortal(
    <section onClick={onCloseModal}>
      <div onClick={(e) => e.stopPropagation()} className={modalStyles.modal}>
        {header ? (
          <div className={`${modalStyles.modalHeader} ml-10 mr-10 mt-10`}>
            <p className="text text_type_main-large">{header}</p>
            <div className={`${modalStyles.closeModalCursor}`} onClick={onCloseModal}>
              <CloseIcon type="primary" />
            </div>
          </div>
        ) : (
          <div className={`${modalStyles.closeModalIcon} mr-10 mt-15`} onClick={onCloseModal}>
            <CloseIcon className={modalStyles.cursorStyle} type="primary" />
          </div>
        )}
        {orderRequest ? (
          <div className={modalStyles.loaderContainer}>
            <Oval height={80} width={80} color="gray" secondaryColor="lightgray" ariaLabel="loading" />
          </div>
        ) : (
          <div>{children}</div>
        )}
      </div>
      <ModalOverlay onCloseModal={onCloseModal} />
    </section>,
    document.getElementById("root-modals") as HTMLElement
  );
};

export default Modal;
