import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">EvoCartel</h3>
            <p className="text-gray-400 mb-4">
              EvoCartel is your one-stop shop for all your needs. From electronics to fashion, we have it all. Shop with confidence and enjoy our exclusive deals.
            </p>
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} EvoCartel. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-blue-500 transition duration-300">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500 transition duration-300">Shop</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500 transition duration-300">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500 transition duration-300">Contact Us</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-blue-500 transition duration-300">FAQ</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500 transition duration-300">Returns</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500 transition duration-300">Shipping</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500 transition duration-300">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300"><FaFacebookF size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300"><FaLinkedinIn size={24} /></a>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Subscribe to our Newsletter</h3>
          <div className="flex justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-lg focus:outline-none text-gray-900"
            />
            <button className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
