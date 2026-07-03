/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function CollegeLogo({ className = "", size = 48 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`${className}`}
      id="college-official-seal"
    >
      <defs>
        {/* Glow and drop shadows for realistic depth */}
        <filter id="logo-drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.2" />
        </filter>
        <radialGradient id="gold-metallic" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF4D0" />
          <stop offset="30%" stopColor="#F5D061" />
          <stop offset="70%" stopColor="#D4A316" />
          <stop offset="100%" stopColor="#AA7C00" />
        </radialGradient>
        <linearGradient id="navy-royal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="50%" stopColor="#0B132B" />
          <stop offset="100%" stopColor="#1D1A39" />
        </linearGradient>
        {/* Curved circular paths for text alignment */}
        <path id="arc-path-top" d="M 22 100 A 78 78 0 0 1 178 100" fill="none" />
        <path id="arc-path-bottom" d="M 178 100 A 78 78 0 0 1 22 100" fill="none" />
      </defs>

      {/* Outer Golden Rim */}
      <circle cx="100" cy="100" r="95" fill="url(#navy-royal)" stroke="url(#gold-metallic)" strokeWidth="6" filter="url(#logo-drop-shadow)" />
      
      {/* Inner dotted decorative ring */}
      <circle cx="100" cy="100" r="82" fill="none" stroke="url(#gold-metallic)" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Circular Institutional Text in Thai (Top) */}
      <text fill="url(#gold-metallic)" fontSize="11" fontWeight="900" fontFamily="'Inter', 'Sarabun', sans-serif" letterSpacing="0.8">
        <textPath href="#arc-path-top" startOffset="50%" textAnchor="middle">
          วิทยาลัยเทคโนโลยีปทุมรัตต์
        </textPath>
      </text>
      
      {/* Circular Institutional Text in English (Bottom) */}
      <text fill="url(#gold-metallic)" fontSize="8.5" fontWeight="900" fontFamily="'Inter', sans-serif" letterSpacing="0.9">
        <textPath href="#arc-path-bottom" startOffset="50%" textAnchor="middle">
          PATHUMRAT TECHNOLOGY COLLEGE
        </textPath>
      </text>

      {/* Central Emblem Backdrop */}
      <circle cx="100" cy="100" r="56" fill="#0B132B" stroke="url(#gold-metallic)" strokeWidth="3" />

      {/* Tech Cogwheel (representing Technology) */}
      <g stroke="url(#gold-metallic)" strokeWidth="2" fill="none" opacity="0.85">
        <circle cx="100" cy="100" r="28" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          return (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 34 * Math.cos((angle * Math.PI) / 180)}
              y2={100 + 34 * Math.sin((angle * Math.PI) / 180)}
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          );
        })}
      </g>
      <circle cx="100" cy="100" r="23" fill="#0B132B" />

      {/* Open Academic Book Base */}
      <path
        d="M 72 116 Q 86 112 100 118 Q 114 112 128 116 L 128 123 Q 114 119 100 125 Q 86 119 72 123 Z"
        fill="url(#gold-metallic)"
        stroke="#0F172A"
        strokeWidth="0.5"
      />

      {/* Golden Sacred Lotus Petals (representing "ปทุมรัตต์") */}
      {/* Central main petal */}
      <path
        d="M 100 72 C 95 83 95 104 100 112 C 105 104 105 83 100 72 Z"
        fill="url(#gold-metallic)"
        stroke="#1E3A8A"
        strokeWidth="0.5"
      />
      {/* Inner left petal */}
      <path
        d="M 100 81 C 87 87 85 104 98 112 C 93 102 95 89 100 81 Z"
        fill="url(#gold-metallic)"
        stroke="#1E3A8A"
        strokeWidth="0.5"
      />
      {/* Inner right petal */}
      <path
        d="M 100 81 C 113 87 115 104 102 112 C 107 102 105 89 100 81 Z"
        fill="url(#gold-metallic)"
        stroke="#1E3A8A"
        strokeWidth="0.5"
      />
      {/* Outer left petal */}
      <path
        d="M 100 90 C 76 96 80 110 95 112 C 82 104 88 96 100 90 Z"
        fill="url(#gold-metallic)"
        stroke="#1E3A8A"
        strokeWidth="0.5"
      />
      {/* Outer right petal */}
      <path
        d="M 100 90 C 124 96 120 110 105 112 C 118 104 112 96 100 90 Z"
        fill="url(#gold-metallic)"
        stroke="#1E3A8A"
        strokeWidth="0.5"
      />

      {/* Sparkling Crown Diamond/Flame */}
      <path
        d="M 100 54 L 102.5 59.5 L 108 61 L 104 64.5 L 105 70 L 100 67 L 95 70 L 96 64.5 L 92 61 L 97.5 59.5 Z"
        fill="url(#gold-metallic)"
      />
    </svg>
  );
}
