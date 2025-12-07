import React from 'react';
import Header from '../components/Header';
import { IoIosArrowForward } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa"; 
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Card = () => {

    const navigate = useNavigate()
    const card_products = [1, 2]
    const outOfStockProduct = [1, 2]

    const redirect = () => {
        navigate('/shipping',{
            state: {
                products : [],
                price: 500,
                shipping_fee : 40,
                items: 2
            }
        })
    }

    return (
        <div>
            <Header />
            
            <section className='relative w-full h-[180px] md:h-[220px] mt-0 overflow-hidden'>
                <div className='absolute inset-0 bg-[url("/images/banner/shop.png")] bg-cover bg-center bg-no-repeat'></div>
                <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent backdrop-blur-[1px]'>
                    <div className='w-[90%] md:w-[80%] h-full mx-auto flex flex-col justify-center text-white'>
                        <h2 className='text-3xl md:text-4xl font-extrabold tracking-wide mb-2 drop-shadow-lg'>CARD <span className='text-emerald-400 font-light'>PAGE</span></h2>
                        <div className='flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-gray-300 pt-2'>
                            <Link to='/' className='hover:text-white transition-colors duration-300'> Home </Link>
                            <span className='text-gray-500 text-xs'> <IoIosArrowForward /> </span>
                            <span className='text-white pointer-events-none'> Card </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-[#f3f4f6] py-10'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto'>
                    {
                        card_products.length > 0 || outOfStockProduct.length > 0 ? (
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                <div className='lg:col-span-2 flex flex-col gap-6'>
                                    
                                    {/* Stock Products Section */}
                                    <div className='flex flex-col gap-3'>
                                        <div className='bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500'>
                                            <h2 className='text-md text-emerald-600 font-bold uppercase'>Stock Products ({card_products.length})</h2>
                                        </div>
                                        {
                                            card_products.map((p, i) => (

                                                <div className='flex bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-col gap-4' key={i}>
                                                    
                                                    <div className='flex justify-start items-center border-b border-gray-100 pb-2'>
                                                        <h2 className='text-md text-slate-700 font-bold'>Easy Shop</h2>
                                                    </div>

                                                    {
                                                         [1, 2].map((p, k) => (

                                                            <div className='w-full flex flex-wrap sm:flex-nowrap gap-4 mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-b-0 border-gray-50' key={k}>
                                                                
                                                                {/* Image & Info */}
                                                                <div className='flex sm:w-8/12 w-full gap-4 items-center'>
                                                                    <div className='flex gap-4 justify-start items-center w-full'>
                                                                        
                                                                    <div className='w-25 h-25 rounded-lg overflow-hidden bg-white shrink-0 '>
                                                                             <img className='w-full h-full object-contain' src={`/images/products/${k + 1}.webp`} alt="" />
                                                                    </div>
                                                                        
                                                                        <div className='pr-4 text-slate-700 w-full'>
                                                                            <h2 className='text-lg font-bold line-clamp-1 mb-1'>Product Name Here</h2>
                                                                            <span className='text-sm text-gray-500 font-medium'>Brand : <span className='text-emerald-600 font-semibold'>Jara</span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Price & Actions */}
                                                                <div className='flex justify-between w-full sm:w-4/12 sm:mt-0 mt-3 items-center sm:items-start'>
                                                                    <div className='pl-0 sm:pl-4 flex flex-col items-end sm:items-start'>
                                                                        <h2 className='text-lg font-bold text-emerald-600'>$240</h2>
                                                                        <div className='flex items-center gap-2'>
                                                                             <p className='line-through text-gray-400 text-sm'>$300</p>
                                                                             <p className='text-rose-500 text-xs font-bold'>-15%</p>
                                                                        </div>
                                                                    </div>
                                                                    
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

                                    {/* Out of Stock Section */}
                                    {
                                        outOfStockProduct.length > 0 && (
                                            <div className='flex flex-col gap-3'>
                                                <div className='bg-white p-4 rounded-xl shadow-sm border-l-4 border-rose-500'>
                                                    <h2 className='text-md text-rose-600 font-bold uppercase'>Out of Stock ({outOfStockProduct.length})</h2>
                                                </div>

                                                <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 opacity-80'>
                                                    {
                                                        [1].map((p, i) => (
                                                            <div className='w-full flex flex-wrap sm:flex-nowrap gap-4 pb-4 last:pb-0 border-b last:border-b-0 border-gray-50' key={i}>
                                                                <div className='flex sm:w-8/12 w-full gap-4 items-center'>
                                                                    <div className='flex gap-4 justify-start items-center'>
                                                                        
                                                                        <div className='w-25 h-25 rounded-lg overflow-hidden bg-white shrink-0  grayscale'>
                                                                             <img className='w-full h-full object-contain opacity-80' src={`/images/products/${i + 1}.webp`} alt="" />
                                                                        </div>

                                                                        <div className='pr-4 text-slate-600'>
                                                                            <h2 className='text-lg font-bold text-gray-500 line-clamp-1 mb-1'>Product Name</h2>
                                                                            <span className='text-sm text-gray-400'>Brand : Jara</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className='flex justify-between w-full sm:w-4/12 sm:mt-0 mt-3 items-center sm:items-start'>
                                                                    <div className='pl-0 sm:pl-4'>
                                                                        <h2 className='text-lg text-gray-400 font-bold'>$240</h2>
                                                                        <p className='line-through text-gray-300 text-sm'>$300</p>
                                                                        <p className='text-gray-400 text-xs'>-15%</p>
                                                                    </div>
                                                                    <div className='flex gap-3 flex-col'>
                                                                        <div className='flex bg-gray-100 h-8 justify-center items-center text-lg rounded-lg opacity-60 pointer-events-none border border-gray-200'>
                                                                            <div className='px-3'>-</div>
                                                                            <div className='px-3 bg-gray-50 h-full flex items-center border-x border-gray-200'>2</div>
                                                                            <div className='px-3'>+</div>
                                                                        </div>
                                                                        
                                                                        <button className='h-8 w-full flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-300 transition-colors font-medium'>Delete</button>
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

                                {/* Right Side: Summary */}
                                <div className='lg:col-span-1'>
                                    <div className='sticky top-5'> 
                                        {
                                            card_products.length > 0 && (
                                                <div className='bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-slate-600 flex flex-col gap-4'>
                                                    <h2 className='text-xl font-bold text-slate-800 border-b pb-3'>Order Summary</h2>
                                                    
                                                    <div className='flex justify-between items-center'>
                                                        <span className='font-medium'>Items</span>
                                                        <span className='font-bold text-slate-800'>$343</span>
                                                    </div>
                                                    <div className='flex justify-between items-center'>
                                                        <span className='font-medium'>Delivery Fee</span>
                                                        <span className='font-bold text-slate-800'>$40</span>
                                                    </div>

                                                    <div className='flex gap-2 mt-2'>
                                                        <input className='w-full px-3 py-2 border border-gray-200 outline-none focus:border-emerald-500 rounded-lg text-sm transition-all' type="text" placeholder='Voucher Coupon' />
                                                        <button className='px-4 py-2 bg-slate-800 text-white rounded-lg uppercase text-xs font-bold hover:bg-slate-900 transition-colors'>Apply</button>
                                                    </div>

                                                    <div className='border-t border-dashed border-gray-200 my-2'></div>

                                                    <div className='flex justify-between items-center'>
                                                        <span className='font-bold text-lg'>Total</span>
                                                        <span className='text-xl font-bold text-emerald-600'>$483</span>
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
                            <div className='w-full h-[300px] flex flex-col justify-center items-center gap-4 bg-white rounded-xl shadow-sm'>
                                <h2 className='text-2xl font-bold text-slate-600'>Your Cart is Empty</h2>
                                <Link className='px-6 py-2 bg-emerald-500 text-white rounded shadow-md hover:bg-emerald-600 transition-all' to='/shops'>Shop Now</Link>
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