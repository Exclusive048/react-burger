import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = (props) => {
    return (
        <div className={modalOverlayStyles.modalOverlay} onClick={props.onCloseModal}/>
    )
} 
  
ModalOverlay.propTypes = {
    onCloseModal: PropTypes.func,

};   


export default ModalOverlay;