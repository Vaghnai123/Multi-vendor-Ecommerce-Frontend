import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaList } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { customer_logout, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [filterShow, setFilterShow] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch(customer_logout()).unwrap()
            .then((data) => {
                toast.success(data.message)
                dispatch(messageClear())
                navigate('/')
            })
    }

    return (
        <div>
            <Header />
            <div className='bg-gray-100 pb-6 font-sans'> 
                
                <div className='w-[90%] mx-auto pt-5 lg:hidden block'>
                    <div>
                        <button 
                            onClick={() => setFilterShow(!filterShow)} 
                            className='text-center py-2 px-4 bg-indigo-600 text-white rounded-md shadow-lg hover:shadow-indigo-500/50 transition-all duration-200 flex items-center justify-center gap-2'>
                            <FaList /> 
                            <span className='text-sm font-medium'>Menu</span>
                        </button>
                    </div>
                </div>

                <div className='h-full mx-auto py-8 w-full md:px-8'>
                    <div className='flex gap-6 relative'>
                        
                        {/* Overlay for Mobile/Tablet */}
                        <div 
                            onClick={() => setFilterShow(false)}
                            className={`fixed inset-0 bg-black/50 z-[999] lg:hidden transition-all duration-300 ${filterShow ? 'visible opacity-100' : 'invisible opacity-0'}`}
                        ></div>

                        {/* Sidebar Section */}
                        <div className={`
                            /* Mobile/Tablet View (Drawer) */
                            fixed top-0 left-0 z-[999] w-[270px] h-screen bg-white shadow-xl transition-all duration-300 ease-in-out
                            ${filterShow ? 'translate-x-0' : '-translate-x-full'}
                            
                            /* Laptop/Desktop View (Fixed/Sticky) */
                            /* CHANGE: 'md:' classes ko 'lg:' kiya taaki Tablet par ye fixed na ho */
                            lg:sticky lg:top-24 lg:h-fit lg:translate-x-0 lg:shadow-sm lg:border lg:border-gray-200 lg:z-0 lg:block lg:rounded-md
                        `}>
                            <ul className='py-6 px-4 flex flex-col gap-2 text-slate-600'>
                                <li>
                                    <Link to='/dashboard' onClick={() => setFilterShow(false)} className='flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200'>
                                        <span className='text-xl'><IoIosHome /></span>
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/my-orders' onClick={() => setFilterShow(false)} className='flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200'>
                                        <span className='text-xl'><FaBorderAll /></span>
                                        <span>My Orders</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/my-wishlist' onClick={() => setFilterShow(false)} className='flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200'>
                                        <span className='text-xl'><FaHeart /></span>
                                        <span>Wishlist</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/chat' onClick={() => setFilterShow(false)} className='flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200'>
                                        <span className='text-xl'><IoChatbubbleEllipsesSharp /></span>
                                        <span>Chat</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/change-password' onClick={() => setFilterShow(false)} className='flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200'>
                                        <span className='text-xl'><RiLockPasswordLine /></span>
                                        <span>Change Password</span>
                                    </Link>
                                </li>
                                <li onClick={logout}>
                                    <Link to='/dashboard' onClick={() => setFilterShow(false)} className='flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-red-50 hover:text-red-600 transition-all duration-200'>
                                        <span className='text-xl'><IoMdLogOut /></span>
                                        <span>Logout</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className='w-full lg:w-[calc(100%-290px)]'>
                            <div className='mx-4 lg:mx-0'>
                                <Outlet/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;