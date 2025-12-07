/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Rating from './Rating';
import RatingTemp from './RatingTemp'; 
import Pagination from './Pagination'; 
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';

const Reviews = () => { 
    
    const product = {
        _id: '12345',
        rating: 4.5,
        slug: 'test-product'
    };

    const reviews = [
        {
            name: "Rahul Sharma",
            date: "12 Oct 2024",
            rating: 5,
            review: "Product ki quality bahut achi hai, delivery bhi time par ho gayi. Highly recommended!"
        },
        {
            name: "Priya Singh",
            date: "10 Oct 2024",
            rating: 4,
            review: "Acha product hai par packaging thodi better ho sakti thi. Overall good experience."
        },
        {
            name: "Vikram Malhotra",
            date: "08 Oct 2024",
            rating: 3,
            review: "Thik hai, price ke hisab se okay hai. Bahut high expectation mat rakhna."
        },
    ];

    const rating_review = [
        { sum: 0 }, 
        { sum: 1 }, 
        { sum: 0 }, 
        { sum: 2 }, 
        { sum: 4 }, 
        { sum: 5 } 
    ];

    const userInfo = { name: "Amit Kumar" }; 

    const [pageNumber, setPageNumber] = useState(1);
    const [parPage, setParPage] = useState(10);
    
    const [rat, setRat] = useState(null); 
    const [re, setRe] = useState('');

    const review_submit = (e) => {
        e.preventDefault();
        if(!rat) {
            alert("Please select a rating first!");
            return;
        }

        console.log("Static Submit Triggered:", {
            name: userInfo?.name,
            review: re,
            rating: rat,
            productId: product._id
        });
        
        alert("Review Submitted Successfully!");
        setRe('');
        setRat(null); 
    }

   const totalReview = 100;

    return (
        <div className='mt-8'>

            {/* --- Review Summary Section --- */}
            <div className='flex gap-10 md-lg:flex-col bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8'>

                <div className='flex flex-col gap-2 justify-center items-start md-lg:items-start w-[30%] md-lg:w-full'>
                    <div className='text-center w-full md-lg:text-left'>
                        <span className='text-6xl font-bold text-slate-800'>{product.rating}</span>
                        <span className='text-3xl font-semibold text-slate-500'>/5</span>
                    </div>
                    <div className='flex justify-center w-full md-lg:justify-start text-3xl text-[#Edbb0E] mb-1'>
                        <Rating ratings={product.rating} />
                    </div>
                    <p className='text-sm text-slate-500 font-medium w-full text-center md-lg:text-left'>{totalReview} Reviews</p>
                </div>

                {/* Right: Progress Bars */}
                <div className='flex flex-col gap-3 w-[70%] md-lg:w-full'>
                    {[5, 4, 3, 2, 1, 0].map((star, i) => {
                          const count = rating_review[star]?.sum || 0; 
                          const percentage = totalReview > 0 ? Math.floor((100 * count) / totalReview) : 0;
                          
                          return (
                            <div key={i} className='flex justify-start items-center gap-4'>
                                <div className='text-md flex gap-1 w-[90px]'>
                                    <RatingTemp rating={star} />
                                </div>

                                <div className='w-full h-3 bg-slate-100 rounded-full relative overflow-hidden'>
                                    <div style={{ width: `${percentage}%` }} className={`h-full bg-[#Edbb0E]`}></div>
                                </div>

                                <p className='text-sm text-slate-600 w-[30px] text-right font-semibold'>{count}</p>
                            </div>
                          )
                    })}
                </div>
            </div>

            <h2 className='text-slate-800 text-xl font-bold py-5 relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-green-500 before:rounded-full'>
                Product Reviews ({totalReview})
            </h2>

            {/* --- Reviews List --- */}
            <div className='flex flex-col gap-8 pb-10 pt-4'>
                {
                    reviews.map((r, i) => (
                        <div key={i} className='flex flex-col gap-1 border-b border-gray-100 pb-6 last:border-0'>
                            <div className='flex justify-between items-center mb-2'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-full bg-slate-200 flex justify-center items-center text-slate-600 font-bold'>
                                        {r.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='text-slate-800 font-bold text-md'>{r.name}</span>
                                        <div className='flex gap-1 text-yellow-400 text-sm'>
                                            <RatingTemp rating={r.rating} />
                                        </div>
                                    </div>
                                </div>
                                <span className='text-slate-400 text-sm'>{r.date}</span>
                            </div>
                            <p className='text-slate-600 text-sm leading-6 pl-12 md:pl-0'>
                                {r.review}
                            </p>
                        </div>
                    ))
                }

                <div className='flex justify-end'>  
                    <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalReview} parPage={parPage} showItem={5} />
                </div>
            </div>

            {/* --- WRITE A REVIEW SECTION --- */}
            <div className='w-full'>
                {
                    userInfo ? 
                    <div className='flex flex-col gap-8 p-8 bg-white rounded-xl shadow-sm border border-gray-100'>
                        
                        <div className='flex flex-col gap-1'>
                            <h3 className='text-lg font-bold text-slate-700'>Write a Review</h3>
                            <p className='text-slate-600 font-medium leading-8 tracking-wide text-sm'>Your email address will not be published. Required fields are marked *</p>
                        </div>

                        <form onSubmit={review_submit} className='flex flex-col gap-6'>
                            {/* Star Rating */}
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-600 font-medium leading-8 tracking-wide text-sm'>Your Rating *</label>
                                <div className='flex gap-2'>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <span
                                            key={s}
                                            onClick={() => setRat(s)}
                                            className='cursor-pointer text-4xl transition-all duration-200 hover:scale-110'>
                                            {
                                                rat >= s ?
                                                    <FaStar className='text-[#Edbb0E]' /> :
                                                    <CiStar className='text-slate-300 hover:text-[#Edbb0E]' />
                                            }
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-600 font-medium pb-2 text-sm'>Your Review * </label>
                                <textarea
                                    value={re}
                                    onChange={(e) => setRe(e.target.value)}
                                    required
                                    className='w-full border border-gray-200 outline-none p-4 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-slate-600 text-sm'
                                    cols="30"
                                    rows="6"
                                    placeholder="Write your thoughts here..."
                                ></textarea>
                            </div>

                            <div>
                                <button type='submit' className='py-3 px-8 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-200 uppercase tracking-wide text-sm'>
                                    Submit Review
                                </button>
                            </div>

                        </form>
                    </div> 
                    : 
                    <div className='p-6 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-3 items-start'>
                        <h3 className='text-lg font-bold text-slate-700'>Write a Review</h3>
                        <p className='text-slate-500 text-sm'>You must be logged in to post a review.</p>
                        <Link to='/login' className='py-2 px-6 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all shadow-sm'> 
                            Login Here 
                        </Link>
                    </div>
                }
            </div>

        </div>
    );
};

export default Reviews;