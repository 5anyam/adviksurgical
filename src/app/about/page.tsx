"use client"
import React, { useState } from 'react';
import { Heart, Crown, Star, Award, ChevronRight, X, Sparkles, Moon, Gift } from 'lucide-react';

// Modal Component for Consultation
function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
      >
        Discover Your Signature Scent
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Find Your Perfect Fragrance</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <textarea
                placeholder="Tell us about your fragrance preferences..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              ></textarea>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 rounded-lg font-bold transition-all duration-300"
              >
                Get Personalized Recommendations
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-br from-gray-50 via-white to-rose-50">
      <div className="max-w-6xl mt-24 lg:mt-0 mx-auto px-4 py-12 space-y-20">
        {/* Hero Section */}
        <section className="text-center">
          <div className="inline-flex items-center bg-rose-100 text-rose-700 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-rose-200">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Where Desire Meets Sophistication
          </div>
          <h1 className="text-5xl lg:text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 leading-tight">
            About EDA Perfumes
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Crafting seductive fragrances for those who dare to make a statement and are not afraid to embrace their desires.
          </p>
        </section>
        
        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-rose-200 via-pink-200 to-purple-200 rounded-3xl flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <Heart className="w-20 h-20 text-rose-600 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold text-rose-800">Seductive Elegance</h3>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-xl">
              <Crown className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-black mb-6 text-gray-800">Your Signature of Seduction</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At EDA Perfumes, we understand that fragrance is more than just scent – its your confidence, your secret weapon, your signature of allure. Our collection embodies the perfect balance of sophistication and temptation, crafted for those who play after dark.
            </p>
            <div className="flex items-center text-rose-600 font-semibold hover:text-rose-700 transition-colors cursor-pointer">
              <span>Discover Our Legacy</span>
              <ChevronRight className="w-5 h-5 ml-2 transition-transform hover:translate-x-1" />
            </div>
          </div>
        </section>

        {/* Why Choose EDA */}
        <section className="bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 p-10 rounded-3xl border border-rose-200 shadow-lg">
          <h2 className="text-3xl lg:text-4xl font-black mb-8 text-center text-gray-800">Why Choose EDA?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-200 group-hover:scale-110 transition-transform">
                <Crown className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Luxury Craftsmanship</h3>
              <p className="text-gray-600">Premium ingredients and artisan techniques for unparalleled olfactory experience</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-200 group-hover:scale-110 transition-transform">
                <Moon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">After Dark Collection</h3>
              <p className="text-gray-600">Perfect for those magical moments when inhibitions fade and desires emerge</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-200 group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Unisex Appeal</h3>
              <p className="text-gray-600">Expertly balanced fragrances that captivate regardless of gender</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Long-Lasting Formula</h3>
              <p className="text-gray-600">Premium EDP concentration ensures your scent lingers from dusk till dawn</p>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black mb-6 text-gray-800">Our Philosophy</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We believe that the right fragrance does not just complement your personality – it amplifies it. Every bottle tells a story of passion, sophistication, and irresistible allure.
            </p>
            <div className="bg-rose-50 p-6 rounded-2xl border-l-4 border-rose-500 shadow-lg">
              <h3 className="font-bold text-rose-800 mb-2">Our Promise</h3>
              <p className="text-rose-700">
                Each fragrance is a masterpiece of seduction, designed to leave an unforgettable impression and whisper secrets that make hearts race.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-purple-200 via-pink-200 to-rose-200 rounded-3xl flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <Gift className="w-20 h-20 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-purple-800">Elegant Presentation</h3>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>
        </section>

        {/* Our Collection Journey */}
        <section>
          <h2 className="text-3xl lg:text-4xl font-black mb-8 text-center text-gray-800">Your Fragrance Journey</h2>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Explore our seductive collection of premium fragrances" },
              { step: "02", title: "Selection", desc: "Choose your signature scent that matches your personality" },
              { step: "03", title: "Experience", desc: "Feel the confidence and allure of our premium EDP" },
              { step: "04", title: "Captivate", desc: "Make an unforgettable impression wherever you go" },
              { step: "05", title: "Signature", desc: "Embrace your unique scent of seduction and sophistication" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:shadow-xl">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-rose-600 transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why EDA Detailed */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-rose-300 via-pink-300 to-purple-300 rounded-3xl flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-12 h-12 text-rose-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Passion + Sophistication</h3>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-black mb-6 text-gray-800">The EDA Difference</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We do not just create fragrances – we craft experiences. Our master perfumers blend the finest ingredients to create scents that embody confidence, passion, and irresistible charm.
            </p>
            <div className="space-y-4">
              <div className="flex items-start group">
                <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                <p className="text-gray-700 group-hover:text-rose-600 transition-colors">Premium EDP concentration for maximum longevity</p>
              </div>
              <div className="flex items-start group">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                <p className="text-gray-700 group-hover:text-pink-600 transition-colors">Carefully curated ingredients from around the world</p>
              </div>
              <div className="flex items-start group">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                <p className="text-gray-700 group-hover:text-purple-600 transition-colors">Elegant packaging perfect for gifting</p>
              </div>
              <div className="flex items-start group">
                <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                <p className="text-gray-700 group-hover:text-rose-600 transition-colors">Designed for those who dare to be different</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="relative z-10">
            <Sparkles className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl lg:text-5xl font-black mb-4">Ready to Embrace Your Desires?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join the exclusive circle of those who are not afraid to make a statement and leave an unforgettable impression.
            </p>
            <ConsultationModal />
          </div>
        </section>
      </div>
    </main>
  );
}
