import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Logo from './Logo';
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            
          <div className='mix-blend-multiply ml-0 mb-4'>
                <Link to='/'>
                <Logo w={200} h={65} />
              </Link>
            </div>            <p className="text-gray-400 mb-6">
              EvoCartel is your one-stop shop for all your needs. From electronics to fashion, we have it all. Shop with confidence and enjoy our exclusive deals.
            </p>
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} EvoCartel. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-3"><a href="#" className="hover:text-blue-400 transition duration-300">Home</a></li>
              <li className="mb-3"><a href="#" className="hover:text-blue-400 transition duration-300">Shop</a></li>
              <li className="mb-3"><a href="#" className="hover:text-blue-400 transition duration-300">About Us</a></li>
              <li className="mb-3"><a href="#" className="hover:text-blue-400 transition duration-300">Contact Us</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
            <ul>
              <li className="mb-3"><a href="#" className="hover:text-blue-400 transition duration-300">FAQ</a></li>
              <li className="mb-3"><a href="#" className="hover:text-blue-400 transition duration-300">Returns</a></li>
              <li className="mb-3"><a href="#" className="hover:text-blue-400 transition duration-300">Shipping</a></li>
              <li className="mb-3"><a href="#" className="hover:text-blue-400 transition duration-300">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300"><FaFacebookF size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300"><FaLinkedinIn size={24} /></a>
            </div>

            {/* Newsletter Subscription */}
            <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-l-lg text-gray-900 w-full focus:outline-none"
              />
              <button className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
