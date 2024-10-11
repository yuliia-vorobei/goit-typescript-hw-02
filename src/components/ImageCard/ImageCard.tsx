import { UrlPicture } from "../App/App";
import css from "./ImageCard.module.css";
import React, { MouseEventHandler } from "react";

interface ImageCardProps {
  description: string;
  urls: UrlPicture;
  onModal: MouseEventHandler<HTMLImageElement>;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  description,
  urls,
  onModal,
}) => {
  return (
    <div className={css.card}>
      <img src={urls.regular} alt={description} onClick={onModal} />
    </div>
  );
};
