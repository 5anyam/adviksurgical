import './styles/globals.css';
import ReactQueryProvider from '../../components/ReactQueryProvider';
import { CartProvider } from '../../lib/cart';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FacebookPixel from '../../components/FacebookPixel';
import Script from 'next/script';
import AnnouncementBar from '../../components/anouncement';
import { Suspense } from 'react';
import Whatsapp from '../../components/Whatsapp';
import Loading from './loading';
import { AuthProvider } from "../../lib/auth-context";

export const metadata = {
  title: 'Advik Surgical - Hospital Furniture & Medical Equipment',
  description: 'Leading manufacturer and supplier of premium hospital furniture, ICU beds, OT equipment, medical trolleys, and oxygen systems. ISO certified products trusted by hospitals across India.',
  keywords: 'hospital furniture, ICU beds, medical equipment, hospital beds, OT equipment, medical trolleys, oxygen manifold, patient monitor, hospital setup, medical furniture, surgical equipment, healthcare furniture',
  openGraph: {
    title: 'Advik Surgical - Premium Hospital Furniture & Medical Equipment',
    description: 'ISO Certified Hospital Furniture & Medical Equipment. Trusted by hospitals across India. Complete healthcare solutions.',
    url: 'https://adviksurgical.com',
    siteName: 'Advik Surgical',
    images: [
      {
        url: '/logo.PNG',
        width: 1200,
        height: 630,
        alt: 'Advik Surgical - Hospital Furniture & Medical Equipment',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advik Surgical - Hospital Furniture & Medical Equipment',
    description: 'ISO Certified Medical Equipment. Complete Hospital Setup Solutions.',
    images: ['/logo.PNG'],
    creator: '@adviksurgical',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://adviksurgical.com',
  },
  category: 'Medical Equipment & Healthcare',
  classification: 'Hospital Furniture & Medical Supplies',
  authors: [{ name: 'Advik Surgical Team' }],
  creator: 'Advik Surgical',
  publisher: 'Advik Surgical',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fbPixelId = 'YOUR_FB_PIXEL_ID'; // Replace with actual Advik FB Pixel ID
  const gtagId = 'YOUR_GTAG_ID'; // Replace with actual Advik Google Ads ID

  return (
    <html lang="en">
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0077BE" />
        <meta name="msapplication-TileColor" content="#0077BE" />
        
        {/* Preload Critical Assets */}
        <link rel="preload" href="/logo.PNG" as="image" type="image/png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Lucknow" />
        <meta name="geo.country" content="India" />
        <meta name="target" content="all" />
        <meta name="audience" content="Hospitals, Healthcare Facilities, Medical Professionals" />
        <meta name="coverage" content="India" />
        
        {/* Structured Data for Medical Equipment Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Advik Surgical",
              "alternateName": "Advik Healthcare Furniture",
              "description": "Leading manufacturer and supplier of premium hospital furniture, ICU beds, OT equipment, medical trolleys, and oxygen systems. ISO certified products.",
              "url": "https://adviksurgical.com",
              "logo": "https://adviksurgical.com/logo.PNG",
              "image": "https://adviksurgical.com/logo.PNG",
              "foundingDate": "2019",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Natkur Near Bharat Petrol Pump",
                "addressLocality": "Lucknow",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "226002",
                "addressCountry": "IN"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-7052500888",
                  "contactType": "customer service",
                  "email": "adviksurgical2019@gmail.com",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"]
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-8840215794",
                  "contactType": "sales",
                  "email": "salesadviksurgical@gmail.com",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"]
                }
              ],
              "sameAs": [
                "https://www.facebook.com/adviksurgical",
                "https://www.instagram.com/adviksurgical",
                "https://wa.me/917052500888"
              ],
              "priceRange": "₹₹₹",
              "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "UPI"],
              "openingHours": "Mo-Sa 09:00-18:00",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Hospital Furniture & Medical Equipment",
                "itemListElement": [
                  {
                    "@type": "OfferCatalog",
                    "name": "ICU & Hospital Beds",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "Five Function ICU Bed"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "Electric ICU Bed"
                        }
                      }
                    ]
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "OT Equipment",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "OT Table Hydraulic"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "OT Light Double Dome"
                        }
                      }
                    ]
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "Medical Trolleys & Equipment",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "Emergency & Recovery Trolley"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "Patient Monitor"
                        }
                      }
                    ]
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "ratingCount": "500",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />

        {/* Product Schema for Medical Equipment */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Hospital Furniture & Medical Equipment",
              "brand": {
                "@type": "Brand",
                "name": "Advik Surgical"
              },
              "description": "ISO Certified Hospital Furniture, ICU Beds, OT Equipment, Medical Trolleys, and Healthcare Solutions",
              "category": "Medical Equipment & Healthcare Furniture",
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "INR",
                "lowPrice": "5000",
                "highPrice": "500000",
                "offerCount": "100+",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Advik Surgical"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "ratingCount": "500"
              },
              "manufacturer": {
                "@type": "Organization",
                "name": "Advik Surgical",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Lucknow",
                  "addressRegion": "Uttar Pradesh",
                  "addressCountry": "IN"
                }
              }
            })
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://adviksurgical.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Products",
                  "item": "https://adviksurgical.com/shop"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Hospital Furniture",
                  "item": "https://adviksurgical.com/shop/hospital-furniture"
                }
              ]
            })
          }}
        />

        {/* Facebook Pixel Script */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
            
            // Track medical equipment specific events
            fbq('trackCustom', 'ViewMedicalBrand', {
              brand: 'Advik Surgical',
              category: 'Hospital Furniture',
              product_type: 'Medical Equipment',
              business_type: 'B2B Healthcare'
            });
          `}
        </Script>

        {/* Google Analytics */}
        <Script 
          src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtagId}', {
              page_title: 'Advik Surgical',
              page_location: window.location.href,
              content_group1: 'Hospital Furniture',
              content_group2: 'Medical Equipment',
              custom_map: {
                'dimension1': 'medical_b2b',
                'dimension2': 'hospital_furniture_category',
                'dimension3': 'healthcare_equipment'
              }
            });
            
            // Enhanced ecommerce tracking for B2B
            gtag('config', '${gtagId}', {
              'custom_map': {'custom_parameter': 'dimension1'},
              'enhanced_ecommerce': true,
              'send_page_view': true
            });
          `}
        </Script>

        {/* Google Tag Manager (Optional) */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>

        {/* Facebook Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
            alt="facebook pixel"
          />
        </noscript>
      </head>
      <body className="overflow-x-hidden overflow-y-scroll antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <ReactQueryProvider>
          <CartProvider>
            <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <AnnouncementBar />
              <Header />
              
              <main role="main" className="flex-grow">
                <Suspense fallback={<Loading />}>
                  {children}
                </Suspense>
              </main>

              <Footer />
            </div>
            <Whatsapp/>
            
            {/* Facebook Pixel Route Tracking */}
            <Suspense fallback={null}>
              <FacebookPixel pixelId={1648859765778662} />
            </Suspense>
            </AuthProvider>
          </CartProvider>
        </ReactQueryProvider>

        {/* Customer Chat Plugin (Optional for B2B) */}
        <Script id="facebook-chat" strategy="lazyOnload">
          {`
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "YOUR_PAGE_ID");
            chatbox.setAttribute("attribution", "biz_inbox");
            chatbox.setAttribute("greeting_dialog_display", "hide");
            
            window.fbAsyncInit = function() {
              FB.init({
                xfbml: true,
                version: 'v18.0'
              });
            };
            
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `}
        </Script>
        
        {/* Facebook Customer Chat */}
        <div id="fb-customer-chat" className="fb-customerchat"></div>
      </body>
    </html>
  );
}
