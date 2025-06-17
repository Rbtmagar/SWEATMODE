import React from 'react';
import { assets } from '../assets/assets';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#f9f9f6] text-black py-10 px-5 sm:px-10 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1: Brand Info */}
        <div>
          <Link to="/"><img src={assets.logo} className="w-20 mb-2" alt="SweatMode logo" /></Link>
          <p className="text-sm text-gray-700">
            Your one-stop destination for stylish, comfortable, and performance-driven gym wear.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2 text-gray-800">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/collection" className="hover:underline">Collection</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="text-sm space-y-2 text-gray-800">
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Shipping</a></li>
            <li><a href="#" className="hover:underline">Returns</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" title="Facebook" className="p-2 bg-gray-200 hover:bg-blue-600 text-black hover:text-white rounded-full">
              <FaFacebookF />
            </a>
            <a href="#" title="Twitter" className="p-2 bg-gray-200 hover:bg-sky-500 text-black hover:text-white rounded-full">
              <FaTwitter />
            </a>
            <a href="#" title="Instagram" className="p-2 bg-gray-200 hover:bg-pink-500 text-black hover:text-white rounded-full">
              <FaInstagram />
            </a>
            <a href="#" title="LinkedIn" className="p-2 bg-gray-200 hover:bg-blue-800 text-black hover:text-white rounded-full">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} <strong>SweatMode</strong>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
