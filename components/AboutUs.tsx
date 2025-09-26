import React, { useState } from 'react';
import { 
  Sparkles, Heart, Crown, Shield, Star, 
  Flame, ArrowRight, Gift, Moon, Sun
} from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  gradient: string;
};

type FeatureCardProps = {
  item: Feature;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  className?: string;
};

const FeatureCard = ({ item, isHovered, onHover, onLeave, className = "" }: FeatureCardProps) => (
  <div 
    className={`group relative bg-white backdrop-blur-sm rounded-2xl p-6 lg:p-8 transition-all duration-500 cursor-pointer border border-gray-200 shadow-lg
      ${isHovered ? 'scale-105 shadow-2xl shadow-rose-500/20' : 'hover:scale-102 hover:shadow-xl hover:shadow-rose-500/10'}
      ${className}`}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
    
    <div className="relative z-10">
      <div className="mb-6 flex justify-center">
        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200">
          {item.icon}
        </div>
      </div>
      <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 text-center group-hover:text-rose-600 transition-colors">
        {item.title}
      </h3>
      <p className="text-sm lg:text-base text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors">
        {item.desc}
      </p>
      <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <ArrowRight className="w-5 h-5 text-rose-500" />
      </div>
    </div>
  </div>
);

export default function AboutUsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const features: Feature[] = [
    {
      icon: <Crown className="text-rose-500 w-8 h-8" />,
      title: 'Luxury Craftsmanship',
      desc: 'Each fragrance is meticulously crafted using premium ingredients and artisan techniques for an unparalleled olfactory experience.',
      gradient: 'from-rose-500/20 to-pink-600/20'
    },
    {
      icon: <Heart className="text-purple-500 w-8 h-8" />,
      title: 'Seductive Allure',
      desc: 'Designed for those who dare to make a statement, our fragrances embody confidence, passion, and irresistible charm.',
      gradient: 'from-purple-500/20 to-violet-600/20'
    },
    {
      icon: <Moon className="text-indigo-500 w-8 h-8" />,
      title: 'After Dark Collection',
      desc: 'Perfect for those magical moments after sunset, when inhibitions fade and true desires emerge.',
      gradient: 'from-indigo-500/20 to-blue-600/20'
    }
  ];

  const trustFactors: Feature[] = [
    {
      icon: <Shield className="text-emerald-500 w-8 h-8" />,
      title: 'Long-Lasting Formula',
      desc: 'Premium EDP concentration ensures your signature scent lingers beautifully from dusk till dawn.',
      gradient: 'from-emerald-500/20 to-green-600/20'
    },
    {
      icon: <Star className="text-amber-500 w-8 h-8" />,
      title: 'Unisex Appeal',
      desc: 'Expertly balanced fragrances that captivate regardless of gender - true luxury knows no boundaries.',
      gradient: 'from-amber-500/20 to-orange-600/20'
    },
    {
      icon: <Gift className="text-pink-500 w-8 h-8" />,
      title: 'Elegant Presentation',
      desc: 'Each bottle is a work of art, perfect for gifting or adding sophistication to your collection.',
      gradient: 'from-pink-500/20 to-rose-600/20'
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50 py-20 overflow-hidden">
      {/* Light Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-200/30 to-pink-200/20 rounded-full blur-3xl opacity-60 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-200/25 to-violet-200/15 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-gray-200/30 to-slate-200/20 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute top-10 right-20 w-48 h-48 bg-gradient-to-r from-amber-200/25 to-orange-200/15 rounded-full blur-2xl opacity-45 animate-pulse" style={{ animationDuration: '10s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-rose-200 shadow-sm mb-8">
            <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
            <span className="text-sm font-medium text-rose-600">Trusted by seductive souls worldwide</span>
          </div>
          
          {/* Brand Image */}
          <div className="mb-12">
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Brand logo circle */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-100/80 via-pink-50/60 to-purple-100/40 backdrop-blur-sm border border-rose-200 shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 mb-4">
                    EDA
                  </div>
                  <div className="text-lg lg:text-xl text-rose-500 font-medium tracking-[0.2em]">
                    PERFUMES
                  </div>
                </div>
              </div>
              {/* Floating fragrance bottles around the logo */}
              <div className="absolute -top-4 -right-4 w-16 h-20 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg border border-gray-200 transform rotate-12"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-20 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg border border-gray-200 transform -rotate-12"></div>
              <div className="absolute top-1/2 -left-8 w-12 h-16 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg border border-gray-200 transform -rotate-45"></div>
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 mb-8 leading-tight">
            Where Desire Meets<br />
            <span className="text-3xl sm:text-4xl lg:text-5xl">Sophisticated Fragrance</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
            At <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">EDA Perfumes</span>, 
            we craft <span className='font-bold text-rose-600'>seductive fragrances that whisper secrets and make promises.</span>
            Our collection embodies the perfect balance of sophistication and temptation - for those who play after dark.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['🌹 Seductive Blends', '💎 Premium Quality', '🌙 After Dark Collection'].map((label, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-rose-200 shadow-sm">
                <span className="text-base lg:text-lg font-semibold text-rose-600">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-200 shadow-sm mb-8">
            <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
            <span className="text-sm font-medium text-purple-600">The art of seduction in every bottle</span>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 mb-6">
            Our Signature Philosophy
          </h3>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {features.map((item, index) => (
            <FeatureCard 
              key={index}
              item={item}
              isHovered={hoveredCard === `feature-${index}`}
              onHover={() => setHoveredCard(`feature-${index}`)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* Trust Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 shadow-sm mb-8">
            <Crown className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600">Premium luxury you can trust</span>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 mb-6">
            Why Choose EDA?
          </h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            We believe that fragrance is more than just scent - it is your signature, your confidence, your secret weapon. 
            Every bottle tells a story of passion, sophistication, and irresistible allure.
          </p>
        </div>

        {/* Trust Factors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {trustFactors.map((item, index) => (
            <FeatureCard 
              key={index}
              item={item}
              isHovered={hoveredCard === `trust-${index}`}
              onHover={() => setHoveredCard(`trust-${index}`)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 p-1 rounded-2xl inline-block shadow-xl">
            <div className="bg-white rounded-xl px-8 lg:px-12 py-8">
              <div className="mb-6">
                <Sun className="w-12 h-12 text-rose-500 mx-auto animate-pulse" />
              </div>
              <h4 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Ready to Embrace Your Desires?</h4>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Join the exclusive circle of those who are not afraid to make a statement and leave an unforgettable impression.
              </p>
              <button className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-rose-500/25 group">
                <span className="flex items-center gap-3">
                  Explore Our Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
