import React from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';

const FeatureProducts = () => {
    

    const products = [1, 2, 3, 4, 5, 6]; 

    return (
        <div className='w-[90%] mx-auto py-10'>
            
            {/* 1. Header Section */}
            <div className='text-center mb-10'>
                <h2 className='text-3xl text-slate-800 font-bold relative pb-4'> 
                    Feature Products 
                </h2>
                <div className='w-[100px] h-0.5 bg-[#059473] mx-auto'></div>
            </div>

            {/* 2. Product Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    products.map((p, i) => (
                        <div 
                            key={i} 
                            className='border border-gray-200 rounded-lg group transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden bg-white'>
                            
                            {/* Product Image and Actions Container */}
                            <div className='relative overflow-hidden'>
                                
                                {/* Discount Badge */}
                                <div className='absolute text-white w-10 h-10 rounded-full bg-red-600 font-bold text-xs left-3 top-3 flex items-center justify-center shadow-md z-10'> 8% </div> 

                                {/* Product Image */}
                                <img 
                                    className='w-full h-60 object-contain bg-gray-50 transition-transform duration-500 group-hover:scale-105 p-3' 
                                    src={`/images/products/${i + 1}.webp`} 
                                    alt="Product"
                                /> 

                                {/* Action Buttons */}
                                <ul className='flex transition-all duration-500 opacity-0 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-4 group-hover:opacity-100 z-20'>
                                    {/* Wishlist */}
                                    <li className='w-10 h-10 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white transition-all shadow-lg'>
                                        <FaRegHeart className='text-lg' />
                                    </li>
                                    {/* View */}
                                    <li className='w-10 h-10 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white transition-all shadow-lg'>
                                        <FaEye className='text-lg' />
                                    </li>
                                    {/* Add to Cart */}
                                    <li className='w-10 h-10 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white transition-all shadow-lg'>
                                        <RiShoppingCartLine className='text-lg' />
                                    </li>
                                </ul> 
                            </div>

                            {/* Product Details */}
                            <div className='p-3 text-slate-700 space-y-1'>
                                <h3 className='font-semibold text-base truncate'>Product Name </h3>
                                <div className='flex items-center justify-between'>
                                    <span className='text-lg font-bold text-red-600'>$656</span>
                                    <Rating ratings={4.5} />
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
