import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

const Footer = () => {
    return (
        <footer className='bg-[#F3F6FA] border-t border-gray-200 mt-10'>
            
            <div className='w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12'>
 
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8'>

                    {/* 1. LEFT SIDE */}
                    <div className='flex flex-col gap-5 items-center lg:items-start text-center lg:text-left'>
                        <div className='w-40 h-[60px]'>
                            <img className='w-full h-full object-contain' src="/images/logo.png" alt="logo" />
                        </div>
                        <ul className='flex flex-col gap-3 text-slate-600 text-sm font-medium'>
                            <li className='flex flex-col lg:flex-row items-center lg:items-start gap-2'>
                                <span className='w-8 h-8 rounded-full bg-white border border-gray-200 flex justify-center items-center text-[#059473] shrink-0 shadow-sm'>
                                    <GoLocation size={16} />
                                </span>
                                <span className='mt-1'>2504 Ivins Avenue, Egg Harbor, NJ</span>
                            </li>
                            <li className='flex flex-col lg:flex-row items-center lg:items-start gap-2'>
                                <span className='w-8 h-8 rounded-full bg-white border border-gray-200 flex justify-center items-center text-[#059473] shrink-0 shadow-sm'>
                                    <AiOutlinePhone size={16} />
                                </span>
                                <span>+91 43434 34344</span>
                            </li>
                            <li className='flex flex-col lg:flex-row items-center lg:items-start gap-2'>
                                <span className='w-8 h-8 rounded-full bg-white border border-gray-200 flex justify-center items-center text-[#059473] shrink-0 shadow-sm'>
                                    <AiOutlineMail size={16} />
                                </span>
                                <span>support@easylearingbd.com</span>
                            </li>
                        </ul> 
                    </div>

                    {/* 2. MIDDLE SECTION */}
                    <div className='flex justify-center lg:justify-start items-start w-full'> 
                        <div className='flex gap-10 md:gap-20 lg:gap-24 text-center lg:text-left'>
                            <div className='flex flex-col items-center lg:items-start'>
                                <h2 className='text-lg font-bold text-gray-800 tracking-tight drop-shadow-sm mb-4'>Useful Links</h2>
                                <ul className='flex flex-col gap-2 text-slate-600 text-sm font-medium'>
                                    <li><Link className='hover:text-[#059473] transition-colors duration-300' to="#">About Us</Link></li>
                                    <li><Link className='hover:text-[#059473] transition-colors duration-300' to="#">About Our Shop</Link></li>
                                    <li><Link className='hover:text-[#059473] transition-colors duration-300' to="#">Live Chat Support</Link></li>
                                    <li><Link className='hover:text-[#059473] transition-colors duration-300' to="#">Return Policy</Link></li>
                                    <li><Link className='hover:text-[#059473] transition-colors duration-300' to="#">Blogs</Link></li>
                                </ul>
                            </div>
                            <div className='flex flex-col items-center lg:items-start'>
                                <h2 className='text-lg font-bold text-gray-800 tracking-tight drop-shadow-sm mb-4'>Quick Help</h2>
                                <ul className='flex flex-col gap-2 text-slate-600 text-sm font-medium'>
                                    <li><Link className='hover:text-[#059473] transition-colors duration-300' to="#">FAQ</Link></li>
                                    <li><Link className='hover:text-[#059473] transition-colors duration-300' to="#">Cancellation Policy</Link></li>
                                    <li><Link className='hover:text-[#059473] transition-colors duration-300' to="#">Contact Us</Link></li>
                                    <li><Link className='hover:text-[#059473] transition-colors duration-300' to="#">Customer Stories</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div> 

                    {/* 3. RIGHT SIDE ( Join Our Shop ) */}
                    <div className='md:col-span-2 lg:col-span-1 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left lg:pl-10'>
                    
                        <div className='w-full max-w-[350px] md:max-w-full lg:max-w-full'>
                            <h2 className='text-lg font-bold text-gray-800 tracking-tight drop-shadow-sm mb-4'>Join Our Shop</h2>
                            <p className='text-slate-600 text-sm mb-4'>Get Email Updates About our Latest Product and Specials Offers.</p>
                            
                            <div className='h-[45px] w-full bg-white border border-gray-200 rounded-full relative flex shadow-sm focus-within:border-[#059473] transition-all overflow-hidden'> 
                                <input 
                                    className='h-full bg-transparent w-full px-4 outline-none text-sm text-slate-600 placeholder-slate-400' 
                                    type="email" 
                                    placeholder='Your email address' 
                                />
                                <button className='h-full absolute right-0 top-0 bg-[#059473] text-white uppercase px-4 font-bold text-xs tracking-wider rounded-r-full hover:bg-[#047a5e] transition-colors'>
                                    Subscribe
                                </button> 
                            </div> 
                        </div>

                        <div className='mt-2'>
                            <span className='text-sm font-bold text-slate-700 block mb-3'>Follow us on :-</span>
                            <ul className='flex justify-center lg:justify-start items-center gap-3'>
                                <li>
                                    <a className='w-9 h-9 flex justify-center items-center bg-white rounded-full text-slate-600 border border-gray-200 shadow-sm hover:bg-[#059473] hover:text-white hover:border-[#059473] transition-all duration-300 hover:-translate-y-1' href="#">
                                        <FaFacebookF size={15} /> 
                                    </a>
                                </li>
                                <li>
                                    <a className='w-9 h-9 flex justify-center items-center bg-white rounded-full text-slate-600 border border-gray-200 shadow-sm hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all duration-300 hover:-translate-y-1' href="#">
                                        <FaTwitter size={15} /> 
                                    </a>
                                </li>
                                <li>
                                    <a className='w-9 h-9 flex justify-center items-center bg-white rounded-full text-slate-600 border border-gray-200 shadow-sm hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all duration-300 hover:-translate-y-1' href="#">
                                        <FaLinkedin size={15} /> 
                                    </a>
                                </li>
                                <li>
                                    <a className='w-9 h-9 flex justify-center items-center bg-white rounded-full text-slate-600 border border-gray-200 shadow-sm hover:bg-[#333] hover:text-white hover:border-[#333] transition-all duration-300 hover:-translate-y-1' href="#">
                                        <FaGithub size={15} /> 
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> 

                </div>
            </div>

            <div className='w-full mx-auto py-4 text-center border-t border-gray-200 bg-white px-4'>
                <span className='text-slate-600 text-sm'>Copyright © 2025 <span className='font-bold text-[#059473]'>EasyShop</span>. All Rights Reserved.</span>
            </div>
            
        </footer>
    );
};

export default Footer;