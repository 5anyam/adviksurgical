'use client';
import React, { useState } from 'react'; // ✅ ADD THIS LINE
import Link from "next/link";
import { useCart } from "../../../lib/cart";
import { Trash2, Minus, Plus, Star, Gift, Tag, Percent, Sparkles, ShoppingBag } from "lucide-react";

// Define proper types for cart items
interface CartItemImage {
  src: string;
  alt?: string;
}

interface CartItem {
  id: number;
  variation_id?: number;
  name: string;
  price: string;
  regular_price?: string;
  quantity: number;
  images?: CartItemImage[];
  selectedAttributes?: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  increment: (id: number) => void;
  decrement: (id: number) => void;
  removeFromCart: (id: number) => void;
}

export default function CartPage() {
  const { items, increment, decrement, removeFromCart } = useCart() as CartContextType;
  
  // ✅ NOW PROPERLY USING useState
  const [applyFirstOrderDiscount, setApplyFirstOrderDiscount] = useState(false);
  const [selectedMakhanaFlavour, setSelectedMakhanaFlavour] = useState('Peri Peri');
  
  const makhanaFlavours = ['Peri Peri', 'Cream & Onion', 'Pudina', 'Himalayan Pink Salt'];
  
  // Check for superfood count
  const superfoodCount = items.reduce((count, item) => {
    const isSuperfood = item.name?.toLowerCase().includes('superfood') || false;
    return count + (isSuperfood ? item.quantity : 0);
  }, 0);
  
  const hasMakhanaOffer = superfoodCount >= 2;
  const makhanaPrice = 149;
  
  console.log('Cart Items:', items);
  
  const subtotal = items.reduce((sum: number, i: CartItem) => sum + parseFloat(i.price) * i.quantity, 0);
  const totalItems = items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0);

  const mrpTotal = items.reduce((sum: number, item: CartItem) => {
    const regularPrice = item.regular_price;
    const originalPrice = regularPrice ? parseFloat(regularPrice) : parseFloat(item.price);
    return sum + originalPrice * item.quantity;
  }, 0);

  const discountAmount = mrpTotal - subtotal;
  
  // First order discount calculation
  let firstOrderDiscount = 0;
  if (applyFirstOrderDiscount && subtotal >= 500) {
    firstOrderDiscount = subtotal * 0.05;
  }
  
  // Final total calculation
  const finalTotal = subtotal - firstOrderDiscount;
  const totalSavings = discountAmount + firstOrderDiscount + (hasMakhanaOffer ? makhanaPrice : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-[#D4A574] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#5D4E37] font-semibold">Shopping Cart</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#5D4E37] mb-2 tracking-wide">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {items.length === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {/* Active Offers Banner */}
        {items.length > 0 && (hasMakhanaOffer || (applyFirstOrderDiscount && subtotal >= 500)) && (
          <div className="bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFA500] rounded-2xl p-4 mb-8 border-2 border-[#FF6B6B]">
            <div className="flex flex-wrap items-center justify-center gap-4 text-white text-sm font-bold">
              {hasMakhanaOffer && (
                <div className="flex items-center gap-2 animate-pulse">
                  <Gift className="w-5 h-5" />
                  <span>🎁 FREE {selectedMakhanaFlavour} Makhana Added!</span>
                </div>
              )}
              {applyFirstOrderDiscount && subtotal >= 500 && (
                <div className="flex items-center gap-2">
                  <Percent className="w-5 h-5" />
                  <span>💰 5% First Order Discount Applied!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-20 border-2 border-[#D4A574]/30 bg-white rounded-2xl shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-[#D4A574] to-[#C19A6B] rounded-full mx-auto mb-6 flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#5D4E37] mb-3">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Start shopping to add items to your cart
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 text-sm text-white bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] transition-all rounded-lg font-semibold shadow-lg"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Makhana Offer Card */}
              {hasMakhanaOffer && (
                <div className="bg-gradient-to-r from-[#FFE5E5] to-[#FFF0E5] border-2 border-[#FF6B6B] rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Gift className="w-7 h-7 text-[#FF6B6B]" />
                    <h3 className="text-xl font-bold text-[#5D4E37]">🎁 Select Your FREE Makhana!</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    You have qualified for a FREE Makhana (Worth ₹{makhanaPrice})! Choose your favourite flavour:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {makhanaFlavours.map((flavour) => (
                      <button
                        key={flavour}
                        onClick={() => setSelectedMakhanaFlavour(flavour)}
                        className={`p-3 rounded-lg text-sm font-bold border-2 transition-all ${
                          selectedMakhanaFlavour === flavour
                            ? 'border-[#FF6B6B] bg-[#FF6B6B] text-white shadow-lg scale-105'
                            : 'border-[#FF6B6B]/30 text-[#5D4E37] hover:border-[#FF6B6B] hover:bg-[#FFE5E5]'
                        }`}
                      >
                        {flavour}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-[#FF6B6B] font-bold mt-3 text-center">
                    ✅ Selected: {selectedMakhanaFlavour} Makhana
                  </p>
                </div>
              )}

              {/* Cart Items List */}
              <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b-2 border-[#D4A574]/30 bg-gradient-to-r from-[#D4A574]/10 to-[#C19A6B]/10">
                  <h2 className="text-lg font-bold text-[#5D4E37] uppercase tracking-wide">
                    Cart Items
                  </h2>
                </div>
                <div className="divide-y-2 divide-[#D4A574]/10">
                  {items.map((item: CartItem) => {
                    const itemKey = item.variation_id || item.id;
                    const itemRegularPrice = item.regular_price;
                    const hasDiscount = itemRegularPrice && parseFloat(itemRegularPrice) > parseFloat(item.price);
                    
                    return (
                      <div key={itemKey} className="p-6 hover:bg-[#FFF8DC]/30 transition-colors">
                        <div className="flex gap-6">
                          {/* Image */}
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-white border-2 border-[#D4A574]/20 rounded-lg overflow-hidden">
                              <img
                                src={item.images?.[0]?.src || '/placeholder.png'}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="text-base font-bold text-[#5D4E37] line-clamp-2">
                                {item.name}
                              </h3>
                              
                              {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {Object.entries(item.selectedAttributes).map(([key, value]: [string, string]) => (
                                    <span key={key} className="text-xs bg-[#D4A574]/10 text-[#5D4E37] px-2 py-1 rounded-full border border-[#D4A574]/30 font-semibold">
                                      {key}: {value}
                                    </span>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex items-center gap-1 mt-2">
                                {[...Array(5)].map((_: undefined, i: number) => (
                                  <Star key={i} className="w-4 h-4 text-[#D4A574] fill-[#D4A574]" />
                                ))}
                                <span className="text-xs text-gray-600 ml-2 font-semibold">4.8 (247 reviews)</span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              {/* Price */}
                              <div className="flex flex-col">
                                <div className="text-xl font-bold text-[#5D4E37]">
                                  ₹{parseFloat(item.price).toLocaleString()}
                                </div>
                                {hasDiscount && itemRegularPrice && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500 line-through">
                                      ₹{parseFloat(itemRegularPrice).toLocaleString()}
                                    </span>
                                    <span className="text-xs text-green-600 font-bold">
                                      SAVE {Math.round(((parseFloat(itemRegularPrice) - parseFloat(item.price)) / parseFloat(itemRegularPrice)) * 100)}%
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3">
                                <div className="flex items-center border-2 border-[#D4A574] rounded-lg overflow-hidden bg-white">
                                  <button
                                    onClick={() => decrement(itemKey)}
                                    className="p-3 hover:bg-[#FFF8DC] transition-colors"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="h-4 w-4 text-[#5D4E37]" />
                                  </button>
                                  <span className="w-14 text-center font-bold text-black text-lg">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => increment(itemKey)}
                                    className="p-3 hover:bg-[#FFF8DC] transition-colors"
                                  >
                                    <Plus className="h-4 w-4 text-[#5D4E37]" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => removeFromCart(itemKey)}
                                  className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Remove from cart"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <div className="pt-3 border-t border-[#D4A574]/20">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600 font-semibold">Item Total:</span>
                                <span className="text-lg font-bold text-[#5D4E37]">
                                  ₹{(parseFloat(item.price) * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Available Offers */}
                <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-[#D4A574]" />
                    <h3 className="text-lg font-bold text-[#5D4E37]">Available Offers</h3>
                  </div>

                  <div className="space-y-3">
                    {/* First Order Discount */}
                    <div className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${
                      applyFirstOrderDiscount 
                        ? 'border-[#25D366] bg-gradient-to-r from-[#25D366]/10 to-[#20BA5A]/10' 
                        : 'border-[#D4A574]/30 hover:border-[#D4A574]'
                    }`}>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={applyFirstOrderDiscount}
                          onChange={(e) => setApplyFirstOrderDiscount(e.target.checked)}
                          className="w-5 h-5 mt-0.5 accent-[#25D366]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Percent className="w-4 h-4 text-[#25D366]" />
                            <p className="font-bold text-[#5D4E37] text-sm">First Order: 5% OFF</p>
                          </div>
                          <p className="text-xs text-gray-600">On orders above ₹500</p>
                          {applyFirstOrderDiscount && subtotal >= 500 && (
                            <p className="text-xs text-[#25D366] font-bold mt-2">
                              💰 -₹{firstOrderDiscount.toFixed(2)}
                            </p>
                          )}
                          {applyFirstOrderDiscount && subtotal < 500 && (
                            <p className="text-xs text-orange-600 font-bold mt-2">
                              ⚠️ Add ₹{(500 - subtotal).toFixed(2)} more
                            </p>
                          )}
                        </div>
                      </label>
                    </div>

                    {/* Makhana Offer Info */}
                    {!hasMakhanaOffer && superfoodCount === 1 && (
                      <div className="bg-gradient-to-r from-[#FFE5E5] to-[#FFF0E5] border-2 border-[#FF6B6B]/30 rounded-xl p-4">
                        <div className="flex items-start gap-2">
                          <Gift className="w-5 h-5 text-[#FF6B6B] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-[#5D4E37] mb-1">
                              🎁 Buy 1 More Superfood!
                            </p>
                            <p className="text-xs text-gray-700">
                              Add 1 more superfood to get FREE Makhana (₹{makhanaPrice})
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b-2 border-[#D4A574]/30 bg-gradient-to-r from-[#D4A574]/10 to-[#C19A6B]/10">
                    <h2 className="text-lg font-bold text-[#5D4E37] uppercase tracking-wide">
                      Order Summary
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3 mb-6 pb-6 border-b-2 border-[#D4A574]/20">
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>MRP Total</span>
                          <span className="font-semibold">₹{mrpTotal.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal ({totalItems} items)</span>
                        <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                      </div>

                      {discountAmount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Product Discount</span>
                          <span className="font-bold">-₹{discountAmount.toLocaleString()}</span>
                        </div>
                      )}

                      {firstOrderDiscount > 0 && (
                        <div className="flex justify-between text-sm text-[#25D366]">
                          <span className="flex items-center gap-1">
                            <Percent className="w-3 h-3" />
                            First Order (5%)
                          </span>
                          <span className="font-bold">-₹{firstOrderDiscount.toFixed(2)}</span>
                        </div>
                      )}

                      {hasMakhanaOffer && (
                        <div className="flex justify-between text-sm text-[#FF6B6B]">
                          <span className="flex items-center gap-1">
                            <Gift className="w-3 h-3" />
                            Free Makhana
                          </span>
                          <span className="font-bold">-₹{makhanaPrice}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping</span>
                        <span className="font-semibold text-green-600">FREE</span>
                      </div>
                    </div>

                    {totalSavings > 0 && (
                      <div className="flex justify-between mb-4 pb-4 border-b-2 border-[#D4A574]/20">
                        <span className="text-sm font-bold text-[#D4A574] flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          Total Savings
                        </span>
                        <span className="text-lg font-bold text-[#D4A574]">
                          ₹{totalSavings.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between mb-6">
                      <span className="text-lg font-bold text-[#5D4E37]">Grand Total</span>
                      <span className="text-2xl font-bold text-[#5D4E37]">
                        ₹{finalTotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href="/checkout"
                        className="w-full bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white font-bold py-4 text-sm tracking-wide uppercase hover:from-[#C19A6B] hover:to-[#8B7355] transition-all text-center block rounded-lg shadow-lg hover:shadow-xl"
                      >
                        Proceed to Checkout
                      </Link>

                      <Link
                        href="/"
                        className="w-full border-2 border-[#D4A574] text-[#5D4E37] font-bold py-4 text-sm tracking-wide uppercase hover:bg-[#FFF8DC] transition-all text-center block rounded-lg"
                      >
                        Continue Shopping
                      </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-6 border-t-2 border-[#D4A574]/20">
                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#25D366] rounded-full"></div>
                          <span>100% Authentic Products</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#25D366] rounded-full"></div>
                          <span>Free Shipping on All Orders</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#25D366] rounded-full"></div>
                          <span>Secure Payment Gateway</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
