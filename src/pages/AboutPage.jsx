import React from 'react';
import { ArrowRight, Heart, Star, ShieldCheck } from 'lucide-react'; 
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

const AboutPage = () => {

  const brandDetails = {
    name: "EasyShop", 
    mission: "To bring high-quality, sustainable lifestyle products to every home, making eco-friendly living accessible and stylish.",
    history: "Founded in 2020, EasyShop started in a small garage with a big dream to change the way people think about daily essentials.",
    usp: "We don't just sell products; we curate experiences using 100% ethically sourced materials.",
    ctaLink: "/shops"
  };

  const keyValues = [
    {
      id: 1,
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: "Passion for Quality",
      description: "We never compromise on craftsmanship. Every item is inspected to ensure it meets our gold standard."
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
      title: "Integrity First",
      description: "Transparency is key. We believe in honest pricing and open communication with our customers."
    },
    {
      id: 3,
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Customer Obsession",
      description: "You are the heart of our business. We strive to make every interaction delightful and seamless."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">  
      <Header />
      {/* 1. HERO / INTRO SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Welcome to <span className="text-indigo-600">{brandDetails.name}</span>
        </h1>
        <p className="text-md font-medium text-gray-600 leading-relaxed mb-8">
          We are more than just a store; we are a community of like-minded individuals. 
          {brandDetails.history} whether you are browsing for the first time or a returning friend, 
          we are thrilled to have you here. Our journey is driven by a desire to bring you the best 
          solutions in the market.
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto rounded"></div>
      </section>

      {/* 2. MISSION SECTION */}
      <section className="bg-white py-16 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Our Mission" 
              className="rounded-lg shadow-md w-full object-cover h-64 hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
            <p className="text-md font-medium text-gray-600 leading-relaxed">
              {brandDetails.mission}
            </p>
            <p className="mt-4 font-medium text-gray-600">
              We focus on building relationships, not just transactions. Every decision we make 
              is rooted in the belief that our customers deserve the very best.
            </p>
          </div>
        </div>
      </section>

      {/* 3. KEY VALUES SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
          <p className="text-gray-600 font-medium mt-2">The principles that guide everything we do</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {keyValues.map((value) => (
            <div key={value.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center">
              <div className="flex justify-center mb-4 bg-gray-50 w-16 h-16 mx-auto items-center rounded-full">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{value.title}</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. USP SECTION */}
      <section className="bg-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">What Sets Us Apart?</h2>
          <p className="text-xl text-indigo-100 italic mb-8">
            "{brandDetails.usp}"
          </p>
          <p className="text-indigo-200 leading-relaxed max-w-2xl mx-auto">
            In a crowded marketplace, we stand out by focusing on the details that matter to you. 
            From our dedicated support team to our rigorous quality checks, we ensure 
            excellence at every step.
          </p>
        </div>
      </section>

      {/* 5. CONCLUSION & CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Journey</h2>
        <p className="text-md font-medium text-gray-600 mb-8">
          Thank you for taking the time to get to know us better. We invite you to explore our 
          collection and find something that speaks to you.
        </p>
        <a 
          href={brandDetails.ctaLink}
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg gap-2"
        >
          Explore Our Collection
          <ArrowRight className="w-5 h-5" />
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;