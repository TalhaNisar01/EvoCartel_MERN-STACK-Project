
import React, { useEffect, useRef, useState, useContext } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link,useNavigate } from 'react-router-dom';
import '../App.css';
import Context from '../context/index';
import addToCart from '../helpers/addToCart';
import addToWishlist from '../helpers/addToWishlist';
import { AiOutlineHeart } from "react-icons/ai";

const HorizontalCardProduct = ({ category, heading, searchQuery }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();
    const navigate = useNavigate();

    const { fetchUserAddToCart } = useContext(Context);
    const { fetchUserWishlistCount } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const handleAddToWishlist = async (e, id) => {
        await addToWishlist(e, id);
        fetchUserWishlistCount();
    };

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data);
        setFilteredData(categoryProduct?.data);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    useEffect(() => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const filtered = data.filter(product =>
                product.productName.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
            setFilteredData(filtered);
            // Scroll to the first highlighted item if there is a search query
            if (filtered.length > 0) {
                const firstHighlightedElement = document.querySelector('.highlight');
                firstHighlightedElement?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            }
        } else if(!searchQuery){
            navigate("/");
        }
        
        
        else {
            setFilteredData(data);
        }
    }, [searchQuery, data]);

    
    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    const highlightText = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="highlight" style={{ backgroundColor: 'yellow' }}>{part}</span>
            ) : (
                part
            )
        );
    };

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            {!searchQuery && (
                <h2 className='text-2xl font-semibold py-4 text-gray-700 stylish-heading mb-4'>{heading}</h2>
            )}
            <div className={`relative ${searchQuery ? 'hidden' : 'block'}`}>
                <button
                    className='bg-gray-200 shadow-md rounded-full p-2 absolute left-0 top-1/2 transform -translate-y-1/2 text-lg hidden md:flex items-center justify-center z-10'
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
                    {loading ? (
                        loadingList.map((_, index) => (
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-white rounded-md shadow-lg flex'>
                                <div className='bg-gray-300 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'></div>
                                <div className='p-4 grid w-full gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-gray-800 bg-gray-300 animate-pulse p-1 rounded-md'></h2>
                                    <p className='capitalize text-gray-600 p-1 bg-gray-300 animate-pulse rounded-md'></p>
                                    <div className='flex gap-3 w-full'>
                                        <p className='text-red-600 font-medium p-1 bg-gray-300 w-full animate-pulse rounded-md'></p>
                                        <p className='text-gray-600 line-through p-1 bg-gray-300 w-full animate-pulse rounded-md'></p>
                                    </div>
                                    <button className='text-sm text-white px-3 py-0.5 rounded-md w-full bg-gray-300 animate-pulse'></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        filteredData.map((product, index) => (
                            <Link key={index} to={"product/" + product?._id} className={`w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-white rounded-md shadow-lg flex relative ${searchQuery ? 'highlight' : ''}`}>
                                <div className='absolute top-0 left-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-tr-lg rounded-bl-lg z-20'>
                                    {highlightText(product?.brandName, searchQuery)}
                                </div>
                                <div className='bg-gray-300 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                    <img src={product.productImage[0]} alt={product?.productName} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                </div>
                                <div className='p-4 grid gap-2 w-full'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-gray-800'>{highlightText(product?.productName, searchQuery)}</h2>
                                    <p className='capitalize text-gray-600'>{highlightText(product?.category, searchQuery)}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-blue-600 font-medium'>{product?.sellingPrice}</p>
                                        <p className='text-gray-600 line-through'>{product?.price}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button className='text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-md' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                        <button className='text-sm bg-slate-600 hover:bg-slate-700 text-white px-3 py-0.5 rounded-md' onClick={(e) => handleAddToWishlist(e, product?._id)}>
                                            <AiOutlineHeart />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
                <button
                    className='bg-gray-200 shadow-md rounded-full p-2 absolute right-0 top-1/2 transform -translate-y-1/2 text-lg hidden md:flex items-center justify-center z-10'
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>
            </div>
            {searchQuery && (
                <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
                    {filteredData.map((product, index) => (
                        <Link key={index} to={"product/" + product?._id} className={`w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-white rounded-md shadow-lg flex relative highlight`}>
                            <div className='absolute top-0 left-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-tr-lg rounded-bl-lg z-20'>
                                {highlightText(product?.brandName, searchQuery)}
                            </div>
                            <div className='bg-gray-300 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                <img src={product.productImage[0]} alt={product?.productName} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                            </div>
                            <div className='p-4 grid gap-2 w-full'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-gray-800'>{highlightText(product?.productName, searchQuery)}</h2>
                                <p className='capitalize text-gray-600'>{highlightText(product?.category, searchQuery)}</p>
                                <div className='flex gap-3'>
                                    <p className='text-blue-600 font-medium'>{product?.sellingPrice}</p>
                                    <p className='text-gray-600 line-through'>{product?.price}</p>
                                </div>
                                <div className='flex gap-2'>
                                    <button className='text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-md' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                    <button className='text-sm bg-slate-600 hover:bg-slate-700 text-white px-3 py-0.5 rounded-md' onClick={(e) => handleAddToWishlist(e, product?._id)}>
                                        <AiOutlineHeart />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HorizontalCardProduct;
