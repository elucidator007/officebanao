import React, { useState } from "react";
import { Plus } from "lucide-react";

const ImageGrid = ({ images, setCurrImage, setIsAddImageOpen, setImages }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Newest First");

  // Handle filtering
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = images.filter((image) =>
      image.title.toLowerCase().includes(value)
    );
    setImages(filtered);
  };

  // Handle sorting
  const handleSort = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sorted = [...images];
    if (option === "Newest First") {
      sorted = sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "Oldest First") {
      sorted = sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (option === "A-Z") {
      sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    setImages(sorted);
  };

  // Handle adding an image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && !file.type.startsWith('image/')) {
      alert('Please select an image file');
      event.target.value = '';
      return;
    }
  
    const imageUrl = URL.createObjectURL(file);
  
    setCurrImage(imageUrl);
    setIsAddImageOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 flex-1">
        <input
            type="text"
            placeholder="Search Assets"
            value={searchTerm}
            onChange={handleSearch}
            className="w-[400px] px-4 py-2 bg-white rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
        <div className="relative">
            <select
            value={sortOption}
            onChange={handleSort}
            className="appearance-none min-w-[140px] px-4 py-2 pr-8 bg-white rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer"
            >
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>A-Z</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            </div>
        </div>
        </div>
        <button 
        className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md cursor-pointer transition-colors"
        onClick={() => document.querySelector('input[type="file"]').click()}
        >
        <Plus className="w-5 h-5" />
        Add
        <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
        />
        </button>
    </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
      {images.map((item, index) => (
        <div
          key={index}
          className="break-inside-avoid mb-6 rounded-lg overflow-hidden shadow-md bg-white"
        >
          <img
            src={item.url}
            alt={item.title || `Image ${index}`}
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default ImageGrid;
