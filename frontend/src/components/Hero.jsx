// import React from 'react'

// const Hero = () => {
//   return (
// 	<div>
// 	  hero section
// 	</div>
//   )
// }

// export default Hero
import React from 'react';

const Hero = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,ecommerce')" }}>
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative text-center text-white px-6">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Discover Amazing Products at Unbeatable Prices
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-200">
          Your one-stop destination for quality and affordability.
        </p>
        <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
