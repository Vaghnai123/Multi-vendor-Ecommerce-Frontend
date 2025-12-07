import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"; 
import { FaHeart, FaShoppingCart, FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaComments } from "react-icons/fa";
import { FaStar } from "react-icons/fa"; 
import Reviews from '../components/Reviews';
import Rating from '../components/Rating'; 

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { Pagination, Autoplay, Navigation } from 'swiper/modules'; 

const Details = () => {
    const images = [1, 2, 3, 4, 5, 6];
    const [image, setImage] = useState(images[0]);
    const [state, setState] = useState('reviews')
    const discount = 9;
    const stock = 1;

    return (
        <div>
            <Header />
            
            {/* --- SECTION 1 : Banner  --- */}
            <section className='relative w-full h-[180px] md:h-[220px] mt-0 overflow-hidden'>
                <div className='absolute inset-0 bg-[url("/images/banner/shop.png")] bg-cover bg-center bg-no-repeat'></div>
                <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent backdrop-blur-[1px]'>
                    <div className='w-[90%] md:w-[80%] h-full mx-auto flex flex-col justify-center text-white'>
                        <h2 className='text-3xl md:text-4xl font-extrabold tracking-wide mb-2 drop-shadow-lg'>PRODUCT <span className='text-emerald-400 font-light'> DETAILS </span></h2>
                        <div className='flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-gray-300 pt-2'>
                            <Link to='/' className='hover:text-white transition-colors duration-300'> Home </Link>
                            <span className='text-gray-500 text-xs'> <IoIosArrowForward /> </span>
                            <span className='text-white pointer-events-none'> Product </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-slate-100 py-4 border-b border-gray-200'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className='flex justify-start items-center text-sm text-slate-600 w-full font-medium'>
                        <Link to='/' className='hover:text-emerald-500 transition-colors'>Home</Link>
                        <span className='pt-1 mx-2 text-slate-400'><IoIosArrowForward /></span>
                        <Link to='/' className='hover:text-emerald-500 transition-colors'>Category</Link>
                        <span className='pt-1 mx-2 text-slate-400'><IoIosArrowForward /></span>
                        <span className='text-slate-800 font-bold truncate'>Product Name</span>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2 : Product Images & Info --- */}
            <section className='py-10 bg-white'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                        
                        {/* LEFT SIDE */}
                        <div>
                            <div className='p-9 bg-white border border-gray-200 rounded-lg h-[400px] md:h-[500px] flex justify-center items-center shadow-sm mb-4'>
                                <img 
                                    className='w-full h-full object-contain' 
                                    src={`/images/products/${image}.webp`} 
                                    alt="Main Product" 
                                />
                            </div>

                            <div className='relative group w-full'>
                                <button className="banner-prev flex w-8 h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg justify-center items-center absolute top-1/2 -translate-y-1/2 left-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out hover:bg-white hover:scale-110 cursor-pointer border border-gray-200">
                                    <FaAngleLeft size={16} className="text-gray-800" />
                                </button>

                                <button className="banner-next flex w-8 h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg justify-center items-center absolute top-1/2 -translate-y-1/2 right-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out hover:bg-white hover:scale-110 cursor-pointer border border-gray-200">
                                    <FaAngleRight size={16} className="text-gray-800" />
                                </button>

                                {images && (
                                    <Swiper
                                        slidesPerView={4} 
                                        spaceBetween={15}
                                        autoplay={false}
                                        loop={false}
                                        modules={[Pagination, Autoplay, Navigation]}
                                        navigation={{
                                            nextEl: '.banner-next',
                                            prevEl: '.banner-prev',
                                        }}
                                        className="mySwiper px-2" 
                                        breakpoints={{
                                            320: { slidesPerView: 3, spaceBetween: 10 },
                                            640: { slidesPerView: 4, spaceBetween: 15 },
                                            1024: { slidesPerView: 5, spaceBetween: 20 },
                                        }}>
                                        {images.map((img, i) => {
                                            return (
                                                <SwiperSlide key={i}>
                                                    <div 
                                                        onClick={() => setImage(img)} 
                                                        className={`h-[100px] cursor-pointer bg-white border rounded-lg flex justify-center items-center p-3 transition-all duration-200 ${image === img ? 'border-emerald-500 ring-1 ring-emerald-500 opacity-100' : 'border-gray-200 opacity-80 hover:border-emerald-400'}`}>
                                                        <img 
                                                            className='w-full h-full object-contain' 
                                                            src={`/images/products/${img}.webp`} 
                                                            alt="Thumbnail" 
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                )}
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className='flex flex-col gap-6 justify-start'>
                            
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-3xl font-bold text-slate-800 leading-tight'>OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)</h1>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-3'>
                                        <div className='flex items-center gap-1 bg-emerald-100 ring-1 ring-emerald-200 text-emerald-600 px-2.5 py-1 rounded text-sm font-bold'>
                                            4.5 <FaStar size={13} />
                                        </div>
                                    <span className='text-slate-500 text-sm font-medium hover:text-emerald-600 cursor-pointer'> (2,540 Reviews)</span>
                                    </div>
                                    <div className='h-[50px] w-[50px] flex justify-center items-center cursor-pointer border border-gray-200 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200 transition-all shrink-0 '>
                                        <FaHeart size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-end gap-4 pb-4 border-b border-gray-100'>
                                {discount !== 0 ? (
                                    <>
                                        <h2 className='text-3xl font-extrabold text-slate-800'>${500 - Math.floor((500 * discount) / 100)}</h2>
                                        <div className='flex flex-col justify-end pb-1'>
                                            <h2 className='text-lg font-medium text-slate-400 line-through'>$500</h2>
                                        </div>
                                        <div className='mb-2'>
                                            <span className='bg-rose-100 text-rose-500 px-2 py-1 rounded text-xs font-bold'>-{discount}% OFF</span>
                                        </div>
                                    </>
                                ) : (
                                    <h2 className='text-3xl font-extrabold text-slate-800'>$200</h2>
                                )}
                            </div>

                            <div className='text-slate-600 font-medium text-sm leading-7'>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                            </div>  

                            <div className='flex gap-5 py-4 border-b border-gray-100'>
                                {stock ? (
                                    <>
                                        <div className='flex bg-white border border-gray-200 rounded-lg h-[50px] items-center overflow-hidden'>
                                            <div className='px-4 py-2 cursor-pointer hover:bg-gray-100 border-r border-gray-100 transition-colors font-bold text-slate-600'>-</div>
                                            <div className='px-5 py-2 font-semibold text-slate-800'>2</div>
                                            <div className='px-4 py-2 cursor-pointer hover:bg-gray-100 border-l border-gray-100 transition-colors font-bold text-slate-600'>+</div>
                                        </div>
                                        <button className='flex-1 h-[50px] bg-emerald-600 text-white font-bold rounded-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex justify-center items-center gap-2 uppercase tracking-wide text-sm'>
                                            <FaShoppingCart /> Add To Cart
                                        </button>
                                    </>
                                ) : (
                                    <div className='h-[50px] w-full bg-gray-100 text-gray-400 font-bold rounded-lg flex justify-center items-center cursor-not-allowed'>
                                        Out of Stock
                                    </div>
                                )}
                            </div>

                            <div className='flex gap-4 pt-2'>
                                {stock ? (
                                    <button className='flex-1 h-[50px] bg-emerald-600 text-white font-bold rounded-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-emerald-300 transition-all uppercase tracking-wide text-sm'>
                                        Buy Now
                                    </button>
                                ) : null}
                                <Link to='#' className='flex-1 h-[50px] bg-rose-600 text-white font-bold rounded-lg shadow-lg shadow-rose-200 hover:bg-rose-700 hover:shadow-rose-300 transition-all uppercase tracking-wide text-sm flex justify-center items-center gap-2'>
                                   <FaComments /> Chat Seller 
                                </Link>
                            </div>

                            <div className='flex flex-col gap-3 pt-4'>
                                <div className='flex items-center gap-2 text-sm text-slate-700'>
                                    <span className='font-bold'>Availability :</span>
                                    <span className={`font-bold ${stock ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {stock ? `In Stock (${stock})` : 'Out Of Stock'}
                                    </span>
                                </div>
                                <div className='flex items-center gap-3 mt-1'>
                                    <span className='font-bold text-sm text-slate-700'>Share on :</span>
                                    <div className='flex gap-3 text-white'>
                                        <span className='w-8 h-8 rounded-full bg-blue-600 flex justify-center items-center cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-1'><FaFacebookF size={14} /></span>
                                        <span className='w-8 h-8 rounded-full bg-sky-500 flex justify-center items-center cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-1'><FaTwitter size={14} /></span>
                                        <span className='w-8 h-8 rounded-full bg-blue-700 flex justify-center items-center cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-1'><FaLinkedinIn size={14} /></span>
                                        <span className='w-8 h-8 rounded-full bg-gray-800 flex justify-center items-center cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-1'><FaGithub size={14} /></span>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3 : Reviews & Sidebar --- */}
            <section className='pt-6 pb-12 bg-slate-50'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className='flex flex-wrap'>
                        
                        {/* REVIEWS */}
                        <div className='w-full lg:w-[72%]'>
                            <div className='pr-0 lg:pr-4'>
                                <div className='flex gap-2 mb-6 border-b border-gray-200'>
                                    <button onClick={() => setState('reviews')} className={`py-3 px-6 font-bold text-sm uppercase transition-all duration-300 border-b-[3px] ${state === 'reviews' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Reviews </button>
                                    <button onClick={() => setState('description')} className={`py-3 px-6 font-bold text-sm uppercase transition-all duration-300 border-b-[3px] ${state === 'description' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Description </button>
                                </div>
                                <div className='bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm'>
                                    {
                                        state === 'reviews' ? <Reviews/> : 
                                        <div className='text-slate-600 font-medium leading-8 tracking-wide text-sm'>
                                            <p className='mb-4'>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                            </p>
                                            <p>
                                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* SIDEBAR */}
                        <div className='w-full lg:w-[28%]'>
                            <div className='pl-0 lg:pl-4 mt-8 lg:mt-0'>
                                <div className='bg-white rounded-xl shadow-sm p-5 border border-gray-100'>
                                    <h2 className='text-slate-800 font-bold text-lg mb-6 relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-emerald-600 before:rounded-full'>From Easy Shop</h2>
                                    <div className='flex flex-col gap-6'>
                                        {[1, 2, 3].map((p, i) => (
                                            <Link key={i} className='group block'>
                                                <div className='relative w-full h-[220px] bg-white rounded-xl border border-gray-100 mb-3 p-4 flex justify-center items-center shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md'>
                                                    <img className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-110' src={`/images/products/${p}.webp`} alt="Related Product" />
                                                    {discount !== 0 && (<div className='absolute top-2 left-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10'>-{discount}%</div>)}
                                                </div>
                                                <div className='flex flex-col gap-1'>
                                                    <h2 className='text-slate-700 font-bold text-base group-hover:text-emerald-600 transition-colors line-clamp-1'>Product Name Here</h2>
                                                    <div className='flex items-center gap-2'><Rating ratings={4.5} /> <span className='text-slate-500 text-xs'>(10)</span></div>
                                                    <div className='flex items-baseline gap-2 mt-1'><h2 className='text-lg font-bold text-slate-800'>$434</h2><span className='text-sm text-gray-400 line-through'>$500</span></div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 4 : RELATED PRODUCTS --- */}
            <section className='pb-10 bg-slate-50 border-t border-gray-100'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    
                    <h2 className='text-2xl font-bold text-slate-800 mb-8 relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-emerald-600 before:rounded-full'>
                        Related Products 
                    </h2>
                    
                    <div>
                        <Swiper
                            slidesPerView='auto'
                            breakpoints={{
                                320: { slidesPerView: 1, spaceBetween: 15 },
                                565: { slidesPerView: 2, spaceBetween: 20 },
                                768: { slidesPerView: 3, spaceBetween: 25 },
                                1024: { slidesPerView: 4, spaceBetween: 30 }
                            }}
                            spaceBetween={25}
                            loop={true}
                            pagination={{ clickable: true, el: '.custom_bullet' }}
                            modules={[Pagination, Autoplay]}
                            className='mySwiper pb-10' > 
                            {[1, 2, 3, 4, 5, 6].map((p, i) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <Link className='block group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden p-4'>
                                            
                                            <div className='relative h-[200px] w-full flex justify-center items-center mb-3'>
                                                <img 
                                                    className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-110' 
                                                    src={`/images/products/${p}.webp`} 
                                                    alt="Product" />

                                                {discount !== 0 && (
                                                    <div className='absolute top-0 left-0 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm z-10'>
                                                        -{discount}%
                                                    </div>
                                                )}
                                            </div>

                                            <div className='flex flex-col gap-1'>
                                                <h2 className='text-slate-700 font-bold text-base group-hover:text-emerald-600 transition-colors line-clamp-1'>
                                                    Product Name Here
                                                </h2>
                                                <div className='flex items-center gap-2'>
                                                    <Rating ratings={4.5} />
                                                    <span className='text-slate-400 text-xs'>(12)</span>
                                                </div>

                                                <div className='flex items-baseline gap-2 mt-2'>
                                                    <h2 className='text-lg font-bold text-emerald-600'>$434</h2>
                                                    <span className='text-sm text-gray-400 line-through'>$500</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                        <div className='custom_bullet flex justify-center gap-2 pt-5 mt-4'></div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Details;