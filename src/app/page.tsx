"use client";
import Testimonials from "../../components/TestimonialsSection";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../lib/woocommerceApi";
import ProductCard from "../../components/ProductCard";
import HeroCarousel from "../../components/HeroCarousel";
import MarqueeBanner from "../../components/MarqueeBanner";
import AnimatedBackground from "../../components/AnimatedBackground";
import AboutUsSection from "../../components/AboutUs";
import HomeFAQ from "../../components/HomeFaq";


export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  description?: string;
  short_description?: string;
  images?: { src: string }[];
  attributes?: { option: string }[];
}

export default function Homepage() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const result = await fetchProducts();
      return result as Product[];
    },
  });

  return (
    <div className="min-h-screen bg-white pb-24 overflow-x-hidden transition-colors">
      <HeroCarousel />
      <MarqueeBanner/>
      <section className="relative mx-auto py-14 px-4">
        <AnimatedBackground/>
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900/20 via-gray-900/10 to-black/5 pointer-events-none" />
      
      {/* Elegant Floating Background Elements */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-500/30 to-pink-500/20 rounded-full blur-3xl opacity-15 animate-pulse" 
        style={{ animationDuration: '6s', animationDelay: '0s' }} 
      />
      <div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-violet-500/15 rounded-full blur-3xl opacity-12 animate-pulse" 
        style={{ animationDuration: '8s', animationDelay: '2s' }} 
      />
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-slate-600/25 to-gray-700/20 rounded-full blur-3xl opacity-10 animate-pulse" 
        style={{ animationDuration: '7s', animationDelay: '4s' }} 
      />
      <div 
        className="absolute top-40 right-1/4 w-48 h-48 bg-gradient-to-r from-amber-500/20 to-orange-500/15 rounded-full blur-3xl opacity-8 animate-pulse" 
        style={{ animationDuration: '9s', animationDelay: '1s' }} 
      />
      <div 
        className="absolute bottom-40 left-1/4 w-56 h-56 bg-gradient-to-r from-rose-400/25 to-pink-600/20 rounded-full blur-3xl opacity-14 animate-pulse" 
        style={{ animationDuration: '10s', animationDelay: '3s' }} 
      />
      <div 
        className="absolute top-10 right-20 w-40 h-40 bg-gradient-to-r from-indigo-500/15 to-purple-600/10 rounded-full blur-2xl opacity-12 animate-pulse" 
        style={{ animationDuration: '5s', animationDelay: '6s' }} 
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4 animate-fade-in">
            Signature Collection
          </h2>
          <p className="text-center text-gray-600 text-lg mb-2 max-w-2xl mx-auto animate-fade-in leading-relaxed">
            Discover our most coveted fragrances that capture desire and sophistication.
          </p>
          <p className="text-center text-gray-500 text-sm max-w-xl mx-auto animate-fade-in italic">
            For those who dare to make an unforgettable impression.
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center text-rose-500 animate-pulse flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Curating your perfect scents...
          </div>
        ) : error ? (
          <div className="text-center text-red-400 bg-red-900/20 border border-red-700/30 rounded-lg p-4 backdrop-blur-sm">
            Unable to load our signature collection.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {/* Only first 3 products */}
            {data?.slice(0, 4).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}

            {/* Optional 4th Column: Special Card with Image */}
            {/* <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-gray-900 shadow-xl p-6 border border-gray-800/50">
              <img
                src="/exclusive-collection.png"
                alt="Exclusive Collection"
                className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div> */}
          </div>
        )}
      </div>
      </section>
      <AboutUsSection/>
      <Testimonials />
      <HomeFAQ/>
    </div>
  );
}
