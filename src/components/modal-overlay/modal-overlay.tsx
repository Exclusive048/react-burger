import modalOverlayStyles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  onCloseModal: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onCloseModal }) => {
  return (
    <div className={modalOverlayStyles.modalOverlay} onClick={onCloseModal} />
  );
};

export default ModalOverlay;
