/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,useRef, useState } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { FaCircle } from 'react-icons/fa' 
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { add_friend, messageClear, send_message,updateMessage } from '../../store/reducers/chatReducer';
import toast from 'react-hot-toast';

const socket = io('http://localhost:5000')

const Chat = () => {

    const scrollRef = useRef()
    const dispatch = useDispatch()
    const { sellerId } = useParams()
    const { userInfo } = useSelector(state => state.auth)
    const { fb_messages, currentFd, my_friends, successMessage } = useSelector(state => state.chat)
    const [text, setText] = useState('')
    const [receverMessage,setReceverMessage] = useState('')
    const [activeSeller,setActiveSeller] = useState([])

// useEffect(() => {
//     if (userInfo) {
//         socket.emit('add_user', userInfo._id, userInfo) 
//     }
// }, [userInfo])

useEffect(() => {
    if (userInfo) {
        console.log("Customer UserInfo:", userInfo);
        const idToSend = userInfo._id || userInfo.id; 
        socket.emit('add_user', idToSend, userInfo)
    }
}, [userInfo])

    useEffect(() => {
        dispatch(add_friend({
            sellerId: sellerId || "",
            userId: userInfo.id
        }))
    }, [sellerId])

    const send = () => {
        if (text) {
            dispatch(send_message({
                userId: userInfo.id,
                text,
                sellerId,
                name: userInfo.name
            }))
            setText('')
        }
    }

    useEffect(() => {
        socket.on('seller_message', msg => {
            setReceverMessage(msg)
        })
        socket.on('activeSeller', (sellers) => {
            console.log("Active Sellers List:", sellers)
            setActiveSeller(sellers)
        })
        return () => {
            socket.off('seller_message')
            socket.off('activeSeller')
        }
    }, [])

    useEffect(() => {
        if (successMessage) {
            socket.emit('send_customer_message',fb_messages[fb_messages.length - 1])
            dispatch(messageClear())
        }
    },[successMessage])

    useEffect(() => {
        if (receverMessage) {
            if (sellerId === receverMessage.senderId && userInfo.id === receverMessage.receverId) {
                dispatch(updateMessage(receverMessage))
            } else {
                toast.success(receverMessage.senderName + " " + "Sent a message")
                dispatch(messageClear())
            }
        }
    }, [receverMessage])

     useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth'})
    },[fb_messages])

    return (
        <div className='w-full'> 
            <div className='w-full flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm overflow-hidden'>
                
                {/* LEFT SIDEBAR */}
                <div className='w-[280px] lg:w-[320px] border-r border-slate-100 h-full flex flex-col bg-white'>
                    
                    {/* Header */}
                    <div className='flex justify-between items-center h-[70px] px-6 border-b border-slate-50'>
                        <div className="flex items-center gap-3 ">
                            <div className="p-2.5 bg-indigo-50 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                            </div>
                            <div><h2 className="text-xl font-bold text-slate-800">Messages</h2></div>
                        </div>
                    </div>
                    
                    {/* Friends List */}
                    <div className='flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar'>
                        {
                            my_friends.map((f, i) => (
                                <Link 
                                    to={`/dashboard/chat/${f.fdId}`} 
                                    key={i} 
                                    className={`flex gap-3 justify-start items-center p-3 rounded-xl transition-all duration-200 group
                                    ${currentFd?.fdId === f.fdId 
                                        ? 'bg-indigo-50 shadow-sm' 
                                        : 'hover:bg-slate-50'}`} >

                                    <div className='relative shrink-0'>
                                        <div className='w-12 h-12 rounded-full p-0.5 bg-white shadow-sm ring-1 ring-slate-100'>
                                            <img className='w-full h-full rounded-full object-cover' src={f.image} alt="" />
                                        </div>
                                { 
                                    activeSeller.some(c => c.sellerId === f.fdId) && <div className='absolute bottom-0 right-0 p-0.5 bg-white rounded-full'><FaCircle className='text-[10px] text-green-500' /> </div>
                                } 
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <div className='flex justify-between items-center'>
                                            <span className={`font-semibold text-[15px] ${currentFd?.fdId === f.fdId ? 'text-indigo-900' : 'text-slate-700'}`}>
                                                {f.name}
                                            </span>
                                        </div>
                                        
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>

                {/* RIGHT CHAT AREA */}
                <div className='flex-1 h-full flex flex-col bg-white relative'>
                    {
                        currentFd ? (
                            <>
                                {/* Chat Header */}
                                <div className='h-[70px] px-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20'>
                                    <div className='flex gap-4 items-center'>
                                        <div className='relative'>
                                            <img className='w-10 h-10 rounded-full object-cover ring-2 ring-slate-50' src={currentFd.image} alt="User" />
                                            {
                                                activeSeller.some(c => c.sellerId === currentFd.fdId) && <div className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full'></div>
                                            }
                                        </div>
                                        <div>
                                            <h3 className='font-medium text-slate-800 text-[16px] leading-tight'>{currentFd.name}</h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Messages Area */}
                                <div className='flex-1 overflow-y-auto p-6 bg-slate-50/50 scroll-smooth'>
                                    <div className='flex flex-col gap-5'>
                                        {
                                            fb_messages.map((m, i) => {

                                                if (currentFd?.fdId !== m.receverId) {
                                                    // RECEIVER 
                                                    return (
                                                        <div ref={scrollRef} key={i} className='flex gap-3 justify-start max-w-[80%]'>
                                                            <img className='w-8 h-8 rounded-full object-cover mt-auto mb-1 shadow-sm' 
                                                            src={currentFd.image} alt="" />
                                                            <div className='flex flex-col gap-1'>
                                                                <div className='px-4 py-2.5 bg-white text-slate-700 shadow-sm border border-slate-100 rounded-2xl rounded-bl-none'>
                                                                    <span className='text-[15px] leading-relaxed'>{m.message}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    // SENDER (Me)
                                                    return (
                                                        <div key={i} ref={scrollRef} className='flex gap-3 justify-end items-end w-full'>
                                                            <div className='flex flex-col gap-1 items-end max-w-[80%]'>
                                                                <div className='px-4 py-2.5 bg-indigo-600 text-white shadow-md shadow-indigo-200 rounded-2xl rounded-br-none'>
                                                                    <span className='text-[15px] leading-relaxed'>{m.message}</span>
                                                                </div>
                                                            </div>
                                                            <img className='w-8 h-8 rounded-full object-cover mb-1 border border-slate-200' src="/public/images/demo.jpg" alt="" />
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className='p-4 bg-white border-t border-slate-100'>
                                    <div className='flex items-center gap-2 bg-slate-50 px-2 py-2 rounded-full border border-slate-200 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all'>
                                        
                                        <div className='p-2 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-slate-200 cursor-pointer transition-colors'>
                                            <label className='cursor-pointer flex items-center justify-center' htmlFor="file-input">
                                                <AiOutlinePlus size={20} />
                                            </label>
                                            <input className='hidden' id="file-input" type="file" />
                                        </div>

                                        <input 
                                            value={text} 
                                            onChange={(e) => setText(e.target.value)} 
                                            type="text" 
                                            placeholder='Type message...' 
                                            className='flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 h-10 px-2'/>

                                        <div className='p-2 text-slate-400 hover:text-yellow-500 cursor-pointer transition-colors'>
                                            <GrEmoji size={20} />
                                        </div>

                                        <button 
                                            onClick={send} 
                                            className='p-3 bg-indigo-600 rounded-full text-white shadow-lg hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center'>
                                            <IoSend size={18} className='ml-0.5' />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            // Empty State
                            <div className='w-full h-full flex flex-col justify-center items-center gap-4 bg-slate-50'>
                                <div className='w-20 h-20 bg-indigo-100 rounded-full flex justify-center items-center text-indigo-500 text-3xl'>
                                    <AiOutlineMessage />
                                </div>
                                <span className='text-xl font-bold text-slate-700'>Select a Seller</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Chat;