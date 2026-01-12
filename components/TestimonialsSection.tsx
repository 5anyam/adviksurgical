'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import { Star, Sparkles, Building2 } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Rajesh Sharma',
    designation: 'Medical Superintendent',
    quote: "We've equipped our entire ICU wing with Advik Surgical's beds and equipment. The quality is exceptional, ISO certified, and their after-sales support is outstanding. Highly recommended for any healthcare facility.",
    image: '/users/doctor-male.jpg',
    rating: 5,
    product: 'ICU Beds & Equipment',
    location: 'Apollo Hospital, Delhi',
    facility: 'Multi-Specialty Hospital'
  },
  {
    name: 'Mr. Anil Kumar',
    designation: 'Procurement Manager',
    quote: "Advik Surgical provided complete OT setup for our new facility. From tables to lights, everything is hospital-grade quality. Their team handled installation professionally and delivered on time.",
    image: '/users/manager-male.jpg',
    rating: 5,
    product: 'OT Equipment Setup',
    location: 'Max Healthcare, Gurgaon',
    facility: 'Super Specialty Hospital'
  },
  {
    name: 'Dr. Priya Desai',
    designation: 'Chief of Surgery',
    quote: "The medical trolleys and emergency equipment from Advik are durable and well-designed. After 2 years of intensive use, they still function perfectly. Great value for investment.",
    image: '/users/doctor-female.jpg',
    rating: 5,
    product: 'Medical Trolleys',
    location: 'Fortis Hospital, Mumbai',
    facility: 'Tertiary Care Center'
  },
  {
    name: 'Mr. Suresh Patel',
    designation: 'Hospital Administrator',
    quote: "We ordered oxygen manifold systems and bed head panels for our 150-bed facility. Advik's technical team ensured proper installation and training. Competitive pricing with excellent quality.",
    image: '/users/admin-male.jpg',
    rating: 5,
    product: 'Oxygen Systems',
    location: 'City Hospital, Ahmedabad',
    facility: 'District Hospital'
  }
];

const TestimonialsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    cssEase: 'ease-in-out',
    dotsClass: 'slick-dots custom-dots',
    adaptiveHeight: true,
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
            className={`w-5 h-5 ${
              i < rating ? 'text-[#0077BE] fill-[#0077BE]' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-white via-[#F0F8FF] to-[#E6F3FF]/30 py-20 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0077BE]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A3E0]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Client Testimonials</span>
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-6 h-6 text-[#0077BE] fill-[#0077BE]" />
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#0077BE] via-[#003D5C] to-[#0077BE] bg-clip-text text-transparent tracking-wide">
              What Healthcare Professionals Say
            </h2>
            <Star className="w-6 h-6 text-[#0077BE] fill-[#0077BE]" />
          </div>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#0077BE] via-[#00A3E0] to-[#0077BE] mx-auto mb-4 rounded-full shadow-sm"></div>
          <p className="text-[#003D5C] text-base font-light max-w-2xl mx-auto">
            Trusted by leading hospitals and healthcare facilities across India for quality and reliability
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="testimonials-slider">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="bg-white border-2 border-[#0077BE]/30 p-8 min-h-[480px] flex flex-col hover:shadow-2xl hover:border-[#0077BE] hover:scale-105 transition-all duration-300 rounded-2xl">
                  
                  {/* Profile Section */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0077BE]/20 to-[#00A3E0]/20 mb-4 overflow-hidden border-4 border-[#0077BE]/30 shadow-md">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=0077BE&color=fff&size=80`;
                        }}
                      />
                    </div>
                    
                    <h3 className="text-[#003D5C] font-bold text-lg mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-[#0077BE] text-sm font-semibold mb-2">
                      {testimonial.designation}
                    </p>
                    <p className="text-gray-600 text-xs mb-3 font-light flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {testimonial.location}
                    </p>
                    <div className="text-white text-xs font-bold tracking-wide bg-gradient-to-r from-[#0077BE] to-[#00A3E0] px-4 py-1.5 rounded-full shadow-md">
                      {testimonial.product}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Quote */}
                  <blockquote className="text-[#003D5C] text-sm leading-relaxed flex-1 text-center mb-4">
                    {testimonial.quote}
                  </blockquote>

                  {/* Facility Type Badge */}
                  <div className="text-center">
                    <span className="inline-block text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      {testimonial.facility}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-white border-2 border-[#0077BE]/30 rounded-2xl hover:border-[#0077BE] hover:shadow-xl transition-all">
            <div className="text-4xl font-bold text-[#0077BE] mb-2">500+</div>
            <p className="text-[#003D5C] font-semibold">Healthcare Facilities</p>
            <p className="text-gray-600 text-sm font-light">Across India</p>
          </div>
          
          <div className="text-center p-6 bg-white border-2 border-[#0077BE]/30 rounded-2xl hover:border-[#0077BE] hover:shadow-xl transition-all">
            <div className="text-4xl font-bold text-[#0077BE] mb-2">7+</div>
            <p className="text-[#003D5C] font-semibold">Years Experience</p>
            <p className="text-gray-600 text-sm font-light">In Healthcare Industry</p>
          </div>
          
          <div className="text-center p-6 bg-white border-2 border-[#0077BE]/30 rounded-2xl hover:border-[#0077BE] hover:shadow-xl transition-all">
            <div className="text-4xl font-bold text-[#0077BE] mb-2">100+</div>
            <p className="text-[#003D5C] font-semibold">Premium Products</p>
            <p className="text-gray-600 text-sm font-light">ISO Certified Equipment</p>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 border-2 border-[#0077BE]/40 bg-white px-8 py-4 rounded-2xl hover:border-[#0077BE] hover:shadow-2xl transition-all duration-300">
            <Building2 className="w-8 h-8 text-[#0077BE]" />
            <div className="text-left">
              <p className="text-[#003D5C] font-bold text-base flex items-center gap-2">
                Trusted by Leading Hospitals
              </p>
              <p className="text-gray-600 text-sm font-light">
                Apollo • Max • Fortis • Medanta • and many more
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials-slider .custom-dots {
          bottom: -50px;
          display: flex !important;
          justify-content: center;
          align-items: center;
          gap: 12px;
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
          background: #d1d5db;
          border: none;
          transition: all 0.3s ease;
          padding: 0;
        }
        .testimonials-slider .custom-dots li button:before {
          display: none;
        }
        .testimonials-slider .custom-dots li.slick-active button {
          background: linear-gradient(135deg, #0077BE, #00A3E0);
          width: 32px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 119, 190, 0.4);
        }
        .testimonials-slider .custom-dots li button:hover {
          background: #0077BE;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default TestimonialsCarousel;
