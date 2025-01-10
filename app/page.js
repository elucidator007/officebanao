'use client'
import EmptyState from "./components/EmptyState";
import { useState } from "react";
import SlideModal from "./components/SideModal";
import ImageGrid from "./components/ImageGrid";
import { PREVIEW_IMAGES } from "./utils/utility";

export default function Home() {
    const [images, setImages] = useState([]);
    const [currImage, setCurrImage] = useState(null);
    const [isAddImageOpen, setIsAddImageOpen] = useState(false);
    console.log('images', images);
    return (
      <div className="relative w-full h-screen">
        {/* EmptyState */}
        {images.length === 0 ? 
            <EmptyState setCurrImage={setCurrImage} setIsAddImageOpen={setIsAddImageOpen} /> : 
            <ImageGrid images={images} setCurrImage={setCurrImage} setIsAddImageOpen={setIsAddImageOpen} setImages={setImages}/>
        }
  
        {/* SlideModal */}
        {isAddImageOpen && (
          <div className="absolute top-0 right-0 w-full h-full z-50">
            <SlideModal 
                isAddImageOpen={isAddImageOpen} 
                setIsAddImageOpen={setIsAddImageOpen} 
                currImage={currImage}
                setImages={setImages}    
                setCurrImage={setCurrImage}
            />
          </div>
        )}
      </div>
    );
  }
  
