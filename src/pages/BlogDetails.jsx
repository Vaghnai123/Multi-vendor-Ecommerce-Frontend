import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_blog_details, get_blogs } from '../store/reducers/blogReducer'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaSearch } from 'react-icons/fa';

const BlogDetails = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { blog, blogs, loader } = useSelector(state => state.blog);

    useEffect(() => {
        dispatch(get_blog_details(slug));
        if (blogs.length === 0) {
            dispatch(get_blogs());
        }
    }, [slug, dispatch, blogs.length]);

    const recentBlogs = blogs.filter(b => b.slug !== slug).slice(0, 4);

    if (loader || !blog) return (
        <div className='bg-slate-50 min-h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <span className='text-slate-600 font-semibold'>Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* ---  Main Content --- */}
                    <div className="lg:col-span-2">

                        <div className="mb-6 flex items-center text-sm font-medium text-slate-600">
                            <Link to="/" className="hover:text-green-600 transition">Home</Link>
                            <span className="mx-2">/</span>
                            <Link to="/blog" className="hover:text-green-600 transition">Blog</Link>
                            <span className="mx-2">/</span>
                            <span className="text-slate-800 font-medium truncate max-w-[200px]">{blog.title}</span>
                        </div>

                        {/* Description Text */}
                        <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-slate-100">
                            <div className="prose prose-lg prose-slate max-w-none font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">
                                {blog.description}
                            </div>
                        </div>

                        {/* Share Section in Bottom */}
                        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                            <span className="font-medium text-md text-slate-700">Share This Article :-</span>
                            <div className="flex gap-3">
                                <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"><FaFacebookF /></button>
                                <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition"><FaTwitter /></button>
                                <button className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center hover:bg-blue-900 transition"><FaLinkedinIn /></button>
                            </div>
                        </div>
                    </div>

                    {/* --- Right Column : Sidebar --- */}
                    <div className="lg:col-span-1">
                        <div className="flex flex-col gap-8 mt-10 ">
                            {/* 1. Recent Posts */} 
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 border-l-4 border-green-500 pl-3">Recent Posts</h3>
                                <div className="flex flex-col gap-6">
                                    {recentBlogs.map((b, i) => (
                                        <Link to={`/blog/${b.slug}`} key={i} className="group flex gap-4 items-start">
                                            <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg">
                                                <img 
                                                    src={b.image} 
                                                    alt={b.title} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300" 
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <h4 className="font-semibold text-slate-800 leading-snug group-hover:text-green-600 transition line-clamp-2">
                                                    {b.title}
                                                </h4>
                                                <span className="text-xs text-slate-500">{new Date(b.createdAt).toDateString()}</span>
                                            </div>
                                        </Link>
                                    ))}
                                    {recentBlogs.length === 0 && <p className="text-slate-600 font-medium text-sm">No other posts found.</p>}
                                </div>
                            </div>

                            {/* 2. Follow Us */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                                <h3 className="text-xl font-bold text-slate-800 mb-4">Follow Us</h3>
                                <div className="flex justify-center gap-4">
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"><FaFacebookF /></a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-100 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition"><FaTwitter /></a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-100 text-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-white transition"><FaGithub /></a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default BlogDetails;