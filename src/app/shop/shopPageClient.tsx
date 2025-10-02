'use client';

import { useState, useMemo } from 'react';
import ProductCard from "../../../components/ProductCard";
import { Product } from "./page";
import { Sparkles, SlidersHorizontal, X, Search } from 'lucide-react';

interface ShopPageClientProps {
  products: Product[];
}

// Extend the Product type to include slug for ProductCard
type ProductWithSlug = Product & {
  slug: string;
  regular_price: string;
};

export default function ShopPageClient({ products }: ShopPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories from products
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
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory && !product.categories?.some(cat => cat.name === selectedCategory)) {
        return false;
      }

      // Price filter
      if (priceRange.min || priceRange.max) {
        const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
        if (priceRange.min && price < parseFloat(priceRange.min)) return false;
        if (priceRange.max && price > parseFloat(priceRange.max)) return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, ''));
        case 'price-high':
          return parseFloat(b.price.replace(/[^\d.]/g, '')) - parseFloat(a.price.replace(/[^\d.]/g, ''));
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/30">
              <Sparkles className="w-4 h-4" />
              <span>Luxury Fragrance Collection</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Discover Your Signature Scent
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Explore our curated collection of seductive, long-lasting Eau de Parfums crafted for the sophisticated
            </p>
          </div>
        </div>
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-8 text-white" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-rose-400" />
            <input
              type="text"
              placeholder="Search for your perfect fragrance..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-4 pl-12 rounded-2xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-100 transition-all bg-white shadow-lg text-gray-900 placeholder:text-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg"
          >
            <SlidersHorizontal className="h-5 w-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6 border-2 border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-rose-500" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-rose-600 hover:text-rose-800 font-bold"
                >
                  Clear All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Fragrance Collection
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 text-gray-900 font-medium transition-all"
                >
                  <option value="">All Collections</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-1/2 px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 text-gray-900 font-medium transition-all"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-1/2 px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 text-gray-900 font-medium transition-all"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 text-gray-900 font-medium transition-all"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>

              {/* Active Filters */}
              {(searchTerm || selectedCategory || priceRange.min || priceRange.max) && (
                <div className="border-t-2 border-gray-200 pt-4">
                  <h3 className="text-sm font-bold text-gray-700 mb-3">
                    Active Filters:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="px-3 py-1.5 bg-rose-100 text-rose-800 rounded-full text-xs font-bold border border-rose-200">
                        Search: {searchTerm}
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="px-3 py-1.5 bg-pink-100 text-pink-800 rounded-full text-xs font-bold border border-pink-200">
                        {selectedCategory}
                      </span>
                    )}
                    {(priceRange.min || priceRange.max) && (
                      <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-xs font-bold border border-purple-200">
                        Price: ₹{priceRange.min || '0'} - ₹{priceRange.max || '∞'}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8 bg-white rounded-2xl shadow-lg p-4 border-2 border-gray-200">
              <h2 className="text-xl font-black text-gray-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                  {filteredProducts.length}
                </span>{' '}
                Fragrance{filteredProducts.length !== 1 ? 's' : ''} Found
              </h2>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span>Showing {filteredProducts.length} of {products.length}</span>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-xl border-2 border-gray-200">
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-4xl">🌹</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  No Fragrances Found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn&apos;t find any fragrances matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-rose-200"
                  >
                    <ProductCard 
                      product={{
                        ...product,
                        slug: product.slug || `product-${product.id}`
                      } as ProductWithSlug} 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-black mb-3">Can&apos;t Find Your Perfect Scent?</h2>
          <p className="text-lg opacity-90 mb-6">
            Contact our fragrance consultants for personalized recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:care@edaperfumes.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-rose-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              <span>📧</span>
              <span>Email Us</span>
            </a>
            <a 
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg"
            >
              <span>💬</span>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
