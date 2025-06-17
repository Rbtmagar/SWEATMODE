import React from 'react';
import { assets } from '../assets/assets';
import { FaAward, FaUsers, FaChartLine } from 'react-icons/fa';

const About = () => {
  return (
    <div className="py-10 px-5 sm:px-10 max-w-6xl mx-auto space-y-16">

      {/* Hero Section */}
      <section className="text-center">
        <img 
          src={assets.img}
          alt="SweatMode Gymwear" 
          className="align-text-bottom mx-auto rounded-lg shadow-lg w-1/2 object-cover mb-5" 
        />
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">About SweatMode</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          At <strong>SweatMode</strong>, we believe gymwear should empower performance, style, and sustainability.
          Whether you're lifting heavy or stretching deep, our gear is designed to move with you — not against you.
        </p>
      </section>

      {/* Mission + Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-600 align-text-center">
            We started SweatMode with one goal: to deliver high-quality, stylish, and functional gymwear that doesn’t break the bank. 
            Our collections are crafted for comfort, durability, and confidence — made by athletes, for athletes.
          </p>
        </div>
        <img src={assets.tshirt2} alt="Mission" className="rounded-lg shadow-md w-3/4" />
      </section>

      {/* Achievements & Badges */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">Achievements & Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white shadow-md p-6 rounded-xl flex flex-col items-center">
            <FaAward className="text-4xl text-yellow-500 mb-3" />
            <h4 className="text-lg font-bold text-gray-700">Top Startup 2024</h4>
            <p className="text-sm text-gray-500 mt-1">Recognized in emerging gymwear brands by FitStyle Mag.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-xl flex flex-col items-center">
            <FaUsers className="text-4xl text-blue-500 mb-3" />
            <h4 className="text-lg font-bold text-gray-700">15,000+ Customers</h4>
            <p className="text-sm text-gray-500 mt-1">Trusted by fitness lovers across the UK & beyond.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-xl flex flex-col items-center">
            <FaChartLine className="text-4xl text-green-500 mb-3" />
            <h4 className="text-lg font-bold text-gray-700">100% Growth</h4>
            <p className="text-sm text-gray-500 mt-1">Rapid e-commerce growth driven by happy customers.</p>
          </div>
        </div>
      </section>

      {/* Founders or Brand Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img src={assets.tshirt4} alt="Founders" className="rounded-lg shadow-md w-3/4" />
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why SweatMode?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>🔒 Ethical and sustainable materials</li>
            <li>🔥 Stylish, durable & sweat-resistant fabrics</li>
            <li>🚚 Fast delivery + easy returns</li>
            <li>🌱 Committed to empowering every body shape</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
