// app/products/[slug]/product-client.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../../../lib/woocommerceApi'
import { useCart } from '../../../../lib/cart'
import { toast } from '../../../../hooks/use-toast'
import { useFacebookPixel } from '../../../../hooks/useFacebookPixel'
import ImageGallery from '../../../../components/ImageGallery'
import { Tab } from '@headlessui/react'
import SmoothMarquee from '../../../../components/ProductSlide'
import ProductFAQ from '../../../../components/ProductFaq'
import RelatedProducts from '../../../../components/RelatedProducts'
//import CustomerMedia from '../../../../components/CustomerMedia'
import ProductReviews from '../../../../components/ProductReviews'
import { Heart, Star, Shield, Truck, Award, CreditCard, Plus, Minus, ShoppingBag } from 'lucide-react'

export interface ImageData { src: string }
export interface Attribute { option: string }
export interface Product {
  id: number
  name: string
  slug: string
  price: string
  regular_price: string
  description?: string
  short_description?: string
  images: ImageData[]
  attributes?: Attribute[]
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
  const { addToCart } = useCart()
  const { trackViewContent, trackAddToCart, trackInitiateCheckout } = useFacebookPixel()

  // Use React Query with initialData to avoid loading state flicker
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
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (product) {
      trackViewContent({
        id: product.id,
        name: product.name,
        price: product.price,
      })
    }
  }, [product, trackViewContent])

  if (isLoading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-rose-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-500 border-t-transparent mx-auto mb-3"></div>
          <p className="text-rose-600 text-sm font-medium">Loading fragrance...</p>
        </div>
      </div>
    )
  }

  if (error || (!products && !product)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-rose-50">
        <div className="text-center bg-white rounded-2xl shadow-xl p-6 max-w-md border border-gray-200">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-red-500 text-lg">⚠️</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Fragrance Not Found</h2>
          <p className="text-sm text-gray-600">Sorry, we could not load this fragrance. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-rose-50">
        <div className="text-center bg-white rounded-2xl shadow-xl p-6 max-w-md border border-gray-200">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-rose-500 text-lg">🔍</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Fragrance Not Found</h2>
          <p className="text-sm text-gray-600">The fragrance you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const salePrice = parseFloat(product.price || '0')
  const regularPrice = parseFloat(product.regular_price || product.price || '0')
  const hasSale = salePrice < regularPrice
  const totalPrice = salePrice * quantity
  const totalRegularPrice = regularPrice * quantity
  const totalSaving = hasSale ? totalRegularPrice - totalPrice : 0

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          ...product,
          name: product.name,
          price: salePrice.toString(),
          images: product.images || [],
        })
      }
      trackAddToCart({ id: product.id, name: product.name, price: salePrice }, quantity)
      toast({
        title: '🌹 Added to collection',
        description: `${quantity} x ${product.name} added to your cart.`,
      })
    } catch (error) {
      console.error('Add to cart failed:', error)
      toast({ title: 'Error', description: 'Failed to add item to cart', variant: 'destructive' })
    } finally {
      setTimeout(() => setIsAddingToCart(false), 1000)
    }
  }

  const handleBuyNow = async () => {
    setIsBuyingNow(true)
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          ...product,
          name: product.name,
          price: salePrice.toString(),
          images: product.images || [],
        })
      }
      trackAddToCart({ id: product.id, name: product.name, price: salePrice }, quantity)
      const cartItems = [{ id: product.id, name: product.name, price: salePrice, quantity }]
      const total = salePrice * quantity
      trackInitiateCheckout(cartItems, total)
      toast({
        title: '🚀 Proceeding to checkout',
        description: `${quantity} x ${product.name} added. Redirecting...`,
        duration: 1200,
      })
      setTimeout(() => {
        router.push('/checkout')
        setIsBuyingNow(false)
      }, 1200)
    } catch (error) {
      console.error('Buy now failed:', error)
      toast({ title: 'Error', description: 'Failed to process buy now', variant: 'destructive' })
      setIsBuyingNow(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50 pb-20 lg:pb-0">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Fragrances</span>
            <span className="text-rose-500">›</span>
            <span className="text-rose-600 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 px-4 flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sticky top-4">
            <ImageGallery images={product.images || []} />
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            {/* Category Badge */}
            {product.attributes?.length ? (
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-sm font-medium border border-rose-200">
                  <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                  {product.attributes[0]?.option || 'Premium Collection'}
                </span>
              </div>
            ) : (
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-sm font-medium border border-rose-200">
                  <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                  Premium Collection
                </span>
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.8) • 247 reviews</span>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="ml-auto p-2 rounded-full hover:bg-rose-50 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
              </button>
            </div>

            <SmoothMarquee />

            {/* Short Description */}
            {product.short_description && (
              <div
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* Price Section */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 mb-6 border border-rose-200">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-rose-600">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                  {hasSale && (
                    <span className="line-through text-gray-500 font-semibold text-lg">
                      ₹{totalRegularPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {hasSale && (
                  <div className="bg-rose-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                    Save ₹{totalSaving.toLocaleString()}
                  </div>
                )}
              </div>
              {quantity > 1 && (
                <div className="text-sm text-gray-600 mt-2">
                  ₹{salePrice.toLocaleString()} per bottle
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-50 transition-colors rounded-l-lg"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="px-4 py-3 font-semibold text-gray-800 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-50 transition-colors rounded-r-lg"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {quantity > 1 && `${quantity} bottles selected`}
                </span>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex flex-col sm:flex-row gap-3 mb-6">
              <button
                className={`flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ${isAddingToCart ? 'scale-95' : ''}`}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className={isAddingToCart ? 'animate-pulse' : ''}>
                    {isAddingToCart ? '✓' : '🛒'}
                  </span>
                  {isAddingToCart ? 'Added to Collection!' : 'Add to Collection'}
                </span>
              </button>
              <button
                className={`flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ${isBuyingNow ? 'scale-95' : ''}`}
                onClick={handleBuyNow}
                disabled={isBuyingNow}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className={isBuyingNow ? 'animate-pulse' : ''}>🚀</span>
                  {isBuyingNow ? 'Redirecting...' : 'Buy Now'}
                </span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: <Truck className="w-4 h-4" />, label: 'Free Shipping', subtitle: 'On orders above ₹999' },
                { icon: <Shield className="w-4 h-4" />, label: '100% Authentic', subtitle: 'Guaranteed original' },
                { icon: <Award className="w-4 h-4" />, label: 'Premium Quality', subtitle: 'Long-lasting EDP' },
                { icon: <CreditCard className="w-4 h-4" />, label: 'Secure Payment', subtitle: 'Multiple options' },
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3 text-center hover:bg-rose-50 transition-colors group border border-gray-200">
                  <div className="text-rose-500 mb-1 flex justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="font-semibold text-xs text-gray-700 mb-1">{item.label}</div>
                  <div className="text-xs text-gray-600">{item.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Buttons */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3">
            {/* Price Display */}
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Total Price</div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-rose-600">
                  ₹{totalPrice.toLocaleString()}
                </span>
                {hasSale && (
                  <span className="line-through text-gray-500 text-sm">
                    ₹{totalRegularPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector - Compact */}
            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                disabled={quantity <= 1}
              >
                <Minus className="w-3 h-3 text-gray-600" />
              </button>
              <span className="px-3 py-2 font-semibold text-gray-800 text-sm min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
              >
                <Plus className="w-3 h-3 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              className={`flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold px-4 py-3 rounded-xl shadow-lg transform transition-all duration-200 ${isAddingToCart ? 'scale-95' : 'active:scale-95'}`}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              <span className="flex items-center justify-center gap-2 text-sm">
                <ShoppingBag className="w-4 h-4" />
                {isAddingToCart ? 'Added!' : 'Add to Cart'}
              </span>
            </button>
            <button
              className={`flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold px-4 py-3 rounded-xl shadow-lg transform transition-all duration-200 ${isBuyingNow ? 'scale-95' : 'active:scale-95'}`}
              onClick={handleBuyNow}
              disabled={isBuyingNow}
            >
              <span className="flex items-center justify-center gap-2 text-sm">
                <span className={isBuyingNow ? 'animate-pulse' : ''}>🚀</span>
                {isBuyingNow ? 'Redirecting...' : 'Buy Now'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Description Tabs */}
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <Tab.Group>
            <Tab.List className="flex bg-gray-50 border-b border-gray-200">
              {['Description', 'Fragrance Notes', 'How to Use'].map((label, idx) => (
                <Tab key={idx} className={({ selected }) =>
                  `flex-1 py-4 px-6 text-sm font-semibold outline-none transition-all duration-200 relative ${
                    selected 
                      ? 'text-rose-600 bg-white border-b-2 border-rose-500' 
                      : 'text-gray-600 hover:text-rose-500'
                  }`
                }>
                  {label}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="p-6">
              <Tab.Panel>
                <div className="prose max-w-none text-gray-700 leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: product.description || '' }} />
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-gray-800 mb-4">Fragrance Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
                      <h4 className="font-semibold text-rose-600 mb-2">Top Notes</h4>
                      <p className="text-sm text-gray-700">Bergamot, Pink Pepper, Fresh Mint</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-purple-600 mb-2">Heart Notes</h4>
                      <p className="text-sm text-gray-700">Jasmine, Rose, Spicy Cardamom</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <h4 className="font-semibold text-amber-600 mb-2">Base Notes</h4>
                      <p className="text-sm text-gray-700">Sandalwood, Musk, Vanilla</p>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-gray-800 mb-4">Application Tips</h3>
                  <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 mt-1">•</span>
                        Apply to pulse points: wrists, neck, and behind ears
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 mt-1">•</span>
                        For best longevity, apply to well-moisturized skin
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 mt-1">•</span>
                        Allow the fragrance to dry naturally - do not rub
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 mt-1">•</span>
                        For evening occasions, lightly spray on clothing or hair
                      </li>
                    </ul>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-4">
        <ProductFAQ productSlug={slug} productName={product.name} />
      </div>
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <ProductReviews productId={product.id} productName={product.name} />
      </div>
      {/* <div className="max-w-7xl mx-auto mt-8 px-4">
        <CustomerMedia productSlug={slug} />
      </div> */}
      <RelatedProducts currentProduct={product} allProducts={products || []} />
    </div>
  )
}
