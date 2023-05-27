import React from "react";
import { IoMdClose } from "react-icons/io";

const ImageModal = ({ image, onClose }) => {
  return (
    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative my-6 mx-auto h-full lg:h-auto md:h-auto bg-white flex items-center justify-center rounded-lg p-5">
        <div
          className=" absolute -right-2 -top-2 bg-red-500 p-2 z-50 rounded-full cursor-pointer"
          onClick={onClose}
        >
          <IoMdClose size={20} color="#fff" />
        </div>
        <div className="relative h-[600px] w-[500px] rounded-lg cursor-pointer bg-white overflow-hidden">
          <img
            src={`https://live.staticflickr.com/${image?.server}/${image?.id}_${image?.secret}_b.jpg`}
            className="z-0 h-full w-full rounded-lg object-cover"
            alt={image?.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <h1 className="text-lg font-semibold text-white">{image?.title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
