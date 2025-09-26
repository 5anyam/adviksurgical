'use client';

import Link from "next/link";
import { productToSlug } from "../lib/slug";

interface Product {
  id: number | string;
  slug: string;
  name: string;
  price: string | number; // Sale price
  regular_price: string; // Original price
  images?: { src: string }[];
  short_description?: string;
  category?: string;
  average_rating?: string; // WooCommerce gives rating as string
  rating_count?: number;
  badge?: "New" | "Sale";
}

// Stable bought count per product per user (localStorage)
function getStableBoughtCount(product: Product): string {
  const key = `boughtCount:${product.id || product.slug}`;
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(key);
    if (stored) return `${stored}+ sold`;
    // Use a believable "anchor" list—social proof!
    const anchors = [150, 250, 350, 450];
    const pick = anchors[Math.floor(Math.random() * anchors.length)];
    window.localStorage.setItem(key, pick.toString());
    return `${pick}+ sold`;
  }
  // SSR fallback
  return "";
}

export default function ProductCard({ product }: { product: Product }) {
  const productUrl = `/product/${productToSlug(product)}`;
  const rating = Number(product.average_rating);
  const salePrice = Number(product.price);
  const originalPrice = Number(product.regular_price);
  const isOnSale = originalPrice > salePrice;

  const discountPercentage = isOnSale
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;

  // Stable per-user "sold" count
  const soldCount =
    typeof window !== "undefined" ? getStableBoughtCount(product) : "";

  return (
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl border border-gray-700/50 transition-all duration-300 sm:duration-500 hover:-translate-y-1 sm:hover:-translate-y-3 hover:scale-[1.02] sm:hover:scale-[1.03] h-full flex flex-col backdrop-blur-sm">
      <Link href={productUrl} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-slate-900 aspect-square flex-shrink-0">
          <img
            src={product.images?.[0]?.src || "/placeholder.png"}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500 sm:duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-50 group-hover:opacity-30 transition-opacity duration-300 sm:duration-500"></div>

          {/* Mobile-Optimized Discount Badge */}
          {isOnSale && (
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20">
              <div className="relative">
                <div className="bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl backdrop-blur-lg border border-red-400/30">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <span className="text-sm sm:text-lg animate-pulse">💎</span>
                      <span className="font-black text-xs sm:text-sm tracking-wide">
                        {discountPercentage}% OFF
                      </span>
                    </div>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg sm:rounded-xl blur-md sm:blur-lg opacity-40 -z-10 animate-pulse"></div>
              </div>
            </div>
          )}

          {/* Mobile-Optimized Other Badges */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1 sm:gap-2">
            {product.badge && (
              <div className={`text-white text-xs font-semibold px-2 py-1 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl backdrop-blur-lg border border-white/20 ${
                product.badge === 'New' 
                  ? 'bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600' 
                  : 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-600'
              }`}>
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-xs sm:text-sm">{product.badge === 'New' ? '✨' : '🔥'}</span> 
                  <span className="font-bold tracking-wide text-xs sm:text-xs">{product.badge}</span>
                </span>
              </div>
            )}
          </div>

          {/* Mobile-Optimized Quick View */}
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 opacity-70 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
            <button className="bg-white/20 backdrop-blur-xl text-white p-2 sm:p-3 rounded-full shadow-lg sm:shadow-2xl hover:bg-white/30 hover:scale-110 transition-all duration-300 border border-white/30">
              <svg className="w-3 h-3 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile-Optimized Product Details */}
        <div className="p-3 sm:p-5 space-y-2 sm:space-y-4 flex-1 flex flex-col text-white">
          {/* Mobile-Optimized Category & Premium Badge Row */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {product.category && (
              <div className="inline-flex items-center gap-1 sm:gap-2 text-xs font-medium text-amber-300 bg-gradient-to-r from-amber-900/40 to-orange-900/30 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-amber-600/40 backdrop-blur-sm">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
                <span className="truncate uppercase tracking-wider font-semibold text-xs">{product.category}</span>
              </div>
            )}
            
            <div className="inline-flex items-center gap-1 sm:gap-2 text-xs font-medium text-purple-300 bg-gradient-to-r from-purple-900/40 to-violet-900/30 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-purple-600/40 backdrop-blur-sm">
              <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.92c.969 0 1.371 1.24.588 1.81l-3.977 2.89 1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.977 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.92l1.518-4.674z" />
              </svg>
              <span className="uppercase tracking-wider font-semibold text-xs">Luxury</span>
            </div>
          </div>

          {/* Mobile-Optimized Product Name */}
          <h3 className="text-sm sm:text-xl font-bold text-white line-clamp-2 leading-tight group-hover:text-rose-300 transition-colors duration-300 flex-shrink-0">
            {product.name}
          </h3>

          {/* Mobile-Optimized Rating */}
          {Number.isFinite(rating) && rating > 0 && (
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <div className="flex items-center gap-0.5 sm:gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-200 ${
                      i < Math.round(rating) ? "text-amber-400" : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.92c.969 0 1.371 1.24.588 1.81l-3.977 2.89 1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.977 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.92l1.518-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-amber-400">
                {rating.toFixed(1)}
              </span>
              {product.rating_count && (
                <span className="text-xs text-gray-400 hidden sm:inline">
                  ({product.rating_count} reviews)
                </span>
              )}
            </div>
          )}

          {/* Mobile-Optimized Sold Count */}
          <div className="text-xs sm:text-sm text-gray-300 flex items-center gap-1 sm:gap-2 bg-gray-800/50 px-2 py-1 sm:px-3 sm:py-2 rounded-lg backdrop-blur-sm">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full animate-pulse"></span>
            <span className="font-medium">{soldCount}</span>
            <span className="text-xs text-gray-500 hidden sm:inline">this month</span>
          </div>

          {/* Mobile-Optimized Price Section */}
          <div className="space-y-1 sm:space-y-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1 sm:gap-2">
                <span className="text-lg sm:text-2xl font-black text-rose-400">
                  ₹{salePrice.toLocaleString()}
                </span>
                {isOnSale && (
                  <span className="text-sm sm:text-lg text-gray-500 line-through font-medium">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            
            {isOnSale && (
              <div className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-emerald-400 font-bold bg-gradient-to-r from-emerald-900/40 to-green-900/30 px-2 py-1 sm:px-4 sm:py-2 rounded-lg border border-emerald-600/40 backdrop-blur-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs sm:text-sm">Save ₹{(originalPrice - salePrice).toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Mobile-Optimized Description - Hidden on mobile to save space */}
          <p className="hidden sm:block text-sm text-gray-300 line-clamp-2 leading-relaxed opacity-90 flex-1 font-light">
            {product.short_description?.replace(/<[^>]+>/g, "").slice(0, 100)}...
          </p>

          {/* Mobile-Optimized Add to Cart Button */}
          <div className="pt-1 sm:pt-2 flex-shrink-0">
            <button className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:via-pink-600 hover:to-rose-700 text-white font-bold py-2.5 sm:py-4 px-3 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl text-sm sm:text-base backdrop-blur-sm border border-rose-400/30 group/btn">
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
                <span className="tracking-wide text-xs sm:text-base">Add to Collection</span>
                <svg className="hidden sm:block w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
