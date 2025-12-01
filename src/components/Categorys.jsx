import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const Categorys = () => {

    const categorys = [
        'Mobiles',
        'Laptops',
        'Speakers',
        'Top wear',
        'Footwear',
        'Watches',
        'Home Decor',
        'Smart Watches',
    ];

    return (
        <div className='w-[87%] mx-auto relative'>
            <div className='w-full'>
                <div className='text-center flex justify-center items-center flex-col text-3xl text-slate-800 font-bold relative pb-[45px]'>
                <h2> Top Categories </h2>
                <div className='w-[100px] h-0.5 bg-[#059473] mt-4'></div>
            </div>
            </div>

            <Swiper
                modules={[Autoplay, Navigation]}
                navigation={{
                    nextEl: ".cat-next",
                    prevEl: ".cat-prev",
                }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop={true}
                spaceBetween={15}
                breakpoints={{
                    0: { slidesPerView: 2 }, 
                    640: { slidesPerView: 3 },
                    991: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                }}
                className="py-5 relative"
            >
                { categorys.map((c, i) => (
                    <SwiperSlide key={i}>
                        <Link className='w-full h-[180px] border block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white' to='#'>

                            <div className='w-full h-full relative p-2 flex flex-col justify-end items-center'>
                                <img 
                                    src={`/public/images/products/${i + 1}.webp`} 
                                    alt={c} 
                                    className='w-full h-[80%] object-contain mb-2' />

                                <div className='w-full font-semibold text-sm text-center'>
                                    <span className='text-gray-800'>{c}</span>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}

                <button className="cat-prev w-10 h-10 bg-white rounded-full shadow-lg flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-2 z-50 hover:bg-slate-200 transition">
                    <span className="text-xl font-bold text-gray-700"><FaAngleLeft /></span>
                </button>

                <button className="cat-next w-10 h-10 bg-white rounded-full shadow-lg flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-2 z-50 hover:bg-slate-200 transition">
                    <span className="text-xl font-bold text-gray-700"><FaAngleRight /></span>
                </button>

            </Swiper>
            
        </div>
    );
};

export default Categorys;