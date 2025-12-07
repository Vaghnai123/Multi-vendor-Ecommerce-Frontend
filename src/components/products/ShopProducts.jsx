import React from 'react';
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import Rating from '../Rating';
import { Link } from 'react-router-dom';

const ShopProducts = ({ styles }) => {
    return (
        <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'grid-cols-1 gap-6'}`}>
            {
                [1, 2, 3, 4, 5, 6].map((p, i) => (

                    <div 
                        key={i} 
                        className={`flex bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 group overflow-hidden
                        ${styles === 'grid' ? 'flex-col justify-start items-start' : 'flex-row justify-start items-center gap-4 p-3'}`}>
                        
                        {/* 1. IMAGE CONTAINER */}
                        <div className={`relative overflow-hidden rounded-xl bg-gray-50 flex justify-center items-center
                            ${ styles === 'grid' 
                                ? 'w-full h-[250px]' 
                                : 'w-[140px] h-[140px] md:w-[180px] md:h-[180px] shrink-0' }`}>
                            
                            <img 
                                className='h-full w-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-110 p-4' 
                                src={`/images/products/${i + 1}.webp`} 
                                alt="Product" />

                            {/* Floating Action Buttons */}
                            <ul className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10'>
                                <li className='w-9 h-9 cursor-pointer bg-white/90 backdrop-blur-sm flex justify-center items-center rounded-full text-slate-700 hover:bg-[#059473] hover:text-white transition-all shadow-sm hover:shadow-md'>
                                    <AiFillHeart size={18} />
                                </li>
                                <Link to='/product/details/new' className='w-9 h-9 cursor-pointer bg-white/90 backdrop-blur-sm flex justify-center items-center rounded-full text-slate-700 hover:bg-[#059473] hover:text-white transition-all shadow-sm hover:shadow-md'>
                                    <FaEye size={16} />
                                </Link>
                                <li className='w-9 h-9 cursor-pointer bg-white/90 backdrop-blur-sm flex justify-center items-center rounded-full text-slate-700 hover:bg-[#059473] hover:text-white transition-all shadow-sm hover:shadow-md'>
                                    <AiOutlineShoppingCart size={18} />
                                </li>
                            </ul>
                            
                            {/* Discount Badge */}
                            <span className='absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm'> -15% </span>
                        </div>

                        {/* 2. Product Content */}
                    <div className={`flex flex-col gap-2 ${styles === 'grid' ? 'w-full p-4 pt-3' : 'flex-1 py-2 pr-4 min-w-0'}`}>
                            
                            <h2 className='text-slate-800 font-bold text-base md:text-lg cursor-pointer transition-colors line-clamp-1 hover:text-[#059473]'>
                                Modern Product Title {i+1}
                            </h2>
                            
                            {/* Rating */}
                            <div className='flex justify-start items-center gap-2'>
                                <div className='flex text-yellow-400 text-sm'>
                                    <Rating ratings={4.5} />
                                </div>
                                <span className='text-slate-500 text-sm font-medium'>(4.5)</span>
                            </div>

                            {/* Grid LAYOUT */}       
                            {styles === 'grid' ? (
                                <div className='flex items-center justify-between w-full mt-3'>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-lg font-extrabold text-[#059473]'>$434</span>
                                    </div>
                                    
                                    <button className='px-3 py-1.5 rounded-full border border-[#059473] text-[#059473] hover:bg-[#059473] hover:text-white transition-all duration-300 text-xs font-bold uppercase shadow-sm whitespace-nowrap'>
                                        Add to Cart
                                    </button>
                                </div>
                            ) : (
                                // === LIST VIEW : Standard Layout ===
                                <>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <span className='text-lg font-extrabold text-[#059473]'>$434</span>
                                        <span className='text-slate-400 font-medium text-sm line-through'>$560</span>
                                    </div>

                                    <p className='text-slate-600 font-medium text-sm'>
                                        This is a description area that only appears in list view. It gives more details about the product features.
                                    </p>

                                    <div className='flex gap-3 mt-4'>
                                        <button className='px-5 py-2 border border-[#059473] text-[#059473] bg-white hover:bg-[#059473] hover:text-white transition-all duration-300 rounded-full font-bold text-xs uppercase tracking-wide flex justify-center items-center gap-2 shadow-sm'>
                                            Add to Cart
                                        </button>
                                    </div>
                                </>
                            )}

                        </div>

                    </div>
                ))
            }
        </div>
    );
};

export default ShopProducts;