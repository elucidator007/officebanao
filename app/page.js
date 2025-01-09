'use client'
import EmptyState from "./components/EmptyState";
import { useState } from "react";
import SlideModal from "./components/SideModal";
import ImageGrid from "./components/ImageGrid";

export default function Home() {
    const [images, setImages] = useState([]);
    const [currImage, setCurrImage] = useState(null);
    const [isAddImageOpen, setIsAddImageOpen] = useState(false);
  
    return (
      <div className="relative w-full h-screen">
        {/* EmptyState should occupy full width */}
        {images.length === 0 ? 
            <EmptyState setCurrImage={setCurrImage} setIsAddImageOpen={setIsAddImageOpen} /> : 
            <ImageGrid images={images} setCurrImage={setCurrImage} setIsAddImageOpen={setIsAddImageOpen} setImages={setImages}/>
        }
  
        {/* SlideModal appears on top */}
        {isAddImageOpen && (
          <div className="absolute top-0 right-0 w-full h-full z-50">
            <SlideModal 
                isAddImageOpen={isAddImageOpen} 
                setIsAddImageOpen={setIsAddImageOpen} 
                currImage={currImage}
                setImages={setImages}    
            />
          </div>
        )}
      </div>
    );
  }
  
