import React, { useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";

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

    let sorted = [...filteredImages];
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Assets"
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <select
            value={sortOption}
            onChange={handleSort}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>A-Z</option>
          </select>
        </div>
        <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer">
          <Plus className="w-5 h-5" />
          Add
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((item, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-md bg-white"
          >
            <Image
              src={item.url}
              alt={item.title || `Image ${index}`}
              width={300}
              height={200}
              className="w-full h-auto object-cover"
            />
            <div className="px-4 py-2">
              <h3 className="text-sm font-medium">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
