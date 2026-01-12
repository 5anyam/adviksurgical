'use client';

import React, { useState } from 'react';
import { 
  Activity, Shield, Award, Building2, Users, Wrench, Sparkles, BedDouble, Stethoscope
} from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

type FeatureCardProps = {
  item: Feature;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
};

// FeatureCard Component with Medical Blue Theme
function FeatureCard({ item, isHovered, onHover, onLeave }: FeatureCardProps) {
  return (
    <div 
      className={`group bg-white rounded-2xl p-8 transition-all duration-300 cursor-pointer border-2 border-[#0077BE]/30 hover:border-[#0077BE] hover:shadow-xl hover:scale-105 ${
        isHovered ? 'shadow-xl border-[#0077BE] bg-gradient-to-br from-[#F0F8FF] to-white' : ''
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="mb-6 flex justify-center">
        <div className="p-4 rounded-full border-2 border-[#0077BE] bg-gradient-to-br from-[#0077BE]/10 to-[#00A3E0]/10 group-hover:scale-110 transition-transform duration-300 shadow-md">
          {item.icon}
        </div>
      </div>
      <h3 className="text-lg font-bold text-[#003D5C] mb-3 text-center tracking-wide">
        {item.title}
      </h3>
      <p className="text-sm text-[#003D5C] text-center leading-relaxed font-light">
        {item.desc}
      </p>
    </div>
  );
}

// Main AboutUsSection Component
export default function AboutUsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const philosophy: Feature[] = [
    {
      icon: <Shield className="text-[#0077BE] w-7 h-7" />,
      title: 'Quality Assured',
      desc: 'We believe in excellence. All our products are ISO certified and manufactured to meet hospital-grade standards with rigorous quality control.',
    },
    {
      icon: <Activity className="text-[#0077BE] w-7 h-7" />,
      title: 'Healthcare Focus',
      desc: 'Designed specifically for modern healthcare facilities with emphasis on durability, safety, and patient comfort.',
    },
    {
      icon: <Building2 className="text-[#0077BE] w-7 h-7" />,
      title: 'Hospitals First',
      desc: 'We prioritize healthcare professionals and patients by providing reliable equipment that supports quality medical care.',
    }
  ];

  const commitment: Feature[] = [
    {
      icon: <Wrench className="text-[#0077BE] w-7 h-7" />,
      title: 'Manufacturing Excellence',
      desc: 'Every product is manufactured with precision using premium materials and modern production techniques.',
    },
    {
      icon: <Award className="text-[#0077BE] w-7 h-7" />,
      title: 'ISO Certification',
      desc: 'From design to delivery, we maintain strict compliance with international quality standards and safety regulations.',
    },
    {
      icon: <Users className="text-[#0077BE] w-7 h-7" />,
      title: 'Customer Support',
      desc: 'Your satisfaction is our mission. We provide comprehensive support from consultation to after-sales service.',
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white via-[#F0F8FF] to-white py-20 lg:py-24 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0077BE]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A3E0]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Our Story</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl text-center lg:text-5xl font-bold bg-gradient-to-r from-[#0077BE] via-[#003D5C] to-[#0077BE] bg-clip-text text-transparent mb-6 tracking-wide">
            About Advik Surgical
          </h2>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#0077BE] via-[#00A3E0] to-[#0077BE] mx-auto mb-8 rounded-full shadow-sm"></div>
          
          <p className="text-base lg:text-lg text-[#003D5C] max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            At Advik Surgical, we are committed to delivering the finest quality hospital furniture and medical equipment 
            to healthcare facilities across India. With a passion for healthcare excellence, we manufacture, supply, 
            and install premium medical equipment that supports quality patient care and enhances hospital operations.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="mb-20 lg:mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#003D5C] mb-4 tracking-wide">
              Our Philosophy
            </h3>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {philosophy.map((item, index) => (
              <FeatureCard 
                key={`philosophy-${index}`}
                item={item}
                isHovered={hoveredCard === `philosophy-${index}`}
                onHover={() => setHoveredCard(`philosophy-${index}`)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16 bg-gradient-to-b from-[#F0F8FF] via-[#E6F3FF]/30 to-white rounded-3xl border-2 border-[#0077BE]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#003D5C] mb-4 tracking-wide">
              Our Commitment
            </h3>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] mx-auto mb-6 rounded-full"></div>
            <p className="text-base text-[#003D5C] max-w-2xl mx-auto font-light leading-relaxed">
              We believe that quality medical equipment is essential for excellent healthcare. That is why we provide 
              hospital-grade furniture and equipment directly to medical facilities, ensuring reliability and durability at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {commitment.map((item, index) => (
              <FeatureCard 
                key={`commitment-${index}`}
                item={item}
                isHovered={hoveredCard === `commitment-${index}`}
                onHover={() => setHoveredCard(`commitment-${index}`)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { number: '100+', label: 'Products', icon: <BedDouble className="w-6 h-6" /> },
              { number: '500+', label: 'Happy Clients', icon: <Building2 className="w-6 h-6" /> },
              { number: '7+', label: 'Years Experience', icon: <Award className="w-6 h-6" /> },
              { number: '15+', label: 'States Covered', icon: <Stethoscope className="w-6 h-6" /> }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-white border-2 border-[#0077BE]/20 rounded-2xl hover:border-[#0077BE] hover:shadow-lg transition-all">
                <div className="flex justify-center mb-3 text-[#0077BE]">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-[#0077BE] mb-2">{stat.number}</div>
                <div className="text-sm text-[#003D5C] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Medical Blue Premium Design */}
      <div className="text-center mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#003D5C] via-[#0077BE] to-[#003D5C] rounded-3xl p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A3E0]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0077BE]/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Get Started</span>
              </div>
              
              <h4 className="text-2xl lg:text-4xl font-bold mb-6 tracking-wide">
                Partner With Us for Your Healthcare Needs
              </h4>
              <p className="text-white/90 mb-10 font-light text-lg max-w-xl mx-auto">
                Discover premium hospital furniture and medical equipment designed for excellence in patient care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-[#003D5C] bg-white hover:bg-[#F0F8FF] transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <BedDouble className="w-5 h-5 text-[#0077BE]" />
                  Browse Products
                </a>
                <a 
                  href="https://wa.me/917052500888?text=Hi,%20I%20want%20to%20enquire%20about%20hospital%20furniture%20and%20medical%20equipment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Get Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
