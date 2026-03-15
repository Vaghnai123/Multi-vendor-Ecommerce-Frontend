/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import Rating from '../Rating';
import { RiShoppingCartLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { add_to_card,add_to_wishlist,messageClear } from '../../store/reducers/cardReducer';
import toast from 'react-hot-toast';

const ShopProducts = ({ styles, products }) => {

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
        <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'grid-cols-1 gap-6'}`}>
            {
                products.map((p, i) => (
                    <div
                        key={i}
                        className={`group relative bg-white rounded-3xl transition-all duration-300 ease-in-out overflow-hidden
                        ${styles === 'grid'
                                ? 'flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-transparent'
                                : 'flex flex-row items-center gap-6 p-4 hover:shadow-lg border border-gray-100'
                        }`}>

                        {/* === 1. IMAGE CONTAINER === */}
                        <div className={`relative overflow-hidden rounded-2xl bg-[#F3F4F6] flex justify-center items-center isolate
                            ${styles === 'grid'
                                ? 'w-full aspect-4/5 sm:aspect-square'
                                : 'w-[200px] h-[200px] shrink-0'}` 
                        }>
                            {/* Discount Badge */}
                            {p.discount > 0 && (
                                <span className='absolute top-3 left-3 z-20 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider shadow-sm uppercase'>
                                    {p.discount}% 
                                </span>
                            )}

                            <img
                                className='h-full w-full object-contain p-5 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110'
                                src={p.images[0]}
                                alt={p.name}/>
                            

                            {/* Floating Action Buttons */}
                            <ul className='absolute top-3 right-3 flex flex-col gap-2 z-20 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out'>
                                <li onClick={() => add_wishlist(p)} className='w-9 h-9 cursor-pointer bg-white text-gray-600 flex justify-center items-center rounded-xl shadow-md hover:bg-[#059473] hover:text-white hover:scale-110 transition-all'>
                                    <AiFillHeart size={18} />
                                </li>
                                <Link to={`/product/details/${p.slug}`} className='w-9 h-9 cursor-pointer bg-white text-gray-600 flex justify-center items-center rounded-xl shadow-md hover:bg-[#059473] hover:text-white hover:scale-110 transition-all'>
                                    <FaEye size={16} />
                                </Link>
                                <li onClick={() => add_card(p._id)} className='w-9 h-9 cursor-pointer bg-white text-gray-600 flex justify-center items-center rounded-xl shadow-md hover:bg-[#059473] hover:text-white hover:scale-110 transition-all'>
                                    <AiOutlineShoppingCart size={18} />
                                </li>
                            </ul>
                        </div>

                        {/* === 2. CONTENT SECTION === */}
                        {styles === 'grid' ? (
                            // >>> GRID VIEW CONTENT <<<
                            <div className='flex flex-col p-4 w-full'>
                                <div className="text-xs pb-1 font-bold tracking-widest text-gray-600 uppercase mb-1">
                                    {p.brand}
                                </div>
                                <Link to={`/product/details/${p.slug}`}>
                                    <h2 title={p.name} className='text-gray-900 font-semibold text-md leading-tight cursor-pointer hover:text-[#059473] transition-colors line-clamp-1 mb-2'>
                                    {p.name}
                                </h2>
                                </Link>
                                <div className='flex items-center gap-2 mb-3'>
                                    <div className='flex text-yellow-400 text-sm'>
                                        <Rating ratings={p.rating} />
                                    </div>
                                    <span className='text-gray-400 text-xs font-medium'>( {p.rating} / 5 Rating )</span>
                                </div>
                                <div className='flex items-center justify-between w-full mt-auto'>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-lg font-bold text-gray-900'>₹{(p.price - Math.floor((p.price * p.discount) / 100)).toLocaleString('en-IN')}</span>
                                        <span className='text-slate-400 font-medium text-sm line-through'> ₹{p.price.toLocaleString('en-IN')}
                                        </span>
                                    </div>
    
                                    <button onClick={() => add_card(p._id)} className='w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#059473] hover:border-[#059473] hover:text-white transition-all duration-300 shadow-sm'> <AiOutlineShoppingCart size={18} /> </button>
                                </div>
                            </div>
                        ) : (
                            // >>> LIST VIEW CONTENT <<<
                            <div className='flex-1 py-2 pr-4 min-w-0 flex flex-col justify-center gap-2'>
                                
                                <Link to={`/product/details/${p.slug}`}>
                                    <h3 title={p.name} className='text-slate-800 cursor-pointer text-lg mb-2 truncate font-bold transition-colors'>
                                    {p.name}
                                    </h3>
                                </Link>

                                {/* Brand Box */}
                                <div className="flex items-center border-l-4 border-[#059473] bg-slate-50 py-1.5 pl-3 rounded-r-md my-1 shadow-sm w-full">
                                    <span className="text-sm text-slate-600 font-bold">Brand</span>
                                    <span className="text-slate-600 font-bold mx-3">:</span>
                                    <span className="text-slate-800 font-bold text-sm">{p.brand}</span>
                                </div>

                                {/* Rating */}
                                <div className='flex justify-start items-center gap-2'>
                                    <div className='flex text-yellow-400 text-sm'>
                                        <Rating ratings={p.rating} />
                                    </div>
                                    <span className='text-slate-500 text-sm font-medium'>( {p.rating} / 5 Rating )</span>
                                </div>

                                {/* Price */}
                                <div className='flex items-center gap-3 mt-1'>
                                    <span className='text-lg font-bold text-slate-900'>₹{(p.price - Math.floor((p.price * p.discount) / 100)).toLocaleString('en-IN')}</span>
                                    <span className='text-slate-400 font-medium text-sm line-through'>₹{p.price.toLocaleString('en-IN')}</span>
                                </div>

                                {/* Description */}
                                <p className='text-slate-600 font-medium text-sm line-clamp-2 leading-relaxed'>
                                    {p.description}
                                </p>

                                {/* Button */}
                                <div className='flex gap-3 mt-3'>
                                    <button onClick={() => add_card(p._id)} className='px-6 py-2 border border-[#059473] text-[#059473] bg-white hover:bg-[#059473] hover:text-white transition-all duration-300 rounded-full font-bold text-xs uppercase tracking-wide flex justify-center items-center gap-2 shadow-sm'>
                                    <RiShoppingCartLine className="text-sm" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            }
        </div>
    );
};

export default ShopProducts;