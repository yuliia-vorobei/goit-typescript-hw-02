import React from "react";
import { getPhotos, GetPhotosResponse } from "../../photos";
import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { useEffect, useState } from "react";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import Modal from "react-modal";
import { ImageModal } from "../ImageModal/ImageModal";

export interface UrlPicture {
  small: string;
  regular: string;
}

export interface Picture {
  id: string;
  description: string;
  urls: UrlPicture;
}

export type ImageModalType = Pick<Picture, "description"> &
  Pick<UrlPicture, "regular">;

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Picture[]>([]); // відображення галереї
  const [loading, setLoading] = useState<boolean>(false); // waiting loader
  const [error, setError] = useState<string | null>(null);
  const [showBtn, setShowBtn] = useState<boolean>(false); // кнопка завантаження
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  // const [url, setUrl] = useState<UrlPicture | null>(null);
  const [url, setUrl] = useState<ImageModalType | null>(null);
  const [alt, setAlt] = useState<string>("");

  Modal.setAppElement("#root");

  function openModal(urls: UrlPicture, description: string) {
    setUrl({ regular: urls.regular, description });
    setAlt(description);
    setIsOpen(true);
  }

  function closeModal() {
    setUrl(null);
    setAlt("");
    setIsOpen(false);
  }

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchData = async () => {
      setShowBtn(false);
      setLoading(true);

      try {
        setLoading(true);
        const { results, total_pages }: GetPhotosResponse = await getPhotos(
          query,
          page
        );
        if (!results.length) {
          return setIsEmpty(true);
        }

        setImages((prevResults) => [...prevResults, ...results]);
        setShowBtn(page < total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, query]);

  const changeSubmit = (value: string) => {
    setImages([]);
    setQuery(value);
    setPage(1);
    setError(null);
    setIsEmpty(false);
  };

  const loadMoreHandler = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={changeSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onModal={openModal} />
      )}
      {showBtn && <LoadMoreBtn onClick={loadMoreHandler} />}
      {error && <ErrorMessage />}
      {isEmpty && <p>No images were found</p>}
      {loading && <Loader />}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        image={url}
        description={alt}
      />
      <Toaster />
    </div>
  );
}
