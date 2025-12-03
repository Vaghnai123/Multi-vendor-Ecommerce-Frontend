/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaList, FaLock, FaUser } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io"; 
import { FaUserLock } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {

    const [showSidebar, setShowSidebar] = useState(true);
    const [categoryShow, setCategoryShow] = useState(true);
    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')
    const {pathname} = useLocation()
    const user = true; 
    const wishlist_count = 4;

    const categorys = [
        'Electronics',
        'Fashion',
        'Home & Garden',
        'Sports & Outdoors',
        'Toys & Hobbies',
        'Health & Beauty',
        'Automotive',
        'Books & Media',
        'Groceries',
        'Pet Supplies',
    ]
    
    return (
        <div className='w-full bg-white'>

            {/* 1. Main Header Row - Logo, Navigation, Icons, and Login/User Link */}
            <div className='w-white'>
                <div className='w-[90%] mx-auto'>
                    <div className='h-20 flex justify-between items-center'> 
                        
                        {/* Logo */}
                        <div className='w-auto'> 
                            <Link to='/'>
                                <img src="/images/logo.png" alt="Logo" className="w-[130px] md:w-40 lg:w-[180px] object-contain"/>
                            </Link>
                        </div>
    
                        {/* Navigation and Icons for Mobile/Tablet */}
                        <div className='flex justify-end items-center gap-4'>
                            <div className='relative flex justify-center items-center cursor-pointer w-[30px] h-[30px] rounded-full bg-[#e2e2e2] lg:hidden'>
                                <span className='text-lg text-green-500'><FaHeart /></span>
                                <div className='w-4 h-4 absolute bg-red-500 rounded-full text-white flex justify-center items-center text-[10px] -top-1 -right-1'>
                                    {wishlist_count}
                                </div>
                            </div>

                            {/* Cart Icon for Mobile */}
                            <div className='relative flex justify-center items-center cursor-pointer w-[30px] h-[30px] rounded-full bg-[#e2e2e2] lg:hidden'>
                                <span className='text-lg text-green-500'><FaCartShopping /></span>
                                <div className='w-4 h-4 absolute bg-red-500 rounded-full text-white flex justify-center items-center text-[10px] -top-1 -right-1'>
                                    {wishlist_count}
                                </div>
                            </div>

                            {/* Hamburger Button for smaller screens */}
                            <div className="flex justify-center items-center w-[35px] h-[35px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden hover:bg-slate-50"
                                onClick={() => setShowSidebar(false)}>
                                <span className="text-[20px]"><FaList/></span>
                            </div>
                        </div>


                        {/* Desktop Navigation Links and Icons (lg:flex) */}
                        <div className='hidden lg:flex lg:w-9/12'> 
                            <div className='flex justify-between items-center w-full pl-8'>
                                <ul className='flex justify-start items-start gap-8 text-sm font-bold uppercase'>
                                    <li>
                                        <Link to='/' className={`p-2 block ${pathname === '/' ? 'text-[#059473]' : 'text-slate-600'}`}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to='/shops' className={`p-2 block ${pathname === '/shops' ? 'text-[#059473]' : 'text-slate-600'}`}>Shop</Link>
                                    </li>
                                    <li>
                                        <Link to='/blog' className={`p-2 block ${pathname === '/blog' ? 'text-[#059473]' : 'text-slate-600'}`}>Blog</Link>
                                    </li>
                                    <li>
                                        <Link to='/about' className={`p-2 block ${pathname === '/about' ? 'text-[#059473]' : 'text-slate-600'}`}>About Us</Link>
                                    </li>
                                    <li>
                                        <Link to='/contact' className={`p-2 block ${pathname === '/contact' ? 'text-[#059473]' : 'text-slate-600'}`}>Contact Us</Link>
                                    </li>
                                </ul>

                                <div className='flex justify-center items-center gap-5'>
                                    {/* Wishlist Icon */}
                                    <div className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                        <span className='text-xl text-green-500'><FaHeart /></span>
                                        <div className='w-5 h-5 absolute bg-red-500 rounded-full text-white flex justify-center items-center text-xs -top-[3px] -right-[5px]'>
                                            {wishlist_count}
                                        </div>
                                    </div>

                                    {/* Cart Icon */}
                                    <div className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                        <span className='text-xl text-green-500'><FaCartShopping /></span>
                                        <div className='w-5 h-5 absolute bg-red-500 rounded-full text-white flex justify-center items-center text-xs -top-[3px] -right-[5px]'>
                                            {wishlist_count}
                                        </div>
                                    </div>

                                    {/* Login/User Dashboard Link  */}
                                    <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative'>
                                        {
                                            !user ? (
                                                <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black' to='/dashboard'>
                                                    <span className="text-2xl"><FaUserCircle /></span>
                                                    <span className="text-base">Jil</span>
                                                </Link>
                                            ) : (
                                                <Link to='/login' className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black'>
                                                    <span className="text-2xl"><FaUserLock /></span>
                                                    <span className="text-base">Login</span>
                                                </Link>
                                            )
                                        }
                                    </div>
                                </div>
                            </div> 
                        </div>

                    </div>
                </div>
            </div>

            {/* 2. Sidebar Section for Mobile/Tablet */}
            <div className='lg:hidden'>
                <div onClick={()=> setShowSidebar(true)} className={`fixed duration-200 transition-all ${showSidebar ? 'invisible' : 'visible'} w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20 `}>
                </div> 
                {/* Sidebar Menu */}
                <div className={`w-[300px] z-9999 transition-all duration-200 fixed ${showSidebar ? '-left-[300px]' : 'left-0 top-0'} overflow-y-auto bg-white h-screen py-6 px-8 `}>
                    <div className='flex justify-start flex-col gap-6'>
                        <Link to='/'>
                            <img src="/images/logo.png" alt="Logo" className="w-[130px] object-contain"/>
                        </Link>

                        {/* Login/User Link in Sidebar */}
                        <div className='flex justify-start items-center gap-10'> 
                            {
                                user ? (
                                    <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black' to='/dashboard'>
                                        <span><FaUser/></span>
                                        <span>Jil</span>
                                    </Link>
                                ) : (
                                    <Link className='flex cursor-pointer justify-center items-center gap-3 text-sm text-black' to='/login'>
                                        <span><FaLock /></span>
                                        <span>Login</span>
                                    </Link>
                                )
                            } 
                        </div>

                        <ul className='flex flex-col justify-start items-start text-sm font-bold uppercase'>
                            <li>
                                <Link to='/' onClick={()=> setShowSidebar(true)} className={`pb-2 block ${pathname === '/' ? 'text-[#059473]' : 'text-slate-600'}`}>Home</Link>
                            </li>
                            <li>
                                <Link to='/shops' onClick={()=> setShowSidebar(true)} className={`py-2 block ${pathname === '/shops' ? 'text-[#059473]' : 'text-slate-600'}`}>Shop</Link>
                            </li>
                            {/* ... other nav links ... */}
                            <li>
                                <Link to='/blog' onClick={()=> setShowSidebar(true)} className={`py-2 block ${pathname === '/blog' ? 'text-[#059473]' : 'text-slate-600'}`}>Blog</Link>
                            </li>
                            <li>
                                <Link to='/about' onClick={()=> setShowSidebar(true)} className={`py-2 block ${pathname === '/about' ? 'text-[#059473]' : 'text-slate-600'}`}>About Us</Link>
                            </li>
                            <li>
                                <Link to='/contact' onClick={()=> setShowSidebar(true)} className={`py-2 block ${pathname === '/contact' ? 'text-[#059473]' : 'text-slate-600'}`}>Contact Us</Link>
                            </li>
                        </ul>

                        <div className='flex justify-start items-center gap-4 text-black'>
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaTwitter /></a>
                            <a href="#"><FaLinkedin /></a>
                            <a href="#"><FaGithub /></a> 
                        </div>

                        <ul className='flex flex-col justify-start items-start gap-3 text-[#1c1c1c]'>
                            <li className='flex justify-start items-center gap-2 text-sm'>
                                <span><MdEmail /></span>
                                <span>support@gmail.com</span>
                            </li>
                        </ul> 

                        <div className='w-full flex items-center gap-3'>
                            <div className='w-8 h-8 rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                                <span className='text-lg text-slate-700'><FaPhoneAlt /></span>
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='text-sm font-semibold text-slate-900'>+( 123 ) 3243 343</h2>
                                <span className='text-xs pt-1 text-slate-800'>Support 24/7</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* 3. Category and Search Section */}
            <div className='w-[90%] mx-auto pt-3 pb-4'>
                <div className='flex w-full flex-wrap lg:gap-0 gap-4'> 
                    
                    {/* Category Dropdown Container  */}
                    <div className='lg:w-3/12 w-full'> 
                        <div className='bg-white relative'>
                            <div onClick={() => setCategoryShow(!categoryShow) } className='h-[50px] bg-[#059473] text-white flex justify-between px-4 sm:px-6 items-center gap-3 font-bold text-md cursor-pointer'>
                                <div className='flex justify-center items-center gap-3'>
                                    <span><FaList/></span>
                                    <span>All Category </span>
                                </div>
                                <span className='pt-1'><IoIosArrowDown /></span>
                            </div>

                            {/* Category List */}
                            <div className={`${categoryShow ? 'h-0' : 'h-[400px]'} overflow-hidden transition-all md-lg:relative duration-500 absolute z-10 bg-[#dbf3ed] w-full `}>
                                <ul className='py-2 text-slate-600 font-medium'>
                                    {
                                        categorys.map((c,i) => {
                                        return (
                                            <li key={i} className='flex justify-start items-center gap-2 px-6 py-1.5'>
                                            <Link className='text-sm block'>{c}</Link>
                                            </li>
                                                )
                                            })
                                    }
                                </ul>
                            </div>

                        </div>
                    </div>

                    {/* Search Bar and Phone Support Container*/}
                    <div className='lg:w-9/12 lg:pl-8 w-full pl-0'> 
                        <div className='flex w-full justify-between items-center'>
                            
                            {/* Search Bar */}
                            <div className='w-full'> 
                                <div className='flex border h-[50px] items-center relative gap-2'>
                                    
                                    <div className='relative after:absolute after:h-[25px] after:w-px after:bg-[#afafaf] after:-right-[15px] block'> 
                                        <select onChange={(e) => setCategory(e.target.value)} className='w-[100px] sm:w-[120px] lg:w-[150px] text-slate-800 bg-transparent px-2 h-full outline-0 border-none text-sm' name="" id="">
                                            <option value="">Search Category</option>
                                            {
                                                categorys.map((c, i) => <option key={i} value={c}> {c} </option> )
                                            }
                                        </select>
                                    </div>
                                    
                                    <input className='w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full' onChange={(e)=> setSearchValue(e.target.value)} type="text" name='' id='' placeholder='Search here...' />
                        
                                    <button className='bg-[#059473] right-0 absolute px-3 sm:px-6 h-full font-semibold uppercase text-white text-sm'>Search</button>
                                </div>
                            </div>

                            {/* Phone Support */}
                            <div className='lg:w-4/12 hidden lg:block pl-1'> 
                                <div className='w-full flex justify-end gap-3 items-center'>
                                    <div className='w-12 h-12 rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                                        <span className='text-lg text-slate-700'><FaPhoneAlt /></span>
                                    </div>
                                    <div className='flex justify-end flex-col gap-1'>
                                        <h2 className='text-md font-medium text-slate-700'>+1343-43233455</h2>
                                        <span className='text-sm text-slate-800'>Support 24/7</span> 
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;