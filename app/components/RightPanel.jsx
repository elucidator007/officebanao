import React, { useState } from 'react';
import { Tag, ChevronDown, Upload } from 'lucide-react';

const TagButton = ({ text }) => (
  <button className="flex items-center gap-2 px-4 py-2 text-[#666666] border border-[#E5E7EB] rounded-lg bg-white">
    <Tag className="w-4 h-4" />
    {text}
    <ChevronDown className="w-4 h-4" />
  </button>
);

const RightPanel = ({setImages, currImage, toggleModal}) => {
  const [title, setTitle] = useState('Asset 001');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const formData = {
      title,
      description,
      url : currImage,
      date: Date.now(),
      name: 'Anonymous'
    };

    setImages(prev => [...prev, formData])
    toggleModal()
    console.log('Form Data:', formData);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Title */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 text-gray-900 text-lg border border-[#E5E7EB] rounded-lg focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-48 p-3 text-gray-600 border border-[#E5E7EB] rounded-lg resize-none focus:outline-none"
          />
        </div>

        {/* Tag Buttons */}
        <div className="flex flex-wrap gap-3">
          <TagButton text="Space" />
          <TagButton text="Style" />
          <TagButton text="Package" />
          <TagButton text="Elements" />
        </div>
      </div>

      {/* Upload Button */}
      <div className="p-6 bg-white">
        <button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2B4055] text-white rounded-lg"
        >
          <Upload className="w-5 h-5" />
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default RightPanel;
