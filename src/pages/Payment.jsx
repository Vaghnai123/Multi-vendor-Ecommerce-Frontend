import React, { useState } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import Stripe from '../components/Stripe';
import { FaCreditCard, FaMoneyBillAlt, FaLock, FaShieldAlt, FaChevronRight } from "react-icons/fa";
import axios from 'axios';

const Payment = () => {

    const { state: { price, items, orderId } } = useLocation();
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const navigate = useNavigate();

    const codOrder = async () => {
        try {
            await axios.post('http://localhost:5000/api/order/confirm-cod', { orderId });
            navigate('/dashboard/my-orders'); // Success hone par redirect
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            
            <section className='py-12 grow'>
                <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>

                    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shadow-sm ring-1 ring-green-100">
                                    <FaCreditCard className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 ">Checkout</h1>
                                    <p className="pt-2 text-sm text-gray-500 font-medium">Secure Payment Gateway</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium w-full md:w-auto justify-start md:justify-end opacity-80">
                                <span className="text-gray-400">Cart</span>
                                <FaChevronRight className="text-gray-300 text-xs" />
                                <span className="text-gray-400">Shipping</span>
                                <FaChevronRight className="text-gray-300 text-xs" />
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Payment</span>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

                        {/* LEFT SECTION : Payment Methods */}
                        <div className='lg:col-span-2 space-y-6'>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h2 className='text-xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                                    <FaLock className="text-emerald-600" size={18} /> 
                                    Choose Payment Mode
                                </h2>

                                <div className='space-y-4'>
                                    {/* STRIPE OPTION */}
                                    <div 
                                        onClick={() => setPaymentMethod('stripe')} 
                                        className={`group relative cursor-pointer border-2 rounded-xl p-5 transition-all duration-300 hover:shadow-md 
                                        ${paymentMethod === 'stripe' ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-200 hover:border-emerald-200'}`}>

                                        <div className="flex items-center gap-5">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'stripe' ? 'border-emerald-500' : 'border-gray-300'}`}>
                                                {paymentMethod === 'stripe' && <div className='w-2.5 h-2.5 bg-emerald-500 rounded-full'></div>}
                                            </div>
                                            
                                            <div className="p-2 bg-white rounded-lg shadow-sm w-16 flex items-center justify-center">
                                                <img src="/images/payment/stripe.png" alt="Stripe" className="w-full object-contain" />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-800">Pay with Stripe</h3>
                                                <p className="hidden sm:block pt-1 text-sm font-medium text-gray-500">Credit/Debit Card, Secure Online Transfer</p>
                                            </div>
                                        </div>

                                        {paymentMethod === 'stripe' && (
                                            <div className="mt-6 pl-0 sm:pl-10">
                                                <Stripe orderId={orderId} price={price}  />
                                            </div>
                                        )}
                                    </div>

                                    {/* COD OPTION */}
                                    <div 
                                        onClick={() => setPaymentMethod('cod')} 
                                        className={`group relative cursor-pointer border-2 rounded-xl p-5 transition-all duration-300 hover:shadow-md 
                                        ${paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-200 hover:border-emerald-200'}`}>

                                        <div className="flex items-center gap-5">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'border-emerald-500' : 'border-gray-300'}`}>
                                                {paymentMethod === 'cod' && <div className='w-2.5 h-2.5 bg-emerald-500 rounded-full'></div>}
                                            </div>

                                            {/* Original Image Logic */}
                                            <div className="p-2 bg-white rounded-lg shadow-sm w-16 flex items-center justify-center h-10 overflow-hidden">
                                                <img src="/images/payment/cod.jpg" alt="COD" className="w-full h-full object-cover" />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-800">Cash on Delivery</h3>
                                                <p className="hidden sm:block pt-1 text-sm font-medium text-gray-500">Pay in cash when your order arrives</p>
                                            </div>
                                        </div>

                                        {paymentMethod === 'cod' && (
                                            <div className='mt-6 pl-0 sm:pl-10'>
                                                <button onClick={codOrder} className='w-full py-3 px-6 rounded-lg font-bold text-white shadow-emerald-500/30 shadow-lg transform transition-all duration-200 bg-[#059473] hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98]'>
                                                    Confirm Order
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-center font-medium gap-2 text-gray-500 text-sm mt-8">
                                    <FaShieldAlt className="text-emerald-600"/>
                                    <span>Payments are SSL encrypted and secured.</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SECTION : Order Summary */}
                        <div className='lg:col-span-1'>
                            <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 sticky top-6'>
                                <h2 className='text-lg font-bold text-gray-800 mb-4 pb-4 border-b border-gray-100'>Order Summary</h2>

                                <div className='flex flex-col gap-4 text-sm'>
                                    <div className='flex justify-between items-center text-sm font-medium text-gray-600'>
                                        <span>Total Items</span>
                                        <span className='font-medium text-md text-gray-900'>{items} Items</span>
                                    </div>
                                    <div className='flex justify-between items-center text-sm font-medium text-gray-600'>
                                        <span>Subtotal</span>
                                        <span className='font-medium text-md text-gray-900'>₹{price.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className='flex justify-between text-sm font-medium items-center text-gray-600'>
                                        <span>Shipping</span>
                                        <span className='font-medium text-md text-emerald-600'>Free</span>
                                    </div>

                                    {/* Dotted Divider */}
                                    <div className='border-t-2 border-dashed border-gray-200 my-2'></div>

                                    <div className='flex justify-between items-center mb-2'>
                                        <span className='font-bold text-lg text-gray-800'>Total Amount</span>
                                        <span className='font-bold text-lg text-emerald-600'>₹{price.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                                
                                <div className="mt-6 p-4 bg-gray-50 rounded-xl flex items-center justify-between group hover:bg-emerald-50/50 transition-colors duration-300">
                                    <div className='flex items-center gap-2'>
                                        {paymentMethod === 'stripe' ? <FaCreditCard className='text-emerald-500'/> : <FaMoneyBillAlt className='text-emerald-500'/>}
                                        <span className="text-gray-600 text-sm font-medium capitalize">Method</span>
                                    </div>
                                    <span className="font-bold text-gray-800 uppercase text-sm tracking-wider">{paymentMethod}</span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Payment;