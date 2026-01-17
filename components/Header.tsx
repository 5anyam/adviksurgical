'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import { useAuth } from "../lib/auth-context";
import { useState, useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io";
import { Sparkles, User, LogIn, LogOut, Package, Phone } from "lucide-react";

const navItems = [
  { name: "Home", to: "/" },
  { name: "ICU Beds", to: "/shop?category=icu-beds" },
  { name: "OT Equipment", to: "/shop?category=ot-equipment" },
  { name: "Medical Trolleys", to: "/shop?category=medical-trolleys" },
  { name: "About Us", to: "/about" },
  { name: "Contact", to: "/contact" }
];

export default function Header() {
  const location = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      if (event.key === 'Escape' && userMenuOpen) {
        setUserMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, userMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (userMenuOpen && !target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };
    
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleBulkEnquiry = () => {
    const phoneNumber = "917052500888";
    const message = "Hi, I'd like to enquire about hospital furniture and medical equipment for bulk orders.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push('/');
  };

  return (
    <>
      {/* Top Bar with Medical Blue Gradient */}
      <div className="bg-gradient-to-r from-[#003D5C] via-[#0077BE] to-[#003D5C] text-white py-2.5 border-b border-[#00A3E0]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-4">
              <span className="hidden sm:flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>ISO Certified Hospital-Grade Equipment</span>
              </span>
              <span className="sm:hidden flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#00A3E0]" />
                ISO Certified
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <a href="tel:+917052500888" className="hover:text-[#00A3E0] transition-colors font-medium flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">+91 70525 00888</span>
                <span className="sm:hidden">Call Us</span>
              </a>
              <button
                onClick={handleBulkEnquiry}
                className="hidden sm:flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full hover:bg-white/20 transition-all duration-300 font-medium border border-white/20"
              >
                <IoLogoWhatsapp className="text-base" />
                <span>Bulk Orders</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header with Medical Blue Theme */}
      <header className="sticky z-50 top-0 bg-white shadow-lg border-b-2 border-[#0077BE]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="group">
                <img 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 transition-all duration-300 group-hover:scale-110 drop-shadow-md" 
                  src="/adviklogo.jpg" 
                  alt='Advik Surgical' 
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.to}
                  className={`text-base font-semibold transition-colors duration-200 py-2 whitespace-nowrap ${
                    location === item.to 
                      ? "text-[#0077BE]" 
                      : "text-[#003D5C] hover:text-[#0077BE]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 lg:gap-4 justify-end">
              {/* Browse Products Button - Medical Blue Gradient */}
              <Link
                href="/shop"
                className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white px-5 py-2.5 rounded-full hover:from-[#00A3E0] hover:to-[#005A8C] transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FiShoppingBag className="text-lg" />
                <span>Products</span>
              </Link>

              {/* User Menu (Desktop) */}
              <div className="hidden lg:block relative user-menu-container">
                {user ? (
                  <>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2.5 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                    >
                      <User className="w-4 h-4" />
                      <span className="max-w-[100px] truncate">{user.name}</span>
                    </button>

                    {/* User Dropdown Menu */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border-2 border-[#0077BE]/30 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        
                        <Link
                          href="/my-account"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F8FF] transition-colors"
                        >
                          <Package className="w-4 h-4 text-[#0077BE]" />
                          <span className="font-medium">My Orders</span>
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                )}
              </div>

              {/* Cart Icon - Hidden for enquiry-only site */}
              {/* <div className="flex items-center">
                <CartIcon />
              </div> */}

              {/* WhatsApp Quick Contact - Desktop */}
              <a
                href="https://wa.me/917052500888?text=Hi,%20I%20want%20to%20enquire%20about%20hospital%20furniture%20and%20medical%20equipment"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full hover:bg-[#20BA5A] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                <IoLogoWhatsapp className="text-lg" />
                <span>Enquire</span>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-[#0077BE] hover:text-[#00A3E0] transition-colors p-2"
              >
                {mobileMenuOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenuAlt3 className="text-2xl" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu with Medical Blue Theme */}
      <div className={`fixed top-0 z-50 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Mobile Menu Header - Medical Blue Gradient */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#0077BE] via-[#00A3E0] to-[#005A8C]">
          <img className="h-14 drop-shadow-lg" src="/adviklogo.jpg" alt='Advik Surgical' />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#E6F3FF] p-1 transition-colors"
          >
            <HiOutlineX className="text-2xl" />
          </button>
        </div>

        {/* Mobile User Section */}
        {user ? (
          <div className="px-5 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/my-account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-white border-2 border-green-300 text-green-700 px-3 py-2.5 rounded-lg hover:bg-green-50 transition-all font-semibold text-sm"
              >
                <Package className="w-4 h-4" />
                <span>Orders</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-2.5 rounded-lg hover:bg-red-600 transition-all font-semibold text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3.5 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl w-full"
            >
              <LogIn className="w-5 h-5" />
              <span>Login to Account</span>
            </Link>
          </div>
        )}

        {/* Mobile Quick Contact Section */}
        <div className="px-5 py-4 space-y-3 bg-gradient-to-b from-[#F0F8FF] to-white border-b-2 border-[#0077BE]/20">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0077BE] to-[#00A3E0] text-white px-4 py-3.5 rounded-xl hover:from-[#00A3E0] hover:to-[#005A8C] transition-all duration-300 font-bold shadow-lg hover:shadow-xl w-full"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiShoppingBag className="text-lg" />
            <span>Browse Products</span>
          </Link>
          
          <a
            href="https://wa.me/917052500888?text=Hi,%20I%20want%20to%20enquire%20about%20hospital%20furniture%20and%20medical%20equipment"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3.5 rounded-xl hover:bg-[#20BA5A] transition-all duration-300 font-bold shadow-lg hover:shadow-xl w-full"
          >
            <IoLogoWhatsapp className="text-xl" />
            <span>WhatsApp Enquiry</span>
          </a>

          <a
            href="tel:+917052500888"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3.5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl w-full"
          >
            <Phone className="w-5 h-5" />
            <span>Call: +91-7052500888</span>
          </a>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col p-5 space-y-1 h-full overflow-y-auto pb-24">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.to}
              className={`block px-4 py-3.5 text-base font-bold transition-all duration-200 rounded-xl ${
                location === item.to 
                  ? "text-[#0077BE] bg-gradient-to-r from-[#F0F8FF] to-[#E6F3FF]/30" 
                  : "text-[#003D5C] hover:text-[#0077BE] hover:bg-[#F0F8FF]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
