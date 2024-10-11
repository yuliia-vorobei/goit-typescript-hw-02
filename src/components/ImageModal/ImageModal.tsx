import React from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { ImageModalType } from "../App/App";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface ImageModalProps {
  image: ImageModalType | null;
  description: string;
  onRequestClose: () => void;
  isOpen: boolean;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  image,
  onRequestClose,
  isOpen,
}) => {
  if (!image) return null;

  const { regular, description } = image;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      overlayClassName={css.overlay}
    >
      <img
        src={regular}
        alt={description}
        onClick={onRequestClose}
        className={css.modal}
      />
    </Modal>
  );
};
