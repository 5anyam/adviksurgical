'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  productSlug: string;
  productName: string;
}

// FAQ Data for different EDA Perfumes products
const faqData: Record<string, FAQ[]> = {
  'oudh-shukran': [
    {
      question: "What is ECLAT D'AMOUR Oudh Shukran?",
      answer: "A sophisticated 100ml Eau de Parfum that embodies luxury and elegance. This premium unisex fragrance combines traditional Arabic attar-inspired notes with contemporary sophistication, featuring exquisite Oudh, Amber, Musk, and Rose accords."
    },
    {
      question: "How long does the fragrance last?",
      answer: "As an Eau de Parfum concentration with premium quality ingredients, Oudh Shukran offers exceptional longevity of 8-12 hours on skin and even longer on clothing. The rich Oudh and Amber base notes ensure lasting presence throughout your day and night."
    },
    {
      question: "Is this fragrance suitable for both men and women?",
      answer: "Absolutely! Oudh Shukran is expertly crafted as a unisex fragrance. The sophisticated blend of Oudh, spices, and florals creates a perfect balance that complements any gender, making it ideal for those who appreciate boundary-breaking, sophisticated scents."
    },
    {
      question: "What occasions is this fragrance best suited for?",
      answer: "This versatile luxury fragrance works beautifully for:\n• Formal events and evening occasions\n• Special romantic dates\n• Professional settings where you want to make an impression\n• Cultural celebrations and gatherings\n• Everyday luxury for fragrance connoisseurs"
    },
    {
      question: "What are the main fragrance notes?",
      answer: "Top Notes: Saffron, Bergamot, Rose\nHeart Notes: Indian Oudh, Amber, Patchouli\nBase Notes: Musk, Sandalwood, Vanilla, Leather\n\nThis carefully orchestrated composition creates a warm, mysterious, and sensual experience that evolves beautifully throughout the day."
    },
    {
      question: "How should I apply this perfume for best results?",
      answer: "For optimal performance:\n• Apply to pulse points (wrists, neck, behind ears)\n• Spray on freshly moisturized skin for better longevity\n• Don't rub wrists together - let it dry naturally\n• Layer with unscented lotion for extended wear\n• 2-3 sprays are sufficient for all-day presence"
    },
    {
      question: "Is this an authentic Oudh fragrance?",
      answer: "Yes! Oudh Shukran features high-quality Oudh essence blended with complementary notes. While it's inspired by traditional Arabic attar, it's created as a modern Eau de Parfum for easy application and sophisticated wear."
    },
    {
      question: "Can I wear this fragrance daily?",
      answer: "Absolutely! While rich and luxurious, the balanced composition makes it suitable for daily wear. Many customers make it their signature scent for both professional and personal occasions."
    },
    {
      question: "How should I store my perfume?",
      answer: "To maintain fragrance quality:\n• Store in a cool, dry place away from direct sunlight\n• Keep the cap tightly closed when not in use\n• Avoid bathroom storage (humidity affects longevity)\n• Keep away from heat sources\n• Original box provides ideal protection"
    },
    {
      question: "Is this fragrance suitable for sensitive skin?",
      answer: "Our fragrances are crafted with quality ingredients. However, we recommend performing a patch test if you have sensitive skin. Apply a small amount to your inner wrist and wait 24 hours to check for any reaction."
    }
  ],
  'default': [
    {
      question: "What makes EDA Perfumes different from other brands?",
      answer: "EDA Perfumes specializes in seductive, luxury fragrances that blend Arabic attar-inspired traditions with contemporary sophistication. Our Eau de Parfum concentrations ensure long-lasting wear and exceptional quality at accessible luxury pricing."
    },
    {
      question: "How long do EDA Perfumes last?",
      answer: "Our Eau de Parfum formulations typically last 8-12 hours on skin and even longer on clothing, depending on skin type, climate, and application method. The premium concentration ensures lasting presence throughout your day."
    },
    {
      question: "Are EDA Perfumes suitable for all genders?",
      answer: "Most of our collection features sophisticated unisex fragrances designed for anyone who appreciates luxury scents. We believe great fragrances transcend gender boundaries."
    },
    {
      question: "What is your return policy?",
      answer: "Due to the personal nature of fragrances and hygiene considerations, we cannot accept returns on opened products. Unopened products can be returned within 7 days of delivery if the packaging is undamaged. Please refer to our Returns & Refunds Policy for complete details."
    },
    {
      question: "How should I choose the right fragrance?",
      answer: "Consider:\n• The occasion (daily wear, evening events, formal settings)\n• Your personal style and preferences\n• Season (lighter for summer, richer for winter)\n• Our product descriptions provide detailed scent profiles\n• Read customer reviews for real experiences\n• Contact our customer care for personalized recommendations"
    },
    {
      question: "Do you offer fragrance samples?",
      answer: "Currently, we sell full-size 100ml Eau de Parfum bottles. Our detailed product descriptions, scent profiles, and customer reviews help you make informed decisions about your fragrance selection."
    },
    {
      question: "How do I apply perfume correctly?",
      answer: "For best results:\n• Apply to pulse points (wrists, neck, behind ears, inner elbows)\n• Spray on clean, moisturized skin\n• Don't rub - let it dry naturally\n• 2-4 sprays are typically sufficient\n• Layer with unscented products for extended wear"
    },
    {
      question: "Are EDA Perfumes authentic and high quality?",
      answer: "Yes! All EDA Perfumes are:\n• Crafted with premium quality ingredients\n• Manufactured to international standards\n• 100% authentic luxury fragrances\n• Properly packaged for protection and elegance\n• Backed by our quality commitment"
    }
  ]
};

// Default FAQs for products not specifically listed
const defaultFAQs: FAQ[] = faqData['default'];

const ProductFAQ: React.FC<ProductFAQProps> = ({ productSlug, productName }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Get FAQs based on product slug
  const getFAQs = (): FAQ[] => {
    // Check for exact slug match
    if (faqData[productSlug]) {
      return faqData[productSlug];
    }

    // Check for partial matches (for products with variations)
    const slugKey = Object.keys(faqData).find(key => 
      productSlug.includes(key) || key.includes(productSlug.split('-')[0])
    );

    if (slugKey) {
      return faqData[slugKey];
    }

    // Return default FAQs if no match found
    return defaultFAQs;
  };

  const faqs = getFAQs();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 p-6 lg:p-8">
        <div className="text-center">
          <div className="inline-block mb-3">
            <span className="text-4xl">❓</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-white/90 text-sm lg:text-base">
            Everything you need to know about {productName}
          </p>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="divide-y divide-gray-200">
        {faqs.map((faq, index) => (
          <div key={index} className="group">
            <button
              className="w-full px-6 py-5 lg:px-8 lg:py-6 text-left hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-300 focus:outline-none focus:bg-rose-50"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mt-1">
                    <span className="text-rose-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm lg:text-base leading-relaxed flex-1">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                      <ChevronUpIcon className="h-5 w-5 text-white transition-transform duration-300" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 group-hover:bg-rose-500 flex items-center justify-center transition-all duration-300">
                      <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-white transition-all duration-300" />
                    </div>
                  )}
                </div>
              </div>
            </button>
            
            {/* Answer */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndex === index 
                ? 'max-h-[1000px] opacity-100' 
                : 'max-h-0 opacity-0'
            }`}>
              <div className="px-6 pb-6 lg:px-8 lg:pb-8">
                <div className="ml-11">
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-5 border-l-4 border-rose-500 shadow-sm">
                    <p className="text-gray-700 text-sm lg:text-base leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-rose-50 p-6 lg:p-8 text-center border-t-2 border-gray-200">
        <div className="max-w-2xl mx-auto">
          <div className="text-3xl mb-3">💬</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 text-sm mb-5">
            Our luxury fragrance consultants are here to help you find your perfect scent
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="mailto:care@edaperfumes.com"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <span>📧</span>
              <span>Email Support</span>
            </a>
            <a 
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <span>📱</span>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFAQ;
