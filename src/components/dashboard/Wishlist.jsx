/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_card, get_wishlist_products, remove_wishlist, messageClear } from '../../store/reducers/cardReducer';
import toast from 'react-hot-toast';
import { AiFillHeart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { wishlist, successMessage, errorMessage } = useSelector(state => state.card)

    useEffect(() => {
        if (userInfo) {
            dispatch(get_wishlist_products(userInfo.id))
        }
    }, [userInfo, dispatch])

    const add_card = (id) => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity: 1,
                productId: id
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

    return (
        <div className='w-full p-4 md:p-8'>
            <div className='bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px] flex flex-col'>

                {/* Header Section */}
                <div className='px-6 py-6 border-b border-slate-100'>
                    <div className='flex items-center gap-5'>
                        <div className='w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm'>
                            <FaRegHeart size={24} />
                        </div>
                        <div>
                            <h2 className='text-xl font-bold text-slate-800 tracking-tight'>My Wishlist</h2>
                            <p className='text-sm pt-2 text-slate-500 font-medium'>See your favorite products</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className='flex-1 p-6 md:p-8'>
                    {
                        wishlist.length > 0 ? (
                            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                {
                                    wishlist.map((p, i) => (
                                        <div key={i} className='group relative bg-white rounded-3xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 hover:border-[#059473]/50'>
                                            
                                            <div className='relative overflow-hidden rounded-2xl bg-[#F3F4F6] flex justify-center items-center isolate w-full aspect-square'>
                                                {
                                                    p.productId.discount !== 0 && <div className='absolute top-3 left-3 z-20'>
                                                        <span className='bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider shadow-sm uppercase'>
                                                            {p.productId.discount}%
                                                        </span>
                                                    </div>
                                                }

                                                <img className='h-full w-full object-contain p-5 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110'
                                                src={p.productId.images && p.productId.images.length > 0 ? p.productId.images[0] : '/images/placeholder.png'} 
                                                alt={p.productId.name} />

                                                <ul className='absolute top-3 right-3 flex flex-col gap-2 z-20 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out'>
                                                    <li onClick={() => dispatch(remove_wishlist(p._id))} className='w-9 h-9 cursor-pointer bg-white text-gray-600 flex justify-center items-center rounded-xl shadow-md hover:bg-[#059473] hover:text-white hover:scale-110 transition-all'>
                                                        <AiFillHeart size={18} />
                                                    </li>
                                                    <Link to={`/product/details/${p.productId.slug}`} className='w-9 h-9 cursor-pointer bg-white text-gray-600 flex justify-center items-center rounded-xl shadow-md hover:bg-[#059473] hover:text-white hover:scale-110 transition-all'>
                                                        <FaEye size={16} />
                                                    </Link>
                                                    <li onClick={() => add_card(p.productId._id)} className='w-9 h-9 cursor-pointer bg-white text-gray-600 flex justify-center items-center rounded-xl shadow-md hover:bg-[#059473] hover:text-white hover:scale-110 transition-all'>
                                                        <RiShoppingCartLine size={18} />
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Content Section */}
                                            <div className='flex flex-col p-4 w-full'>
                                                <div className="text-xs pb-2 font-bold tracking-widest text-gray-600 uppercase mb-1">
                                                    {p.productId.brand}
                                                </div>
                                                <Link to={`/product/details/${p.slug}`}>
                                                    <h2 className='text-slate-800 text-md mb-3 truncate font-medium transition-colors group-hover:text-[#059473]'>
                                                    {p.productId.name}
                                                </h2>
                                                </Link>
                                                

                                                <div className='flex items-center gap-2 mb-2'>
                                                    <div className='flex text-yellow-400 text-sm'>
                                                        <Rating ratings={p.productId.rating} />
                                                    </div>
                                                    <span className='text-slate-500 text-sm font-medium'>( {p.productId.rating} / 5 Rating )</span>
                                                </div>

                                                <div className='flex items-center justify-between w-full mt-auto'>
                                                    <div className='flex items-center gap-2'>
                                                        {/* FIX: Live Price calculation using productId */}
                                                        <span className='text-lg font-bold text-gray-900'>
                                                            ₹{(p.productId.price - Math.floor((p.productId.price * p.productId.discount) / 100)).toLocaleString('en-IN')}
                                                        </span>
                                                        <span className='text-slate-400 font-medium text-sm line-through'>
                                                            ₹{p.productId.price.toLocaleString('en-IN')}
                                                        </span>
                                                    </div>

                                                    <button onClick={() => add_card(p.productId._id)} className='w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#059473] hover:border-[#059473] hover:text-white transition-all duration-300 shadow-sm'>
                                                        <RiShoppingCartLine size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='w-full h-full flex flex-col items-center justify-center py-10'>
                                <div className='flex flex-col items-center justify-center gap-4'>
                                    <div className='bg-slate-50 rounded-full p-4 text-slate-300 mb-2'>
                                        <FaRegHeart size={30} />
                                    </div>
                                    <h2 className='text-xl font-bold text-slate-800 tracking-tight text-center'>Your Wishlist is Empty</h2>
                                    <p className='text-slate-500 text-center font-medium mb-4'>Looks like you haven't added anything to your wishlist yet.</p>
                                    <Link to='/shops' className='bg-[#059473] text-white font-semibold px-8 py-3 rounded-md shadow-lg shadow-[#059473]/30 hover:bg-[#047f63] transition-all duration-300 transform hover:-translate-y-1'>Shop Now</Link>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Wishlist;