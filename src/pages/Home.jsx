/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../store/reducers/homeReducer';

const Home = () => {

    const dispatch = useDispatch()
    const {products,latest_product,topRated_product,discount_product} = useSelector(state => state.home)
    useEffect(() => {
        dispatch(get_products())
    },[])


    return (
        <div className='w-full bg-gray-50 min-h-screen'>
            <Header />
            <Banner />
            <Categorys />
            
            <div className='pb-7'>
                <FeatureProducts products={products} />
            </div>

            <div className='pb-10 pt-10 '>
                <div className='w-[85%] mx-auto md:w-[90%] lg:w-[85%] max-w-10xl'>
                    
                    <div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 '>
                        <div className='w-full'>
                            <Products title='Latest Product' products={latest_product} />
                        </div>
                        
                        <div className='w-full'>
                            <Products title='Top Rated Product' products={topRated_product} />
                        </div>

                        <div className='w-full md:col-span-2 lg:col-span-1'>
                            <div className='md:w-1/2 lg:w-full mx-auto'>
                                <Products title='Discount Product' products={discount_product} />
                            </div>
                        </div>    
                        
                    </div> 
                </div> 
            </div>
            <Footer/>
        </div>
    );
};

export default Home;