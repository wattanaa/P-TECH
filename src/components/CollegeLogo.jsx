/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useData } from "../context/DataContext";

export default function CollegeLogo({ className = "", size = 48 }) {
  const { collegeInfo } = useData();

  if (collegeInfo?.logoUrl) {
    return (
      <img
        src={collegeInfo.logoUrl}
        alt={collegeInfo.name || "วิทยาลัยเทคโนโลยีปทุมรัตต์"}
        style={{ width: size, height: size }}
        className={`object-contain rounded-full bg-white p-1 border border-slate-200 shadow-sm ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Draw a stunning vector SVG of the Pathumrat Technology College logo
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`${className}`}
      id="college-official-seal"
    >
      <defs>
        <filter id="logo-drop-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.15" />
        </filter>
        {/* Curved paths for circular text */}
        <path id="arc-path-top" d="M 28 100 A 72 72 0 0 1 172 100" fill="none" />
        <path id="arc-path-bottom" d="M 172 100 A 72 72 0 0 1 28 100" fill="none" />
      </defs>

      {/* 1. Outer Blue Gear Ring */}
      <g fill="#2b3e9a" stroke="#2b3e9a" strokeWidth="1" filter="url(#logo-drop-shadow)">
        {/* Main outer ring */}
        <circle cx="100" cy="100" r="92" />
        {/* Gear Teeth (20 teeth) */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i * 360) / 20;
          return (
            <rect
              key={i}
              x="92"
              y="3"
              width="16"
              height="15"
              rx="2"
              transform={`rotate(${angle} 100 100)`}
            />
          );
        })}
      </g>

      {/* 2. Inner White Ring with Blue Borders */}
      <circle cx="100" cy="100" r="82" fill="#ffffff" stroke="#2b3e9a" strokeWidth="3" />
      <circle cx="100" cy="100" r="54" fill="none" stroke="#2b3e9a" strokeWidth="2" />

      {/* 3. Thai Text (Top) */}
      <text
        fill="#2b3e9a"
        fontSize="12"
        fontWeight="800"
        fontFamily="'Sarabun', 'Inter', sans-serif"
        letterSpacing="0.5"
      >
        <textPath href="#arc-path-top" startOffset="50%" textAnchor="middle">
          วิทยาลัยเทคโนโลยีปทุมรัตต์
        </textPath>
      </text>

      {/* 4. Thai Text (Bottom) */}
      <text
        fill="#2b3e9a"
        fontSize="12.5"
        fontWeight="800"
        fontFamily="'Sarabun', 'Inter', sans-serif"
        letterSpacing="0.2"
      >
        <textPath href="#arc-path-bottom" startOffset="50%" textAnchor="middle">
          อ.ปทุมรัตต์ จ.ร้อยเอ็ด
        </textPath>
      </text>

      {/* 5. Central Emblem (Split into 3 sections) */}
      {/* Outer boundary circle for central emblem */}
      <circle cx="100" cy="100" r="50" fill="#ffffff" stroke="#2b3e9a" strokeWidth="2.5" />

      {/* Dividers (Mercedes-benz style star meeting at center) */}
      <g stroke="#2b3e9a" strokeWidth="2.5" strokeLinecap="round">
        {/* Vertical Downwards line */}
        <line x1="100" y1="100" x2="100" y2="150" />
        {/* Top-Right line (approx 30 deg up-right, i.e., 150 deg from vertical down) */}
        <line x1="100" y1="100" x2="143" y2="75" />
        {/* Top-Left line (approx 30 deg up-left, i.e., 210 deg from vertical down) */}
        <line x1="100" y1="100" x2="57" y2="75" />
      </g>

      {/* 6. Section 1 (Top Field): Candle, Book, and Leaves */}
      <g transform="translate(100, 72) scale(0.65)" stroke="#2b3e9a" fill="none" strokeWidth="2">
        {/* Flame/Light */}
        <path d="M 0 -22 C -4 -12 -4 -4 0 0 C 4 -4 4 -12 0 -22 Z" fill="#2b3e9a" />
        {/* Torch holder */}
        <line x1="0" y1="0" x2="0" y2="14" strokeWidth="3" />
        {/* Book */}
        <path d="M -18 14 Q -9 11 0 16 Q 9 11 18 14 L 18 20 Q 9 17 0 22 Q -9 17 -18 20 Z" fill="#ffffff" />
        {/* Left Laurel leaf branch */}
        <path d="M -8 10 Q -18 -2 -12 -12" />
        <circle cx="-15" cy="-8" r="1.5" fill="#2b3e9a" />
        <circle cx="-13" cy="-3" r="1.5" fill="#2b3e9a" />
        <circle cx="-10" cy="2" r="1.5" fill="#2b3e9a" />
        {/* Right Laurel leaf branch */}
        <path d="M 8 10 Q 18 -2 12 -12" />
        <circle cx="15" cy="-8" r="1.5" fill="#2b3e9a" />
        <circle cx="13" cy="-3" r="1.5" fill="#2b3e9a" />
        <circle cx="10" cy="2" r="1.5" fill="#2b3e9a" />
      </g>

      {/* 7. Section 2 (Bottom-Left Field): Lotus Flower ("ปทุม") */}
      <g transform="translate(76, 116) scale(0.55)" stroke="#2b3e9a" strokeWidth="2.5" fill="none">
        {/* Lotus Petals */}
        <path d="M 0 -18 C -10 -5 -12 12 0 18 C 12 12 10 -5 0 -18 Z" fill="#ffffff" />
        <path d="M 0 -5 C -15 0 -15 15 -2 18 C -10 10 -8 2 0 -5 Z" fill="#ffffff" />
        <path d="M 0 -5 C 15 0 15 15 2 18 C 10 10 8 2 0 -5 Z" fill="#ffffff" />
        {/* Water ripples below */}
        <path d="M -14 24 Q 0 21 14 24" strokeWidth="2" />
        <path d="M -8 28 Q 0 26 8 28" strokeWidth="1.5" />
      </g>

      {/* 8. Section 3 (Bottom-Right Field): Computer */}
      <g transform="translate(122, 116) scale(0.6)" stroke="#2b3e9a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Monitor */}
        <rect x="-16" y="-14" width="28" height="20" rx="3" fill="#ffffff" />
        <line x1="-12" y1="-2" x2="8" y2="-2" />
        {/* Screen inside */}
        <rect x="-13" y="-11" width="22" height="13" rx="1" fill="#ffffff" />
        {/* Stand */}
        <path d="M -6 6 L -10 14 L 6 14 L 2 6 Z" fill="#ffffff" />
        {/* Keyboard lines */}
        <path d="M -14 18 L 10 18" strokeWidth="2" />
      </g>
    </svg>
  );
}
