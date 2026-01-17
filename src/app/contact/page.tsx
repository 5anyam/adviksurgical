'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, User, CheckCircle, Award, ShoppingCart, Building2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Handle form submission logic here (send to email service)
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <main className="max-w-7xl mt-24 lg:mt-0 mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <div className="inline-flex items-center bg-[#0077BE]/10 text-[#0077BE] px-6 py-2 rounded-full text-sm font-medium mb-6 border-2 border-[#0077BE]/20">
          <MessageCircle className="w-4 h-4 mr-2" />
          We&apos;re Here to Assist You
        </div>
        <h1 className="text-5xl font-bold mb-6 text-[#003D5C]">Get in Touch</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Have questions about our hospital furniture, medical equipment, or bulk orders? Our expert team is ready to help you.
        </p>
      </section>

      {/* Contact Information Cards */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#0077BE]/20 hover:border-[#0077BE]">
          <div className="w-16 h-16 bg-[#0077BE]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#0077BE]" />
          </div>
          <h3 className="text-xl font-semibold text-[#003D5C] mb-4 text-center">Email Us</h3>
          <p className="text-gray-600 text-center mb-4 text-sm">Send us an email for detailed quotations and specifications</p>
          <div className="text-center">
            <a href="mailto:adviksurgical2019@gmail.com" className="text-[#0077BE] hover:text-[#00A3E0] font-semibold text-base transition-colors break-all">
              adviksurgical2019@gmail.com
            </a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#00A3E0]/20 hover:border-[#00A3E0]">
          <div className="w-16 h-16 bg-[#00A3E0]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8 text-[#00A3E0]" />
          </div>
          <h3 className="text-xl font-semibold text-[#003D5C] mb-4 text-center">Call Us</h3>
          <p className="text-gray-600 text-center mb-4 text-sm">Speak directly with our sales team</p>
          <div className="text-center space-y-2">
            <div>
              <a href="tel:+917052500888" className="text-[#00A3E0] hover:text-[#0077BE] font-semibold text-lg transition-colors block">
                +91-7052500888
              </a>
            </div>
            <div>
              <a href="tel:+918840215794" className="text-[#00A3E0] hover:text-[#0077BE] font-semibold text-lg transition-colors block">
                +91-8840215794
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#0077BE]/20 hover:border-[#0077BE]">
          <div className="w-16 h-16 bg-[#0077BE]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-[#0077BE]" />
          </div>
          <h3 className="text-xl font-semibold text-[#003D5C] mb-4 text-center">Our Location</h3>
          <p className="text-gray-600 text-center mb-4 text-sm">Pan-India delivery with installation support</p>
          <div className="text-center">
            <address className="text-[#0077BE] not-italic font-medium text-sm leading-relaxed">
              Delhi NCR, India<br />
              Nationwide Service Available
            </address>
          </div>
        </div>
      </section>

      {/* Contact Form and Information Section */}
      <section className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-gradient-to-br from-[#F0F8FF] to-[#E6F3FF]/30 p-8 rounded-2xl border-2 border-[#0077BE]/20">
          <h2 className="text-3xl font-bold mb-6 text-[#003D5C]">Send us a Message</h2>
          <p className="text-gray-700 mb-8">
            Fill out the form below and our team will get back to you with detailed information and competitive pricing.
          </p>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#003D5C] mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#0077BE]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077BE] focus:border-[#0077BE] transition-colors text-sm"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#003D5C] mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#0077BE]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077BE] focus:border-[#0077BE] transition-colors text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#003D5C] mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#0077BE]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077BE] focus:border-[#0077BE] transition-colors text-sm"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#003D5C] mb-2">
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#0077BE]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077BE] focus:border-[#0077BE] transition-colors text-sm"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="quotation">Price Quotation</option>
                  <option value="products">Product Information</option>
                  <option value="bulk">Bulk Orders</option>
                  <option value="installation">Installation & Setup</option>
                  <option value="warranty">Warranty & Support</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#003D5C] mb-2">
                <Send className="w-4 h-4 inline mr-2" />
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 border-2 border-[#0077BE]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077BE] focus:border-[#0077BE] transition-colors text-sm resize-none"
                placeholder="Tell us about your requirements, facility size, and any specific equipment needs..."
                required
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#0077BE] to-[#00A3E0] hover:from-[#00A3E0] hover:to-[#005A8C] text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Message Sent Successfully!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>

        {/* Office Information */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#0077BE]/20">
            <h3 className="text-2xl font-bold mb-6 text-[#003D5C]">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#0077BE]/10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#0077BE]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#003D5C] mb-2">Service Coverage</h4>
                  <address className="text-gray-700 not-italic leading-relaxed text-sm">
                    Delhi NCR, India<br />
                    Pan-India Delivery Available<br />
                    Installation Support Nationwide
                  </address>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#00A3E0]/10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#00A3E0]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#003D5C] mb-2">Business Hours</h4>
                  <div className="text-gray-700 space-y-1 text-sm">
                    <p>Monday - Saturday: 9:00 AM - 7:00 PM IST</p>
                    <p>Sunday: 10:00 AM - 5:00 PM IST</p>
                    <p className="text-[#0077BE] font-semibold mt-2">WhatsApp available for urgent queries</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <ShoppingCart className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#003D5C] mb-2">Bulk Orders & Projects</h4>
                  <div className="text-gray-700 space-y-1 text-sm">
                    <p>Special pricing for bulk orders</p>
                    <p>Complete hospital setup projects</p>
                    <p><a href="https://wa.me/917052500888?text=Hi,%20I%20want%20to%20discuss%20a%20bulk%20order" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold hover:text-[#20BA5A]">WhatsApp for quotations →</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gradient-to-br from-[#0077BE]/10 to-[#00A3E0]/10 h-64 rounded-2xl flex items-center justify-center border-2 border-[#0077BE]/20">
            <div className="text-center">
              <Building2 className="w-16 h-16 text-[#0077BE] mx-auto mb-4" />
              <h4 className="text-xl font-bold text-[#003D5C] mb-2">Serving Healthcare Facilities</h4>
              <p className="text-gray-600">Across India</p>
              <p className="text-sm text-gray-500 mt-2">Professional Installation & Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-r from-[#F0F8FF] to-[#E6F3FF]/30 p-10 rounded-2xl border-2 border-[#0077BE]/20">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#003D5C]">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#0077BE]">
              <h3 className="font-semibold text-base mb-2 text-[#003D5C]">How quickly will I receive a quotation?</h3>
              <p className="text-gray-700 text-sm">We typically respond to quotation requests within 24 hours. For urgent requirements, please contact us via WhatsApp for immediate assistance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#0077BE]">
              <h3 className="font-semibold text-base mb-2 text-[#003D5C]">Do you provide installation services?</h3>
              <p className="text-gray-700 text-sm">Yes! We provide professional installation services along with staff training for all major equipment. Installation is included free for bulk orders.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#00A3E0]">
              <h3 className="font-semibold text-base mb-2 text-[#003D5C]">What payment terms do you offer?</h3>
              <p className="text-gray-700 text-sm">We offer flexible payment terms including advance payment, credit facilities for established hospitals, and milestone-based payments for large projects.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#00A3E0]">
              <h3 className="font-semibold text-base mb-2 text-[#003D5C]">Do you deliver nationwide?</h3>
              <p className="text-gray-700 text-sm">Yes, we deliver across India with secure packaging. Delivery typically takes 7-15 days depending on location and product quantity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-[#003D5C] via-[#0077BE] to-[#003D5C] p-12 rounded-2xl text-white shadow-2xl">
        <Award className="w-12 h-12 mx-auto mb-4 opacity-80" />
        <h2 className="text-4xl font-bold mb-4">Ready to Equip Your Healthcare Facility?</h2>
        <p className="text-xl mb-8 text-white/90">
          Contact us today for competitive pricing and expert guidance on hospital equipment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+917052500888"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#003D5C] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </a>
          <a
            href="https://wa.me/917052500888?text=Hi,%20I%20want%20to%20enquire%20about%20medical%20equipment"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>WhatsApp Us</span>
          </a>
          <a
            href="mailto:adviksurgical2019@gmail.com"
            className="inline-flex items-center justify-center gap-2 bg-[#0077BE] hover:bg-[#00A3E0] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Mail className="w-5 h-5" />
            <span>Email Us</span>
          </a>
        </div>
      </section>
    </main>
  );
}
