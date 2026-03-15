import React from 'react';

const ChangePassword = () => {
    return (
        <div className='w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'> 
            
            {/* Header Section */}
            <div className='px-6 py-6 border-b border-slate-100'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-xl bg-[#059473]/5 border border-[#059473]/10 flex items-center justify-center text-[#059473]'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className='text-xl font-bold text-slate-800 tracking-tight'>Change Password</h2>
                        <p className='text-sm pt-2 text-slate-500 font-medium'>Secure your account with a new password</p>
                    </div>
                </div>
            </div>
        
            {/* Form Section */}
            <div className='p-8 md:p-12 flex justify-center'>
                <form className='w-full max-w-lg space-y-5'>
                    
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor="old_password" className='text-sm font-semibold text-slate-600 ml-1'>
                            Old Password
                        </label>
                        <input 
                            className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm focus:outline-none focus:border-[#059473] focus:ring-4 focus:ring-[#059473]/10 transition-all duration-200 placeholder:text-slate-400' 
                            type="password" 
                            name="old_password" 
                            id="old_password"  
                            placeholder='Enter your current password'/>
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor="new_password" className='text-sm font-semibold text-slate-600 ml-1'>
                            New Password
                        </label>
                        <input 
                            className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm focus:outline-none focus:border-[#059473] focus:ring-4 focus:ring-[#059473]/10 transition-all duration-200 placeholder:text-slate-400' 
                            type="password" 
                            name="new_password" 
                            id="new_password"  
                            placeholder='Enter new password'/>
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor="confirm_password" className='text-sm font-semibold text-slate-600 ml-1'>
                            Confirm Password
                        </label>
                        <input 
                            className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm focus:outline-none focus:border-[#059473] focus:ring-4 focus:ring-[#059473]/10 transition-all duration-200 placeholder:text-slate-400' 
                            type="password" 
                            name="confirm_password" 
                            id="confirm_password"  
                            placeholder='Confirm new password'/>
                    </div>

                    <div className='pt-4'>
                        <button className='w-full px-8 py-3 bg-[#059473] hover:bg-[#047a5e] text-white font-medium rounded-xl shadow-lg shadow-[#059473]/30 hover:shadow-[#059473]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0'>
                            Update Password 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;