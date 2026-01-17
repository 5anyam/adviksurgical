import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin, Building2, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-[#F0F8FF] to-[#E6F3FF]/30 text-gray-900 border-t-2 border-[#0077BE]/30">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <img className="h-24 drop-shadow-lg" src="/adviklogo.jpg" alt="Advik Surgical" />
            </div>
            <p className="text-sm leading-relaxed text-[#003D5C] font-light mb-6">
              Leading manufacturer and supplier of premium hospital furniture and medical equipment. ISO certified, hospital-grade quality across India.
            </p>
            
            {/* Social Media Icons - Medical Blue Theme */}
            <div className="flex gap-3">
              <Link 
                target="_blank"
                href="https://www.facebook.com/adviksurgical" 
                className="p-3 bg-gradient-to-br from-[#0077BE]/10 to-[#00A3E0]/10 border-2 border-[#0077BE]/30 hover:bg-gradient-to-br hover:from-[#0077BE] hover:to-[#00A3E0] hover:text-white hover:border-[#0077BE] transition-all duration-300 rounded-lg shadow-sm hover:shadow-md hover:scale-110"
              >
                <FaFacebookF className="text-sm" />
              </Link>
              <Link 
                target="_blank"
                href="https://www.instagram.com/adviksurgical" 
                className="p-3 bg-gradient-to-br from-[#0077BE]/10 to-[#00A3E0]/10 border-2 border-[#0077BE]/30 hover:bg-gradient-to-br hover:from-[#0077BE] hover:to-[#00A3E0] hover:text-white hover:border-[#0077BE] transition-all duration-300 rounded-lg shadow-sm hover:shadow-md hover:scale-110"
              >
                <FaInstagram className="text-sm" />
              </Link>
              <Link 
                target="_blank"
                href="https://www.linkedin.com/company/adviksurgical" 
                className="p-3 bg-gradient-to-br from-[#0077BE]/10 to-[#00A3E0]/10 border-2 border-[#0077BE]/30 hover:bg-gradient-to-br hover:from-[#0077BE] hover:to-[#00A3E0] hover:text-white hover:border-[#0077BE] transition-all duration-300 rounded-lg shadow-sm hover:shadow-md hover:scale-110"
              >
                <FaLinkedinIn className="text-sm" />
              </Link>
              <Link 
                target="_blank"
                href="https://wa.me/917052500888" 
                className="p-3 bg-[#25D366]/10 border-2 border-[#25D366]/30 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 rounded-lg shadow-sm hover:shadow-md hover:scale-110"
              >
                <FaWhatsapp className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Product Categories */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-bold text-[#003D5C] mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-[#0077BE] to-[#00A3E0] rounded-full"></span>
              Our Products
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=icu-beds" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> ICU & Hospital Beds
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ot-equipment" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> OT Equipment
                </Link>
              </li>
              <li>
                <Link href="/shop?category=medical-trolleys" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> Medical Trolleys
                </Link>
              </li>
              <li>
                <Link href="/shop?category=oxygen-systems" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> Oxygen Systems
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-bold text-[#003D5C] mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-[#0077BE] to-[#00A3E0] rounded-full"></span>
              Information
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/bulk-orders" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/installation-support" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> Installation & Support
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> Warranty Information
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-[#003D5C] hover:text-[#0077BE] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#0077BE] group-hover:translate-x-1 transition-transform">›</span> Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-bold text-[#003D5C] mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-[#0077BE] to-[#00A3E0] rounded-full"></span>
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-[#0077BE] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col gap-1">
                  <a 
                    href="mailto:adviksurgical2019@gmail.com" 
                    className="text-sm text-[#003D5C] hover:text-[#0077BE] font-medium transition-colors break-all"
                  >
                    adviksurgical2019@gmail.com
                  </a>
                  <a 
                    href="mailto:salesadviksurgical@gmail.com" 
                    className="text-xs text-gray-600 hover:text-[#0077BE] transition-colors break-all"
                  >
                    salesadviksurgical@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-[#0077BE] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col gap-1">
                  <a 
                    href="tel:+917052500888" 
                    className="text-sm text-[#003D5C] hover:text-[#0077BE] font-medium transition-colors"
                  >
                    +91 70525 00888
                  </a>
                  <a 
                    href="tel:+918840215794" 
                    className="text-sm text-[#003D5C] hover:text-[#0077BE] font-medium transition-colors"
                  >
                    +91 88402 15794
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <FaWhatsapp className="w-5 h-5 text-[#25D366] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a 
                  href="https://wa.me/917052500888?text=Hi,%20I%20want%20to%20enquire%20about%20hospital%20furniture%20and%20medical%20equipment" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#003D5C] hover:text-[#0077BE] font-medium transition-colors"
                >
                  WhatsApp for Enquiries
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-[#0077BE] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-[#003D5C] font-light leading-relaxed">
                  Natkur, Near Bharat Petrol Pump<br />
                  Lucknow, Uttar Pradesh - 226002
                </span>
              </li>
            </ul>

            {/* Certifications Badge */}
            <div className="mt-6 pt-6 border-t-2 border-[#0077BE]/20">
              <p className="text-xs text-[#003D5C] mb-3 font-bold uppercase tracking-wide flex items-center gap-2">
                <Award className="w-4 h-4 text-[#0077BE]" />
                Certifications:
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[#003D5C] font-semibold bg-gradient-to-r from-[#0077BE]/10 to-[#00A3E0]/10 px-3 py-2 rounded-lg border border-[#0077BE]/20">
                  ✓ ISO Certified
                </span>
                <span className="text-xs text-[#003D5C] font-semibold bg-gradient-to-r from-[#0077BE]/10 to-[#00A3E0]/10 px-3 py-2 rounded-lg border border-[#0077BE]/20">
                  ✓ Hospital Grade Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Medical Blue Gradient */}
      <div className="bg-gradient-to-r from-[#0077BE]/10 via-[#F0F8FF] to-[#0077BE]/10 border-t-2 border-[#0077BE]/30">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-[#003D5C] mb-2 flex items-center justify-center md:justify-start gap-2">
                <Building2 className="w-5 h-5 text-[#0077BE]" />
                Partner With Us for Healthcare Excellence
              </h3>
              <p className="text-sm text-[#003D5C] font-light">
                Get bulk order quotes, product catalogs, and technical specifications.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white text-sm font-bold rounded-xl hover:from-[#00A3E0] hover:to-[#005A8C] transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105"
              >
                Request Quote
              </Link>
              <a
                href="https://wa.me/917052500888?text=Hi,%20I%20want%20to%20enquire%20about%20hospital%20furniture%20and%20medical%20equipment"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] text-white text-sm font-bold rounded-xl hover:bg-[#20BA5A] transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <FaWhatsapp className="text-base" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Premium Design */}
      <div className="border-t-2 border-[#0077BE]/30 bg-gradient-to-r from-white via-[#F0F8FF] to-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#003D5C] font-medium">
            <div className="text-center sm:text-left">
              © {new Date().getFullYear()} Advik Surgical. All rights reserved. | Developed by{" "}
              <Link href="https://www.proshala.com" className="text-[#0077BE] hover:text-[#00A3E0] font-bold transition-colors">
                Proshala Tech
              </Link>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-[#003D5C] font-semibold">
                <Award className="w-3.5 h-3.5 text-[#0077BE]" /> ISO Certified
              </span>
              <span className="text-[#0077BE]">•</span>
              <span className="flex items-center gap-1 text-[#003D5C] font-semibold">
                ✓ Hospital Grade
              </span>
              <span className="text-[#0077BE]">•</span>
              <span className="flex items-center gap-1 text-[#003D5C] font-semibold">
                🚚 Pan-India Delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
