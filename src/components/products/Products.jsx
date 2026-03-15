import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom'; // Assuming you might use Link later
import Rating from '../Rating'; // Ensure this path is correct for your project

const Products = ({ title, products }) => {
    
    const safeProducts = products || []; 
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        if (safeProducts.length === 0) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === safeProducts.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        if (safeProducts.length === 0) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? safeProducts.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className='w-full h-full bg-white shadow-md rounded-2xl p-6 border border-slate-100 transition-all duration-300 hover:shadow-xl'>
            
            {/* Header Section */}
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold text-slate-700 tracking-wider'>{title}</h2>
                
                {/* Navigation Buttons */}
                <div className='flex gap-2'>
                    <button
                        onClick={prevSlide}
                        disabled={safeProducts.length <= 1} 
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#059473] hover:text-white transition-all duration-300 shadow-sm border border-slate-100 disabled:opacity-50 disabled:cursor-not-allowed'
                        aria-label="Previous Slide">
                        <IoIosArrowBack size={16} />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={safeProducts.length <= 1}
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#059473] hover:text-white transition-all duration-300 shadow-sm border border-slate-100 disabled:opacity-50 disabled:cursor-not-allowed'
                        aria-label="Next Slide">
                        <IoIosArrowForward size={16} />
                    </button>
                </div>
            </div>

            {/* Slider Content */}
            <div className="overflow-hidden w-full relative">
                {safeProducts.length > 0 ? (
                    <div
                        className="flex transition-transform duration-500 ease-in-out w-full"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>

                        {safeProducts.map((group, i) => (
                            <div key={i} className="w-full shrink-0">
                                <div className='flex flex-col gap-5'>

                                    { group.map((pl, j) => (

                                        <div key={j} className='flex justify-start items-center gap-4 group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors duration-300'>
                                            
                                            {/* Image Box */}
                                            <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden ">
                                                <img
                                                    className='w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-110 mix-blend-multiply'
                                                    src={pl.images && pl.images.length > 0 ? pl.images[0] : ''}
                                                    alt=''/>
                                            </div>
                                            
                                            {/* Product Info */}
                                            <div className='flex flex-col flex-1 min-w-0 justify-center h-full'>

                                            <Link to={`/product/details/${pl.slug}`}>
                                            <h3 className='text-[15px] font-semibold text-slate-700  transition-colors truncate' title={pl.name}>
                                                    {pl.name || 'Unknown Product'}
                                            </h3>
                                            </Link>
                                                
                                                <div className='flex items-center gap-3 mt-1'>
                                                    <span className='text-md font-bold text-[#059473]'>₹{(pl.price - Math.floor((pl.price * pl.discount) / 100)).toLocaleString('en-IN')}</span>
                                                    <span className='text-slate-400 font-medium text-sm line-through'>₹{pl.price.toLocaleString('en-IN')}</span>
                                                    
                                                    <div className='flex'>
                                                        <Rating ratings={pl.rating} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Fallback UI if no products exist
                    <div className="flex justify-center items-center h-[200px] text-slate-600 font-medium text-md">
                        No Products Available
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;