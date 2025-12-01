import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

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
        <div className='flex flex-col gap-4 w-full pl-2'>
            <div className='flex justify-between items-center'>
                <div className='text-xl font-bold text-slate-600'>{title}</div>
                <div className='flex justify-center items-center gap-3 text-slate-600'>
                    <button
                        onClick={prevSlide}
                        className='w-8 h-8 flex justify-center items-center bg-slate-300 border border-slate-200 hover:bg-slate-400 transition-all cursor-pointer rounded-sm'
                        aria-label="Previous Slide">
                        <IoIosArrowBack />
                    </button>
                    <button
                        onClick={nextSlide}
                        className='w-8 h-8 flex justify-center items-center bg-slate-300 border border-slate-200 hover:bg-slate-400 transition-all cursor-pointer rounded-sm'
                        aria-label="Next Slide">
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>

            <div className="overflow-hidden w-full relative">
                <div className="flex transition-transform duration-500 ease-in-out w-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>

                    {products.map((p, i) => (
                        <div key={i} className="w-full shrink-0">
                            <div className='flex flex-col justify-start gap-5'>
                                {p.map((pl, j) => (
                                    <Link to='#' key={j} className='flex justify-start items-start group'>
                                    
                                        <div className="relative w-[110px] h-[110px] overflow-hidden shrink-0">
                                            
                                            <img
                                                className='w-full h-full object-contain transition-transform duration-300' 
                                                src={`/images/products/${pl}.webp`}
                                                alt=""/>
                                        </div>
                                        
                                        <div className='px-3 pl-4 flex justify-start items-start gap-1 flex-col text-slate-600 flex-1 min-w-0'>
                                            <h2 className='font-medium group-hover:text-blue-600 transition-colors line-clamp-1'>Product Name {pl}</h2>
                                            <span className='text-lg font-bold'>$434</span>
                                        </div>
                                    </Link>
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

