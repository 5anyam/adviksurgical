'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Sparkles, MessageCircle, Mail, Award } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  productSlug: string;
  productName: string;
}

// Generic FAQ Data for all medical equipment products
const genericFAQs: FAQ[] = [
  {
    question: "Is this product ISO certified?",
    answer: "Yes! All our hospital furniture and medical equipment are ISO certified and manufactured to meet international quality standards. We maintain strict quality control throughout the production process to ensure hospital-grade reliability and patient safety."
  },
  {
    question: "What warranty do you provide?",
    answer: "We offer comprehensive warranty coverage:\n• 1-2 years manufacturer warranty (varies by product)\n• Extended warranty options available\n• Free service during warranty period\n• Spare parts availability guaranteed\n• Dedicated after-sales support team"
  },
  {
    question: "Do you provide installation and training?",
    answer: "Yes, we provide complete installation support:\n• Professional installation by our technical team\n• Staff training on equipment usage\n• Operation and maintenance guidelines\n• Safety protocol instructions\n• Installation included for bulk orders"
  },
  {
    question: "What are the delivery timelines?",
    answer: "We deliver across India with:\n• 7-15 working days depending on location\n• Secure packaging for safe transit\n• Real-time tracking information\n• Free installation support\n• Special arrangements for urgent requirements"
  },
  {
    question: "Can I customize this product for my hospital?",
    answer: "Absolutely! We offer customization options:\n• Custom dimensions and specifications\n• Color scheme matching your facility\n• Logo/branding (for bulk orders)\n• Special features as per requirement\n• Contact our sales team for customization details"
  },
  {
    question: "What payment terms do you offer?",
    answer: "We provide flexible payment options:\n• Advance payment with discounts\n• Credit facilities for established hospitals\n• Milestone-based payments for large orders\n• Easy EMI options available\n• GST invoicing provided\n• Contact us for customized payment plans"
  },
  {
    question: "Do you provide technical specifications and documents?",
    answer: "Yes, we provide complete documentation:\n• Detailed technical specifications\n• Product brochures and catalogs\n• ISO certification copies\n• User manuals and maintenance guides\n• Installation instructions\n• Request via WhatsApp or email"
  }
];

const ProductFAQ: React.FC<ProductFAQProps> = ({ productName }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-b from-white to-[#F0F8FF] border-t-2 border-[#0077BE]/30 rounded-2xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="py-12 text-center bg-gradient-to-b from-[#F0F8FF] to-white border-b-2 border-[#0077BE]/30">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide">Product FAQs</span>
        </div>
        
        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#0077BE] via-[#003D5C] to-[#0077BE] bg-clip-text text-transparent mb-4 tracking-wide">
          Frequently Asked Questions
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#0077BE] via-[#00A3E0] to-[#0077BE] mx-auto mb-4 rounded-full shadow-sm"></div>
        <p className="text-[#003D5C] text-base font-light max-w-2xl mx-auto">
          Everything you need to know about {productName}
        </p>
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {genericFAQs.map((faq, index) => (
            <div 
              key={index} 
              className="border-2 border-[#0077BE]/30 rounded-xl overflow-hidden hover:border-[#0077BE] hover:shadow-lg transition-all duration-300 bg-white"
            >
              <button
                className="w-full px-6 py-6 text-left hover:bg-[#F0F8FF] transition-colors focus:outline-none group"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-start gap-6">
                  <h3 className="font-bold text-[#003D5C] text-base lg:text-lg leading-relaxed flex-1 text-left pr-4 group-hover:text-[#0077BE] transition-colors">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-8 h-8 rounded-full border-2 border-[#0077BE] flex items-center justify-center transition-all duration-300 ${
                      openIndex === index ? 'bg-[#0077BE] rotate-180' : 'bg-white'
                    }`}>
                      <ChevronDownIcon 
                        className={`h-5 w-5 transition-colors ${
                          openIndex === index ? 'text-white' : 'text-[#0077BE]'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </button>
              
              {/* Answer */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index 
                  ? 'max-h-[1000px] opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6 pt-0">
                  <div className="bg-gradient-to-br from-[#F0F8FF] to-[#E6F3FF]/30 p-6 border-l-4 border-[#0077BE] rounded-lg">
                    <p className="text-[#003D5C] text-sm lg:text-base leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-16 text-center border-t-2 border-[#0077BE]/30 mt-8 bg-gradient-to-b from-white to-[#F0F8FF]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border-2 border-[#0077BE]/30">
            <MessageCircle className="w-5 h-5 text-[#0077BE]" />
            <span className="text-sm font-semibold text-[#003D5C]">Need More Information?</span>
          </div>
          
          <h3 className="text-2xl font-bold text-[#003D5C] mb-3 tracking-wide">
            Have More Questions?
          </h3>
          <p className="text-gray-600 text-base mb-8">
            Our sales team is ready to assist you with detailed information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:adviksurgical2019@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm text-[#003D5C] border-2 border-[#0077BE] hover:bg-[#F0F8FF] transition-all rounded-full font-bold shadow-md hover:shadow-lg"
            >
              <Mail className="w-5 h-5" />
              <span>Email Us</span>
            </a>
            <a 
              href="https://wa.me/917052500888?text=Hi,%20I%20have%20questions%20about%20your%20medical%20equipment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp Us</span>
            </a>
            <a 
              href="tel:+917052500888"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm text-white bg-gradient-to-r from-[#0077BE] to-[#00A3E0] hover:from-[#00A3E0] hover:to-[#005A8C] transition-all rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Now</span>
            </a>
          </div>
          
          {/* Trust Badge */}
          <div className="mt-8 inline-flex items-center gap-2 bg-white border-2 border-[#0077BE]/30 px-6 py-3 rounded-full">
            <Award className="w-5 h-5 text-[#0077BE]" />
            <span className="text-sm font-bold text-[#003D5C]">ISO Certified • Hospital Grade • 7+ Years Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFAQ;
