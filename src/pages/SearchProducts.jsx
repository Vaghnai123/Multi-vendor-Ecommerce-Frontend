/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState , useEffect  } from 'react';
import Header from '../components/Header';
import { Link , useSearchParams} from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { FaFilter, FaAngleDown, FaThList } from "react-icons/fa";
import { AiFillStar } from 'react-icons/ai';
import { CiStar } from 'react-icons/ci';
import { BsFillGridFill } from 'react-icons/bs';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import ShopProducts from '../components/products/ShopProducts';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { price_range_product, query_products } from '../store/reducers/homeReducer';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SearchProducts = () => {

const {products,categorys,priceRange,totalProduct,parPage} = useSelector(state => state.home)

    let [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')
    const searchValue = searchParams.get('value')

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(price_range_product())
    },[])

    const [filter, setFilter] = useState(true);
    const [state, setState] = useState({values: [0, 10000]})
    const [rating, setRating] = useState('');
    const [styles, setStyles] = useState('grid');
    const [pageNumber, setPageNumber] = useState(1)

    const [sortPrice, setSortPrice] = useState('')
 

    useEffect(() => { 
        if(priceRange.high > 0) {
             setState({
                values: [priceRange.low, priceRange.high]
            })
        }
    }, [priceRange])

useEffect(() => { 
        dispatch(
            query_products({
                low: state.values[0] || '', 
                high: state.values[1] || '',
                category,
                rating,
                searchValue,
                sortPrice,
                pageNumber
            })
         )
    }, [state.values[0], state.values[1], category, searchValue, rating, sortPrice, pageNumber, dispatch])

    const resetRating = () => {
        setRating('')
        dispatch(
            query_products({
                low: state.values[0],
                high: state.values[1],
                category,
                rating: '',
                sortPrice,
                pageNumber
            })
         )
    }

    return (
        <div className="font-sans bg-gray-50 w-full overflow-x-hidden">
            <Header />
        
            {/* 2. Filter & Product Area */}
            <section className='py-16'>
                <div className='w-[90%] md:w-[80%] lg:w-[90%] h-full mx-auto'>
                    
                    <div className={`w-full block lg:hidden mb-6`}>
                        <button 
                            onClick={() => setFilter(!filter)} 
                            className='flex items-center justify-center gap-2 w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-lg transition-transform active:scale-95 hover:bg-indigo-700'>
                            <FaFilter />
                            Filter Product
                            <FaAngleDown className={`transition-transform duration-300 ${!filter ? 'rotate-180' : ''}`} />
                        </button> 
                    </div>

                    <div className='w-full flex flex-wrap'>
                        
                        {/* ==================== LEFT SIDEBAR ==================== */}
                        <div className={`w-full lg:w-3/12 pr-0 lg:pr-8 transition-all duration-500 ease-in-out
                            ${filter ? 'h-0 overflow-hidden opacity-0' : 'h-auto mb-6 opacity-100'} 
                            lg:h-auto lg:overflow-visible lg:opacity-100 lg:mb-0`}>
                            
                        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
                        {/* 4. Price Slider */}
                        <div className='py-2 flex flex-col gap-5 pt-2'>
                            <h2 className='text-xl font-bold mb-2 text-slate-700 uppercase tracking-wider border-b pb-2 border-gray-100'> Price   </h2>
                                <div className='px-1'>
                                    {priceRange.high > priceRange.low && (
                                        <Slider
                                            range
                                            min={priceRange.low}
                                            max={priceRange.high}
                                            step={1} 
                                            value={(state.values)}
                                            onChange={(values) => setState({ values })} 
                                            trackStyle={[{ backgroundColor: '#4f46e5', height: 6 }]}
                                            handleStyle={[
                                                { borderColor: '#4f46e5', backgroundColor: '#4f46e5', opacity: 1, height: 18, width: 18, marginTop: -6 },
                                                { borderColor: '#4f46e5', backgroundColor: '#4f46e5', opacity: 1, height: 18, width: 18, marginTop: -6 }
                                            ]}
                                            railStyle={{ backgroundColor: '#e2e8f0', height: 6 }} 
                                        />
                                    )}
                                </div>

                                <div className='flex justify-between items-center text-slate-600 font-bold text-sm'>
                                    <span className='bg-gray-100 px-3 py-1 rounded border border-gray-200'>
                                        ${Math.floor(state.values[0])}
                                    </span>
                                    <span className='bg-gray-100 px-3 py-1 rounded border border-gray-200'>
                                        ${Math.floor(state.values[1])}
                                    </span>
                                </div>
                            </div>

                                {/* 5. Rating */}
                                <div className='py-2 flex flex-col gap-5 pt-8'>
                                    <h2 className='text-xl font-bold mb-2 text-slate-700 uppercase tracking-wider border-b pb-2 border-gray-100'> Rating </h2>
                                    <div className='flex flex-col gap-3'>
                                        <div onClick={() => setRating(5)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                            <span><AiFillStar/></span><span><AiFillStar/></span><span><AiFillStar/></span><span><AiFillStar/></span><span><AiFillStar/></span>
                                        </div>
                                        <div onClick={() => setRating(4)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                            <span><AiFillStar/></span><span><AiFillStar/></span><span><AiFillStar/></span><span><AiFillStar/></span><span><CiStar/></span>
                                        </div>
                                        <div onClick={() => setRating(3)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                            <span><AiFillStar/></span><span><AiFillStar/></span><span><AiFillStar/></span><span><CiStar/></span><span><CiStar/></span>
                                        </div>
                                        <div onClick={() => setRating(2)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                            <span><AiFillStar/></span><span><AiFillStar/></span><span><CiStar/></span><span><CiStar/></span><span><CiStar/></span>
                                        </div>
                                        <div onClick={() => setRating(1)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                            <span><AiFillStar/></span><span><CiStar/></span><span><CiStar/></span><span><CiStar/></span><span><CiStar/></span>
                                        </div>
                                        <div onClick={resetRating} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                            <span><CiStar/></span><span><CiStar/></span><span><CiStar/></span><span><CiStar/></span><span><CiStar/></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ==================== RIGHT PRODUCT GRID ==================== */}
                        <div className='w-full lg:w-9/12'>
                            <div className='pl-0 lg:pl-8'>
                                
                                <div className='py-4 bg-white mb-10 px-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 transition-all duration-300'>
                                    
                                    <h2 className='text-md font-bold text-slate-700'> ( {totalProduct} ) Products </h2>
                                    
                                    <div className='flex justify-center items-center gap-4 w-full md:w-auto'>
                                        {/* Sort Dropdown */}
                                        <div className='relative w-full md:w-auto'>
                                            <select 
                                                className='w-full md:w-auto p-2 px-4 border border-gray-200 outline-none text-slate-600 font-semibold rounded-md hover:border-indigo-500 cursor-pointer bg-white transition-all duration-200 focus:ring-2 focus:ring-indigo-100' 
                                                onChange={(e)=>setSortPrice(e.target.value)}
                                                name="" 
                                                id="">
                                                <option value="">Sort By</option>
                                                <option value="low-to-high"> Low to High </option>
                                                <option value="high-to-low"> High to Low </option>
                                            </select>
                                        </div>

                                        {/* Grid / List Icons */}
                                        <div className='flex justify-center items-start gap-2.5 md-lg:hidden shrink-0'>
                                            <div 
                                                onClick={()=> setStyles('grid')} 
                                                className={`p-2.5 rounded-md cursor-pointer transition-all duration-300 shadow-sm
                                                ${styles === 'grid' ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`} >
                                                <BsFillGridFill/> 
                                            </div>
                                            <div 
                                                onClick={()=> setStyles('list')} 
                                                className={`p-2.5 rounded-md cursor-pointer transition-all duration-300 shadow-sm
                                                ${styles === 'list' ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`} >
                                                <FaThList/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Product List */}
                                <div className='pb-8'>
                                    <ShopProducts styles={styles} products={products} />  
                                </div>

                                <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                                {
                                totalProduct > parPage &&  <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalProduct} parPage={parPage} showItem={Math.floor(totalProduct / parPage )} />
                                }
                                </div>

                            </div>
                        </div>

                    </div>
                </div> 
            </section>

            <Footer/>
        </div>
    );
};

export default SearchProducts;