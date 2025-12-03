import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF} from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='bg-[#f3f6fa]'>
            <div className='w-[85%] flex flex-wrap mx-auto py-16 md-lg:pb-10 sm:pb-6 lg:gap-x-12'>

                {/* 1. Easy Shop Section */}
                <div className='w-full lg:w-3/12 sm:w-full mb-8 lg:mb-0'>
                    <div className='flex flex-col gap-4'>
                        {/* Logo */}
                        <img className='w-[190px] h-[70px]' src="/images/logo.png" alt="logo" />
                        
                        {/* Contact Info */}
                        <ul className='flex flex-col gap-2 font-bold text-slate-700 text-sm'>
                            <li>Address : 2504 Ivins Avenue, Egg Harbor Township</li>
                            <li>Phone : 4343434344</li> 
                            <li>Email : support@easylearingbd.com</li> 
                        </ul> 
                    </div> 
                </div>

                {/* 2. Useful Links Section */}
                <div className='w-full lg:w-4/12 sm:w-full mb-8 lg:mb-0'>
                    <div className='flex justify-start'>
                        <div className='w-full'>
                            <h2 className='font-bold text-lg mb-4 text-gray-800'>Useful Links </h2>
                            
                            {/* Two internal columns for links - gap adjusted for smaller screens */}
                            <div className='flex gap-10 md:gap-5'> 
                                {/* First Link Column */}
                                <ul className='w-1/2 flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
                                    <li><Link className='hover:text-[#059473]' to="#">About Us</Link></li>
                                    <li><Link className='hover:text-[#059473]' to="#">About Our Shop</Link></li>
                                    <li><Link className='hover:text-[#059473]' to="#">Live Chat Support</Link></li>
                                    <li><Link className='hover:text-[#059473]' to="#">Return & Refund Policy</Link></li>
                                    <li><Link className='hover:text-[#059473]' to="#">Blogs</Link></li>
                                </ul>

                                {/* Second Link Column */}
                                <ul className='w-1/2 flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
                                <li><Link className='hover:text-[#059473]' to="#">FAQ ( Frequently Asked Question )</Link></li>
                                    <li><Link className='hover:text-[#059473]' to="#">Cancellation Policy</Link></li>
                                    <li><Link className='hover:text-[#059473]' to="#">Contact Us</Link></li>
                                    <li><Link className='hover:text-[#059473]' to="#">Customer Stories</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div> 
                </div>

                {/* 3. Join Our Shop Section */}
                <div className='w-full lg:w-4/12 sm:w-full'>
                    <div className='w-full flex flex-col justify-start gap-3'>
                        <h2 className='font-bold text-lg mb-2 text-gray-800'>Join Our Shop</h2>
                    <span className='text-slate-700 text-sm'>Get Email Updates About our Latest Product and Shop Specials Offers.</span>
                        
                        {/* Email Input and Subscribe Button */}
                        <div className='h-10 w-full bg-white border relative mt-1 flex'> 
                            <input 
                                className='h-full bg-transparent w-full px-3 outline-none text-sm border-r-0' 
                                type="email" 
                                placeholder='Enter Your Email' 
                            />
                            <button className='h-full absolute right-0 top-0 bg-[#059473] text-white uppercase px-4 font-bold text-xs shrink-0'>
                                Subscribe
                            </button> 
                        </div> 
                        
                        {/* Social Icons */}
                        <ul className='flex justify-start items-center gap-3 mt-4'>
                            <li>
                                <a className='w-[35px] h-[35px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full text-slate-600 border transition-colors duration-200' href="#"><FaFacebookF/> </a>
                            </li>
                            <li>
                                <a className='w-[35px] h-[35px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full text-slate-600 border transition-colors duration-200' href="#"><FaTwitter/> </a>
                            </li>
                            <li>
                                <a className='w-[35px] h-[35px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full text-slate-600 border transition-colors duration-200' href="#"><FaLinkedin/> </a>
                            </li>
                            <li>
                                <a className='w-[35px] h-[35px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full text-slate-600 border transition-colors duration-200' href="#"><FaGithub/> </a>
                            </li>
                        </ul>
                    </div> 
                </div> 
            </div>

            {/* Copyright Section */}
            <div className='w-[90%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center text-sm border-t'>
                <span>Copyright @ 2025 All Rights Reserved </span>
            </div>
            
        </footer>
    );
};

export default Footer;