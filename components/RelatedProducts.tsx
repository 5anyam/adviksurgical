'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star, Sparkles, ShoppingBag, Award } from 'lucide-react';

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

  const getRelatedProducts = (): Product[] => {
    const related = allProducts
      .filter(product => product.id !== currentProduct.id)
      .slice(0, 4);
    
    return related;
  };

  const relatedProducts = getRelatedProducts();

  if (relatedProducts.length === 0) {
    return null;
  }

  const handleProductClick = (productSlug: string) => {
    router.push(`/product/${productSlug}`);
  };

  const handleWhatsAppEnquiry = (e: React.MouseEvent, productName: string) => {
    e.stopPropagation();
    const message = `Hi, I want to enquire about *${productName}*\n\nI would like to know:\n- Price details\n- Technical specifications\n- Availability\n- Installation support`;
    const whatsappUrl = `https://wa.me/917052500888?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-b from-white via-[#F0F8FF] to-white py-20 border-t-2 border-[#0077BE]/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">More Equipment</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-[#0077BE] via-[#003D5C] to-[#0077BE] bg-clip-text text-transparent mb-4 tracking-wide">
            Related Products
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#0077BE] via-[#00A3E0] to-[#0077BE] mx-auto mb-4 rounded-full shadow-sm"></div>
          <p className="text-[#003D5C] text-base font-light max-w-2xl mx-auto">
            Explore more hospital-grade medical equipment from our catalog
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="group bg-white border-2 border-[#0077BE]/20 rounded-2xl hover:shadow-2xl hover:border-[#0077BE] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => handleProductClick(product.slug)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#F0F8FF] to-[#E6F3FF]/30">
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white text-xs font-bold px-4 py-1.5 z-10 rounded-full shadow-lg flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    ISO Certified
                  </div>
                  
                  <div className="aspect-square flex items-center justify-center group-hover:scale-110 transition-transform duration-700 p-4">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].src}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0077BE]/10 to-[#00A3E0]/10 flex items-center justify-center rounded-xl">
                        <span className="text-gray-400 text-sm font-medium">No Image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5 space-y-3">
                  {/* Product Category */}
                  {product.attributes && product.attributes.length > 0 && (
                    <div className="text-xs text-[#0077BE] uppercase tracking-widest font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#0077BE] rounded-full"></span>
                      {product.attributes[0].option}
                    </div>
                  )}

                  {/* Product Name */}
                  <h3 className="font-semibold text-[#003D5C] text-base line-clamp-2 leading-relaxed tracking-wide min-h-[3rem] group-hover:text-[#0077BE] transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#0077BE] fill-[#0077BE]" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-semibold">4.8</span>
                  </div>

                  {/* Hospital Grade Badge */}
                  <div className="pt-3 border-t-2 border-[#0077BE]/20">
                    <div className="flex items-center gap-2 text-xs text-[#003D5C] font-semibold mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#0077BE]" />
                      <span>Hospital Grade Quality</span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="text-[#0077BE]">✓</span> ISO Certified
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#0077BE]">✓</span> Warranty Included
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white font-bold py-3 text-sm rounded-lg hover:from-[#20BA5A] hover:to-[#1EA952] transition-all duration-300 shadow-md hover:shadow-xl group-hover:scale-105 flex items-center justify-center gap-2"
                    onClick={(e) => handleWhatsAppEnquiry(e, product.name)}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Enquire Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => router.push('/shop')}
            className="inline-flex items-center gap-2 px-10 py-4 text-base text-white bg-gradient-to-r from-[#0077BE] to-[#00A3E0] hover:from-[#00A3E0] hover:to-[#005A8C] transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 font-bold"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>View All Products</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
