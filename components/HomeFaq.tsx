'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Sparkles, ShoppingBag } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // EDA Perfumes specific FAQ data
  const faqs: FAQ[] = [
    {
      question: "What makes EDA Perfumes different from other fragrance brands?",
      answer: "EDA Perfumes embodies the perfect blend of seduction and sophistication. Our fragrances are crafted for those who dare to make a statement and aren't afraid to embrace their desires."
    },
    {
      question: "How long do EDA Perfumes fragrances last?",
      answer: "Our premium EDP concentration ensures your signature scent lingers beautifully from dusk till dawn. With proper application, you can expect 8-12 hours of captivating fragrance."
    },
    {
      question: "Are EDA Perfumes suitable for both men and women?",
      answer: "Absolutely! Our collection features expertly balanced unisex fragrances that captivate regardless of gender. True luxury knows no boundaries."
    },
    {
      question: "What fragrance notes can I expect in EDA Perfumes?",
      answer: "Our signature collection features intoxicating blends of citrus, spicy, woody, and floral notes. Each fragrance is a carefully crafted symphony of desire."
    },
    {
      question: "How should I apply EDA Perfumes for best results?",
      answer: "Apply to pulse points like wrists, neck, and behind ears for maximum impact. A little goes a long way with our premium concentration."
    },
    {
      question: "Which EDA Perfume should I choose for different occasions?",
      answer: "Bite Me - Perfect for romantic dates\nDark Knight - Ideal for sophisticated evenings\nMidnight Desire - Best for special occasions\nLusty Nights - Great for passionate moments"
    },
    {
      question: "Do you ship across India?",
      answer: "Yes! We deliver across India with premium packaging and secure shipping. Most orders arrive within 3-5 working days."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-rose-500 px-8 py-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Your questions answered</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-white/90">
              Everything you need to know about EDA Perfumes
            </p>
          </div>

          {/* FAQ Items */}
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="group">
                <button
                  className="w-full px-6 lg:px-8 py-5 text-left hover:bg-rose-50 transition-all duration-200 focus:outline-none focus:bg-rose-50"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 text-sm lg:text-base pr-4 group-hover:text-rose-600 transition-colors">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <ChevronUpIcon className="h-5 w-5 text-rose-500" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-400 group-hover:text-rose-500 transition-colors" />
                      )}
                    </div>
                  </div>
                </button>
                
                {/* Answer */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 lg:px-8 pb-5">
                    <div className="bg-rose-50 rounded-lg p-4 border-l-4 border-rose-500">
                      <p className="text-gray-700 text-sm lg:text-base leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="bg-gray-50 px-8 py-6 text-center border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Ready to find your signature scent?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Explore our collection of seductive fragrances
            </p>
            
            <button className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
              <ShoppingBag className="w-4 h-4" />
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
