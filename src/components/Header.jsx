import React, { useState, useEffect } from 'react';
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaList, FaLock, FaUser, FaUserCircle, FaUserLock, FaPhoneAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaTwitter, FaHeart, FaCartShopping } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { customer_logout, messageClear } from '../store/reducers/authReducer';
import { get_card_products, get_wishlist_products } from '../store/reducers/cardReducer';

const Header = () => {

    const [showSidebar, setShowSidebar] = useState(true);
    const [categoryShow, setCategoryShow] = useState(true);
    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { pathname } = useLocation()

    const navigate = useNavigate()
    const { categorys } = useSelector(state => state.home)
    const { userInfo, successMessage } = useSelector(state => state.auth)
     const {card_product_count, wishlist_count} = useSelector(state => state.card) 

    const search = () => {
        navigate(`/products/search?category=${category}&&value=${searchValue}`)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
            dispatch(get_card_products(userInfo.id))
            dispatch(get_wishlist_products(userInfo.id));
        }
    }, [userInfo, dispatch])

    const logout = () => {
        dispatch(customer_logout()).unwrap()
            .then((data) => {
                toast.success(data.message)
                dispatch(messageClear())
                navigate('/')
            })
    }

    useEffect(() => {
        if (successMessage) {
            if (successMessage == 'Logout Success') {
                toast.success(successMessage)
                dispatch(messageClear())
            }
        }
    }, [successMessage, dispatch])

     const redirect_card_page = () => {
        if (userInfo) {
            navigate('/card')
        } else {
            navigate('/login')
        }
    }

    const redirect_whishlist_page = () => {
        if (userInfo) {
            navigate('/dashboard/my-wishlist')
        } else {
            navigate('/login')
        }
    }

    return (
        <div className='w-full bg-white shadow-sm font-sans relative z-40'>
            {/* 1. Main Header Row */}
            <div className='w-full bg-white border-b border-slate-50 '>
                <div className='w-[90%] mx-auto'>
                    <div className='h-20 flex justify-between items-center'>

                        {/* Logo */}
                        <div className='w-auto pb-1'>
                            <Link to='/'>
                                <img src="/images/logo.png" alt="Logo" className="w-[120px] md:w-[150px] object-contain hover:scale-105 transition-transform duration-300" />
                            </Link>
                        </div>

                        {/* Mobile Icons & Hamburger */}
                        <div className='flex justify-end items-center gap-4 lg:hidden'>
                            <div onClick={redirect_whishlist_page} className='relative flex justify-center items-center cursor-pointer w-10 h-10 rounded-full bg-slate-50 hover:bg-green-50 transition-colors'>
                                <span className='text-xl text-slate-600'><FaHeart /></span>
                                {wishlist_count !== 0 && <div className='w-4 h-4 absolute bg-red-500 rounded-full text-white flex justify-center items-center text-[10px] top-0 right-0 border-2 border-white'>{wishlist_count}</div>}
                            </div>
                            <div onClick={redirect_card_page} className='relative flex justify-center items-center cursor-pointer w-10 h-10 rounded-full bg-slate-50 hover:bg-green-50 transition-colors'>
                                <span className='text-xl text-slate-600'><FaCartShopping /></span>
                                { card_product_count !== 0 && <div className='w-4 h-4 absolute bg-red-500 rounded-full text-white flex justify-center items-center text-[10px] top-0 right-0 border-2 border-white'>{card_product_count}</div>}
                            </div>
                            <div className="flex justify-center items-center w-10 h-10 text-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 transition-all"
                                onClick={() => setShowSidebar(false)}>
                                <span className="text-2xl"><FaList /></span>
                            </div>
                        </div>

                        {/* Desktop Navigation & User Section */}
                        <div className='hidden lg:flex lg:w-9/12 justify-end items-center'>
                            <div className='flex justify-between items-center w-full pl-10'>
                                
                                {/* Modern Navigation Links */}
                                <ul className='flex justify-start items-center gap-10 font-medium text-[15px]'>
                                    {['/', '/shops', '/blog', '/About', '/contact'].map((path, idx) => {
                                        const labels = ['Home', 'Shop', 'Blog', 'About Us', 'Contact'];
                                        return (
                                            <li key={idx}>
                                            <Link to={path} className={`relative py-2 block transition-colors duration-300 group ${pathname === path ? 'text-[#059473] font-bold' : 'text-slate-600 hover:text-[#059473]'}`}>
                                                    {labels[idx]}
                                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#059473] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left ${pathname === path ? 'scale-x-100' : ''}`}></span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>

                                <div className='flex justify-center items-center gap-6'>
                                    {/* Wishlist */}
                                    <div className='relative group cursor-pointer'>
                                        <div onClick={redirect_whishlist_page} className='flex justify-center items-center w-[42px] h-[42px] rounded-full bg-slate-50 group-hover:bg-[#059473]/10 transition-all duration-300'>
                                            <span className='text-xl text-slate-600 group-hover:text-[#059473] transition-colors'><FaHeart /></span>
                                        </div>
                                        {wishlist_count !== 0 && <div className='w-5 h-5 absolute bg-red-500 rounded-full text-white flex justify-center items-center text-xs -top-1 -right-1 shadow-sm border-2 border-white font-bold'>{wishlist_count}</div>}
                                    </div>

                                    {/* Cart  */}
                                    <div className='relative group cursor-pointer'>
                                        <div onClick={redirect_card_page} className='flex justify-center items-center w-[42px] h-[42px] rounded-full bg-slate-50 group-hover:bg-[#059473]/10 transition-all duration-300'>
                                            <span className='text-xl text-slate-600 group-hover:text-[#059473] transition-colors'><FaCartShopping /></span>
                                        </div>
                                        {card_product_count !== 0 && <div className='w-5 h-5 absolute bg-red-500 rounded-full text-white flex justify-center items-center text-xs -top-1 -right-1 shadow-sm border-2 border-white font-bold'>{card_product_count}</div>}
                                    </div>

                                    {/* === USER DROPDOWN SECTION  === */}
                                    <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative z-50'>
                                        {
                                            userInfo ? (
                                                <div
                                                    className='relative'
                                                    onMouseEnter={() => setShowUserMenu(true)}
                                                    onMouseLeave={() => setShowUserMenu(false)}>

                                                    <div className='flex items-center gap-3 cursor-pointer py-2 px-3 rounded-full hover:bg-slate-50 transition-colors'>
                                                        <div className='w-10 h-10 rounded-full bg-linear-to-br from-[#059473] to-[#0abf93] flex justify-center items-center text-white text-lg shadow-md ring-2 ring-white'>
                                                            <span className='uppercase font-bold'>{userInfo.name[0]}</span>
                                                        </div>
                                                        <div className='hidden xl:flex flex-col justify-center items-start overflow-hidden'>
                                                            <span className='text-[15px] font-semibold text-slate-700 font-sans tracking-wide'>{userInfo.name}</span>
                                                        </div>
                                                    </div>

                                                    {/* Dropdown Menu */}
                                                    <div className={`absolute top-[55px] right-0 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 rounded-xl w-[220px] overflow-hidden transition-all duration-300 ease-in-out origin-top-right transform ${showUserMenu ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                                                        <div className='p-4 border-b border-slate-50 bg-[#f8fcfb]'>
                                                            <h4 className='font-bold text-slate-700 truncate text-base'>{userInfo.name}</h4>
                                                        </div>
                                                        <ul className='flex flex-col py-1'>
                                                            <li>
                                                                <Link to='/dashboard' className='flex items-center gap-3 px-5 py-3 text-slate-600 hover:bg-[#f0f9f6] hover:text-[#059473] transition-all font-medium'>
                                                                    <FaUserCircle className="text-lg"/>
                                                                    <span>Dashboard</span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <div onClick={logout} className='flex items-center gap-3 px-5 py-3 text-slate-600 hover:bg-red-50 hover:text-red-500 cursor-pointer transition-all font-medium'>
                                                                    <FaUserLock className="text-lg"/>
                                                                    <span>Logout</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link to='/login' className='flex items-center justify-center bg-[#059473] text-white px-8 py-2.5 rounded-full shadow-lg hover:shadow-[#059473]/40 hover:bg-[#04785d] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5'>
                                                    <div className='flex items-center gap-2'>
                                                        <FaLock className="text-sm" />
                                                        <span className="font-bold tracking-wide text-sm">Login    </span>
                                                    </div>
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

            {/* 2. Sidebar Section (Mobile)*/}
            <div className='lg:hidden'>
                <div onClick={() => setShowSidebar(true)} className={`fixed duration-300 transition-opacity ${showSidebar ? 'invisible opacity-0' : 'visible opacity-100'} w-screen h-screen bg-black/60 backdrop-blur-sm top-0 left-0 z-50`}>
                </div>

                <div className={`w-[300px] z-9999 transition-transform duration-300 ease-out fixed ${showSidebar ? '-translate-x-full' : 'translate-x-0'} left-0 top-0 bg-white h-screen py-6 px-8 shadow-2xl overflow-y-auto`}>
                    <div className='flex justify-start flex-col gap-6'>
                        <Link to='/' className='mb-4'>
                            <img src="/images/logo.png" alt="Logo" className="w-[140px] object-contain" />
                        </Link>

                        {/* Mobile Sidebar User/Login */}
                        <div className='flex justify-start items-center gap-10 border-b pb-4'>
                            {
                                userInfo ? (
                                    <div className='flex flex-col gap-3 w-full'>
                                        <Link onClick={() => setShowSidebar(true)} className='flex cursor-pointer justify-start items-center gap-3 text-base font-medium text-slate-700 hover:text-[#059473]' to='/dashboard'>
                                            <span><FaUser /></span>
                                            <span>{userInfo.name}</span>
                                        </Link>
                                        <button onClick={logout} className='flex cursor-pointer justify-start items-center gap-3 text-base font-medium text-red-500 hover:text-red-600'>
                                            <span><FaUserLock /></span>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <Link onClick={() => setShowSidebar(true)} className='flex cursor-pointer justify-center items-center gap-2 bg-[#059473] text-white w-full py-2 rounded-md font-bold shadow-md' to='/login'>
                                        <span><FaLock /></span>
                                        <span>Login / Register</span>
                                    </Link>
                                )
                            }
                        </div>

                        <ul className='flex flex-col justify-start items-start text-sm font-semibold uppercase tracking-wide gap-1'>
                            <li><Link to='/' onClick={() => setShowSidebar(true)} className={`py-3 block w-full border-b border-slate-100 ${pathname === '/' ? 'text-[#059473]' : 'text-slate-600'}`}>Home</Link></li>
                            <li><Link to='/shops' onClick={() => setShowSidebar(true)} className={`py-3 block w-full border-b border-slate-100 ${pathname === '/shops' ? 'text-[#059473]' : 'text-slate-600'}`}>Shop</Link></li>
                            <li><Link to='/blog' onClick={() => setShowSidebar(true)} className={`py-3 block w-full border-b border-slate-100 ${pathname === '/blog' ? 'text-[#059473]' : 'text-slate-600'}`}>Blog</Link></li>
                            <li><Link to='/About' onClick={() => setShowSidebar(true)} className={`py-3 block w-full border-b border-slate-100 ${pathname === '/About' ? 'text-[#059473]' : 'text-slate-600'}`}>About Us</Link></li>
                            <li><Link to='/contact' onClick={() => setShowSidebar(true)} className={`py-3 block w-full ${pathname === '/contact' ? 'text-[#059473]' : 'text-slate-600'}`}>Contact Us</Link></li>
                        </ul>

                        <div className='flex justify-start items-center gap-4 text-slate-600 mt-4'>
                            <a href="#" className='w-9 h-9 rounded-full bg-slate-100 flex justify-center items-center hover:bg-[#059473] hover:text-white transition-all'><FaFacebookF /></a>
                            <a href="#" className='w-9 h-9 rounded-full bg-slate-100 flex justify-center items-center hover:bg-[#059473] hover:text-white transition-all'><FaTwitter /></a>
                            <a href="#" className='w-9 h-9 rounded-full bg-slate-100 flex justify-center items-center hover:bg-[#059473] hover:text-white transition-all'><FaLinkedin /></a>
                            <a href="#" className='w-9 h-9 rounded-full bg-slate-100 flex justify-center items-center hover:bg-[#059473] hover:text-white transition-all'><FaGithub /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Category and Search Section  */}
            <div className='w-full bg-[#f3f4f6] pb-6 pt-2 lg:bg-transparent lg:pb-0 lg:pt-0'>
                <div className='w-[90%] mx-auto lg:py-5'>
                    <div className='flex w-full flex-wrap lg:gap-0 gap-4 items-center'>

                        {/* Category Dropdown - Modernized */}
                        <div className='lg:w-3/12 w-full'>
                            <div className='relative'>
                                <div onClick={() => setCategoryShow(!categoryShow)} className='h-[50px] bg-[#059473] text-white flex justify-between px-6 items-center gap-3 font-bold text-md cursor-pointer rounded-full shadow-lg hover:bg-[#04785d] transition-colors'>
                                    <div className='flex justify-center items-center gap-3'>
                                        <span><FaList /></span>
                                        <span>All Categories</span>
                                    </div>
                                    <span className={`transition-transform duration-300 ${!categoryShow ? 'rotate-180' : ''}`}><IoIosArrowDown /></span>
                                </div>

                                {/* Floating Category Menu */}
                                <div className={`${categoryShow ? 'h-0 opacity-0 scale-y-95' : 'h-auto opacity-100 scale-y-100'} overflow-hidden transition-all duration-300 origin-top absolute z-60 bg-white w-full top-[110%] rounded-xl shadow-2xl border border-slate-100`}>
                                    <ul className='py-2 text-slate-600 font-medium text-sm'>
                                        {
                                            categorys && categorys.map((c, i) => {
                                                return (
                                                    <li key={i} className='flex justify-start items-center gap-3 px-6 py-2.5 hover:bg-[#f0f9f6] hover:pl-8 transition-all duration-200 cursor-pointer'>
                                                        <img src={c.image} className='w-[30px] h-[30px] rounded-full object-cover border border-slate-200 shadow-sm' alt="" />
                                                        <Link to={`/products?category=${c.name}`} className='text-slate-700 font-medium text-sm block flex-1'>{c.name}</Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Search Bar  */}
                        <div className='lg:w-9/12 lg:pl-10 w-full pl-0'>
                            <div className='flex w-full justify-between items-center flex-wrap lg:flex-nowrap gap-6'>
                                <div className='w-full relative group'>
                                    <div className='flex border-2 border-[#059473]/20 focus-within:border-[#059473] h-[52px] items-center relative gap-2 rounded-full bg-white transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden'>
                                        
                                        {/* Select - Transparent with Divider */}
                                        <div className='relative hidden md:block'>
                                            <select onChange={(e) => setCategory(e.target.value)} className='w-[140px] text-slate-600 bg-transparent px-4 h-full outline-0 border-none text-sm font-medium cursor-pointer appearance-none' name="" id="">
                                                <option value="">Select Category</option>
                                                {
                                                    categorys && categorys.map((c, i) => <option key={i} value={c.name}> {c.name} </option>)
                                                }
                                            </select>
                                            <IoIosArrowDown className="absolute right-2 top-2 text-slate-500 text-xs pointer-events-none"/>
                                        </div>

                                        <input className='w-full relative bg-transparent text-slate-700 outline-0 px-4 h-full text-sm placeholder-slate-400 font-medium' onChange={(e) => setSearchValue(e.target.value)} type="text" name='' id='' placeholder='What are you looking for?' />
                                        
                                        <button onClick={search} className='bg-[#059473] h-full px-8 rounded-r-full font-bold uppercase text-white text-sm hover:bg-[#04785d] transition-colors tracking-wide'>Search</button>
                                    </div>
                                </div>

                                {/* Support Section - More visual hierarchy */}
                                <div className='hidden lg:block w-auto shrink-0'>
                                    <div className='flex justify-end gap-4 items-center group cursor-pointer'>
                                        <div className='w-12 h-12 rounded-full flex bg-[#f0f9f6] justify-center items-center group-hover:bg-[#059473] transition-all duration-300 shadow-sm ring-1 ring-[#059473]/10'>
                                            <span className='text-xl text-[#059473] group-hover:text-white transition-colors'><FaPhoneAlt /></span>
                                        </div>
                                        <div className='flex justify-end flex-col'>
                                            <h2 className='text-slate-800 font-bold text-md group-hover:text-[#059473] transition-colors leading-tight pb-2'>+91 72392 82329</h2>
                                            <span className='text-slate-500 font-medium text-xs tracking-wide'>24/7 Support Center</span>
                                        </div>
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