import React from "react";
import { Picture, UrlPicture } from "../App/App";
import { ImageCard } from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImagesProps {
  images: Picture[];
  onModal: (urls: UrlPicture, alt: string) => void;
}

export const ImageGallery: React.FC<ImagesProps> = ({ images, onModal }) => {
  return (
    <ul className={css.imageList}>
      {images.map((image) => (
        <ImageCard
          key={image.id}
          description={image.description}
          urls={image.urls}
          onModal={() => onModal(image.urls, image.description)}
        />
      ))}
    </ul>
  );
};
