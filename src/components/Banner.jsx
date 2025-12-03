import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {

    const images = [1, 2, 3, 4, 5, 6];

    const paginationStyles = `
        .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.7);
            opacity: 1;
            transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
            width: 20px;
            height: 8px;
            border-radius: 5px;
            background: #22c55e;
        }
        .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal {
            bottom: 15px !important;
        } 
    `;

    return (
        <div className='w-full mt-2 md:mt-6 mb-10'>
            <style>{paginationStyles}</style>
            
            <div className='w-full md:w-[90%] lg:w-[92%] mx-auto px-0 md:px-4'>
                <div className='w-full'>
                    <div className='my-0 md:my-8'>
                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            autoplay={{ delay: 3500, disableOnInteraction: false }} 
                            navigation={{
                                nextEl: ".banner-next",
                                prevEl: ".banner-prev",
                            }}
                            pagination={{ clickable: true }}
                            loop={true}
                            spaceBetween={0}
                            slidesPerView={1}
                            autoHeight={true} 
                            className="relative md:rounded-2xl overflow-hidden shadow-none md:shadow-xl group"
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <Link to="#" className='block w-full'>
                                        <img 
                                            className="w-full h-auto block object-contain"
                                            src={`/images/banner/${img}.jpg`} 
                                            alt="Banner" 
                                        />
                                    </Link>
                                </SwiperSlide>
                            ))}

                            <button className="banner-prev hidden md:flex w-10 h-10 lg:w-12 lg:h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg justify-center items-center absolute top-1/2 -translate-y-1/2 left-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out hover:bg-white hover:scale-110 cursor-pointer">
                                <FaAngleLeft size={20} className="text-gray-800" />
                            </button>

                            <button className="banner-next hidden md:flex w-10 h-10 lg:w-12 lg:h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg justify-center items-center absolute top-1/2 -translate-y-1/2 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out hover:bg-white hover:scale-110 cursor-pointer">
                                <FaAngleRight size={20} className="text-gray-800" />
                            </button>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;