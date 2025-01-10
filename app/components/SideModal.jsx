import React, { useState } from 'react';
import { X } from 'lucide-react';
import AddAsset from './AddAsset';
import RightPanel from './RightPanel';

const SlideModal = ({isAddImageOpen, setIsAddImageOpen, currImage, setImages, setCurrImage}) => {
  const toggleModal = () => {
    setIsAddImageOpen(!isAddImageOpen);
  };

  return (
    <div className="p-4">
      {/* Modal Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300`}
        onClick={toggleModal}
      />

      {/* Modal Content */}
      <div
        className={`fixed top-0 right-0 h-full w-11/12 bg-white shadow-lg transform transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button 
          onClick={toggleModal}
          className="absolute top-3 right-3 z-50 text-gray-400 hover:text-gray-600"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="flex h-full">
          {/* Left Section - Image Preview */}
          <div className="flex-1 bg-white">
            <AddAsset imageUrl={currImage} setCurrImage={setCurrImage}/>
          </div>

          {/* Right Section - Form */}
          <div className="w-[400px] mt-10">
            <RightPanel setImages={setImages} currImage={currImage} toggleModal={toggleModal}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideModal;