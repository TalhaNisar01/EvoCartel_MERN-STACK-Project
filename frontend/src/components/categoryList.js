import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import productCategory from '../helpers/productCategory';
import airpodesImage from '../assets/products/airpodes/boAt TRebel Airdopes 431 1.webp';
import cameraImage from '../assets/products/camera/camera1.gif';
import earphoneImage from '../assets/products/earphones/Rockerz 265 V2 2.webp';
import mobilesImage from '../assets/products/mobile/realme 7 Pro (Mirror Silver, 128 GB) (6 GB RAM) 1.webp';
import mouseImage from '../assets/products/mouse/HP 250 Wireless Optical Mouse (2.4GHz Wireless, Black) 1.webp';
import printersImage from '../assets/products/printers/printers1.gif';
import processorImage from '../assets/products/processor/amd Ryzen 7 3800XT 3.9 GHz Upto 4.7 GHz AM4 Socket 8 Cores 16 Threads Desktop Processor (Silver) 1.webp';
import refrigeratorImage from '../assets/products/refrigerator/Godrej 215 L Direct Cool Single Door 4 Star Refrigerator with Base Drawer (Aqua Blue, RD UNO 2154 PTDI AQ BL) 1.webp';
import speakerImage from '../assets/products/speakers/BLITZ 2000 1.webp';
import trimmerImage from '../assets/products/trimmers/Ambrane AGK-11 Trimmer 60 min Runtime 18 Length Settings (Black) 1.webp';
import televisionImage from '../assets/products/TV/iFFALCON by TCL F53 100 cm (40 inch) Full HD LED Smart Android TV with Android 11 (40F53) 1.webp';
import watcheImage from '../assets/products/watches/boAt Cosmos Pro 1.webp';
import shirtImage from '../assets/products/shirts/Blue Shirt.jpg';
import pantImage from '../assets/products/pants/Black Cargo Pant.jpg';
import trouserImage from '../assets/products/trouser/trouser1.jpg';

const categoryImages = {
  airpodes: airpodesImage,
  camera: cameraImage,
  earphones: earphoneImage,
  mobiles: mobilesImage,
  Mouse: mouseImage,
  printers: printersImage,
  processor: processorImage,
  refrigerator: refrigeratorImage,
  speakers: speakerImage,
  trimmers: trimmerImage,
  televisions: televisionImage,
  watches: watcheImage,
  shirts: shirtImage,
  pants: pantImage,
  trousers: trouserImage,
};

const CategoryList = ({ onCategoryClick }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    loadData();
  }, []);

  const scrollLeftHandler = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRightHandler = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold heading">Featured Categories</h2>
        <div className="flex">
          <button onClick={scrollLeftHandler} className="scroll-btn mr-2">
            <FaArrowLeft />
          </button>
          <button onClick={scrollRightHandler} className="scroll-btn">
            <FaArrowRight />
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
          <style jsx>{`
            .loader {
              border: 4px solid #f3f3f3;
              border-top: 4px solid #3498db;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 2s linear infinite;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="category-container flex overflow-x-auto"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {productCategory.map((category, index) => (
            <div key={index} className="category-item" onClick={() => onCategoryClick(category.value)}>
              <div className={`category-card ${index % 2 === 0 ? 'bg-alt-color' : 'bg-light-color'}`}>
                <img
                  src={categoryImages[category.value]}
                  alt={category.label}
                  className="h-16 mx-auto mb-2 mix-blend-multiply"
                />
                <h3 className="text-md font-medium text-gray-600">
                  {category.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
