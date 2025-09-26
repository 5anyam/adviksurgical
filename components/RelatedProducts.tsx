'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Star, ShoppingBag, Sparkles } from 'lucide-react';

// ✅ Using the same Product interface as your home page
interface Product {
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

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct, allProducts }) => {
  const router = useRouter();

  // Get related products (exclude current product)
  const getRelatedProducts = (): Product[] => {
    const related = allProducts
      .filter(product => product.id !== currentProduct.id)
      .slice(0, 4); // Show max 4 related products
    
    return related;
  };

  const relatedProducts = getRelatedProducts();

  // Don't show section if no related products
  if (relatedProducts.length === 0) {
    return null;
  }

  const handleProductClick = (productSlug: string) => {
    router.push(`/product/${productSlug}`);
  };

  const formatPrice = (price: string) => {
    return parseFloat(price || '0').toFixed(0);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-rose-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-rose-200 shadow-sm mb-6">
            <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" />
            <span className="text-sm font-medium text-rose-600">Complete your collection</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 mb-4">
            You Might Also Love
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover more seductive fragrances that capture desire and sophistication
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => {
            const salePrice = parseFloat(product.price || '0');
            const regularPrice = parseFloat(product.regular_price || product.price || '0');
            const hasDiscount = salePrice < regularPrice;
            const discountPercent = hasDiscount 
              ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-rose-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer overflow-hidden"
                onClick={() => handleProductClick(product.slug)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-rose-50">
                  {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                      {discountPercent}% OFF
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-600 hover:text-rose-500" />
                    </button>
                  </div>
                  
                  <div className="aspect-square flex items-center justify-center group-hover:scale-105 transition-transform duration-500 p-4">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].src}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-24 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🧴</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  {/* Product Category */}
                  <div className="mb-2">
                    <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-1 rounded-full text-xs font-medium border border-rose-200">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                      Premium EDP
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-bold text-gray-800 text-base mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors duration-300 leading-tight">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">(4.8)</span>
                  </div>

                  {/* Short Description */}
                  {product.short_description && (
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                      {product.short_description.replace(/<[^>]*>/g, '').substring(0, 80)}...
                    </p>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-rose-600">
                        ₹{formatPrice(product.price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm line-through text-gray-500 font-medium">
                          ₹{formatPrice(product.regular_price)}
                        </span>
                      )}
                    </div>
                    {hasDiscount && (
                      <div className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                        Save ₹{(regularPrice - salePrice).toFixed(0)}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.slug);
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Add to Collection
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/shop')}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl group"
          >
            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
            <span>Explore All Fragrances</span>
            <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
              {allProducts.length - 1}+ scents
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
