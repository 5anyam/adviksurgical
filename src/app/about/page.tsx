'use client';

import React, { useState } from 'react';
import { X, Activity, Award, Wrench, Shield, Building2, Users, CheckCircle, Phone, MessageCircle } from 'lucide-react';

// Modal Component
function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    hospitalName: '',
    requirement: '',
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // WhatsApp message with form data
      const message = `*New Enquiry from Website*\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nHospital/Organization: ${formData.hospitalName}\nRequirement: ${formData.requirement}\nMessage: ${formData.message}`;
      const whatsappUrl = `https://wa.me/917052500888?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setIsOpen(false);
      setFormData({ name: '', email: '', phone: '', hospitalName: '', requirement: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block px-8 py-3 text-sm font-medium text-white bg-[#0077BE] hover:bg-[#005A8C] transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl tracking-wide uppercase"
      >
        Request Quote
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border-2 border-[#0077BE]/20 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b-2 border-[#0077BE]/20 sticky top-0 bg-white">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#0077BE]" />
                <h3 className="text-xl font-semibold text-[#003D5C] tracking-wide">Get a Quote</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-[#0077BE] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#0077BE]/20 focus:border-[#0077BE] rounded-lg focus:outline-none transition-colors text-sm font-light"
                required
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#0077BE]/20 focus:border-[#0077BE] rounded-lg focus:outline-none transition-colors text-sm font-light"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#0077BE]/20 focus:border-[#0077BE] rounded-lg focus:outline-none transition-colors text-sm font-light"
                required
              />
              <input
                type="text"
                placeholder="Hospital/Organization Name"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#0077BE]/20 focus:border-[#0077BE] rounded-lg focus:outline-none transition-colors text-sm font-light"
              />
              <select
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#0077BE]/20 focus:border-[#0077BE] rounded-lg focus:outline-none transition-colors text-sm font-light"
                required
              >
                <option value="">Select Requirement *</option>
                <option value="ICU Beds">ICU Beds</option>
                <option value="OT Equipment">OT Equipment</option>
                <option value="Medical Trolleys">Medical Trolleys</option>
                <option value="Oxygen Systems">Oxygen Systems & Panels</option>
                <option value="Complete Hospital Setup">Complete Hospital Setup</option>
                <option value="Other">Other Equipment</option>
              </select>
              <textarea
                placeholder="Additional Details (quantity, specifications, etc.)"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#0077BE]/20 focus:border-[#0077BE] rounded-lg focus:outline-none transition-colors text-sm font-light resize-none"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0077BE] text-white py-3 text-sm font-medium rounded-lg hover:bg-[#005A8C] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Send Enquiry via WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20 space-y-20">
        {/* Hero Section */}
        <section className="text-center border-b-2 border-[#0077BE]/20 pb-20">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-[#003D5C] tracking-wide">
            About Advik Surgical
          </h1>
          <div className="w-20 h-1 bg-[#00A3E0] mx-auto mb-8 rounded-full"></div>
          <p className="text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
            Leading manufacturer and supplier of premium hospital furniture and medical equipment, serving healthcare facilities across India with commitment to quality, innovation, and reliability
          </p>
        </section>
        
        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-gradient-to-b from-[#F0F8FF] to-[#0077BE]/10 rounded-2xl flex items-center justify-center border-2 border-[#0077BE]/20">
            <div className="text-center p-8">
              <Activity className="w-16 h-16 text-[#0077BE] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-[#003D5C] tracking-wide">Our Vision</h3>
              <p className="text-sm text-gray-600 mt-3 font-light">Healthcare Excellence Through Quality Equipment</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#003D5C] tracking-wide">
              ISO Certified & Hospital Grade Quality
            </h2>
            <p className="text-base text-gray-700 mb-6 leading-relaxed font-light">
              At Advik Surgical, we believe that quality medical equipment is the foundation of excellent healthcare. We are committed to providing hospital-grade furniture and medical equipment that meets the highest standards of safety, durability, and functionality.
            </p>
            <p className="text-base text-gray-700 leading-relaxed font-light">
              Every product is manufactured under strict quality control, ISO certified, and designed to withstand the demanding environment of modern healthcare facilities.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="border-t-2 border-b-2 border-[#0077BE]/20 py-20">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-[#003D5C] tracking-wide">
            Our Core Values
          </h2>
          <div className="w-20 h-1 bg-[#00A3E0] mx-auto mb-16 rounded-full"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'Quality First', desc: 'ISO certified hospital-grade equipment', icon: Shield },
              { title: 'Innovation', desc: 'Latest technology and designs', icon: Award },
              { title: 'Reliability', desc: 'Durable products with warranty', icon: CheckCircle },
              { title: 'Service Excellence', desc: 'Installation and after-sales support', icon: Users }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center p-6 bg-[#F0F8FF] rounded-lg border-2 border-[#0077BE]/20 hover:border-[#0077BE] hover:shadow-lg transition-all duration-300">
                  <Icon className="w-8 h-8 text-[#0077BE] mx-auto mb-4" />
                  <h3 className="font-semibold mb-3 text-[#003D5C] tracking-wide uppercase text-sm">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Philosophy */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#003D5C] tracking-wide">
              Our Philosophy
            </h2>
            <p className="text-base text-gray-700 mb-6 leading-relaxed font-light">
              We source the finest materials, maintain rigorous manufacturing standards, and deliver products that healthcare professionals can rely on. Every product represents our dedication to supporting quality patient care.
            </p>
            <div className="bg-[#F0F8FF] p-6 border-l-4 border-[#0077BE] rounded-lg">
              <h3 className="font-semibold text-sm text-[#003D5C] mb-2 uppercase tracking-widest">
                Our Promise
              </h3>
              <p className="text-gray-700 text-sm font-light">
                Durable, safe, and reliable hospital furniture that supports healthcare facilities in delivering excellent patient care. No compromises on quality, just the best equipment for your facility.
              </p>
            </div>
          </div>
          <div className="aspect-square bg-gradient-to-b from-[#0077BE]/10 to-[#F0F8FF] rounded-2xl flex items-center justify-center border-2 border-[#0077BE]/20">
            <div className="text-center p-8">
              <Building2 className="w-16 h-16 text-[#0077BE] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-[#003D5C] tracking-wide">Healthcare First</h3>
              <p className="text-sm text-gray-600 mt-3 font-light">Supporting Quality Patient Care</p>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="border-t-2 border-[#0077BE]/20 pt-20">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-[#003D5C] tracking-wide">
            The Advik Process
          </h2>
          <div className="w-20 h-1 bg-[#00A3E0] mx-auto mb-16 rounded-full"></div>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Consult", desc: "Understand your requirements" },
              { step: "02", title: "Design", desc: "Custom solutions planning" },
              { step: "03", title: "Manufacture", desc: "ISO certified production" },
              { step: "04", title: "Deliver", desc: "Timely delivery nationwide" },
              { step: "05", title: "Support", desc: "Installation & after-sales" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 border-2 border-[#0077BE] flex items-center justify-center mx-auto mb-4 text-[#0077BE] font-semibold text-sm rounded-full group-hover:bg-[#0077BE] group-hover:text-white transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="font-semibold text-sm mb-2 text-[#003D5C] tracking-wide">{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Product Range */}
        <section className="bg-gradient-to-br from-[#F0F8FF] to-white p-12 rounded-2xl border-2 border-[#0077BE]/20">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center text-[#003D5C] tracking-wide">
            Our Product Range
          </h2>
          <div className="w-20 h-1 bg-[#00A3E0] mx-auto mb-12 rounded-full"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'ICU & Hospital Beds', count: '50+', desc: 'Electric, manual & fowler beds' },
              { title: 'OT Equipment', count: '40+', desc: 'Tables, lights & pendants' },
              { title: 'Medical Trolleys', count: '30+', desc: 'Emergency & medicine trolleys' },
              { title: 'Gas Systems', count: '25+', desc: 'Oxygen manifolds & panels' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border-2 border-[#0077BE]/30 hover:border-[#0077BE] hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-[#0077BE] mb-2">{item.count}</div>
                <h3 className="font-bold text-sm text-[#003D5C] mb-2 tracking-wide">{item.title}</h3>
                <p className="text-xs text-gray-600 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Difference */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-gradient-to-b from-[#F0F8FF] to-[#0077BE]/10 rounded-2xl flex items-center justify-center border-2 border-[#0077BE]/20">
            <div className="text-center p-8">
              <Award className="w-16 h-16 text-[#0077BE] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-[#003D5C] tracking-wide">Premium Standards</h3>
              <p className="text-sm text-gray-600 mt-3 font-light">ISO Certified Quality</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#003D5C] tracking-wide">
              Why Choose Advik Surgical?
            </h2>
            <p className="text-base text-gray-700 mb-6 leading-relaxed font-light">
              In a market full of options, Advik Surgical stands out for its unwavering commitment to quality, innovation, and customer satisfaction in the healthcare equipment industry.
            </p>
            <div className="space-y-4">
              {[
                "ISO certified hospital-grade equipment",
                "100+ products across multiple categories",
                "Customization available for specific requirements",
                "Pan-India delivery and installation support",
                "Competitive pricing for bulk orders",
                "Comprehensive warranty and after-sales service"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start border-l-4 border-[#0077BE] pl-4 hover:border-[#00A3E0] transition-colors">
                  <p className="text-gray-700 text-sm font-light">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="border-t-2 border-[#0077BE]/20 pt-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#003D5C] tracking-wide">
                Visit Our Facility
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-[#0077BE] flex-shrink-0 mt-1" />
                  <span className="text-sm font-light">
                    <strong className="font-semibold">Address:</strong><br />
                    Natkur, Near Bharat Petrol Pump<br />
                    Lucknow, Uttar Pradesh - 226002
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#0077BE] flex-shrink-0 mt-1" />
                  <span className="text-sm font-light">
                    <strong className="font-semibold">Phone:</strong><br />
                    <a href="tel:+917052500888" className="hover:text-[#0077BE]">+91-7052500888</a><br />
                    <a href="tel:+918840215794" className="hover:text-[#0077BE]">+91-8840215794</a>
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#0077BE] flex-shrink-0 mt-1" />
                  <span className="text-sm font-light">
                    <strong className="font-semibold">Email:</strong><br />
                    <a href="mailto:adviksurgical2019@gmail.com" className="hover:text-[#0077BE]">adviksurgical2019@gmail.com</a><br />
                    <a href="mailto:salesadviksurgical@gmail.com" className="hover:text-[#0077BE]">salesadviksurgical@gmail.com</a>
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-[#F0F8FF] rounded-2xl p-8 border-2 border-[#0077BE]/20 flex items-center justify-center">
              <div className="text-center">
                <Wrench className="w-16 h-16 text-[#0077BE] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#003D5C] mb-2">Manufacturing Excellence</h3>
                <p className="text-sm text-gray-600 font-light">
                  State-of-the-art facility with modern production capabilities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center border-t-2 border-[#0077BE]/20 pt-20 pb-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#003D5C] tracking-wide">
            Partner With Us for Your Healthcare Needs
          </h2>
          <div className="w-20 h-1 bg-[#00A3E0] mx-auto mb-8 rounded-full"></div>
          <p className="text-base mb-8 text-gray-700 max-w-2xl mx-auto font-light">
            Trusted by hospitals and healthcare facilities across India. Premium quality, competitive pricing, and exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-[#0077BE] hover:bg-[#005A8C] transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
            >
              Browse Products
            </a>
            <ConsultationModal />
            <a
              href="https://wa.me/917052500888?text=Hi,%20I%20want%20to%20enquire%20about%20hospital%20furniture%20and%20medical%20equipment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
