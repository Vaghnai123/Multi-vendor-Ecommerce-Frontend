/* eslint-disable react-hooks/exhaustive-deps */
import { FaEye } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { get_orders } from '../../store/reducers/orderReducer';

const Orders = () => {
    const [state, setState] = useState('all');

    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const {userInfo} = useSelector(state => state.auth)
    const { myOrders } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(get_orders({status:state, customerId:userInfo.id}))
    },[state])

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

    // Styling variables from your first code to maintain the exact look
    const viewButtonStyle = "flex items-center justify-center text-slate-600 w-8 h-8 rounded-full hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-300 shadow-sm cursor-pointer border border-transparent";

    const payButtonStyle = "flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium px-4 py-2 rounded-full hover:bg-emerald-600 hover:text-white hover:border-transparent hover:shadow-md hover:shadow-emerald-200 transition-all duration-300 cursor-pointer whitespace-nowrap";

    return (
        <div className='bg-white p-4 md:p-8 rounded-2xl '>
            {/*Header Section*/}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-5">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 ">My Orders</h2>
                        <p className="text-xs md:text-sm pt-1 font-medium text-slate-500">Track and manage your recent purchases</p>
                    </div>
                </div>
                
                <div className='relative group w-full md:w-auto'>
                    <select className='w-full md:w-auto appearance-none bg-white outline-none pl-5 pr-12 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-medium text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 cursor-pointer transition-all duration-200 shadow-sm hover:border-indigo-300 hover:shadow-md' value={state} onChange={(e) => setState(e.target.value)} >
                        <option value="all">-- Order Status --</option>
                        <option value="placed">Placed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="warehouse">Warehouse</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className='w-full overflow-x-auto rounded-xl border border-slate-200'>
                <table className='w-full text-sm text-left text-slate-600 min-w-[800px]'> 
                    <thead className='text-xs font-semibold text-slate-500 uppercase bg-slate-50/50 border-b border-slate-200 tracking-wider'>
                        <tr>
                            <th scope='col' className='px-6 py-5'>Order Id</th>
                            <th scope='col' className='px-6 py-5'>Price</th>
                            <th scope='col' className='px-6 py-5'>Payment Status</th>
                            <th scope='col' className='px-6 py-5'>Order Status</th>
                            <th scope='col' className='px-6 py-5'>Action</th> 
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-100'>
                {
                    myOrders.map((o,i) => (
                        <tr key={i} className='bg-white hover:bg-slate-50/80 transition-colors duration-200'>
                            <td className='px-6 py-5 font-semibold text-slate-800 whitespace-nowrap'>#{o._id}</td>
                            <td className='px-6 py-5 font-bold text-slate-700 whitespace-nowrap'>₹{o.price}</td>
                            <td className='px-6 py-5 whitespace-nowrap'>
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${o.payment_status === 'paid' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${o.payment_status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>{o.payment_status }
                                </div>
                            </td>
                            <td className='px-6 py-5 whitespace-nowrap'>
                                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-blue-500'></span>{o.delivery_status}
                                </div>
                            </td>
                            <td className='px-6 py-5 whitespace-nowrap'>
                                <div className='flex items-center gap-3'>
                                    <Link to={`/dashboard/order/details/${o._id}`} className='group'>
                                        <span className={viewButtonStyle}>
                                            <FaEye size={18} />
                                        </span>
                                    </Link>
                                    {
                                        o.payment_status !== 'paid' && o.delivery_status !== 'cancelled' &&
                                            <span onClick={() => redirect(o)} className={payButtonStyle}>
                                                Pay Now
                                            </span>
                                    }
                                </div>
                            </td>
                        </tr>
                    ))
                }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;