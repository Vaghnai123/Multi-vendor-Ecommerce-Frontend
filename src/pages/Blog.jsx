import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_blogs } from '../store/reducers/blogReducer';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

const Blog = () => {
    const dispatch = useDispatch();
    const { blogs, loader } = useSelector(state => state.blog);

    useEffect(() => {
        dispatch(get_blogs());
    }, [dispatch]);

    return (
        <div>
            <Header />
            <div className='bg-gray-50 py-10'>
                <div className='w-[85%] mx-auto'>
                    <div className='text-center mb-10'>
                        <h2 className='text-3xl font-bold text-slate-800 inline-block border-b-4 border-indigo-600 pb-2'>
                            Latest News
                        </h2>
                    </div>
                    
                    {loader ? <div className='text-center'>Loading...</div> : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {blogs.map((b, i) => (
                                <div key={i} className='bg-white shadow rounded overflow-hidden group'>
                                    <div className='overflow-hidden h-60'>
                                        <img src={b.image} alt={b.title} className='w-full h-full object-contain group-hover:scale-110 transition-all duration-300' />
                                    </div>
                                    <div className='p-4'>
                                        <span className='bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full'>{b.category}</span>
                                        <h2 className='text-xl font-bold text-slate-700 mt-3'>{b.title}</h2>
                                        <p className='text-sm font-medium text-slate-600 mt-2'>{b.description.slice(0, 100)}...</p>
                                        <Link to={`/blog/${b.slug}`} className='text-blue-500 font-bold mt-3 block hover:underline'>Read More &rarr;</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Blog;