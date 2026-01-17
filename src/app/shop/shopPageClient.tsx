'use client';

import { useState, useMemo } from 'react';
import ProductCard from "../../../components/ProductCard";
import { Product } from "./page";
import { SlidersHorizontal, X, Search, Award, Phone, MessageCircle } from 'lucide-react';

interface ShopPageClientProps {
  products: Product[];
}

type ProductWithSlug = Product & {
  slug: string;
  regular_price: string;
};

export default function ShopPageClient({ products }: ShopPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(product => {
      product.categories?.forEach(cat => cats.add(cat.name));
    });
    return Array.from(cats);
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      if (selectedCategory && !product.categories?.some(cat => cat.name === selectedCategory)) {
        return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
          return b.id - a.id;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F0F8FF] to-white">
      {/* Hero Section - Medical Blue Theme */}
      <div className="border-b-2 border-[#0077BE]/30 bg-gradient-to-b from-[#F0F8FF] to-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">ISO Certified Equipment</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#0077BE] via-[#003D5C] to-[#0077BE] bg-clip-text text-transparent mb-4 tracking-wide">
              Medical Equipment Catalog
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#0077BE] via-[#00A3E0] to-[#0077BE] mx-auto mb-6 rounded-full shadow-sm"></div>
            <p className="text-base text-[#003D5C] max-w-2xl mx-auto font-light">
              Browse our comprehensive range of hospital-grade furniture and medical equipment
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar - Medical Blue Theme */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#0077BE]" />
            <input
              type="text"
              placeholder="Search medical equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-4 pl-12 border-2 border-[#0077BE]/30 rounded-xl focus:border-[#0077BE] focus:outline-none transition-colors bg-white text-[#003D5C] placeholder:text-gray-400 font-light shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0077BE] hover:text-[#00A3E0] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Toggle - Mobile */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white py-3.5 px-6 text-sm font-bold rounded-xl hover:from-[#00A3E0] hover:to-[#005A8C] transition-all shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar - Medical Blue Theme */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-gradient-to-b from-[#F0F8FF] to-white border-2 border-[#0077BE]/30 p-6 rounded-2xl sticky top-6 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-base font-bold text-[#003D5C] tracking-wide uppercase flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#0077BE]" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#0077BE] hover:text-[#00A3E0] font-bold tracking-wide uppercase"
                >
                  Clear
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-[#003D5C] mb-3 uppercase tracking-widest">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#0077BE]/30 rounded-lg focus:border-[#0077BE] focus:outline-none text-[#003D5C] font-medium text-sm bg-white"
                >
                  <option value="">All Equipment</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-[#003D5C] mb-3 uppercase tracking-widest">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#0077BE]/30 rounded-lg focus:border-[#0077BE] focus:outline-none text-[#003D5C] font-medium text-sm bg-white"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Active Filters */}
              {(searchTerm || selectedCategory) && (
                <div className="border-t-2 border-[#0077BE]/20 pt-6">
                  <h3 className="text-xs font-bold text-[#003D5C] mb-3 uppercase tracking-widest">
                    Active Filters
                  </h3>
                  <div className="space-y-2">
                    {searchTerm && (
                      <div className="text-xs text-[#003D5C] font-medium bg-[#0077BE]/10 px-3 py-2 rounded-lg">
                        Search: {searchTerm}
                      </div>
                    )}
                    {selectedCategory && (
                      <div className="text-xs text-[#003D5C] font-medium bg-[#0077BE]/10 px-3 py-2 rounded-lg">
                        Category: {selectedCategory}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Contact Card */}
              <div className="mt-8 border-t-2 border-[#0077BE]/20 pt-6">
                <div className="bg-gradient-to-br from-[#25D366]/10 to-[#20BA5A]/10 border-2 border-[#25D366]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    <h3 className="text-xs font-bold text-[#003D5C] uppercase">Need Help?</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    Contact us for bulk pricing and custom solutions
                  </p>
                  <a
                    href="https://wa.me/917052500888?text=Hi,%20I%20need%20help%20finding%20the%20right%20medical%20equipment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white text-xs font-bold py-2 px-4 rounded-lg hover:from-[#20BA5A] hover:to-[#1EA952] transition-all"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-[#0077BE]/30">
              <h2 className="text-base font-bold text-[#003D5C] tracking-wide">
                {filteredProducts.length} {filteredProducts.length !== 1 ? 'Products' : 'Product'}
              </h2>
              <div className="hidden md:flex items-center text-sm text-[#003D5C] font-medium">
                Showing {filteredProducts.length} of {products.length}
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-[#F0F8FF] to-white rounded-2xl border-2 border-[#0077BE]/30">
                <div className="mb-6">
                  <div className="w-20 h-20 border-2 border-[#0077BE] rounded-full flex items-center justify-center mx-auto bg-white">
                    <Search className="w-8 h-8 text-[#0077BE]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#003D5C] mb-3 tracking-wide">
                  No Products Found
                </h3>
                <p className="text-[#003D5C] mb-8 max-w-md mx-auto font-light text-sm">
                  We could not find any equipment matching your criteria. Try adjusting your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-block px-8 py-3 text-sm text-white bg-gradient-to-r from-[#0077BE] to-[#00A3E0] hover:from-[#00A3E0] hover:to-[#005A8C] transition-all rounded-full shadow-lg font-bold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={{
                      ...product,
                      slug: product.slug || `product-${product.id}`
                    } as ProductWithSlug} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Section - Medical Blue Theme */}
      <div className="mt-20 border-t-2 border-[#0077BE]/30 bg-gradient-to-br from-[#003D5C] via-[#0077BE] to-[#003D5C] py-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A3E0]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0077BE]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full mb-6">
            <Award className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Expert Consultation</span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4 tracking-wide">
            Need Expert Guidance?
          </h2>
          <div className="w-20 h-1 bg-white/50 mx-auto mb-6 rounded-full"></div>
          <p className="text-base text-white/90 mb-8 font-light">
            Our team is ready to help you choose the right equipment for your healthcare facility
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+917052500888"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-[#003D5C] bg-white hover:bg-[#F0F8FF] transition-all rounded-full shadow-lg font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91-7052500888</span>
            </a>
            <a 
              href="https://wa.me/917052500888?text=Hi,%20I%20need%20help%20selecting%20medical%20equipment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all rounded-full shadow-lg font-bold"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp Us</span>
            </a>
            <a 
              href="mailto:adviksurgical2019@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white border-2 border-white hover:bg-white hover:text-[#003D5C] transition-all rounded-full shadow-lg font-bold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
