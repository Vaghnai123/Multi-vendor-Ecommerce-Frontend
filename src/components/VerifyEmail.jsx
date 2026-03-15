import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { verify_email, resend_otp, messageClear } from '../store/reducers/authReducer';
import Header from '../components/Header';
import Footer from '../components/Footer';

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Register page se bheja gaya email access karein
    const email = location.state?.email;

    const [otp, setOtp] = useState('');
    const { loader, successMessage, errorMessage } = useSelector(state => state.auth);

    const submitOtp = (e) => {
        e.preventDefault();
        if(otp.length !== 6) {
            toast.error("Please enter valid 6 digit OTP");
            return;
        }
        dispatch(verify_email({ email, otp }));
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            if (successMessage !== "OTP Resent Successfully") {
                navigate('/login');
            }
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, navigate, dispatch]);

    // Agar email nahi hai (direct access kiya page ko), to register par bhej do
    useEffect(() => {
        if(!email) navigate('/register');
    }, [email, navigate]);

    const handleResend = () => {
        if (email) {
            dispatch(resend_otp({ email }));
        } else {
            toast.error("Email not found, please register again.");
        }
    }

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col font-sans'>
            <Header/>
            
            <div className='flex-grow flex justify-center items-center p-4 sm:p-6'>
                <div className='w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 transition-all'>
                    
                    {/* Header Section */}
                    <div className='text-center mb-8'>
                        <h2 className='text-2xl font-extrabold text-gray-900 mb-2'>Verify Account</h2>
                        <p className='text-slate-600 font-medium text-sm leading-relaxed'>
                            Enter the 6-Digit OTP Sent To <br />
                            <span className='inline-block mt-2 px-3 py-1 bg-[#059473]/10 text-[#059473] font-semibold rounded-full text-sm'>
                                {email}
                            </span>
                        </p>
                    </div>
                    
                    {/* Form Section */}
                    <form onSubmit={submitOtp} className='flex flex-col gap-6'>
                        <div className='relative'>
                            <input 
                                onChange={(e) => setOtp(e.target.value)} 
                                value={otp} 
                                type="number" 
                                className='w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-gray-800 text-center text-xl font-bold tracking-[0.5em] placeholder:tracking-normal focus:bg-white focus:border-[#059473] focus:ring-4 focus:ring-[#059473]/10 transition-all duration-300 placeholder-gray-400' 
                                placeholder='______' 
                                required
                            />
                        </div>

                        <button 
                            disabled={loader} 
                            className='w-full py-4 bg-gradient-to-r from-[#059473] to-[#047a5e] hover:from-[#047a5e] hover:to-[#036c52] text-white font-bold rounded-xl shadow-lg shadow-[#059473]/30 hover:shadow-[#059473]/50 transform hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-lg flex justify-center items-center gap-2'>
                            {loader ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Verifying...</span>
                                </>
                            ) : 'Verify Email'}
                        </button>
                    </form>

                    <div className='mt-6 text-center'>
                        <p className='text-slate-600 font-medium text-sm '>
                            Didn't receive code? 
                        <button onClick={handleResend} type="button" className='pl-2 text-[#059473] font-semibold hover:underline decoration-2 underline-offset-2'>Resend</button>
                        </p>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default VerifyEmail;