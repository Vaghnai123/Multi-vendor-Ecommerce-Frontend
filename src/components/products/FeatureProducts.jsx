import React from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';

const FeatureProducts = () => {

    const products = [1, 2, 3, 4, 5, 6, 7]; 

    return (
        <div className='w-[90%] lg:w-[85%] mx-auto py-3'>

            {/* 1. Header Section */}
            <div className='text-center mb-12'>
                <h2 className='text-2xl md:text-3xl text-slate-900 font-bold mt-2'>
                    Featured Products
                </h2>
                <div className='w-16 h-1 bg-[#059473] mx-auto mt-4 rounded-full'></div>
            </div>

            {/* 2. Product Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {
                    products.map((p, i) => (

                        <div key={i} className='group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-transparent hover:border-gray-100 transition-all duration-300'>
                            
                            {/* Product Image Container */}
                            <div className='relative w-full h-[260px] bg-gray-100 flex justify-center items-center overflow-hidden'>
                                
                                <div className='absolute top-3 left-3 bg-[#ff4747] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10'>
                                    -15%
                                </div>

                                <img 
                                    className='h-[180px] w-auto object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply' 
                                    src={`/images/products/${i + 1}.webp`} 
                                    alt="Product"/>

                                {/* Action Icons */}
                                <ul className='absolute top-3 -right-10 group-hover:right-3 flex flex-col gap-2 transition-all duration-300 z-20'>
                                    <li className='w-9 h-9 cursor-pointer bg-white text-slate-600 flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white transition-colors shadow-sm'>
                                        <FaRegHeart />
                                    </li>
                                    <li className='w-9 h-9 cursor-pointer bg-white text-slate-600 flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white transition-colors shadow-sm'>
                                        <FaEye />
                                    </li>
                                    <li className='w-9 h-9 cursor-pointer bg-white text-slate-600 flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white transition-colors shadow-sm'>
                                        <RiShoppingCartLine />
                                    </li>
                                </ul>
                            </div>

                            {/* Product Details Section */}
                            <div className='p-4'>

                                <h3 className='font-bold text-slate-800 text-lg mt-1 mb-2 truncate hover:text-[#059473] transition-colors'> Modern Product Name </h3>

                                <div className='flex items-center gap-1 mb-4'>
                                    <Rating ratings={4.0} />
                                </div>

                                <div className='flex items-center justify-between'>
                                    <div className='flex flex-col'>
                                        <span className='text-lg font-extrabold text-[#059473]'>$120</span>
                                    </div>
                                    
                                    <button className='border border-[#059473] text-[#059473] bg-white hover:bg-[#059473] hover:text-white transition-all duration-300 py-1.5 px-4 rounded-full font-bold text-xs uppercase tracking-wide'>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FeatureProducts;