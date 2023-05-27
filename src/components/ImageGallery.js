import React from "react";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <div className="gallery flex items-center gap-x-10 flex-wrap w-4/5 m-auto py-8 mt-64">
      {images.map((image) => (
        <div
          key={image.id}
          onClick={() => onImageClick(image)}
          className="relative h-[400px] w-[300px] rounded-md cursor-pointer mb-10"
        >
          <img
            src={`https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`}
            className="z-0 h-full w-full rounded-md object-cover"
            alt={image.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <h1 className="text-lg font-semibold text-white">{image.title}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
