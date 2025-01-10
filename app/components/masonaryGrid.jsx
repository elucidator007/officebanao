import React, { useState } from 'react';
import { Heart, MoreVertical } from 'lucide-react';

const MasonryGrid = ({images}) => {
  const [showMenu, setShowMenu] = useState(null);
  const [likedImages, setLikedImages] = useState(new Set());
  
  const handleMenuToggle = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(showMenu === index ? null : index);
  };

  const handleLike = (index, e) => {
    e.stopPropagation();
    setLikedImages(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(index)) {
        newLiked.delete(index);
      } else {
        newLiked.add(index);
      }
      return newLiked;
    });
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.menu-container')) {
        setShowMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 p-6">
      {images.map((item, index) => (
        <div
          key={index}
          className="break-inside-avoid mb-6 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white relative group"
        >
          {/* Overlay that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Title - top left */}
            <div className="absolute top-4 left-4 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.title}
            </div>
            
            {/* Like button - top right */}
            <button 
              onClick={(e) => handleLike(index, e)}
              className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <Heart 
                className={`w-6 h-6 ${likedImages.has(index) ? 'fill-white' : ''}`} 
              />
            </button>
            
            {/* Bottom right controls */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Avatar/name pill */}
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                {item.name.split(' ').map(word => word[0]).join('')}
            </div>

              {/* Menu button */}
              <div className="relative menu-container">
                <button 
                  onClick={(e) => handleMenuToggle(index, e)}
                  className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-700 hover:bg-white z-10"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                
                {/* Dropdown menu */}
                {showMenu === index && (
                  <div className="absolute bottom-full right-0 mb-2 w-36 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 z-50">
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-gray-700">
                      Edit
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-gray-700">
                      Hide
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-red-600">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <img
            src={item.url}
            alt={item.title}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;