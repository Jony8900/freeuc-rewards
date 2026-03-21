import React from 'react';

export function Logo({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Definitions for gradients and effects */}
      <defs>
        {/* Gold gradient */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#F39C12" />
          <stop offset="100%" stopColor="#E67E22" />
        </linearGradient>
        
        {/* Shine gradient */}
        <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
        </linearGradient>
        
        {/* Shadow filter */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#F39C12" floodOpacity="0.5" />
        </filter>
        
        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer ring */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="4"
        filter="url(#shadow)"
      />
      
      {/* Inner circle background */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="#1a1a1f"
      />
      
      {/* Inner gold ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="2"
      />
      
      {/* UC Text */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="Arial Black, sans-serif"
        fontSize="32"
        fontWeight="900"
        fill="url(#goldGradient)"
        filter="url(#glow)"
      >
        UC
      </text>
      
      {/* Shine effect overlay */}
      <ellipse
        cx="35"
        cy="30"
        rx="20"
        ry="15"
        fill="url(#shineGradient)"
        opacity="0.4"
      />
      
      {/* Small sparkle dots */}
      <circle cx="25" cy="25" r="2" fill="#FFFFFF" opacity="0.8" />
      <circle cx="75" cy="30" r="1.5" fill="#FFFFFF" opacity="0.6" />
      <circle cx="70" cy="70" r="1" fill="#FFD700" opacity="0.7" />
    </svg>
  );
}

export function LogoWithText({ size = 48, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <Logo size={size} />
      <div>
        <h1 className="font-display text-2xl text-white tracking-tight">Free UC</h1>
        <p className="text-[#F39C12] text-xs uppercase tracking-[0.2em]">Rewards</p>
      </div>
    </div>
  );
}
