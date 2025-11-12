'use client';

import Link from "next/link";
import { productToSlug } from "../lib/slug";
import { Sparkles } from "lucide-react";

interface Product {
  id: number | string;
  slug: string;
  name: string;
  price: string | number;
  regular_price: string;
  images?: { src: string }[];
  category?: string;
  average_rating?: string;
  rating_count?: number;
  badge?: "New" | "Sale";
}

export default function ProductCard({ product }: { product: Product }) {
  const productUrl = `/product/${productToSlug(product)}`;
  const rating = Number(product.average_rating);
  const salePrice = Number(product.price);
  const originalPrice = Number(product.regular_price);
  const isOnSale = originalPrice > salePrice;

  // Check if product is fruit box
  const isFruitBox = product.slug === 'fruit-box' || product.slug.includes('fruit-box');

  const discountPercentage = isOnSale
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;

  const handleEnquire = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = `Hi, I want to enquire about ${product.name}`;
    const whatsappUrl = `https://wa.me/917428408825?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Link href={productUrl}>
      <div className="group relative overflow-hidden bg-white border-2 border-[#D4A574]/20 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:border-[#D4A574] hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#FFF8DC] to-[#F5DEB3]/30">
          <img
            src={product.images?.[0]?.src || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Discount Badge - Golden Theme - Hide for Fruit Box */}
          {!isFruitBox && isOnSale && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-4 py-1.5 text-xs font-bold tracking-wide rounded-full shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              -{discountPercentage}%
            </div>
          )}

          {/* New Badge */}
          {product.badge === 'New' && (
            <div className="absolute top-3 right-3 bg-white text-[#D4A574] border-2 border-[#D4A574] text-xs font-bold px-4 py-1.5 tracking-wide rounded-full shadow-md">
              New
            </div>
          )}

          {/* Fruit Box Badge */}
          {isFruitBox && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white px-4 py-1.5 text-xs font-bold tracking-wide rounded-full shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Fresh Daily
            </div>
          )}

          {/* Quick View Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#5D4E37]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="text-white text-sm font-bold tracking-wide">
              {isFruitBox ? 'Enquire Now' : 'Quick View'}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 space-y-3">
          {/* Category */}
          {product.category && (
            <div className="text-xs text-[#D4A574] uppercase tracking-widest font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#D4A574] rounded-full"></span>
              {product.category}
            </div>
          )}

          {/* Product Name */}
          <h3 className="text-base font-semibold text-[#5D4E37] line-clamp-2 leading-relaxed tracking-wide min-h-[3rem] group-hover:text-[#D4A574] transition-colors">
            {product.name}
          </h3>

          {/* Rating - Golden Stars */}
          {Number.isFinite(rating) && rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(rating) ? "text-[#D4A574] fill-[#D4A574]" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.92c.969 0 1.371 1.24.588 1.81l-3.977 2.89 1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.977 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.92l1.518-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#5D4E37] font-semibold">
                {rating.toFixed(1)}
              </span>
              {product.rating_count && (
                <span className="text-xs text-gray-500">
                  ({product.rating_count})
                </span>
              )}
            </div>
          )}

          {/* Price Section - Hide for Fruit Box */}
          {!isFruitBox && (
            <div className="pt-3 border-t-2 border-[#D4A574]/20">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#5D4E37]">
                  ₹{salePrice.toLocaleString()}
                </span>
                {isOnSale && (
                  <span className="text-sm text-gray-400 line-through font-medium">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Savings Text */}
              {isOnSale && (
                <div className="text-xs text-[#D4A574] mt-1 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Save ₹{(originalPrice - salePrice).toLocaleString()}
                </div>
              )}
            </div>
          )}

          {/* Fruit Box - Fresh Daily Message */}
          {isFruitBox && (
            <div className="pt-3 border-t-2 border-[#25D366]/20">
              <div className="text-sm text-[#5D4E37] font-semibold">
                🍎 Fresh fruits delivered daily
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Customizable subscriptions available
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-3">
            {isFruitBox ? (
              // Enquire Now button for Fruit Box
              <button 
                onClick={handleEnquire}
                className="w-full py-3 text-sm text-white bg-gradient-to-r from-[#25D366] to-[#20BA5A] tracking-widest uppercase font-bold hover:from-[#20BA5A] hover:to-[#1DA851] transition-all duration-300 rounded-lg shadow-md hover:shadow-xl group-hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Enquire Now</span>
              </button>
            ) : (
              // View Details button for regular products
              <button className="w-full py-3 text-sm text-white bg-gradient-to-r from-[#D4A574] to-[#C19A6B] tracking-widest uppercase font-bold hover:from-[#C19A6B] hover:to-[#8B7355] transition-all duration-300 rounded-lg shadow-md hover:shadow-xl group-hover:scale-105">
                View Details
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
