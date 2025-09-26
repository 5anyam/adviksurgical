import React from 'react';

const SmoothMarquee = () => {
  const items = [
    { label: '💎 Premium EDP', color: 'bg-black/80' },
    { label: '🌹 Long Lasting', color: 'bg-black/80' },
    { label: '✨ Luxury Crafted', color: 'bg-black/80' },
    { label: '🌙 After Dark Collection', color: 'bg-black/80' },
    { label: '🔥 Seductive Blend', color: 'bg-black/80' },
    { label: '💫 Unisex Appeal', color: 'bg-black/80' },
  ];

  return (
    <div className="relative overflow-hidden w-full mb-4 z-1">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="animate-scroll flex gap-2 w-max">
        {/* Duplicate items multiple times for seamless loop */}
        {Array(3).fill(items).flat().map((item, idx) => (
          <div
            key={idx}
            className={`${item.color} px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm transform hover:scale-105 transition-all duration-300 flex-shrink-0 backdrop-blur-sm border border-gray-600/30`}
          >
            <span className="text-xs sm:text-sm font-medium text-white/90 whitespace-nowrap tracking-wide">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmoothMarquee;
