"use client";
import Testimonials from "../../components/TestimonialsSection";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../lib/woocommerceApi";
import ProductCard from "../../components/ProductCard";
import HeroCarousel from "../../components/HeroCarousel";
import AboutUsSection from "../../components/AboutUs";
import HomeFAQ from "../../components/HomeFaq";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Activity, Award, ShieldCheck, Truck, Sparkles, Star, Building2, Stethoscope, BedDouble, ClipboardList } from 'lucide-react';
import { useRef } from 'react';

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  description?: string;
  short_description?: string;
  images?: { src: string }[];
  categories?: { id: number; name: string; slug?: string }[];
  attributes?: { option: string }[];
  average_rating?: string;
  rating_count?: number;
}

// Loading Skeleton Component
const ProductSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden border-2 border-[#0077BE]/20 shadow-sm">
    <div className="aspect-square bg-gradient-to-br from-[#E6F3FF]/30 to-[#0077BE]/10 animate-pulse" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-[#0077BE]/20 rounded animate-pulse" />
      <div className="h-3 bg-[#0077BE]/10 rounded w-2/3 animate-pulse" />
    </div>
  </div>
);

export default function Homepage() {
  const allProductsSliderRef = useRef<HTMLDivElement>(null);

  // React Query configuration
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["homepage-products"],
    queryFn: async () => {
      const result = await fetchProducts();
      return (result || []) as Product[];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const all = Array.isArray(data) ? data : [];

  // Scroll function for all products
  const scrollAllProducts = (direction: 'left' | 'right') => {
    if (allProductsSliderRef.current) {
      const scrollAmount = 300;
      allProductsSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F0F8FF] to-white pb-16 overflow-x-hidden">
      <HeroCarousel />

      {/* Trust Badges Section */}
      <section className="py-16 bg-gradient-to-b from-[#F0F8FF] via-[#E6F3FF]/20 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0077BE]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00A3E0]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white px-6 py-2 rounded-full mb-4 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">Why Choose Advik Surgical</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Quality Certified", desc: "ISO compliant products" },
              { icon: Award, title: "Premium Grade", desc: "Hospital-grade equipment" },
              { icon: Activity, title: "Trusted by Hospitals", desc: "Pan-India presence" },
              { icon: Truck, title: "Fast Delivery", desc: "On-time installation" }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-[#0077BE]/30 hover:shadow-xl hover:scale-105 hover:border-[#0077BE] transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0077BE] to-[#00A3E0] rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-[#003D5C] mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-[#0077BE] fill-[#0077BE]" />
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#0077BE] via-[#003D5C] to-[#0077BE] bg-clip-text text-transparent tracking-wide">
                Our Products
              </h2>
              <Star className="w-5 h-5 text-[#0077BE] fill-[#0077BE]" />
            </div>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#0077BE] via-[#00A3E0] to-[#0077BE] mx-auto mb-4 rounded-full shadow-sm"></div>
            <p className="text-gray-700 text-base max-w-2xl mx-auto font-light">
              Premium hospital furniture and medical equipment. ISO certified and hospital-grade quality.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <div className="bg-gradient-to-br from-[#F0F8FF] to-white rounded-2xl p-8 max-w-md mx-auto border-2 border-[#0077BE]/30 shadow-lg">
                <p className="text-gray-700 mb-4 font-medium">Unable to load products</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white text-sm font-semibold hover:from-[#00A3E0] hover:to-[#005A8C] transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          ) : all.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-[#F0F8FF] to-white rounded-2xl border-2 border-[#0077BE]/30 p-8">
              <p className="text-gray-700 font-medium">No products available at the moment.</p>
              <p className="text-sm text-gray-600 mt-2">Please check back later.</p>
            </div>
          ) : (
            <>
              {/* Desktop: Horizontal Slider */}
              <div className="hidden lg:block relative group">
                <button
                  onClick={() => scrollAllProducts('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gradient-to-r hover:from-[#0077BE] hover:to-[#00A3E0] hover:text-white text-[#0077BE] p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 border-[#0077BE]"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div
                  ref={allProductsSliderRef}
                  className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
                >
                  {all.map((prod) => (
                    <div key={prod.id} className="flex-shrink-0 w-72">
                      <ProductCard product={prod} />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollAllProducts('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gradient-to-r hover:from-[#0077BE] hover:to-[#00A3E0] hover:text-white text-[#0077BE] p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 border-[#0077BE]"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile & Tablet: Grid */}
              <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {all.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>

              {/* View All Button */}
              {all.length > 8 && (
                <div className="mt-12 flex justify-center">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-10 py-4 text-base font-bold text-white bg-gradient-to-r from-[#0077BE] to-[#00A3E0] hover:from-[#00A3E0] hover:to-[#005A8C] transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    <span>View All Products</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#003D5C] via-[#0077BE] to-[#003D5C] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A3E0]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0077BE]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full mb-6 border border-white/30">
              <ClipboardList className="w-4 h-4" />
              <span className="text-sm font-semibold">Product Categories</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Complete Healthcare Solutions
            </h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              From ICU beds to operation theatre equipment, we provide comprehensive medical furniture solutions for hospitals and healthcare facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BedDouble, title: "ICU & Hospital Beds", desc: "Electric, manual & fowler beds", count: "50+" },
              { icon: Activity, title: "OT Equipment", desc: "Tables, lights & pendants", count: "40+" },
              { icon: Stethoscope, title: "Medical Trolleys", desc: "Emergency & medicine trolleys", count: "30+" },
              { icon: Building2, title: "Gas Systems", desc: "Oxygen manifolds & panels", count: "25+" }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{item.desc}</p>
                  <div className="text-[#00D9FF] font-bold text-lg">{item.count} Products</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AboutUsSection />
      <Testimonials />
      <HomeFAQ />

      {/* Bulk Order & Hospital Setup Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#003D5C] via-[#0077BE] to-[#003D5C] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A3E0]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0077BE]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full mb-6 border border-white/30">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-semibold">For Hospitals & Clinics</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Complete Hospital Setup Solutions
          </h2>
          <p className="text-xl mb-10 text-white/90 max-w-3xl mx-auto">
            Bulk orders, custom requirements, and complete hospital furniture setup. 
            We cater to hospitals, nursing homes, and healthcare facilities across India.
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
            {/* Bulk Orders */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Bulk Orders</h3>
              <p className="text-white/80 text-sm">
                Special pricing for hospitals and bulk requirements
              </p>
            </div>

            {/* Custom Solutions */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Custom Solutions</h3>
              <p className="text-white/80 text-sm">
                Tailored equipment as per your specific requirements
              </p>
            </div>

            {/* Installation Support */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Installation Support</h3>
              <p className="text-white/80 text-sm">
                Professional installation and after-sales service
              </p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-8 mb-10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Why Partner With Advik Surgical?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00D9FF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-white/90 text-base">ISO certified products</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00D9FF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-white/90 text-base">Hospital-grade quality</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00D9FF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-white/90 text-base">Competitive bulk pricing</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00D9FF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-white/90 text-base">Pan-India delivery</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00D9FF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-white/90 text-base">Professional installation</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00D9FF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-white/90 text-base">After-sales support</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/917052500888?text=Hi,%20I%20want%20to%20enquire%20about%20hospital%20furniture%20and%20medical%20equipment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-bold text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-300 rounded-full shadow-2xl hover:shadow-green-500/50 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp: +91-7052500888</span>
            </a>

            <a
              href="tel:+918840215794"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-bold text-[#0077BE] bg-white hover:bg-gray-100 transition-all duration-300 rounded-full shadow-2xl hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              <span>Call: +91-8840215794</span>
            </a>
          </div>
          
          <p className="text-white/70 text-sm mt-6">
            Serving hospitals, nursing homes & healthcare facilities across India
          </p>
        </div>
      </section>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
