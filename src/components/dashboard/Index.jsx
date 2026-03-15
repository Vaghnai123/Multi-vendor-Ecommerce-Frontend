/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { get_dashboard_index_data } from '../../store/reducers/dashboardReducer';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";

const Index = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth)
    const {recentOrders,totalOrder,pendingOrder,cancelledOrder} = useSelector(state => state.dashboard)

    useEffect(() => {
        dispatch(get_dashboard_index_data(userInfo.id))
    },[])

     const redirect = (ord) => {
        let items = 0;
        for (let i = 0; i < ord.products.length; i++) {
            items = ord.products[i].quantity + items; 
        }
        navigate('/payment',{
            state: {
                price: ord.price,
                items,
                orderId: ord._id 
            }
        }) 
    }

    return (  
        <div className='w-full p-4 md:p-8'>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 pb-4'>
                {/* Total Orders Card */}
                <div className='flex justify-between items-center p-5 md:p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300'>
                    <div className='flex flex-col justify-start items-start gap-1 text-slate-600'>
                        <h2 className='text-2xl md:text-3xl font-bold text-slate-800'>{totalOrder}</h2>
                        <span className='text-xs md:text-sm font-semibold text-slate-500 tracking-wide'>Total Orders</span>
                    </div>
                    <div className='bg-emerald-50 w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center text-xl shadow-sm border border-emerald-100'>
                        <span className='text-lg md:text-xl text-emerald-600'><RiShoppingCart2Fill /></span>
                    </div>
                </div>

                {/* Pending Orders Card */}
                <div className='flex justify-between items-center p-5 md:p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300'>
                    <div className='flex flex-col justify-start items-start gap-1 text-slate-600'>
                        <h2 className='text-2xl md:text-3xl font-bold text-slate-800'>{pendingOrder}</h2>
                        <span className='text-xs md:text-sm font-semibold text-slate-500 tracking-wide'>Pending Orders</span>
                    </div>
                    <div className='bg-orange-50 w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center text-xl shadow-sm border border-orange-100'>
                        <span className='text-lg md:text-xl text-orange-600'><RiShoppingCart2Fill /></span>
                    </div>
                </div>

                {/* Cancelled Orders Card */}
                <div className='flex justify-between items-center p-5 md:p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300'>
                    <div className='flex flex-col justify-start items-start gap-1 text-slate-600'>
                        <h2 className='text-2xl md:text-3xl font-bold text-slate-800'>{cancelledOrder}</h2>
                        <span className='text-xs md:text-sm font-semibold text-slate-500 tracking-wide'>Cancelled Orders</span>
                    </div>
                    <div className='bg-red-50 w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center text-xl shadow-sm border border-red-100'>
                        <span className='text-lg md:text-xl text-red-600'><RiShoppingCart2Fill /></span>
                    </div>
                </div>
            </div>
            
            {/* Recent Orders Section */}
            <div className='bg-white rounded-xl shadow-sm border border-slate-100'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center py-5 px-6 border-b border-slate-100 gap-4'>
                    <div className="flex items-center gap-4 md:gap-5">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100 shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 ">Recent Orders</h2>
                            <p className="text-xs md:text-sm pt-1 font-medium text-slate-500">Monitor Your Latest Orders</p>
                        </div>
                    </div>
                </div>

                {/* Responsive Table Container (Horizontal Scroll enabled) */}
                <div className='overflow-x-auto w-full'>
                    <table className='w-full text-left border-collapse min-w-[800px] lg:min-w-full'> 
                        <thead>
                            <tr className='bg-slate-50/50 border-b border-slate-100'>
                                <th className='py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap'>Order ID</th>
                                <th className='py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap'>Price</th>
                                <th className='py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap'>Payment Status</th>
                                <th className='py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap'>Order Status</th>
                                <th className='py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-left whitespace-nowrap'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm divide-y divide-slate-50'>
                        {
                             recentOrders.map((o,i) => <tr key={i} className='group hover:bg-slate-50 transition-colors duration-200'>
                                <td className='py-4 px-6 font-semibold text-slate-800 whitespace-nowrap'>#{o._id}</td>
                                <td className='py-4 px-6 font-bold text-slate-700 whitespace-nowrap'>₹{o.price}</td>
                                <td className='py-4 px-6 whitespace-nowrap'>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${o.payment_status === 'paid' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${o.payment_status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>{o.payment_status }
                                    </div>
                                </td>
                                <td className='py-4 px-6 whitespace-nowrap'>
                                    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-blue-500'></span>{o.delivery_status}
                                    </div>
                                </td>
                                <td className='py-4 px-6 whitespace-nowrap'>
                                    <div className='flex justify-start items-center gap-3'>
                                        <Link to={`/dashboard/order/details/${o._id}`} className='text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-indigo-50'>
                                            <FaEye size={18} />
                                        </Link>
                                        {
                                            o.payment_status !== 'paid' && o.delivery_status !== 'cancelled' &&
                                            <span onClick={() => redirect(o)} className='text-xs font-semibold text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-indigo-200'>
                                                Pay Now
                                            </span>
                                        }
                                    </div>
                                </td>
                            </tr>
                             )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Index;