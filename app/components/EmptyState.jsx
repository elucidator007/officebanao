import React, { useRef } from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'

const EmptyState = ({setCurrImage, setIsAddImageOpen}) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
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
    <div className='flex flex-col justify-center items-center h-[100vh] gap-5'>
      <Image
        src="/empty.png"
        alt="Next.js logo"
        width={300}
        height={300}
        priority
      />
      <div className='text-gray-500 text-sm'>Add Assets here</div>
      <button 
        onClick={handleClick}
        className='flex gap-2 bg-[#304559] hover:bg-[#41576e] text-white px-4 py-2 rounded-md'
      >
        <Plus />
        <span>Add</span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

export default EmptyState