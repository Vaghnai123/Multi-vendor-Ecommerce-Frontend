import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { FaEdit } from "react-icons/fa"; 
import { FaTrashAlt } from "react-icons/fa";

const Shipping = () => {
    
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
        const {name,address,phone,post,province,city,area } = state;
        if (name && address && phone && post && province && city && area) {
            setRes(true)
        }
    }

    return (
        <div>
            <Header/>
            
            {/* Modern Banner */}
            <section className='relative w-full h-[180px] md:h-[220px] mt-0 overflow-hidden'>
                <div className='absolute inset-0 bg-[url("/images/banner/shop.png")] bg-cover bg-center bg-no-repeat'></div>
                <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent backdrop-blur-[1px]'>
                    <div className='w-[90%] md:w-[80%] h-full mx-auto flex flex-col justify-center text-white'>
                        <h2 className='text-3xl md:text-4xl font-extrabold tracking-wide mb-2 drop-shadow-lg'>SHIPPING <span className='text-emerald-400 font-light'>PAGE</span></h2>
                        <div className='flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-gray-300 pt-2'>
                            <Link to='/' className='hover:text-white transition-colors duration-300'> Home </Link>
                            <span className='text-gray-500 text-xs'> <IoIosArrowForward /> </span>
                            <span className='text-white pointer-events-none'> Shipping </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-[#f3f4f6] py-10'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto'>
                    
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
                                                    <input onChange={inputHandle} value={state.name} type="text" className='w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm' name="name" id="name" placeholder='Enter your name' /> 
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <label className='text-sm font-semibold text-slate-600' htmlFor="address">Address</label>
                                                    <input onChange={inputHandle} value={state.address} type="text" className='w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm' name="address" id="address" placeholder='House no / building / street' /> 
                                                </div> 
                                            </div>


                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                                <div className='flex flex-col gap-2'>
                                                    <label className='text-sm font-semibold text-slate-600' htmlFor="phone">Mobile Number</label>
                                                    <input onChange={inputHandle} value={state.phone} type="text" className='w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm' name="phone" id="phone" placeholder='Phone number' /> 
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <label className='text-sm font-semibold text-slate-600' htmlFor="post">Post Code</label>
                                                    <input onChange={inputHandle} value={state.post} type="text" className='w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm' name="post" id="post" placeholder='Postal code' /> 
                                                </div> 
                                            </div>


                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                                <div className='flex flex-col gap-2'>
                                                    <label className='text-sm font-semibold text-slate-600' htmlFor="province">Province/State</label>
                                                    <input onChange={inputHandle} value={state.province} type="text" className='w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm' name="province" id="province" placeholder='Province' /> 
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
                                            
                                            <div className='text-slate-600 text-sm flex flex-col gap-1'>
                                                <p className='font-medium'>{state.address}, {state.area}</p>
                                                <p>{state.city}, {state.province}, {state.post}</p>
                                                <p className='mt-1 font-bold text-slate-700'>Phone Number : {state.phone}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            {/* Cart Items */}
                            {
                                [1, 2].map((p, i) => (

                                    <div key={i} className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4'>
                                        
                                        <div className='flex justify-start items-center border-b border-gray-100 pb-2'>
                                            <h2 className='text-md text-slate-700 font-bold'>Shipment {i+1}</h2>
                                        </div>

                                        {
                                            [1, 2].map((p, k) => (

                                                <div key={k} className='w-full flex flex-wrap sm:flex-nowrap gap-4 mb-3 last:mb-0'>
                                                    
                                                    {/* Image & Details */}
                                                    <div className='flex sm:w-8/12 w-full gap-4 items-center'>
                                                        <div className='flex gap-4 justify-start items-center w-full'>
                                                            
                                                            <div className='w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0'>
                                                                <img className='w-full h-full object-contain' src={`/images/products/${k + 1}.webp`} alt="" />
                                                            </div>

                                                            <div className='pr-4 text-slate-700 w-full'>
                                                                <h2 className='text-lg font-bold line-clamp-1'>Product Name Here</h2>
                                                                <span className='text-sm text-gray-500 font-medium'>Brand : <span className='text-slate-800'>Jara</span></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* --- FIX: Price & Qty Alignment (Copied from Card.js) --- */}
                                                    <div className='flex justify-between w-full sm:w-4/12 sm:mt-0 mt-3 items-center sm:items-start'>
                                                        
                                                        {/* Price Section */}
                                                        <div className='pl-0 sm:pl-4 flex flex-col items-end sm:items-start'>
                                                            <h2 className='text-lg font-bold text-emerald-600'>$240</h2>
                                                            <div className='flex items-center gap-2'>
                                                                 <p className='line-through text-gray-400 text-sm'>$300</p>
                                                                 <p className='text-rose-500 text-xs font-bold'>-15%</p>
                                                            </div>
                                                        </div>

                                                        {/* Actions Section */}
                                                        <div className='flex gap-3 flex-col items-end'>
                                                            <div className='flex bg-gray-50 border border-gray-200 rounded-lg h-8 justify-center items-center text-md overflow-hidden shadow-sm'>
                                                                <div className='px-3 cursor-pointer hover:bg-gray-200 transition-colors h-full flex items-center font-bold'>-</div>
                                                                <div className='px-3 font-semibold bg-white h-full flex items-center border-x border-gray-200 text-slate-700'>2</div>
                                                                <div className='px-3 cursor-pointer hover:bg-gray-200 transition-colors h-full flex items-center font-bold'>+</div>
                                                            </div>
                                                            
                                                            <button className='flex items-center justify-center gap-2 h-8 w-full bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 text-sm transition-colors font-medium border border-rose-100 shadow-sm'>
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

                        {/* --- RIGHT SIDE : Order Summary --- */}
                        <div className='lg:col-span-1'>
                            <div className='bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-5'>
                                <h2 className='text-xl font-bold text-slate-800 border-b pb-4 mb-4'>Order Summary</h2>
                                
                                <div className='flex flex-col gap-3 text-slate-600'>
                                    <div className='flex justify-between items-center font-medium'>
                                        <span>Items</span>
                                        <span className='font-bold text-slate-800'>$343</span>
                                    </div>
                                    <div className='flex justify-between items-center font-medium'>
                                        <span>Delivery Fee</span>
                                        <span className='font-bold text-slate-800'>$40</span>
                                    </div>

                                    <div className='flex justify-between items-center font-medium'>
                                        <span>Total Payment</span>
                                        <span className='font-bold text-slate-800'>$450</span>
                                    </div>

                                    <div className='border-t border-dashed border-gray-200 my-2'></div>

                                    <div className='flex justify-between items-center mt-2'>
                                        <span className='font-bold text-slate-800'>Total</span>
                                        <span className='text-xl font-extrabold text-emerald-600'>$450</span>
                                    </div>

                                    <button 
                                        disabled={!res} 
                                        className={`w-full py-3 mt-4 rounded-lg text-white font-bold uppercase text-sm shadow-md transition-all transform active:scale-[0.98] ${ res ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-gray-300 cursor-not-allowed text-gray-500' }`}>
                                        Place Order
                                    </button>
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