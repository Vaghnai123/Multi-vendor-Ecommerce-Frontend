import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { FaEdit, FaTruck, FaChevronRight } from "react-icons/fa"; 
import { useDispatch, useSelector } from 'react-redux';
import { place_order } from '../store/reducers/orderReducer';
const Shipping = () => {
    
    const { state: { products, price, shipping_fee, items } } = useLocation();
    const navigate = useNavigate()
     const dispatch = useDispatch()
     const {userInfo} = useSelector(state => state.auth) 
     const { coupon_price } = useSelector(state => state.card); 
        
    const [res, setRes] = useState(false)
    const [state, setState] = useState({
        name: '',
        address: '',
        phone: '',
        post: '',
        province: '',
        city: '',
        area: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const save = (e) => {
        e.preventDefault()
        const {name, address, phone, post, province, city, area } = state;
        if (name && address && phone && post && province && city && area) {
            setRes(true)
        }
    }

    const totalOriginalPrice = products.reduce((acc, shop) => {
        return acc + shop.products.reduce((innerAcc, item) => {
            return innerAcc + (item.productInfo.price * item.quantity);
        }, 0);
    }, 0);

    const totalDiscountAmount = totalOriginalPrice - price;

    const discountedPrice = price - coupon_price;
    const totalAmount = discountedPrice + shipping_fee;

        const placeOrder = () => {
        dispatch(place_order({
            price: discountedPrice,
            products,
            shipping_fee,
            items,
            shippingInfo : state,
            userId: userInfo.id,
            navigate 

        }))
    }

    return (
        <div>
            <Header/>
            <section className='bg-[#f3f4f6] py-10'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto'>

                {/* ---  Shipping CART HEADER --- */}
                    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shadow-sm ring-1 ring-green-100">
                                    <FaTruck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Shipping Cart </h1>
                                    <p className="pt-2 text-sm text-gray-500 font-medium">Please provide your delivery details</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm font-medium w-full md:w-auto justify-start md:justify-end opacity-80">
                                <span className="text-gray-400">Cart</span>
                                <FaChevronRight className="text-gray-300 text-xs" />
                                {/* Active step: Delivery */}
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Shipping</span>
                                <FaChevronRight className="text-gray-300 text-xs" />
                                <span className="text-gray-400">Payment</span>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        
                        {/* --- LEFT SIDE: Form & Products --- */}
                        <div className='lg:col-span-2 flex flex-col gap-6'>
                            
                            {/* Shipping Information Card */}
                            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                                <h2 className='text-xl font-bold text-slate-700 pb-4 border-b border-gray-100 mb-6'>Shipping Information</h2>
                                {
                                    !res && (
                                            <form onSubmit={save} className='flex flex-col gap-5'>
                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                                    <div className='flex flex-col gap-2'>
                                                        <label className='text-sm font-semibold text-slate-600' htmlFor="name">Name</label>
                                                        <input onChange={inputHandle} value={state.name} type="text" className='w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm' name="name" id="name" placeholder='Enter Your Name' /> 
                                                    </div>
                                                    <div className='flex flex-col gap-2'>
                                                        <label className='text-sm font-semibold text-slate-600' htmlFor="address">Address</label>
                                                        <input onChange={inputHandle} value={state.address} type="text" className='w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm' name="address" id="address" placeholder='House No / Building / Street' /> 
                                                    </div> 
                                                </div>

                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                                    <div className='flex flex-col gap-2'>
                                                        <label className='text-sm font-semibold text-slate-600' htmlFor="phone">Mobile Number</label>
                                                        <input onChange={inputHandle} value={state.phone} type="text" className='w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm' name="phone" id="phone" placeholder='Phone Number' /> 
                                                    </div>
                                                    <div className='flex flex-col gap-2'>
                                                        <label className='text-sm font-semibold text-slate-600' htmlFor="post">Post Code</label>
                                                        <input onChange={inputHandle} value={state.post} type="text" className='w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm' name="post" id="post" placeholder='Postal Code' /> 
                                                    </div> 
                                                </div>

                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                                    <div className='flex flex-col gap-2'>
                                                        <label className='text-sm font-semibold text-slate-600' htmlFor="province">Province/State</label>
                                                        <input onChange={inputHandle} value={state.province} type="text" className='w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm' name="province" id="province" placeholder='State' /> 
                                                    </div>
                                                    <div className='flex flex-col gap-2'>
                                                        <label className='text-sm font-semibold text-slate-600' htmlFor="city">Town/City</label>
                                                        <input onChange={inputHandle} value={state.city} type="text" className='w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm' name="city" id="city" placeholder='City' /> 
                                                    </div> 
                                                </div>

                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                                    <div className='flex flex-col gap-2'>
                                                        <label className='text-sm font-semibold text-slate-600' htmlFor="area">Area, Street, Village </label>
                                                        <input onChange={inputHandle} value={state.area} type="text" className='w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm' name="area" id="area" placeholder='Area / Landmark' /> 
                                                    </div>
                                                    <div className='flex flex-col gap-2 justify-end'>
                                                        <button className='w-full px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-sm'>
                                                            Save Changes
                                                        </button>
                                                    </div> 
                                                </div>
                                            </form>
                                    )
                                }

                                {
                                    res && (
                                            <div className='flex flex-col gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200'>
                                                <div className='flex justify-between items-start'>
                                                    <div>
                                                        <h2 className='text-lg font-bold text-slate-700 pb-1'>Deliver To : {state.name}</h2>
                                                        <span className='bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded'>Home</span>
                                                    </div>
                                                    <button onClick={() => setRes(false)} className='flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors'>
                                                        <FaEdit /> Edit
                                                    </button>
                                                </div>
                                                
                                                <div className='text-slate-600 font-medium text-sm flex flex-col gap-1'>
                                                    <p>{state.address}, {state.area}, {state.city}</p>
                                                    <p className='pt-1'>{state.province}, {state.post}</p>
                                                    <p className='mt-1 font-bold text-slate-700'>Phone Number : {state.phone}</p>
                                                </div>
                                            </div>
                                    )
                                }
                            </div>

                            {/* Cart Items Mapping */}
                            {
                                products.map((p, i) => (
                                    <div key={i} className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4'>
                                        
                                        <div className='flex justify-start items-center border-b border-gray-100 pb-2'>
                                            <h2 className='text-md text-slate-700 font-bold'>{p.shopName}</h2>
                                        </div>

                                        {
                                            p.products.map((pt, k) => (
                                                <div key={k} className='w-full flex flex-wrap sm:flex-nowrap gap-4 mb-3 last:mb-0 border-b border-gray-50 last:border-none pb-4 last:pb-0'>
                                                    
                                                    {/* Image & Details */}
                                                    <div className='flex sm:w-8/12 w-full gap-4 items-center'>
                                                        <div className='flex gap-4 justify-start items-center w-full'>
                                                            <div className='w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0'>
                                                                <img className='w-full h-full object-contain' src={pt.productInfo.images[0]} alt={pt.productInfo.name} />
                                                            </div>

                                                            <div className='pr-4 text-slate-700 w-full'>
                                                                <h2 className='text-lg font-bold line-clamp-1'>{pt.productInfo.name}</h2>
                                                                <span className='text-sm text-gray-500 font-medium'>Brand : <span className='text-emerald-600 font-semibold'>{pt.productInfo.brand}</span></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Price & Qty */}
                                                    <div className='flex justify-between w-full sm:w-4/12 sm:mt-0 mt-3 items-center sm:items-start'>
                                                        
                                                        <div className='pl-0 sm:pl-4 flex flex-col items-end sm:items-start'>
                                                            <h2 className='text-lg font-bold text-emerald-600'>
                                                                ₹{(pt.productInfo.price - Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)).toLocaleString('en-IN')}
                                                            </h2>
                                                            <div className='flex items-center gap-2'>
                                                                <p className='line-through font-medium text-slate-400 text-sm'>₹{pt.productInfo.price}</p>
                                                                {pt.productInfo.discount > 0 && <p className='text-rose-500 text-xs font-bold'>-{pt.productInfo.discount}%</p>}
                                                            </div>
                                                        </div>

                                                        <div className='flex gap-3 flex-col items-end'>
                                                            
                                                            <div className='flex items-center gap-2'>
                                                                <span className=' font-medium text-slate-600 text-md'>Qty :</span>
                                                                <span className=' font-medium text-slate-600 text-md'>{pt.quantity}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        {/* --- RIGHT SIDE : Order Summary --- */}
                        <div className='lg:col-span-1'>
                            <div className='bg-white p-6 rounded-xl shadow-lg border border-gray-100 top-5'>
                                <h2 className='text-xl font-bold text-slate-800 border-b pb-3 mb-4'>Order Summary</h2>
        
                                <div className='flex flex-col gap-4 text-slate-600'>

                                <div className='flex justify-between items-center text-slate-600'>
                                    <span className='font-medium text-slate-600'>Total MRP</span>
                                    <span className='font-bold text-slate-600'>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
                                </div>

                                <div className='flex justify-between items-center text-slate-600'>
                                    <span className='font-medium text-slate-600'>Discount on MRP</span>
                                    <span className='font-bold text-emerald-600'>-₹{totalDiscountAmount.toLocaleString('en-IN')}</span>
                                </div>

                                <div className='flex justify-between items-center text-slate-600'>
                                    <span className='font-medium text-slate-800'>Sub Total </span>
                                    <span className='font-bold text-slate-800'>₹{discountedPrice.toLocaleString('en-IN')}</span>
                                </div>

                                <div className='flex justify-between items-center mb-2'>
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

                                 <div className='flex justify-between items-center text-slate-600'>
                                    <span className='font-medium text-slate-800'>Total Payment </span>
                                    <span className='font-bold text-slate-800'>₹{totalAmount.toLocaleString('en-IN')}</span>
                                </div>

                                 <div className="flex items-center gap-2 my-2 opacity-60"><div className="h-px bg-gray-200 flex-1"></div></div>

                                {/* Final Total */}
                                <div className='flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-100'>
                                    <span className='font-bold text-lg text-emerald-900'>Total</span>
                                    <span className='text-xl font-bold text-emerald-700'>₹{totalAmount.toLocaleString('en-IN')}</span>
                                </div>

                                {/* Place Order Button */}
                                <button 
                                        onClick={placeOrder}
                                        disabled={!res} 
                                        className={`w-full py-3 mt-4 rounded-lg text-white font-bold uppercase text-sm shadow-md transition-all transform active:scale-[0.98] ${ res ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-gray-300 cursor-not-allowed text-gray-500' }`}>Place Order</button>
            
                                {!res && (
                                <p className='text-[10px] text-center text-rose-500 font-semibold italic'>
                                    * Please save shipping information to proceed
                                </p>
                                )}
                            </div>

                        </div>
                    </div>

                   </div>
                </div>
            </section>

            <Footer/>
        </div>
    );
};

export default Shipping;