// app/loading.tsx
import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
      {/* Animated Logo/Icon */}
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 border-4 border-[#F0F8FF] rounded-full animate-ping opacity-25"></div>
        <div className="absolute inset-0 border-4 border-t-[#0077BE] border-r-[#0077BE] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        {/* Optional: Add a small static logo or icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#003D5C] rounded-full"></div>
        </div>
      </div>
      
      {/* Loading Text */}
      <h2 className="text-[#003D5C] font-bold text-lg animate-pulse tracking-widest">
        LOADING...
      </h2>
      <p className="text-[#0077BE] text-xs mt-2 font-medium">
        Preparing equipment catalog
      </p>
    </div>
  );
}
