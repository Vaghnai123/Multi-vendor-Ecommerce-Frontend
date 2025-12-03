import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className='w-full bg-slate-50 min-h-screen'> {/* Added light bg to whole page so cards pop out */}
            <Header/>
            <Banner/>
            <Categorys/>
            
            <div className='pb-1'>
                <FeatureProducts/>
            </div>

            <div className='pb-10 pt-10 '>
                <div className='w-[85%] mx-auto md:w-[90%] lg:w-[85%] max-w-7xl'>
                    
                    <div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        <div className='w-full'>
                            <Products title='Latest Product' />
                        </div>
                        
                        <div className='w-full'>
                            <Products title='Top Rated Product'/>
                        </div>

                        <div className='w-full md:col-span-2 lg:col-span-1'>
                            <div className='md:w-1/2 lg:w-full mx-auto'>
                                <Products title='Discount Product'/>
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