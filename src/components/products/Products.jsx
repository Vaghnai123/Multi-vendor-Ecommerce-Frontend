import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Rating from '../Rating';

const Products = ({ title }) => {

    const products = [
        [1, 2, 3],
        [4, 5, 6],
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className='w-full h-full bg-white shadow-md rounded-2xl p-6 border border-slate-100 transition-all duration-300 hover:shadow-xl'>
            
            {/* Header Section */}
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold text-slate-800 tracking-tight'>{title}</h2>
                
                <div className='flex gap-2'>
                    <button
                        onClick={prevSlide}
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-slate-50 text-slate-400 hover:bg-green-500 hover:text-white transition-all duration-300 shadow-sm border border-slate-100'
                        aria-label="Previous Slide">
                        <IoIosArrowBack size={16} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-slate-50 text-slate-400 hover:bg-green-500 hover:text-white transition-all duration-300 shadow-sm border border-slate-100'
                        aria-label="Next Slide">
                        <IoIosArrowForward size={16} />
                    </button>
                </div>
            </div>

            {/* Slider Content */}
            <div className="overflow-hidden w-full relative">
                <div
                    className="flex transition-transform duration-500 ease-in-out w-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}>

                    {products.map((group, i) => (
                        <div key={i} className="w-full shrink-0">
                            
                            <div className='flex flex-col gap-5'>
                                {group.map((pl, j) => (
                                    <div key={j} className='flex justify-start items-center gap-4 group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors duration-300'>
                                        
                                        {/* Image Box */}
                                        <div className="w-20 h-20 shrink-0 bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm relative">
                                            <img
                                                className='w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110 mix-blend-multiply'
                                                src={`/public/images/products/${pl}.webp`} 
                                                alt={`Product ${pl}`}
                                            />
                                        </div>
                                        
                                        {/* Product Info */}
                                        <div className='flex flex-col flex-1 min-w-0 justify-center h-full'>
                                            <h3 className='text-[15px] font-semibold text-slate-700 group-hover:text-green-600 transition-colors truncate'>
                                                Premium Product Name {pl}
                                            </h3>
                                            
                                            {/* CHANGE: Price and Rating in one row */}
                                            <div className='flex items-center gap-3 mt-1'>
                                                <span className='text-lg font-bold text-[#059473]'>$434</span>
                                                
                                                {/* Moved Rating Here */}
                                                <div className='flex'>
                                                    <Rating ratings={4.0} />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;