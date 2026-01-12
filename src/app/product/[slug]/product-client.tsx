'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../../../lib/woocommerceApi'
import { useFacebookPixel } from '../../../../hooks/useFacebookPixel'
import ImageGallery from '../../../../components/ImageGallery'
import { Tab } from '@headlessui/react'
import ProductFAQ from '../../../../components/ProductFaq'
import RelatedProducts from '../../../../components/RelatedProducts'
import ProductReviews from '../../../../components/ProductReviews'
import { Heart, Star, Shield, Truck, Award, Plus, Minus, Sparkles, CheckCircle, Tag, Phone, MessageCircle } from 'lucide-react'

// --- Types ---
export interface ImageData { src: string }
export interface Attribute { 
  id: number
  name: string
  option: string
  options?: string[]
  visible?: boolean
  variation?: boolean
}

export interface ProductVariation {
  id: number
  price: string
  regular_price: string
  attributes: {
    id: number
    name: string
    option: string
  }[]
  image?: ImageData
}

export interface Product {
  id: number
  name: string
  slug: string
  type: 'simple' | 'variable'
  price: string
  regular_price: string
  description?: string
  short_description?: string
  images: ImageData[]
  attributes?: Attribute[]
  variations?: number[]
  variationData?: ProductVariation[]
}

export default function ProductClient({
  initialProduct,
  allProductsInitial,
  slug,
}: {
  initialProduct?: Product | undefined
  allProductsInitial?: Product[] | undefined
  slug: string
}) {
  const router = useRouter()
  const { trackViewContent } = useFacebookPixel()

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['all-products'],
    queryFn: async () => await fetchProducts() as Product[],
    initialData: allProductsInitial,
    staleTime: 60_000,
    enabled: Boolean(slug),
  })

  const product: Product | undefined =
    initialProduct ??
    products?.find((p) => p.slug === slug || p.id.toString() === slug)

  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})
  const [currentVariation, setCurrentVariation] = useState<ProductVariation | null>(null)

  // Initialize default attributes
  useEffect(() => {
    if (product?.type === 'variable' && product.attributes && product.variationData) {
      const defaults: Record<string, string> = {}
      
      product.attributes.forEach(attr => {
        if (attr.variation && attr.options && attr.options.length > 0) {
          defaults[attr.name] = attr.options[0]
        }
      })
      
      if (Object.keys(defaults).length > 0) {
        setSelectedAttributes(defaults)
      }
    }
  }, [product])

  // Find matching variation
  useEffect(() => {
    if (product?.type === 'variable' && product.variationData && Object.keys(selectedAttributes).length > 0) {
      const match = product.variationData.find(variation => {
        return variation.attributes.every(vAttr => {
          const selectedValue = selectedAttributes[vAttr.name]
          return selectedValue === vAttr.option
        })
      })
      
      setCurrentVariation(match || null)
    }
  }, [selectedAttributes, product])

  useEffect(() => {
    if (product) {
      trackViewContent({
        id: currentVariation ? currentVariation.id : product.id,
        name: product.name,
        price: currentVariation ? currentVariation.price : product.price,
      })
    }
  }, [product, currentVariation, trackViewContent])

  if (isLoading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F0F8FF] to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#0077BE] border-t-transparent mx-auto mb-4"></div>
          <p className="text-[#003D5C] text-base font-medium">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || (!products && !product) || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F0F8FF] to-white">
        <div className="text-center max-w-md p-8 bg-white border-2 border-[#0077BE]/30 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#003D5C] mb-3">Product Not Found</h2>
          <p className="text-sm text-gray-600 mb-6">The product you are looking for does not exist.</p>
          <button 
            onClick={() => router.push('/shop')}
            className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#0077BE] to-[#00A3E0] hover:from-[#00A3E0] hover:to-[#005A8C] transition-all rounded-full shadow-lg"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const isVariableProduct = product.type === 'variable'
  
  const activePrice = currentVariation ? currentVariation.price : product.price
  const activeRegularPrice = currentVariation ? currentVariation.regular_price : (product.regular_price || product.price)

  const salePrice = parseFloat(activePrice || '0')
  const regularPrice = parseFloat(activeRegularPrice || '0')
  const hasSale = salePrice < regularPrice
  const discountPercent = hasSale ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleAttributeSelect = (attributeName: string, option: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeName]: option
    }))
  }

  // WhatsApp Enquiry Handler
  const handleWhatsAppEnquiry = () => {
    let message = `Hi, I want to enquire about *${product.name}*`
    
    if (isVariableProduct && Object.keys(selectedAttributes).length > 0) {
      const attrs = Object.entries(selectedAttributes)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ')
      message += ` (${attrs})`
    }
    
    if (quantity > 1) {
      message += `\n\nQuantity: ${quantity} units`
    }
    
    message += `\n\nProduct Link: ${window.location.href}`
    
    const whatsappUrl = `https://wa.me/917052500888?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Phone Call Handler
  const handlePhoneCall = () => {
    window.location.href = 'tel:+918840215794'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F0F8FF] to-white pb-20 lg:pb-8">
      {/* Breadcrumb */}
      <div className="border-b-2 border-[#0077BE]/20 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-[#003D5C] font-medium">
            <button onClick={() => router.push('/shop')} className="hover:text-[#0077BE] transition-colors">
              Shop
            </button>
            <span className="text-[#0077BE]">›</span>
            <span className="text-[#0077BE] truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Contact Info Banner */}
      <div className="bg-gradient-to-r from-[#0077BE] via-[#00A3E0] to-[#0077BE] py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-6 text-white">
            <a href="tel:+917052500888" className="flex items-center gap-2 hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
              <span className="font-semibold text-sm">+91-7052500888</span>
            </a>
            <span className="text-white/50">|</span>
            <a href="tel:+918840215794" className="flex items-center gap-2 hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
              <span className="font-semibold text-sm">+91-8840215794</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-12">
        {/* Image Gallery */}
        <div className="lg:w-1/2">
          <div className="sticky top-8">
            <ImageGallery 
              images={currentVariation?.image ? [currentVariation.image, ...product.images] : (product.images || [])} 
            />
            
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { icon: <Shield className="w-5 h-5" />, text: 'ISO Certified' },
                { icon: <Award className="w-5 h-5" />, text: 'Premium Quality' },
                { icon: <Truck className="w-5 h-5" />, text: 'Pan India Delivery' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-4 bg-white border-2 border-[#0077BE]/20 rounded-lg hover:border-[#0077BE] transition-all">
                  <div className="text-[#0077BE] mb-2">{item.icon}</div>
                  <div className="text-xs font-semibold text-[#003D5C]">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <div className="space-y-6">
            {hasSale && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white px-4 py-2 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold">SAVE {discountPercent}%</span>
              </div>
            )}

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white px-4 py-2 rounded-full shadow-lg ml-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-bold">HOSPITAL GRADE</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-[#003D5C] tracking-wide leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 pb-6 border-b-2 border-[#0077BE]/20">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#0077BE] fill-[#0077BE]" />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-semibold">4.7 (180 reviews)</span>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="ml-auto p-2 rounded-full border-2 border-[#0077BE]/30 hover:border-[#0077BE] hover:bg-[#F0F8FF] transition-all"
              >
                <Heart className={`w-6 h-6 transition-colors ${isWishlisted ? 'fill-[#0077BE] text-[#0077BE]' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-gradient-to-r from-[#25D366]/10 to-[#20BA5A]/10 border-2 border-[#25D366]/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
                <div>
                  <p className="font-bold text-[#003D5C] text-base">Need Expert Consultation?</p>
                  <p className="text-sm text-gray-600">Our team is ready to help you choose the right equipment.</p>
                </div>
              </div>
            </div>

            {product.short_description && (
              <div
                className="prose prose-base max-w-none text-[#003D5C] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* Variation Selector */}
            {isVariableProduct && product.attributes && (
              <div className="space-y-4 py-4 border-2 border-[#0077BE]/30 rounded-xl p-4 bg-gradient-to-br from-[#F0F8FF] to-white">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-5 h-5 text-[#0077BE]" />
                  <h3 className="text-base font-bold text-[#003D5C]">Select Configuration</h3>
                </div>
                
                {product.attributes.map((attr) => (
                  attr.variation && attr.options && attr.options.length > 0 ? (
                    <div key={attr.id} className="space-y-3">
                      <label className="text-sm font-bold text-[#003D5C] uppercase tracking-wide flex items-center gap-2">
                        {attr.name}: 
                        <span className="text-[#0077BE]">
                          {selectedAttributes[attr.name] || '(Not Selected)'}
                        </span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {attr.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleAttributeSelect(attr.name, option)}
                            className={`px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all transform ${
                              selectedAttributes[attr.name] === option
                                ? 'border-[#0077BE] bg-[#0077BE] text-white shadow-lg scale-105'
                                : 'border-[#0077BE]/30 text-[#003D5C] hover:border-[#0077BE] hover:bg-[#F0F8FF] hover:scale-105'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null
                ))}
                
                {currentVariation && (
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3 flex items-center gap-3 mt-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-green-800">
                        ✅ {Object.values(selectedAttributes).join(' - ')}
                      </p>
                      <p className="text-xs text-green-700">Configuration selected</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Price Display */}
            <div className="py-6 border-y-2 border-[#0077BE]/20 bg-gradient-to-br from-[#F0F8FF] to-white rounded-xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-[#003D5C]">
                  ₹{salePrice.toLocaleString()}
                </span>
                {hasSale && (
                  <span className="line-through text-gray-400 font-medium text-xl">
                    ₹{regularPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                *Price may vary based on specifications and bulk orders
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-bold text-[#003D5C] mb-3 uppercase tracking-wide">
                Quantity (for bulk orders)
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-[#0077BE] rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-4 hover:bg-[#F0F8FF] transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5 text-[#003D5C]" />
                  </button>
                  <span className="px-8 py-4 font-bold text-black text-xl border-x-2 border-[#0077BE]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-4 hover:bg-[#F0F8FF] transition-colors"
                  >
                    <Plus className="w-5 h-5 text-[#003D5C]" />
                  </button>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {quantity > 1 ? `${quantity} units` : '1 unit'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                *Special pricing available for bulk orders
              </p>
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex flex-col gap-4 pt-6">
              <button
                className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white font-bold px-8 py-5 text-lg rounded-xl hover:from-[#20BA5A] hover:to-[#1EA952] transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3"
                onClick={handleWhatsAppEnquiry}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Enquire Now on WhatsApp</span>
              </button>

              <button
                className="w-full border-2 border-[#0077BE] bg-white text-[#0077BE] font-bold px-8 py-5 text-lg rounded-xl hover:bg-[#0077BE] hover:text-white transition-all shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-3"
                onClick={handlePhoneCall}
              >
                <Phone className="w-6 h-6" />
                <span>Call Us: +91-8840215794</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-[#0077BE]/20">
              {[
                { icon: <Shield className="w-5 h-5" />, label: 'ISO Certified', subtitle: 'Quality assured' },
                { icon: <Award className="w-5 h-5" />, label: 'Hospital Grade', subtitle: 'Premium quality' },
                { icon: <Truck className="w-5 h-5" />, label: 'Pan India', subtitle: 'Delivery & setup' },
                { icon: <CheckCircle className="w-5 h-5" />, label: 'Warranty', subtitle: 'After-sales support' },
              ].map((item, idx) => (
                <div key={idx} className="text-center p-4 border-2 border-[#0077BE]/20 rounded-lg hover:border-[#0077BE] hover:bg-[#F0F8FF] transition-all">
                  <div className="text-[#0077BE] mb-2 flex justify-center">
                    {item.icon}
                  </div>
                  <div className="font-bold text-xs text-[#003D5C] mb-1">{item.label}</div>
                  <div className="text-xs text-gray-600">{item.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#0077BE]/30 z-50 p-4 shadow-2xl">
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-gray-600">Starting from</p>
              <p className="text-2xl font-bold text-[#003D5C]">₹{salePrice.toLocaleString()}</p>
            </div>
            <div className="flex items-center border-2 border-[#0077BE] rounded-lg bg-white">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 hover:bg-[#F0F8FF]"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-lg font-bold text-black">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-[#F0F8FF]"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              className="flex-1 bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white font-bold px-4 py-3.5 text-sm rounded-xl hover:from-[#20BA5A] hover:to-[#1EA952] transition-all shadow-lg flex items-center justify-center gap-2"
              onClick={handleWhatsAppEnquiry}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp</span>
            </button>
            <button
              className="flex-1 border-2 border-[#0077BE] bg-[#0077BE] text-white font-bold px-4 py-3.5 text-sm rounded-xl hover:bg-[#00A3E0] transition-all flex items-center justify-center gap-2"
              onClick={handlePhoneCall}
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="max-w-7xl mx-auto mt-16 px-4">
        <div className="border-t-2 border-[#0077BE]/30">
          <Tab.Group>
            <Tab.List className="flex border-b-2 border-[#0077BE]/30 bg-white">
              {['Description', 'Specifications', 'Features'].map((label, idx) => (
                <Tab key={idx} className={({ selected }) =>
                  `flex-1 py-4 px-6 text-sm font-bold outline-none transition-all uppercase tracking-wide ${
                    selected 
                      ? 'text-[#0077BE] border-b-4 border-[#0077BE] bg-[#F0F8FF]' 
                      : 'text-gray-600 hover:text-[#0077BE] hover:bg-[#F0F8FF]'
                  }`
                }>
                  {label}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="py-8 bg-white rounded-b-2xl">
              <Tab.Panel>
                <div className="prose prose-base max-w-none text-[#003D5C] leading-relaxed p-6" 
                     dangerouslySetInnerHTML={{ __html: product.description || '' }} />
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-6 p-6">
                  <h3 className="text-2xl font-bold text-[#003D5C] tracking-wide">
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: 'Material', desc: 'High-grade stainless steel / MS powder coated' },
                      { title: 'Standards', desc: 'ISO certified and hospital-grade quality' },
                      { title: 'Warranty', desc: 'Comprehensive warranty with after-sales support' },
                      { title: 'Customization', desc: 'Available as per hospital requirements' },
                    ].map((item, idx) => (
                      <div key={idx} className="border-2 border-[#0077BE]/30 p-6 rounded-xl hover:border-[#0077BE] hover:bg-[#F0F8FF] transition-all">
                        <h4 className="font-bold text-base text-[#003D5C] mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#0077BE]" />
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-700">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-6 p-6">
                  <h3 className="text-2xl font-bold text-[#003D5C] tracking-wide">
                    Key Features & Benefits
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: 'Durability', desc: 'Built to withstand heavy hospital usage' },
                      { title: 'Hygiene', desc: 'Easy to clean and maintain sterile conditions' },
                      { title: 'Safety', desc: 'Designed with patient safety as top priority' },
                      { title: 'Functionality', desc: 'Ergonomic design for medical professionals' },
                    ].map((item, idx) => (
                      <div key={idx} className="border-2 border-[#0077BE]/30 p-6 rounded-xl hover:border-[#0077BE] hover:bg-[#F0F8FF] transition-all">
                        <h4 className="font-bold text-base text-[#003D5C] mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#0077BE]" />
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-700">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 px-4">
        <ProductFAQ productSlug={slug} productName={product.name} />
      </div>
      <div className="max-w-7xl mx-auto mt-16 px-4">
        <ProductReviews productId={product.id} productName={product.name} />
      </div>
      <RelatedProducts currentProduct={product} allProducts={products || []} />
    </div>
  )
}
