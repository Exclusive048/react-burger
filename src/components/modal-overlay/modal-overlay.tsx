import modalOverlayStyles from "./modal-overlay.module.css";
import { FC } from "react";
import { TModalShort } from "../../utils/types/modal";


const ModalOverlay: FC<TModalShort> = (props) => {
    return (
        <div className={modalOverlayStyles.modalOverlay} onClick={props.onCloseModal} test-scenario='close_button'/>
    )
} 

export default ModalOverlay;