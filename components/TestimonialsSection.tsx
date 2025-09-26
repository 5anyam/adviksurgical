'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    quote: "Bite Me is absolutely intoxicating! I get compliments everywhere I go. The scent is seductive yet elegant - perfect for my evening dates. It lasts all night and makes me feel incredibly confident.",
    image: '/users/priya.jpeg',
    rating: 5,
    perfume: 'Bite Me',
    location: 'Mumbai'
  },
  {
    name: 'Arjun Khanna',
    quote: "Dark Knight has become my signature scent. It's bold, masculine, and mysterious - exactly what I was looking for. My colleagues always ask what fragrance I'm wearing. Absolutely love it!",
    image: '/users/arjun.jpeg',
    rating: 5,
    perfume: 'Dark Knight',
    location: 'Delhi'
  },
  {
    name: 'Kavya Patel',
    quote: "Midnight Desire is pure magic in a bottle. The fragrance is so sophisticated and alluring. I feel like a different person when I wear it - more confident and captivating. Worth every penny!",
    image: '/users/kavya.jpeg',
    rating: 5,
    perfume: 'Midnight Desire',
    location: 'Bangalore'
  },
  {
    name: 'Rohit Singh',
    quote: "Lusty Nights is incredible! The blend of spicy and woody notes is perfect for someone like me who wants to stand out. Great longevity and projection. My girlfriend is obsessed with this scent on me.",
    image: '/users/rohit.jpeg',
    rating: 5,
    perfume: 'Lusty Nights',
    location: 'Pune'
  }
];

const TestimonialsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    dotsClass: 'slick-dots custom-dots',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-rose-400 fill-rose-400' : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800/80 to-gray-800/80 backdrop-blur-xl px-6 py-3 rounded-full border border-rose-500/30 mb-8">
            <Quote className="w-5 h-5 text-rose-400" />
            <span className="text-sm font-medium text-rose-300">Real stories from satisfied souls</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 mb-6 leading-tight">
            What Our Customers Say
          </h2>
          <p className="text-gray-300 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover why thousands choose EDA Perfumes for their signature scent
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="testimonials-slider">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-3">
                <div className="relative bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-rose-500/20 transition-all duration-500 p-8 mx-2 group border border-gray-700/50 hover:border-rose-500/30 min-h-[400px] flex flex-col">
                  
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="p-3 bg-gradient-to-br from-rose-500/20 to-pink-600/20 rounded-full border border-rose-400/30">
                      <Quote className="w-6 h-6 text-rose-400" />
                    </div>
                  </div>
                  
                  {/* Profile Section */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-600/20 p-1 border border-rose-400/30">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-white font-bold text-lg mb-1">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{testimonial.location}</p>
                    <div className="inline-flex items-center gap-2 bg-rose-900/30 px-3 py-1 rounded-full border border-rose-600/40">
                      <span className="text-rose-400 text-sm font-medium">{testimonial.perfume}</span>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6 flex-1 italic">
                    {testimonial.quote}
                  </blockquote>

                  {/* Rating */}
                  <div className="mt-auto">
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-slate-800/80 to-gray-800/80 backdrop-blur-xl px-8 py-4 rounded-full border border-rose-500/30">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <Image
                  key={index}
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border-2 border-rose-500/50 object-cover"
                />
              ))}
            </div>
            <div className="text-left">
              <p className="text-rose-300 font-semibold text-sm">Join 5,000+ satisfied customers</p>
              <p className="text-gray-400 text-xs">Experience the scent of seduction</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials-slider .custom-dots {
          bottom: -60px;
          display: flex !important;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        .testimonials-slider .custom-dots li {
          margin: 0;
          width: auto;
          height: auto;
        }
        .testimonials-slider .custom-dots li button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(156, 163, 175, 0.5);
          border: 2px solid transparent;
          transition: all 0.3s ease;
          padding: 0;
        }
        .testimonials-slider .custom-dots li button:before {
          display: none;
        }
        .testimonials-slider .custom-dots li.slick-active button {
          background: linear-gradient(135deg, #f43f5e, #ec4899);
          border-color: rgba(244, 63, 94, 0.3);
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(244, 63, 94, 0.4);
        }
        .testimonials-slider .custom-dots li button:hover {
          background: rgba(244, 63, 94, 0.7);
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default TestimonialsCarousel;
