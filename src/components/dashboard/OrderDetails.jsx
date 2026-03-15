/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { get_order_details } from '../../store/reducers/orderReducer';

const OrderDetails = () => {

    const { orderId } = useParams()
    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.auth)
    const { myOrder } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(get_order_details(orderId))
    }, [orderId])
    console.log("Order Data:", myOrder)

    const subtotal = myOrder.products?.reduce((acc, p) => acc + (p.price * p.quantity), 0) || 0;
    const itemDiscount = myOrder.products?.reduce((acc, p) => acc + (Math.floor((p.price * p.discount) / 100) * p.quantity), 0) || 0;
    // const shippingFee = myOrder.price > 500 ? 0 : 40;
    const discountedProductPrice = subtotal - itemDiscount;
    const shippingFee = discountedProductPrice > 500 ? 0 : 40;
    const Total = discountedProductPrice + shippingFee;

    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>

            {/* Header Section  */}
            <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
                <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>

                    <div>
                        <h2 className='text-slate-800 text-lg font-bold flex items-center gap-2'>
                            Order <span className='text-slate-500 font-mono text-base font-normal'>#{myOrder._id}</span>
                        </h2>
                        <div className='flex items-center gap-2 mt-1'>
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <span className='text-slate-500 text-sm font-medium'>
                                Placed on {myOrder.date}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-start md:items-end w-full md:w-auto pl-16 md:pl-0'>
                    <div className='flex items-baseline gap-1'>
                        <span className='text-sm text-slate-500 font-semibold mr-2'>Total Amount :</span>
                        <h2 className='text-lg font-bold text-emerald-600 font-sans'>₹{myOrder.price?.toLocaleString('en-IN')} </h2>
                    </div>
                    <span className='text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full font-semibold mt-1.5 inline-block'>
                        Includes Shipping
                    </span>
                </div>
            </div>

            {/* Shipping & Status  */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full'>
                    <div className='flex items-center gap-3 mb-4'>
                        <span className='bg-blue-50 text-blue-600 p-2 rounded-lg'>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </span>
                        <h2 className='text-slate-800 font-bold text-lg'>Delivery Information</h2>
                    </div>

                    <div className='space-y-3 pl-1'>
                        <div className='pt-2'>
                            <p className='text-xs text-slate-400 uppercase font-bold tracking-wider mb-1'>Delivering To </p>
                            <p className='text-slate-700 font-semibold text-base'>{myOrder.shippingInfo?.name}</p>
                        </div>
                        <div className='pt-2'>
                            <p className='text-xs text-slate-400 uppercase font-bold tracking-wider mb-1'>Address</p>
                            <div className='flex items-start gap-2'>
                                <span className='bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide mt-0.5'>Home</span>
                                <span className='text-slate-800 text-sm font-medium'>
                                    {myOrder.shippingInfo?.address},{myOrder.shippingInfo?.area}, {myOrder.shippingInfo?.city}, {myOrder.shippingInfo?.province}, {myOrder.shippingInfo?.post}
                                </span>
                            </div>
                        </div>
                        <div className='pt-2'>
                            <p className='text-xs text-slate-400 uppercase font-bold tracking-wider mb-1'>Contact</p>
                            <p className='text-slate-600 text-sm font-medium'>
                                Email : <span className='text-slate-800'>{userInfo.email}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full'>
                    <div className='flex items-center gap-3 mb-6'>
                        <span className='bg-emerald-50 text-emerald-600 p-2 rounded-lg'>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        </span>
                        <h2 className='text-slate-800 font-bold text-lg'>Order Status</h2>
                    </div>

                    <div className='space-y-6'>
                        <div className='flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100'>
                            <span className='text-slate-600 font-medium'>Payment Status</span>
                            <span className={`py-1.5 px-4 text-xs font-bold uppercase tracking-wide rounded-full border ${myOrder.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                {myOrder.payment_status}
                            </span>
                        </div>
                        <div className='flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100'>
                            <span className='text-slate-600 font-medium'>Delivery Status</span>
                            <span className={`py-1.5 px-4 text-xs font-bold uppercase tracking-wide rounded-full border ${myOrder.delivery_status === 'paid' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                {myOrder.delivery_status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product List */}
            <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6'>
                <div className='p-6 border-b border-slate-200'>
                    <h2 className='text-slate-800 font-bold text-lg'>Order Products</h2>
                </div>
                <div className='divide-y divide-slate-100'>
                    {myOrder.products?.map((p, i) => (
                        <div key={i} className='p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors'>
                            <div className='flex items-start gap-4 flex-1'>
                                <div className='shrink-0 w-20 h-20 bg-slate-100 rounded-xl overflow-hidden border border-slate-200'>
                                    <img className='w-full h-full object-cover' src={p.images[0]} alt="" />
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <Link className='text-slate-800 font-medium text-md hover:text-blue-600 transition-colors line-clamp-1'>
                                        {p.name}
                                    </Link>
                                    <div className='flex items-center gap-4 text-sm'>
                                        <span className='text-slate-600 font-medium text-sm'>Brand : <span className='text-emerald-600 font-medium'>{p.brand}</span></span>
                                        <span className='w-1 h-1 bg-slate-300 rounded-full'></span>
                                        <span className='text-slate-600 font-medium text-sm'>Qty : <span className='text-slate-700 font-medium'>{p.quantity}</span></span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col items-end pl-4 min-w-[120px]'>
                                <h2 className='text-lg font-bold text-emerald-600'>
                                    ₹{(p.price - Math.floor((p.price * p.discount) / 100)).toLocaleString('en-IN')}
                                </h2>
                                <div className='flex items-center gap-2 mt-1'>
                                    <p className='text-slate-400 font-medium text-sm line-through'>₹{p.price?.toLocaleString('en-IN')}</p>
                                    <span className='text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full'>
                                        -{p.discount}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary */}
            <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-8'>
                <h2 className='text-slate-800 font-bold text-xl mb-6'>Order Summary</h2>
                <div className='space-y-4'>
                    <div className='flex justify-between items-center text-slate-600 font-medium'>
                        <span>Total ({myOrder.products?.length}) Items</span>
                        <span className='text-slate-800'>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    <div className='flex justify-between items-center text-slate-600 font-medium'>
                        <span>Item Discount</span>
                        <span className='text-slate-800'>- ₹{itemDiscount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className='flex justify-between items-center text-slate-600 font-medium'>
                        <span>Sub Total</span>
                        <span className='text-slate-800'>₹{discountedProductPrice.toLocaleString('en-IN')}</span>
                    </div>

                    <div className='flex justify-between items-center text-slate-600 font-medium'>
                        <span>Shipping Fee</span>
                        <span className='font-bold'>
                            {shippingFee === 0 ? (
                                <div>
                                    <span className='line-through pr-1 text-sm font-bold text-slate-500'>₹40 </span>
                                    <span className='text-emerald-600'>Free</span>
                                </div>
                            ) : (
                                <span className='text-slate-800'>₹{shippingFee}</span>
                            )}
                        </span>
                    </div>

                    <div className='flex justify-between items-center text-slate-600 font-medium'>
                        <span>Total Payment</span>
                        <span className='text-slate-800'>₹{Total.toLocaleString('en-IN')}</span>
                    </div>

                    <div className='border-t border-slate-100 pt-6 mt-2 flex justify-between items-center'>
                        <div className='flex flex-col'>
                            <span className='text-slate-800 font-bold text-lg'>Grand Total</span>
                            <span className='text-sm pt-2 font-medium text-slate-600'>Inclusive of all taxes</span>
                        </div>
                        <div className='text-right'>
                            <span className='text-2xl font-bold text-emerald-600 font-sans tracking-tight'>
                                ₹{Total.toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OrderDetails;