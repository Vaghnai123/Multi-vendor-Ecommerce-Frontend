import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'; 
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const form = useRef();

  // State Management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Business Details 
  const businessDetails = {
    name: "LuxeMarket Inc.", 
    email: "support@luxemarket.com", 
    phone: "+1 (555) 123-4567",
    address: "123 Commerce Blvd, Suite 100, New York, NY", 
    hours: "Mon-Fri : 9AM - 6PM EST" 
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) tempErrors.message = "Message is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (validateForm()) {
      setIsSubmitting(true);
      
      const SERVICE_ID = 'service_hzt3y9c';
      const TEMPLATE_ID = 'template_74xdxe9';
      const PUBLIC_KEY = 'Q-m4ySXxkGUUcAVDN';

      emailjs
        .sendForm(
          SERVICE_ID,
          TEMPLATE_ID,
          form.current,
          PUBLIC_KEY 
        )
        .then(
          (result) => {
            console.log('SUCCESS!', result.text);
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
          },
          (error) => {
            console.log('FAILED...', error.text); 
            setIsSubmitting(false);
            setErrorMessage('Something went wrong. Please try again later.');
          }
        );
    }
  };

  return (
    <div> 
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
        <div className="max-w-5xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-md font-medium text-gray-600">
              Have a question about your order or our products? We're here to help.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
            
            {/* Left Side : Contact Info  */}
            <div className="bg-slate-900 text-white p-8 md:p-12 md:w-5/12 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-slate-300 mb-8">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-slate-300">{businessDetails.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-slate-300">{businessDetails.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-slate-300">{businessDetails.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h3 className="font-semibold">Operating Hours</h3>
                      <p className="text-slate-300">{businessDetails.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 md:mt-0">
                 {/* Placeholder for social media icons if needed */}
              </div>
            </div>

            {/* Right Side : Contact Form */}
            <div className="p-8 md:p-12 md:w-7/12 bg-white">
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border focus:ring-2 focus:outline-none transition-colors duration-200 
                      ${errors.name 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                      }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border focus:ring-2 focus:outline-none transition-colors duration-200 
                      ${errors.email 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                      }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border focus:ring-2 focus:outline-none transition-colors duration-200 resize-none
                      ${errors.message 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                      }`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>

                {isSuccess && (
                  <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg text-center animate-fade-in border border-green-200">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                {errorMessage && (
                  <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-center animate-fade-in border border-red-200">
                    {errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;