/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { add_to_card,add_to_wishlist,messageClear } from '../../store/reducers/cardReducer';
import toast from 'react-hot-toast';

const FeatureProducts = ({products}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userInfo } = useSelector(state => state.auth)
    const {errorMessage,successMessage } = useSelector(state => state.card)

    const add_card = (id) => {
        if (userInfo) {
           dispatch(add_to_card({
            userId: userInfo.id,
            quantity : 1,
            productId : id
           }))
        } else {
            navigate('/login')
        }
    }

     useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())  
        } 
        
    },[successMessage,errorMessage])

   const add_wishlist = (pro) => {
        dispatch(add_to_wishlist({
            userId: userInfo.id,
            productId: pro._id,
            name: pro.name,
            price: pro.price,
            image: pro.images[0],
            discount: pro.discount,
            rating: pro.rating,
            slug: pro.slug
        }))
    }

    return (
        <div className='w-[90%] lg:w-[85%] mx-auto py-7'>

            {/* Header */}
            <div className='text-center mb-10'>
                <h2 className='text-2xl md:text-3xl text-slate-900 font-bold'>
                    Featured Products
                </h2>
                <div className='w-16 h-1 bg-[#059473] mx-auto mt-3 rounded-full'></div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {
                    products.map((p, i) => (
                        <div key={i} className='group bg-white rounded-2xl border border-slate-100 hover:border-[#059473]/50 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden'>
                            
                            <div className='relative w-full h-50 bg-[#f9f9f9] flex justify-center items-center overflow-hidden p-4 group-hover:bg-white transition-colors'>
                                {   
                                    p.discount ? 
                                    <span className='absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-3   py-1 rounded-full'>
                                        {p.discount} %
                                    </span> : ''
                                } 
                                <img 
                                    className='h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105' 
                                    src={p.images[0]} 
                                    alt={p.name}
                                />
                                
                                {/* Hover Icons */}
                                <ul className='absolute top-3 -right-12 group-hover:right-3 flex flex-col gap-2 transition-all duration-300'>
                                    <li onClick={() => add_wishlist(p)} className='w-9 h-9 cursor-pointer bg-white text-slate-600 flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white shadow-sm border border-slate-100'>
                                        <FaRegHeart />
                                    </li>
                                    <Link to={`/product/details/${p.slug}`} className='w-9 h-9 cursor-pointer bg-white text-slate-600 flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white shadow-sm border border-slate-100'>
                                        <FaEye />
                                    </Link>
                                    <li onClick={() => add_card(p._id)} className='w-9 h-9 cursor-pointer bg-white text-slate-600 flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white shadow-sm border border-slate-100'>
                                        <RiShoppingCartLine />
                                    </li>
                                </ul>
                            </div>

                            {/* Text Details Section - Clean & Simple */}
                            <div className='p-4'>

                            <div className='flex items-center justify-between mb-2'>
                                    <span className='bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide'>
                                        {p.brand}
                                    </span>
                            </div>

                                {/* Name */}
                                <Link to={`/product/details/${p.slug}`}>
                                    <h3 title={p.name} className='text-slate-800  text-base mb-2 truncate font-bold transition-colors'>
                                        {p.name}
                                    </h3>
                                </Link>

                                {/* Rating */}
                                <div className='flex items-center gap-2 mb-4'>
                                    <div className='flex text-yellow-400 text-sm'>
                                        <Rating ratings={p.rating} />
                                    </div>
                                    <span className='text-slate-500 text-sm font-medium'>( {p.rating} / 5 Rating )</span>
                                </div>

                                {/* Price Row */}
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-lg font-bold text-slate-900'>
                                            ₹{(p.price - Math.floor((p.price * p.discount) / 100)).toLocaleString('en-IN')}
                                        </span>
                                        <span className='text-slate-400 font-medium text-sm line-through'>₹{p.price.toLocaleString('en-IN')}</span>
                                    </div>

                                    <button onClick={() => add_card(p._id)} className='flex items-center justify-center gap-2 px-3 py-1.5 border border-[#059473] rounded-full text-[#059473] text-xs font-bold uppercase hover:bg-[#059473] hover:text-white transition-all duration-300 shadow-sm'>
                                        <RiShoppingCartLine className="text-sm" />
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