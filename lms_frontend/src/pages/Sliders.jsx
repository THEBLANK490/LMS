import React, { useState } from 'react';

function Sliders() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      testimonial: " Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      name: "Jane Smith",
      testimonial: " Nulla facilisi. Sed ac consectetur libero.",
    },
    {
      id: 3,
      name: "Alice Johnson",
      testimonial: " Aliquam convallis tellus ut semper malesuada.",
    },
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    
    <div className="relative p-10 m-5 overflow-hidden">
      <div className="rounded-lg">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out transform ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="pl-12 py-3 bg-white shadow">
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              <p className='text-xl italic font-medium leading-relaxed text-gray-900'>"{testimonial.testimonial}"</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
        onClick={prevSlide}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
        onClick={nextSlide}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}

export default Sliders;
