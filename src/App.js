import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import ImageGallery from "./components/ImageGallery";
import ImageModal from "./components/ImageModal";

const App = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);

        let apiUrl = "";
        if (searchTerm !== "") {
          apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=11af8de8882cba84758f7e7de619b6fa&tags=${searchTerm}&format=json&nojsoncallback=1&per_page=10&page=${page}`;
        } else {
          apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=11af8de8882cba84758f7e7de619b6fa&format=json&nojsoncallback=1&per_page=10&page=${page}`;
        }

        const response = await axios.get(apiUrl);

        if (response.data.photos && Array.isArray(response.data.photos.photo)) {
          setImages((prevImages) => [
            ...prevImages,
            ...response.data.photos.photo,
          ]);
        }

        setIsLoading(false);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsFetching(false);
      }
    };

    fetchImages();
  }, [page, searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (isScrolledToBottom && !isLoading && !isFetching) {
        setIsFetching(true);
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, isFetching]);

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setImages([]);
    setPage(1);
    setIsFetching(false);
    setSelectedImage(null);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
