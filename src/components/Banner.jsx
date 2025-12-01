import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaAngleRight } from "react-icons/fa";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {

    const images = [1, 2, 3, 4, 5, 6];

    return (
        <div className='w-full md-lg:mt-6'>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='w-full flex flex-wrap md-lg:gap-8'>
                    <div className='w-full'>
                        <div className='my-8'>
                            <Swiper
                                modules={[Autoplay, Navigation, Pagination]}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                navigation={{
                                    nextEl: ".banner-next",
                                    prevEl: ".banner-prev",
                                }}
                                pagination={{ clickable: true }}
                                loop={true}
                                spaceBetween={0}
                                slidesPerView={1}
                                className="relative rounded-md">
                            {images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <Link to="#">
                                        <img className="w-full h-full object-cover" src={`/public/images/banner/${img}.jpg`} alt="" />
                                    </Link>
                                </SwiperSlide>
                                ))
                            }

                                {/* 🔥 Custom Arrows */}
                                <button className="banner-prev w-10 h-10 bg-white rounded-full shadow-md flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-3 z-50 hover:bg-gray-200 transition">
                                    <span className="text-2xl font-bold"><FaAngleLeft /></span>
                                </button>

                                <button className="banner-next w-10 h-10 bg-white rounded-full shadow-md flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-3 z-50 hover:bg-gray-200 transition">
                                        <span className="text-2xl font-bold"><FaAngleRight /></span>
                                </button>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
