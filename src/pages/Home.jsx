import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className='w-full'>
            <Header/>
            <Banner/>
            <Categorys/>
            <div className='pb-1'>
                <FeatureProducts/>
            </div>

            <div className='pb-8 pt-5'>
                <div className='w-full px-6 md:px-10 lg:px-20'>
                    <div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                        
                        {/* 1. Latest Product Container */}
                        <div className='overflow-hidden bg-white p-4 rounded-md shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer'>
                            <Products title='Latest Product' />
                        </div>
                        
                        {/* 2. Top Rated Product Container */}
                        <div className='overflow-hidden bg-white p-4 rounded-md shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer'>
                            <Products title='Top Rated Product'/>
                        </div>

                        {/* 3. Discount Product Container */}
                        <div className='overflow-hidden bg-white p-4 rounded-md shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer'>
                            <Products title='Discount Product'/>
                        </div>
                        
                    </div> 
                </div> 
            </div>
            <Footer/>
        </div>
    );
};

export default Home;