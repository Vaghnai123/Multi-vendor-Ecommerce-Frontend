/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { IoIosArrowForward } from "react-icons/io";
import { FaTrashAlt, FaChevronRight, FaShoppingBag } from "react-icons/fa"; 
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { get_card_products ,reset_coupon, delete_card_product, messageClear, quantity_inc, quantity_dec, apply_coupon } from '../store/reducers/cardReducer';
import toast from 'react-hot-toast';
import { RiShoppingCartLine } from "react-icons/ri";

const Card = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth)
    const {card_products,successMessage,errorMessage,price,buy_product_item,shipping_fee,outofstock_products,coupon_price} = useSelector(state => state.card) 

    const [couponCode, setCouponCode] = useState('')

    const redirect = () => {
        navigate('/shipping',{
            state: {
                products : card_products,
                price: price - coupon_price, 
                shipping_fee: shipping_fee,
                items: buy_product_item, 
            }
        })
    }


    useEffect(() => {
        if (userInfo && userInfo.id) {
            dispatch(reset_coupon());
            dispatch(get_card_products(userInfo.id))
        }
    }, [userInfo])


    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(get_card_products(userInfo.id))
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    },[successMessage, errorMessage])

    const applyCoupon = () => {
        if(couponCode){
            dispatch(apply_coupon({
                couponCode,
                currentPrice: price
            }))
        } else {
            toast.error("Please enter a coupon code")
        }
    }

    let total_original_price = 0;
    if (card_products.length > 0) {
        card_products.forEach((shop) => {
            shop.products.forEach((item) => {
                total_original_price += item.productInfo.price * item.quantity;
            });
        });
    }

    const inc = (quantity, stock, card_id) => {
        const temp = quantity + 1;
        if (temp <= stock) {
            dispatch(quantity_inc(card_id))
        }
    }

     const dec = (quantity, card_id) => {
        const temp = quantity - 1;
        if (temp !== 0) {
            dispatch(quantity_dec(card_id))
        }
    }

    return (
        <div>
            <Header />

            <section className='bg-[#f3f4f6] py-10'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto'>
                    
                    {/* ---  SHOPPING CART PROGRESS HEADER --- */}
                    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shadow-sm ring-1 ring-green-100">
                                    <FaShoppingBag className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                                    <p className="pt-2 text-sm text-gray-500 font-medium">Review your items before checkout</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm font-medium w-full md:w-auto justify-start md:justify-end opacity-80">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Cart</span>
                                <FaChevronRight className="text-gray-300 text-xs" />
                                <span className="text-gray-400">Shipping</span>
                                <FaChevronRight className="text-gray-300 text-xs" />
                                <span className="text-gray-400">Payment</span>
                            </div>
                        </div>
                    </div>

                    {
                        card_products.length > 0 || outofstock_products.length > 0 ? (
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                <div className='lg:col-span-2 flex flex-col gap-6'>
                                    {/* Product List */}
                                    <div className='flex flex-col gap-3'>
                                        <div className='bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500'>
                                            <h2 className='text-md text-emerald-600 font-bold uppercase'>Stock Products ({card_products.length})</h2>
                                        </div>
                                        {
                                            card_products.map((p, i) => (
                                                <div className='flex bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-col gap-4' key={i}>
                                                    <div className='flex justify-start items-center border-b border-gray-100 pb-2'>
                                                        <h2 className='text-md text-slate-700 font-bold'>{p.shopName}</h2>
                                                    </div>
                                                    {
                                                         p.products.map((pt, k) => (
                                                            <div className='w-full flex flex-wrap sm:flex-nowrap gap-4 mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-b-0 border-gray-50' key={k}>
                                                                <div className='flex sm:w-8/12 w-full gap-4 items-center'>
                                                                    <div className='flex gap-4 justify-start items-center w-full'>
                                                                        <div className='w-25 h-25 rounded-lg overflow-hidden bg-white shrink-0 '>
                                                                             <img className='w-full h-full object-contain' src={pt.productInfo.images[0]} alt="" />
                                                                        </div>
                                                                        <div className='pr-4 text-slate-700 w-full'>
                                                                            <h2 className='text-lg font-bold line-clamp-1 mb-1'>{pt.productInfo.name}</h2>
                                                                            <span className='text-sm text-gray-500 font-medium'>Brand : <span className='text-emerald-600 font-semibold'>{pt.productInfo.brand}</span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='flex justify-between w-full sm:w-4/12 sm:mt-0 mt-3 items-center sm:items-start'>
                                                                        <div className='pl-0 sm:pl-4 flex flex-col items-end sm:items-start'>
                                                                            <h2 className='text-lg font-bold text-gray-900'>₹{(pt.productInfo.price - Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)).toLocaleString('en-IN')}</h2>
                                                                            <div className='flex items-center gap-2'>
                                                                                 <p className='line-through font-medium text-slate-400 text-sm'>₹{pt.productInfo.price}</p>
                                                                                 <p className='text-rose-500 text-xs font-bold'>-{pt.productInfo.discount}%</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex gap-3 flex-col items-end'>
                                                                            <div className='flex bg-gray-50 border border-gray-200 rounded-lg h-8 justify-center items-center text-md overflow-hidden shadow-sm'>
                                                                                <div onClick={() => dec(pt.quantity, pt._id )} className='px-3 cursor-pointer hover:bg-gray-200 transition-colors h-full flex items-center font-bold'>-</div>
                                                                                <div className='px-3 font-semibold bg-white h-full flex items-center border-x border-gray-200 text-slate-700'>{pt.quantity }</div>
                                                                                <div onClick={() => inc(pt.quantity,pt.productInfo.stock, pt._id )} className='px-3 cursor-pointer hover:bg-gray-200 transition-colors h-full flex items-center font-bold'>+</div>
                                                                            </div>
                                                                            <button onClick={() => dispatch(delete_card_product(pt._id)) } className='flex items-center justify-center gap-2 h-8 w-full bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 text-sm transition-colors font-medium border border-rose-100 shadow-sm'>
                                                                                <FaTrashAlt size={13}/> Delete
                                                                            </button>
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>

                                    {
                                        outofstock_products.length > 0 && (
                                            <div className='flex flex-col gap-3'>
                                                <div className='bg-white p-4 rounded-xl shadow-sm border-l-4 border-rose-500'>
                                                    <h2 className='text-md text-rose-600 font-bold uppercase'>Out of Stock ({outofstock_products.length})</h2>
                                                </div>

                                                <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 opacity-80'>
                                                    {
                                                        outofstock_products.map((p, i) => (

                                                            <div className='w-full flex flex-wrap sm:flex-nowrap gap-4 pb-4 last:pb-0 border-b last:border-b-0 border-gray-50' key={i}>
                                                                <div className='flex sm:w-8/12 w-full gap-4 items-center'>
                                                                    <div className='flex gap-4 justify-start items-center'>
                                                                        
                                                                        <div className='w-25 h-25 rounded-lg overflow-hidden bg-white shrink-0  grayscale'>
                                                                             <img className='w-full h-full object-contain opacity-80' src={ p.products[0].images[0] }  alt="" />
                                                                        </div>

                                                                        <div className='pr-4 text-slate-600'>
                                                                            <h2 className='text-lg font-bold text-gray-500 line-clamp-1 mb-1'>{p.products[0].name}</h2>
                                                                            <span className='text-sm text-gray-400'>Brand : {p.products[0].brand}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className='flex justify-between w-full sm:w-4/12 sm:mt-0 mt-3 items-center sm:items-start'>
                                                                        <div className='pl-0 sm:pl-4'>
                                                                            <h2 className='text-lg text-gray-400 font-bold'>₹{(p.products[0].price - Math.floor((p.products[0].price * p.products[0].discount) / 100 )).toLocaleString('en-IN')}</h2>
                                                                            <div className='flex items-center gap-2'>
                                                                            <p className='line-through font-medium text-slate-400 text-sm'>₹{p.products[0].price}</p>
                                                                            <p className='text-gray-400 text-xs'>-{p.products[0].discount}%</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex gap-3 flex-col'>
                                                                            <div className='flex bg-gray-100 h-8 justify-center items-center text-lg rounded-lg opacity-60 pointer-events-none border border-gray-200'>
                                                                                <div className='px-3'>-</div>
                                                                                <div className='px-3 bg-gray-50 h-full flex items-center border-x border-gray-200'>{p.quantity}</div>
                                                                                <div className='px-3'>+</div>
                                                                            </div>
                                                                            
                                                                            <button onClick={() => dispatch(delete_card_product(p._id)) } className='h-8 w-full flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-300 transition-colors font-medium'>Delete</button>
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            )
                                    }

                                </div>
                                <div className='lg:col-span-1'>
                                    <div className='top-5'> 
                                        {
                                            card_products.length > 0 && (
                                                <div className='bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-slate-600 flex flex-col gap-4'>
                                                    <h2 className='text-xl font-bold text-slate-800 border-b pb-3'>Order Summary</h2>
                                                    <div className='flex justify-between items-center'>
                                                        <span className='font-medium text-slate-800'>Total MRP</span>
                                                        <span className='font-bold text-slate-500 line-through'>₹{total_original_price.toLocaleString('en-IN')}</span>
                                                    </div>
                                                    <div className='flex justify-between items-center'>
                                                        <span className='font-medium text-slate-800'>Discount on MRP</span>
                                                        <span className='font-bold text-emerald-600'>-₹{(total_original_price - price).toLocaleString('en-IN')}</span>
                                                    </div>
                                                    <div className='flex justify-between items-center'>
                                                        <span className='font-medium text-slate-800'>Subtotal ( {buy_product_item} Items )</span>
                                                        <span className='font-bold text-slate-800'>₹{price.toLocaleString('en-IN')}</span>
                                                    </div>
                                                    <div className='flex justify-between items-center pb-2'>
                                                        <span className='font-medium text-slate-800'>Delivery Fee</span>
                                                        <span className='font-bold text-slate-800 flex justify-end items-center gap-2'>
                                                            {shipping_fee === 0 ? (
                                                                <>
                                                                <span className='line-through text-sm font-bold text-slate-500'>₹40</span>
                                                                <span className='text-emerald-600'>Free</span>
                                                                 </>
                                                              ) : (
                                                                `₹${shipping_fee.toLocaleString('en-IN')}`
                                                                )}
                                                        </span>
                                                    </div>

                                                    <div className="relative flex items-center">
                                                        <input onChange={(e) => setCouponCode(e.target.value)} value={couponCode} type="text" placeholder="Enter voucher code" className="w-full pl-4 pr-20 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder-gray-600 uppercase"/>
                                                        <button onClick={applyCoupon} className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-emerald-600 text-white rounded-md text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors shadow-sm"> Apply </button>
                                                    </div>
                                                    
                                                    {/* COUPON DISPLAY Logic */}
                                                    { coupon_price > 0 && (
                                                        <div className='flex justify-between items-center'>
                                                            <span className='font-medium text-emerald-600'>Coupon Discount</span>
                                                            <span className='font-bold text-emerald-600'>-₹{coupon_price.toLocaleString('en-IN')}</span>
                                                        </div>
                                                    )}
                                                    
                                                    <div className="flex items-center gap-2 my-2 opacity-60"><div className="h-px bg-gray-200 flex-1"></div></div>
                                                    
                                                    <div className='flex justify-between items-center bg-emerald-50 p-4 rounded-xl mt-2 border border-emerald-100'>
                                                        <span className='font-bold text-lg text-emerald-900'>Total</span>
                                                        <span className='text-xl font-bold text-emerald-700'>₹{(price + shipping_fee - coupon_price).toLocaleString('en-IN')}</span>
                                                    </div>
                                                    
                                                    <button onClick={redirect} className='w-full py-3 rounded-lg shadow-lg shadow-emerald-200 bg-emerald-600 text-white font-bold uppercase text-sm hover:bg-emerald-700 transition-all transform active:scale-[0.98]'>
                                                        Proceed to Checkout 
                                                    </button>
                                                </div>
                                            )
                                    }
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='w-full h-[400px] flex flex-col justify-center items-center gap-5 bg-white rounded-xl shadow-sm border border-slate-100'>
                                <div className='w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 '>
                                    <RiShoppingCartLine size={30} />
                                </div>

                            <div className='text-center'>
                                <h2 className='text-2xl font-bold text-slate-800 tracking-tight'>Your Cart is Empty</h2>
                                <p className='text-slate-500 mt-4 text-md font-medium'>Looks like you haven't added anything yet.</p>
                            </div>

                            <Link className='mt-3 px-10 py-3 bg-[#059473] text-white font-bold rounded-md shadow-lg shadow-[#059473]/30 hover:bg-[#047f63] hover:shadow-none hover:-translate-y-1 transition-all duration-300' to='/shops'>
                                Shop Now
                            </Link>
                        </div>
                        )
                    }
                </div>
            </section>
            <Footer/>
        </div>
    );
};
export default Card;