'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Award, Truck, Shield, Wrench, Sparkles, BedDouble } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "Are your products ISO certified?",
      answer: "Yes, absolutely! All our hospital furniture and medical equipment are ISO certified and meet international quality standards. We maintain strict quality control throughout the manufacturing process to ensure hospital-grade reliability.",
      icon: <Award className="w-5 h-5 text-[#0077BE]" />
    },
    {
      question: "Do you provide installation and training services?",
      answer: "Yes, we provide comprehensive installation services along with staff training for all major equipment. Our technical team ensures proper setup and guides your staff on correct usage and maintenance procedures.",
      icon: <Wrench className="w-5 h-5 text-[#0077BE]" />
    },
    {
      question: "What is the warranty period for your products?",
      answer: "We offer a 1-2 year warranty on most products depending on the category. ICU beds and major equipment come with extended warranty options. We also provide after-sales support and spare parts availability.",
      icon: <Shield className="w-5 h-5 text-[#0077BE]" />
    },
    {
      question: "Do you deliver across India?",
      answer: "Yes! We deliver hospital furniture and medical equipment pan-India with secure packaging. Delivery typically takes 7-15 days depending on the location and product quantity. We offer free installation for bulk orders.",
      icon: <Truck className="w-5 h-5 text-[#0077BE]" />
    },
    {
      question: "Can I get customized equipment for my hospital?",
      answer: "Absolutely! We offer customization options for bulk orders including specific color schemes, dimensions, and features. Our design team works closely with hospital administrators to meet exact requirements.",
      icon: <BedDouble className="w-5 h-5 text-[#0077BE]" />
    },
    {
      question: "What payment terms do you offer for bulk orders?",
      answer: "For bulk orders, we offer flexible payment terms including advance payment plans, credit facilities for established hospitals, and milestone-based payments for large projects. Contact our sales team for customized payment solutions.",
    },
    {
      question: "What makes Advik Surgical different from other suppliers?",
      answer: "We combine ISO certified quality with competitive pricing and exceptional after-sales service. Our 7+ years of experience, pan-India delivery, comprehensive warranty, and dedicated technical support make us a trusted partner for healthcare facilities.",
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white via-[#F0F8FF] to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0077BE]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A3E0]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white border-2 border-[#0077BE]/30 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="px-6 sm:px-8 py-12 sm:py-16 text-center border-b-2 border-[#0077BE]/30 bg-gradient-to-b from-[#F0F8FF] to-white">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">Got Questions?</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#0077BE] via-[#003D5C] to-[#0077BE] bg-clip-text text-transparent mb-4 tracking-wide">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#0077BE] via-[#00A3E0] to-[#0077BE] mx-auto mb-4 rounded-full shadow-sm"></div>
            <p className="text-[#003D5C] text-base font-light">
              Everything you need to know about our hospital furniture and medical equipment
            </p>
          </div>

          {/* FAQ Items */}
          <div className="divide-y divide-[#0077BE]/10">
            {faqs.map((faq, index) => (
              <div key={index} className="hover:bg-gradient-to-r hover:from-[#F0F8FF] hover:to-white transition-colors">
                <button
                  className="w-full px-6 sm:px-8 py-6 text-left transition-colors focus:outline-none group"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {faq.icon && (
                        <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                          {faq.icon}
                        </div>
                      )}
                      <h3 className="font-bold text-[#003D5C] text-sm sm:text-base pr-4 text-left group-hover:text-[#0077BE] transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      <ChevronDownIcon 
                        className={`h-5 w-5 text-[#0077BE] transition-transform duration-300 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>
                
                {/* Answer */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 sm:px-8 pb-6">
                    <div className="bg-gradient-to-br from-[#F0F8FF] to-[#E6F3FF]/30 p-6 border-l-4 border-[#0077BE] rounded-xl shadow-sm">
                      <p className="text-[#003D5C] text-sm sm:text-base leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-8 sm:py-12 text-center border-t-2 border-[#0077BE]/30 bg-gradient-to-b from-white to-[#F0F8FF]">
            <h3 className="text-lg sm:text-xl font-bold text-[#003D5C] mb-3 tracking-wide">
              Still Have Questions?
            </h3>
            <p className="text-[#003D5C] text-sm sm:text-base mb-8 font-light">
              Our sales team is here to help with quotes and technical specifications
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/917052500888?text=Hi,%20I%20have%20a%20question%20about%20Advik%20Surgical%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Us
              </a>
              <a
                href="tel:+917052500888"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
              <Link 
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#0077BE] to-[#00A3E0] hover:from-[#00A3E0] hover:to-[#005A8C] transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:scale-105"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 bg-white border-2 border-[#0077BE]/30 rounded-full px-6 sm:px-8 py-4 shadow-lg">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#0077BE]" />
              <span className="text-sm font-semibold text-[#003D5C]">ISO Certified</span>
            </div>
            <span className="text-[#0077BE] hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#0077BE]" />
              <span className="text-sm font-semibold text-[#003D5C]">Hospital Grade</span>
            </div>
            <span className="text-[#0077BE] hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#0077BE]" />
              <span className="text-sm font-semibold text-[#003D5C]">Pan-India Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
