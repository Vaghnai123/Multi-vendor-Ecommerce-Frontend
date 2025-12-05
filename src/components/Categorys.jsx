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
    ];

    return (
        <div className='w-[87%] mx-auto relative my-10'>
            
            <div className='w-full mb-8'>
                <div className='text-center flex justify-center items-center flex-col'>
                    <h2 className='text-2xl md:text-3xl text-slate-800 font-bold'>Top Categories</h2>
                    
                    <div className='w-16 h-1 bg-[#059473] mx-auto mt-4 rounded-full'></div>
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
                spaceBetween={25}
                breakpoints={{
                    0: { slidesPerView: 2 }, 
                    640: { slidesPerView: 3 },
                    991: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                }}
                className="py-10 px-8 relative">

                { categorys.map((c, i) => (
                    <SwiperSlide key={i}>
                        <div className="p-1 h-full"> 
                            <Link to='#' className='group block h-full'>

                                <div className='w-full bg-white border border-slate-200 shadow-md rounded-xl flex flex-col justify-center items-center transition-all duration-300 group-hover:border-[#059473] group-hover:shadow-xl h-[220px] gap-3 p-4'>

                                    <div className='w-full h-[130px] p-1 bg-gray-100 rounded-xl shadow-sm flex justify-center items-center overflow-hidden relative'>
                                        <img 
                                            src={`/images/products/${i + 1}.webp`}  
                                            alt={c} 
                                            className='w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110 mix-blend-multiply' 
                                        />
                                    </div>

                                    <div className='text-center w-full'>
                                        <span className='text-slate-700 font-semibold text-sm md:text-base group-hover:text-[#059473] transition-colors line-clamp-1'>
                                            {c}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}

                <button className="cat-prev w-11 h-11 bg-white border border-gray-200 rounded-full shadow-lg flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-0 z-50 cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#059473] hover:text-white hover:border-[#059473] hover:scale-110">
                    <FaAngleLeft className="text-lg" />
                </button>

                <button className="cat-next w-11 h-11 bg-white border border-gray-200 rounded-full shadow-lg flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-0 z-50 cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#059473] hover:text-white hover:border-[#059473] hover:scale-110">
                    <FaAngleRight className="text-lg" />
                </button>

            </Swiper>
        </div>
    );
};

export default Categorys;