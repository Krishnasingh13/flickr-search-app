import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="gallery flex items-center gap-x-10 flex-wrap w-4/5 m-auto py-8 mt-64">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
        <div
          key={index}
          className="relative h-[400px] w-[300px] rounded-md mb-10 animate-pulse"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent animate-pulse"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <h1 className="text-lg font-semibold text-white"></h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSpinner;
