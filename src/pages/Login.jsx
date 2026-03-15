/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { IoMailOutline, IoLockClosedOutline, IoArrowForward } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { customer_login,messageClear } from '../store/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loader,errorMessage,successMessage,userInfo } = useSelector(state => state.auth)

    const [state, setState] = useState({ 
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
 
    const login = (e) => {
        e.preventDefault()
        dispatch(customer_login(state))
    }

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())  
        } 
        if (userInfo) {
            navigate('/')
        }
    },[successMessage,errorMessage])

    return (
        <div className='flex flex-col min-h-screen bg-slate-50 font-sans'>
        {
                loader && (
                    <div className='fixed inset-0 z-[999] flex justify-center items-center bg-slate-900/50 backdrop-blur-sm transition-all duration-300'>
                        <div className='bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 relative overflow-hidden'>

                            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#059473] to-transparent'></div>
                            
                            <HashLoader color='#059473' size={50} speedMultiplier={1.5} />
                            
                            <p className='text-slate-600 font-semibold text-sm tracking-wider animate-pulse'>
                                Processing...
                            </p>
                        </div>
                    </div>
                )
        }
            <Header/>     
            <div className='grow flex justify-center items-center py-5 px-4'>
                
                <div className='w-full max-w-9xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-slate-100'>
                    
                    {/* --- LEFT SIDE : FORM --- */}
                    <div className='p-10 md:p-16 flex flex-col justify-center'>
                        
                        <div className='mb-8'>
                            <h2 className='text-3xl font-extrabold text-slate-900'>Welcome Back</h2>
                            <p className='text-slate-600 font-medium leading-8 tracking-wide text-sm mt-3'>
                                Please sign in to your account to continue.
                            </p>
                        </div>

                        <form onSubmit={login} className='flex flex-col gap-6'>

                            {/* Email Input */}
                            <div className='relative group'>
                                <div className='absolute top-4 left-5 text-slate-400 group-focus-within:text-[#059473] transition-colors duration-300'>
                                    <IoMailOutline size={22} />
                                </div>
                                <input 
                                    onChange={inputHandle} 
                                    value={state.email} 
                                    className='w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-[#059473] focus:ring-4 focus:ring-[#059473]/10 transition-all duration-300 font-medium text-slate-700 placeholder:text-slate-400' 
                                    type="email" 
                                    name="email" 
                                    placeholder='Email Address' 
                                    required />
                            </div>

                            {/* Password Input */}
                            <div className='relative group'>
                                <div className='absolute top-4 left-5 text-slate-400 group-focus-within:text-[#059473] transition-colors duration-300'>
                                    <IoLockClosedOutline size={22} />
                                </div>
                                <input 
                                    onChange={inputHandle} 
                                    value={state.password} 
                                    className='w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-[#059473] focus:ring-4 focus:ring-[#059473]/10 transition-all duration-300 font-medium text-slate-700 placeholder:text-slate-400' 
                                    type="password" 
                                    name="password" 
                                    placeholder='Password' 
                                    required />
                            </div>

                            {/* Login Button */}
                            <button className='w-full py-4 bg-[#059473] hover:bg-[#047a5e] text-white font-bold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 transform hover:-translate-y-1 flex justify-center items-center gap-2 mt-4'>
                                <span>Login</span>
                                <IoArrowForward size={20} />
                            </button>
                        </form>

                        {/* Social Divider */}
                        <div className='mt-8'>
                            <div className='flex items-center mb-6'>
                                <div className='h-px bg-slate-200 grow'></div>
                                <span className='px-4 text-xs text-slate-400 font-semibold uppercase tracking-wider'>Or Login With</span>
                                <div className='h-px bg-slate-200 grow'></div>
                            </div>

                            <div className='grid grid-cols-2 gap-4'>
                                <button className='flex justify-center items-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-300 text-slate-600 font-semibold text-sm group'>
                                    <FaFacebookF className='text-slate-400 group-hover:text-blue-600 transition-colors' /> 
                                    <span>Facebook</span>
                                </button>
                                <button className='flex justify-center items-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300 text-slate-600 font-semibold text-sm group'>
                                    <FaGoogle className='text-slate-400 group-hover:text-red-500 transition-colors' /> 
                                    <span>Google</span>
                                </button>
                            </div>
                        </div>

                        <div className='text-center mt-10 text-slate-600 font-medium leading-8 tracking-wide text-sm'>
                            Don't Have An Account ? <Link className='text-[#059473] hover:text-green-700 font-bold hover:underline transition-all' to='/register'>Register</Link>
                        </div> 
                    </div> 

                    {/* --- RIGHT SIDE : IMAGE --- */}
                    <div className='hidden lg:block relative w-full h-full'>
                        <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10'></div>
                        <div className='absolute bottom-16 left-12 right-12 z-20 text-white'>
                            <h3 className='text-3xl font-bold leading-tight mb-4'>Welcome Back !</h3>
                            <p className='text-slate-100 leading-8 tracking-wide text-lg font-light opacity-90'>
                                Access your Dashboard, Track orders, and Manage your account.
                            </p>
                        </div>
                        <img className='w-full h-full object-cover' src="/images/login.jpg" alt="Login Context" />
                    </div>    

                </div>
            </div> 
            
            <Footer/>
        </div>
    );
};

export default Login;