import React from "react";
import { Picture, UrlPicture } from "../App/App";
import { Grid } from "../Grid/Grid";
import { ImageCard } from "../ImageCard/ImageCard";

interface ImagesProps {
  images: Picture[];
  onModal: (urls: UrlPicture, alt: string) => void;
}

export const ImageGallery: React.FC<ImagesProps> = ({ images, onModal }) => {
  return (
    <Grid>
      {images.map((image) => (
        <ImageCard
          key={image.id}
          description={image.description}
          urls={image.urls}
          onModal={() => onModal(image.urls, image.description)}
        />
      ))}
    </Grid>
  );
};
