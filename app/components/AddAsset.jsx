import React, { useState } from 'react';
import { X, Crop, RotateCcw, FlipHorizontal, FlipVertical, RefreshCcw, Pencil } from 'lucide-react';
import Image from 'next/image';

const AddAsset = ({ imageUrl }) => {
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [cropCoords, setCropCoords] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [dragStart, setDragStart] = useState(null);
    const [isEditOn, setIsEditOn] = useState(false)

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleFlipH = () => {
    setFlipH((prev) => !prev);
  };

  const handleFlipVertical = () => {
    setFlipV((prev) => !prev);
  };

  const handleCropStart = () => {
    setIsCropping(true);
  };

  const handleMouseDown = (e) => {
    if (!isCropping) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDragStart({ x, y });
    setCropCoords({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!dragStart || !isCropping) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCropCoords({
      x: Math.min(dragStart.x, x),
      y: Math.min(dragStart.y, y),
      width: Math.abs(x - dragStart.x),
      height: Math.abs(y - dragStart.y)
    });
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  const handleReset = () => {
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setIsCropping(false);
    setCropCoords({ x: 0, y: 0, width: 0, height: 0 });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold text-gray-800">Add Asset</h2>
      </div>

      <div className="flex-1 relative bg-white px-4 pb-4">
        <div 
          className="relative h-full w-full overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="relative w-full h-full rounded-lg">
            <div className="relative w-full">
                <Image 
                    src={imageUrl || "/api/placeholder/1200/800"}
                    alt="Image to edit"
                    width={1200}
                    height={800}
                    unoptimized
                    className="rounded-lg max-h-[80vh] max-w-full h-auto w-auto mx-auto"
                    priority
                    style={{
                    transform: `
                        rotate(${rotation}deg)
                        scaleX(${flipH ? -1 : 1})
                        scaleY(${flipV ? -1 : 1})
                    `
                    }}
                />
            </div>
            {isCropping && cropCoords.width > 0 && (
              <div className="absolute inset-0 bg-black/50">
                <div 
                  className="absolute border-2 border-white"
                  style={{
                    left: `${cropCoords.x}px`,
                    top: `${cropCoords.y}px`,
                    width: `${cropCoords.width}px`,
                    height: `${cropCoords.height}px`
                  }}
                />
                <div className="absolute right-4 top-4 flex gap-2">
                  <button 
                    onClick={() => setIsCropping(false)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    onClick={() => {
                      // Implement crop confirmation logic here
                      setIsCropping(false);
                    }}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
                  >
                    <Crop className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {isEditOn ? <div className="absolute right-4 top-4 flex flex-col gap-2 z-10 bg-gray-800/50">
            <button className="p-2 rounded transition-colors" onClick={() => {setIsEditOn(!isEditOn)}} >
              <X className="text-white w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded transition-colors ${
                isCropping ? 'bg-blue-500 hover:bg-blue-600' : 'hover:bg-gray-800/70'
              }`}
              onClick={handleCropStart}
            >
              <Crop className="text-white w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded hover:bg-gray-800/70 transition-colors"
              onClick={handleRotate}
            >
              <RotateCcw className="text-white w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded hover:bg-gray-800/70 transition-colors"
              onClick={handleFlipH}
            >
              <FlipHorizontal className="text-white w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded hover:bg-gray-800/70 transition-colors"
              onClick={handleFlipVertical}
            >
              <FlipVertical className="text-white w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded hover:bg-gray-800/70 transition-colors"
              onClick={handleReset}
            >
              <RefreshCcw className="text-white w-5 h-5" />
            </button>
          </div> : <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
          <button 
              className="p-2 bg-gray-800/50 rounded hover:bg-gray-800/70 transition-colors"
              onClick={() => {setIsEditOn(!isEditOn)}}
            >
              <Pencil className="text-white w-5 h-5" />
            </button>
            </div>
            }
        </div>
      </div>
    </div>
  );
};

export default AddAsset;