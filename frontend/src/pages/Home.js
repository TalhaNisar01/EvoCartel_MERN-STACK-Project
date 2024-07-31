
import React, { useRef, useState, useEffect } from 'react';
import CategoryList from '../components/categoryList';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import ProductCard from '../components/ProductCard';
import { FaTimes } from 'react-icons/fa';
import '../App.css';
import cokacola from '../assets/Gif/cokacola1.gif';
import lotion1 from '../assets/Gif/lotion1.gif';
import vege1 from '../assets/Gif/vege1.gif';

const Home = () => {
  const [sortCriteria, setSortCriteria] = useState('default');
  const [sortedCategories, setSortedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const refs = {
    refrigerator: useRef(null),
    mobiles: useRef(null),
    airpodes: useRef(null),
    Mouse: useRef(null),
    earphones: useRef(null),
    camera: useRef(null),
    printers: useRef(null),
    processor: useRef(null),
    speakers: useRef(null),
    trimmers: useRef(null),
    televisions: useRef(null),
    watches: useRef(null),
    shirts: useRef(null),
    pants: useRef(null),
    trousers: useRef(null),
  };

  const categories = [
    { key: 'refrigerator', label: "Popular Refrigerator's Collection " },
    { key: 'mobiles', label: 'Branded Mobiles' },
    { key: 'airpodes', label: 'Branded AirPodes' },
    { key: 'Mouse', label: 'Branded Mouse' },
    { key: 'earphones', label: 'Branded EarPhones' },
    { key: 'camera', label: 'Branded Camera' },
    { key: 'printers', label: 'Branded Printer' },
    { key: 'processor', label: 'Branded Processor' },
    { key: 'speakers', label: 'Branded Speakers' },
    { key: 'trimmers', label: 'Branded Trimmers' },
    { key: 'televisions', label: 'Branded Television' },
    { key: 'watches', label: 'Branded Watches' },
    { key: 'shirts', label: 'Branded Shirts' },
    { key: 'pants', label: 'Branded Pants' },
    { key: 'trousers', label: 'Branded Trousers' },
  ];

  useEffect(() => {
    let sortedArray = [...categories];
    switch (sortCriteria) {
      case 'alphabetically':
        sortedArray.sort((a, b) => a.label.localeCompare(b.label));
        break;
      case 'price':
        // Assuming each category object has a price attribute, sort by price here
        sortedArray.sort((a, b) => a.price - b.price);
        break;
      // Add more sorting logic here if needed
      default:
        break;
    }
    setSortedCategories(sortedArray);
  }, [sortCriteria]);

  const handleCategorySelection = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((cat) => cat !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const scrollToCategory = (category) => {
    const headerOffset = 100; // Adjust this value based on the height of your fixed header or any other top elements
    if (refs[category] && refs[category].current) {
      const elementPosition = refs[category].current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      <CategoryList onCategoryClick={scrollToCategory} />
      <div className="product-card-container">
        <ProductCard 
          className='bg-color-1'
          image={lotion1}
          title="Everyday Fresh & Clean with Our Products" 
          buttonText="Shop Now" 
        />
        <ProductCard 
          className="bg-color-2"
          image={vege1}
          title="Make your Breakfast Healthy and Easy" 
          buttonText="Shop Now" 
        />
        <ProductCard 
          className="bg-color-3"
          image={cokacola}
          title="The best Organic Products Online to purchase" 
          buttonText="Shop Now" 
        />
      </div>

      

      <div className="category-buttons my-4 p-4 border rounded bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
        <div className="flex flex-wrap">
          {categories.map((category) => (
            <div key={category.key} className="relative m-2">
              <button
                className={`p-2 border rounded bg-gray-200 hover:bg-gradient-to-r hover:from-green-500 hover:to-purple-500 transition-colors duration-300 ease-in-out ${selectedCategories.includes(category.key) ? 'bg-gradient-to-r from-green-700 to-purple-700 text-white' : ''}`}
                onClick={() => handleCategorySelection(category.key)}
              >
                {category.label}
              </button>
              {selectedCategories.includes(category.key) && (
                <FaTimes
                  className="absolute top-0 right-0 m-1 text-white cursor-pointer"
                  onClick={() => handleCategorySelection(category.key)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {sortedCategories
        .filter(category => selectedCategories.length === 0 || selectedCategories.includes(category.key))
        .map((category) => (
          <div key={category.key} ref={refs[category.key]}>
            <HorizontalCardProduct category={category.key} heading={category.label} />
          </div>
      ))}
    </div>
  );
};

export default Home;
