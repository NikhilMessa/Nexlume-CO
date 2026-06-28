import React, { useState } from "react";
import "./Services.css";
import "./FlowingMenu.css";
import { gsap } from "gsap";
import SEO from "../SEO/SEO";

// ================= Shared Icon Function =================
// Professional SVG-based icons for software agency portfolio
const getCreativeIcon = (type) => {
  const icons = {
    "Website Development": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="webdevGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#667eea", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#764ba2", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Browser window */}
        <rect x="12" y="20" width="76" height="58" rx="5" fill="url(#webdevGrad)" opacity="0.95" />
        <rect x="12" y="20" width="76" height="58" rx="5" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
        <rect x="12" y="20" width="76" height="13" rx="5" fill="rgba(255,255,255,0.15)" />
        <circle cx="22" cy="26.5" r="2.5" fill="rgba(255,255,255,0.8)" />
        <circle cx="30" cy="26.5" r="2.5" fill="rgba(255,255,255,0.55)" />
        <circle cx="38" cy="26.5" r="2.5" fill="rgba(255,255,255,0.55)" />
        {/* HTML / code tags */}
        <path
          d="M 32 48 L 26 52 L 32 56 M 68 48 L 74 52 L 68 56"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 44 58 L 56 46"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Code lines */}
        <rect x="20" y="64" width="30" height="2.5" rx="1.25" fill="rgba(255,255,255,0.5)" />
        <rect x="20" y="70" width="22" height="2.5" rx="1.25" fill="rgba(255,255,255,0.35)" />
        {/* Server / backend node */}
        <rect x="62" y="62" width="18" height="12" rx="2" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        <circle cx="66" cy="68" r="1.5" fill="rgba(102,126,234,0.9)" />
        <circle cx="71" cy="68" r="1.5" fill="rgba(102,126,234,0.7)" />
        <circle cx="76" cy="68" r="1.5" fill="rgba(102,126,234,0.5)" />
      </svg>
    ),
    "Web Design": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="designGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#fa709a", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#fee140", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Website layout mockup */}
        <rect x="16" y="22" width="68" height="56" rx="5" fill="url(#designGrad)" opacity="0.95" />
        <rect x="16" y="22" width="68" height="56" rx="5" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
        {/* Hero banner block */}
        <rect x="22" y="28" width="56" height="14" rx="2" fill="rgba(255,255,255,0.35)" />
        {/* Content columns */}
        <rect x="22" y="46" width="24" height="24" rx="2" fill="rgba(255,255,255,0.25)" />
        <rect x="50" y="46" width="28" height="5" rx="1.5" fill="rgba(255,255,255,0.6)" />
        <rect x="50" y="54" width="22" height="3" rx="1.5" fill="rgba(255,255,255,0.4)" />
        <rect x="50" y="60" width="26" height="3" rx="1.5" fill="rgba(255,255,255,0.35)" />
        <rect x="50" y="66" width="18" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
        {/* Color palette swatches */}
        <circle cx="24" cy="84" r="4" fill="#fa709a" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
        <circle cx="36" cy="84" r="4" fill="#fee140" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
        <circle cx="48" cy="84" r="4" fill="#30cfd0" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
        {/* Design pen tool */}
        <path
          d="M 68 14 L 78 18 L 72 28 L 62 24 Z"
          fill="rgba(255,255,255,0.9)"
        />
        <path
          d="M 62 24 L 58 32"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="57" cy="33" r="2" fill="rgba(250,112,154,0.9)" />
      </svg>
    ),
    "Android Development": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="androidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#3ddc84", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#00a86b", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="androidGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#1a1a1a", stopOpacity: 0.95 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#2d2d2d", stopOpacity: 0.95 }}
            />
          </linearGradient>
        </defs>
        {/* Smartphone frame */}
        <rect
          x="28"
          y="16"
          width="44"
          height="68"
          rx="7"
          fill="url(#androidGrad)"
          opacity="0.95"
        />
        <rect
          x="28"
          y="16"
          width="44"
          height="68"
          rx="7"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2"
        />
        <rect x="44" y="20" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.35)" />
        {/* Screen */}
        <rect
          x="33"
          y="27"
          width="34"
          height="50"
          rx="4"
          fill="url(#androidGrad2)"
        />
        {/* Android robot head */}
        <path
          d="M 50 34 C 58 34 63 39 63 46 C 63 53 58 58 50 58 C 42 58 37 53 37 46 C 37 39 42 34 50 34 Z"
          fill="url(#androidGrad)"
          opacity="0.95"
        />
        <path
          d="M 50 34 C 58 34 63 39 63 46 C 63 53 58 58 50 58 C 42 58 37 53 37 46 C 37 39 42 34 50 34 Z"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
        <line x1="42" y1="36" x2="40" y2="30" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
        <line x1="58" y1="36" x2="60" y2="30" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="44" cy="45" r="2.5" fill="rgba(255,255,255,0.95)" />
        <circle cx="56" cy="45" r="2.5" fill="rgba(255,255,255,0.95)" />
        {/* Code brackets — native app development */}
        <path
          d="M 42 66 L 38 68 L 42 70 M 58 66 L 62 68 L 58 70"
          stroke="rgba(61,220,132,0.9)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="44" y="78" width="12" height="2" rx="1" fill="rgba(255,255,255,0.35)" />
      </svg>
    ),
    "Logo Design": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#f59e0b", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#ef4444", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Vector artboard */}
        <rect x="18" y="24" width="64" height="52" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Abstract logo mark — circle + swoosh */}
        <circle cx="46" cy="46" r="14" fill="url(#logoGrad)" opacity="0.95" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
        <path
          d="M 52 38 Q 66 38 68 52 Q 66 62 54 58"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Bezier anchor points */}
        <circle cx="52" cy="38" r="2.5" fill="rgba(255,255,255,0.9)" stroke="url(#logoGrad)" strokeWidth="1" />
        <circle cx="68" cy="52" r="2.5" fill="rgba(255,255,255,0.9)" stroke="url(#logoGrad)" strokeWidth="1" />
        <circle cx="54" cy="58" r="2.5" fill="rgba(255,255,255,0.9)" stroke="url(#logoGrad)" strokeWidth="1" />
        {/* Pen nib — vector design tool */}
        <path
          d="M 62 18 L 74 22 L 68 34 L 56 30 Z"
          fill="rgba(255,255,255,0.95)"
        />
        <path d="M 56 30 L 52 38" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="51" cy="39" r="2" fill="url(#logoGrad)" />
        {/* Typography preview line */}
        <rect x="26" y="68" width="28" height="2.5" rx="1.25" fill="url(#logoGrad)" opacity="0.8" />
        <rect x="30" y="74" width="20" height="2" rx="1" fill="url(#logoGrad)" opacity="0.5" />
      </svg>
    ),
    "E-commerce Solutions": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="ecomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#10b981", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#059669", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="ecomGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#34d399", stopOpacity: 0.5 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#10b981", stopOpacity: 0.3 }}
            />
          </linearGradient>
        </defs>
        {/* Store awning */}
        <path
          d="M 22 38 L 50 28 L 78 38 L 78 42 L 22 42 Z"
          fill="url(#ecomGrad)"
          opacity="0.95"
        />
        <path
          d="M 22 38 L 50 28 L 78 38"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Storefront */}
        <rect
          x="24"
          y="42"
          width="52"
          height="36"
          rx="3"
          fill="url(#ecomGrad2)"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.5"
        />
        {/* Shopping cart */}
        <path
          d="M 34 58 L 38 58 L 42 68 L 62 68 L 66 58 L 72 58"
          stroke="url(#ecomGrad)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="44" cy="72" r="3" fill="rgba(255,255,255,0.9)" />
        <circle cx="60" cy="72" r="3" fill="rgba(255,255,255,0.9)" />
        {/* Product box in cart */}
        <rect
          x="46"
          y="60"
          width="10"
          height="8"
          rx="1.5"
          fill="rgba(255,255,255,0.75)"
        />
        {/* Price tag */}
        <path
          d="M 58 48 L 68 48 L 72 52 L 68 56 L 58 56 Z"
          fill="url(#ecomGrad)"
          opacity="0.9"
        />
        <circle cx="60" cy="52" r="1.5" fill="rgba(255,255,255,0.9)" />
      </svg>
    ),
    "UI/UX Design": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="uiuxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#6366f1", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="uiuxGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#a78bfa", stopOpacity: 0.4 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#818cf8", stopOpacity: 0.2 }}
            />
          </linearGradient>
        </defs>
        {/* Desktop wireframe — background frame */}
        <rect
          x="18"
          y="22"
          width="58"
          height="42"
          rx="5"
          fill="url(#uiuxGrad2)"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <rect x="24" y="30" width="22" height="3" rx="1.5" fill="rgba(255,255,255,0.45)" />
        <rect x="24" y="37" width="36" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
        <rect x="24" y="43" width="28" height="2" rx="1" fill="rgba(255,255,255,0.25)" />
        <rect x="24" y="52" width="14" height="8" rx="2" fill="rgba(139,92,246,0.35)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        {/* Mobile wireframe — foreground frame */}
        <rect
          x="52"
          y="38"
          width="30"
          height="48"
          rx="5"
          fill="url(#uiuxGrad)"
          opacity="0.95"
        />
        <rect
          x="52"
          y="38"
          width="30"
          height="48"
          rx="5"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2"
        />
        <rect x="60" y="42" width="14" height="2" rx="1" fill="rgba(255,255,255,0.35)" />
        <rect x="57" y="48" width="20" height="2" rx="1" fill="rgba(255,255,255,0.7)" />
        <rect x="57" y="54" width="16" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
        <rect x="57" y="60" width="20" height="10" rx="2" fill="rgba(255,255,255,0.25)" />
        <rect x="57" y="74" width="20" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
        {/* UX cursor pointer */}
        <path
          d="M 30 68 L 30 58 L 38 64 Z"
          fill="rgba(255,255,255,0.95)"
        />
        <path
          d="M 38 64 L 46 72 L 42 74 L 36 68 Z"
          fill="rgba(255,255,255,0.75)"
        />
        {/* Flow connector dots */}
        <circle cx="22" cy="72" r="2.5" fill="url(#uiuxGrad)" />
        <line x1="24" y1="72" x2="28" y2="66" stroke="rgba(139,92,246,0.7)" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    ),
    "SEO Optimization": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="seoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#f59e0b", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#d97706", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Ranking bar chart — search visibility growth */}
        <rect x="20" y="58" width="10" height="18" rx="2" fill="url(#seoGrad)" opacity="0.45" />
        <rect x="34" y="48" width="10" height="28" rx="2" fill="url(#seoGrad)" opacity="0.65" />
        <rect x="48" y="36" width="10" height="40" rx="2" fill="url(#seoGrad)" opacity="0.85" />
        {/* Upward trend arrow */}
        <path
          d="M 58 56 L 74 32 M 74 32 L 69 32 M 74 32 L 74 37"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Magnifying glass — search */}
        <circle cx="42" cy="42" r="16" fill="none" stroke="url(#seoGrad)" strokeWidth="3.5" />
        <path d="M 54 54 L 66 66" stroke="url(#seoGrad)" strokeWidth="4" strokeLinecap="round" />
        {/* Search result lines inside lens */}
        <rect x="32" y="38" width="16" height="2" rx="1" fill="rgba(255,255,255,0.7)" />
        <rect x="32" y="43" width="12" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
        <rect x="32" y="48" width="14" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
        {/* #1 rank badge */}
        <circle cx="76" cy="28" r="8" fill="url(#seoGrad)" />
        <text x="76" y="31.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">1</text>
      </svg>
    ),
    "Brand Strategy": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#ec4899", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#be185d", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="brandGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#f472b6", stopOpacity: 0.5 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#ec4899", stopOpacity: 0.3 }}
            />
          </linearGradient>
        </defs>
        {/* Strategy target — brand positioning bullseye */}
        <circle
          cx="50"
          cy="46"
          r="28"
          fill="none"
          stroke="url(#brandGrad)"
          strokeWidth="2.5"
          opacity="0.45"
        />
        <circle
          cx="50"
          cy="46"
          r="20"
          fill="none"
          stroke="url(#brandGrad)"
          strokeWidth="2.5"
          opacity="0.65"
        />
        <circle
          cx="50"
          cy="46"
          r="12"
          fill="url(#brandGrad2)"
          stroke="url(#brandGrad)"
          strokeWidth="2"
          opacity="0.9"
        />
        <circle cx="50" cy="46" r="5" fill="url(#brandGrad)" />
        {/* Arrow — strategic direction */}
        <path
          d="M 50 18 L 50 30 M 50 18 L 46 24 M 50 18 L 54 24"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Brand identity layers */}
        <rect
          x="22"
          y="72"
          width="56"
          height="3"
          rx="1.5"
          fill="url(#brandGrad)"
          opacity="0.85"
        />
        <rect
          x="28"
          y="79"
          width="44"
          height="2.5"
          rx="1.25"
          fill="url(#brandGrad)"
          opacity="0.6"
        />
        <rect
          x="34"
          y="85"
          width="32"
          height="2"
          rx="1"
          fill="url(#brandGrad)"
          opacity="0.4"
        />
        {/* Compass points — market strategy */}
        <path
          d="M 22 46 L 28 46 M 72 46 L 78 46"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    "Product Development": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient
            id="productDevGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#0ea5e9", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#6366f1", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient
            id="productDevGrad2"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#38bdf8", stopOpacity: 0.5 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#818cf8", stopOpacity: 0.5 }}
            />
          </linearGradient>
        </defs>
        {/* Product layers - MVP to launch stages */}
        <rect
          x="22"
          y="58"
          width="56"
          height="18"
          rx="4"
          fill="url(#productDevGrad2)"
          opacity="0.85"
        />
        <rect
          x="22"
          y="58"
          width="56"
          height="18"
          rx="4"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
        />
        <rect
          x="28"
          y="44"
          width="44"
          height="16"
          rx="3"
          fill="url(#productDevGrad2)"
          opacity="0.7"
        />
        <rect
          x="28"
          y="44"
          width="44"
          height="16"
          rx="3"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
        />
        <rect
          x="34"
          y="32"
          width="32"
          height="14"
          rx="3"
          fill="url(#productDevGrad)"
          opacity="0.95"
        />
        <rect
          x="34"
          y="32"
          width="32"
          height="14"
          rx="3"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.5"
        />
        {/* Launch rocket */}
        <path
          d="M 50 14 L 56 28 L 50 26 L 44 28 Z"
          fill="url(#productDevGrad)"
          opacity="0.95"
        />
        <path
          d="M 50 14 L 56 28 L 50 26 L 44 28 Z"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="20" r="2.5" fill="rgba(255,255,255,0.9)" />
        {/* Launch trail */}
        <path
          d="M 46 28 Q 50 34, 54 28"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 48 30 L 46 36 M 52 30 L 54 36"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Product feature lines */}
        <rect
          x="38"
          y="37"
          width="10"
          height="2"
          rx="1"
          fill="rgba(255,255,255,0.7)"
        />
        <rect
          x="52"
          y="37"
          width="8"
          height="2"
          rx="1"
          fill="rgba(255,255,255,0.5)"
        />
        <rect
          x="34"
          y="49"
          width="14"
          height="2"
          rx="1"
          fill="rgba(255,255,255,0.6)"
        />
        <rect
          x="52"
          y="49"
          width="12"
          height="2"
          rx="1"
          fill="rgba(255,255,255,0.4)"
        />
      </svg>
    ),
  };
  return icons[type] || icons["Website Development"];
};

// ================= FlowingMenu Component =================
function FlowingMenu({ items = [] }) {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, imageType }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{text}</span>
      <div className={`marquee__img marquee__img--${imageType}`}>
        {getCreativeIcon(text)}
      </div>
    </React.Fragment>
  ));

  return (
    <div className="menu__item" ref={itemRef}>
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= Main Services Page =================
const Services = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Services");
  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);

  // Demo items for FlowingMenu with creative icon types
  const demoItems = [
    {
      link: "#",
      text: "Website Development",
      imageType: "webdev",
      description:
        "Custom websites built with cutting-edge technologies for optimal performance",
      category: "Development",
    },
    {
      link: "#",
      text: "Web Design",
      imageType: "webdesign",
      description:
        "Stunning, user-friendly interfaces that captivate and convert visitors",
      category: "Design",
    },
    {
      link: "#",
      text: "Android Development",
      imageType: "android",
      description:
        "Native and cross-platform mobile apps with seamless user experiences",
      category: "Development",
    },
    {
      link: "#",
      text: "Product Development",
      imageType: "productdev",
      description:
        "We transform innovative ideas into scalable digital products, from MVP development to full product launch.",
      category: "Development",
    },
    {
      link: "#",
      text: "Logo Design",
      imageType: "logo",
      description:
        "Memorable brand identities that make your business stand out",
      category: "Design",
    },
    {
      link: "#",
      text: "E-commerce Solutions",
      imageType: "ecommerce",
      description:
        "Complete online stores with secure payment gateways and inventory management",
      category: "Development",
    },
    {
      link: "#",
      text: "UI/UX Design",
      imageType: "uiux",
      description:
        "Research-driven design that enhances user satisfaction and engagement",
      category: "Design",
    },
    {
      link: "#",
      text: "SEO Optimization",
      imageType: "seo",
      description: "Boost your visibility and rank higher on search engines",
      category: "Marketing",
    },
    {
      link: "#",
      text: "Brand Strategy",
      imageType: "branding",
      description: "Comprehensive brand guidelines and positioning strategies",
      category: "Design",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Why choose Nexlume?",
      answer:
        "With Nexlume, you gain a skilled, multi-disciplinary team specializing in web, software, app development, and branding—delivering top-quality solutions without the cost of full-time hires.",
    },
    {
      id: 2,
      question: "How fast can we deliver?",
      answer:
        "Websites: 6-8 weeks, Android Apps: 3-6 months, Logos: 2-3 days. We balance speed and quality for exceptional results.",
    },
    {
      id: 3,
      question: "How do you track progress?",
      answer:
        "We provide regular updates via email, project management tools, or scheduled meetings, ensuring full transparency at every stage.",
    },
    {
      id: 4,
      question: "How to request a project?",
      answer:
        "Simply contact us via our website or email, share your requirements, and receive a custom proposal and timeline.",
    },
  ];

  // Filter services based on active category
  const filteredServices =
    activeCategory === "All Services"
      ? demoItems
      : demoItems.filter((item) => item.category === activeCategory);

  return (
    <>
          <SEO
        title="Services | Website Design, App Development & UI/UX | Nexlume"
        description="Explore Nexlume services including website development, mobile app development, UI/UX design, branding, SEO optimization, and software development."
        canonical="/services"
        keywords="website development services, app development services, UI UX design services, SEO services, software development"
      />
            {/* Header */}
      <div className="full-screen-container">
        <div className="header">
          <div className="services-style-head">
            <div className="services-style-meta">
              <span className="services-style-line" />
              <span className="services-style-number">01</span>
              <span className="services-style-label">OUR EXPERTISE</span>
            </div>
            <h1 className="hero-layered-title">
              <span className="hero-layer hero-layer--bg">DISCOVER</span>
              <span className="hero-layer hero-layer--accent">OUR</span>
              <span className="hero-layer hero-layer--fg">EXPERTISE</span>
            </h1>
          </div>
          <p>
            At Nexlume, we pride ourselves on our commitment to <br />
            <span className="highlight">
              Excellence, Creativity, and Timely delivery
            </span>{" "}
            Let us help you build a strong online presence that sets your brand
            apart.
          </p>
        </div>
      </div>

      {/* Flowing Services Menu - Enhanced */}
      <section className="main-container services-showcase">
        <div className="services-header">
          <div className="services-style-head" data-aos="fade-up">
            <div className="services-style-meta">
              <span className="services-style-line" />
              <span className="services-style-number">02</span>
              <span className="services-style-label">THE CHALLENGE</span>
            </div>
            <h2 className="services-style-title" data-aos-delay="100">
              <span className="services-style-main">OUR</span>
              <span className="services-style-accent">SERVICES</span>
              <span className="services-style-bottom">WE OFFER</span>
            </h2>
          </div>
          <p
            className="services-subtitle"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Comprehensive digital solutions tailored to elevate your brand and
            drive growth
          </p>
        </div>

        {/* Service Categories */}
        <div
          className="service-categories"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <button
            className={`category-btn text-white fw-semibold ${activeCategory === "All Services" ? "active" : ""}`}
            onClick={() => setActiveCategory("All Services")}
          >
            All Services
          </button>
          <button
            className={`category-btn text-white fw-semibold ${activeCategory === "Development" ? "active" : ""}`}
            onClick={() => setActiveCategory("Development")}
          >
            Development
          </button>
          <button
            className={`category-btn text-white fw-semibold ${activeCategory === "Design" ? "active" : ""}`}
            onClick={() => setActiveCategory("Design")}
          >
            Design
          </button>
          <button
            className={`category-btn text-white fw-semibold ${activeCategory === "Marketing" ? "active" : ""}`}
            onClick={() => setActiveCategory("Marketing")}
          >
            Marketing
          </button>
        </div>

        {/* Service Cards Grid */}
        <div className="services-grid">
          {filteredServices.map((item) => (
            <div className="service-card" key={item.text}>
              <div className="service-card-inner">
                <div className="service-icon-wrapper">
                  <div className="service-icon">
                    {getCreativeIcon(item.text)}
                  </div>
                  <div className="service-glow"></div>
                </div>
                <span className="service-category-badge">{item.category}</span>
                <h3 className="service-title">{item.text}</h3>
                <p className="service-description">{item.description}</p>
                {/* <a href={item.link} className="service-link">
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M1 8h14M9 2l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faqs-pg section-padding">
        <div className="container">
          <div className="row lg-marg align-items-center">
            <div className="col-lg-5">
              <div className="faq-illustration-container">
                <div className="faq-illustration">
                  {/* Floating Particles */}
                  <div className="particle particle-1"></div>
                  <div className="particle particle-2"></div>
                  <div className="particle particle-3"></div>
                  <div className="particle particle-4"></div>
                  <div className="particle particle-5"></div>

                  {/* Floating Lines */}
                  <div className="floating-line line-1"></div>
                  <div className="floating-line line-2"></div>
                  <div className="floating-line line-3"></div>

                  {/* Q&A Cards */}
                  <div className="faq-card card-1">
                    <div className="card-glow"></div>
                    <div className="card-content">
                      <div className="card-icon">Q</div>
                      <div className="card-title">Question</div>
                    </div>
                  </div>

                  <div className="faq-card card-2">
                    <div className="card-glow"></div>
                    <div className="card-content">
                      <div className="card-icon">A</div>
                      <div className="card-title">Answer</div>
                    </div>
                  </div>

                  <div className="faq-card card-3">
                    <div className="card-glow"></div>
                    <div className="card-content">
                      <div className="card-icon">?</div>
                      <div className="card-title">FAQ</div>
                    </div>
                  </div>

                  {/* Ambient Light Spheres */}
                  <div className="ambient-sphere sphere-1"></div>
                  <div className="ambient-sphere sphere-2"></div>
                  <div className="ambient-sphere sphere-3"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="sec-head services-style-head mb-60">
                <div className="services-style-meta">
                  <span className="services-style-line" />
                  <span className="services-style-number">03</span>
                  <span className="services-style-label">FAQ SUPPORT</span>
                </div>
                <h2 className="services-style-title">
                  <span className="services-style-main">PROVIDING</span>
                  <span className="services-style-accent">CLARITY</span>
                  <span className="services-style-bottom">
                    ON FREQUENTLY ASKED QUESTIONS
                  </span>
                </h2>
              </div>
              <div className="faq-list">
                {faqs.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      {faq.question}
                      <span className="faq-icon">
                        {openFaq === faq.id ? "–" : "+"}
                      </span>
                    </button>
                    <div
                      className={`faq-answer ${
                        openFaq === faq.id ? "show" : ""
                      }`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - NEW */}
      <section className="process-section section-padding">
        <div className="container">
          <div className="sec-head services-style-head mb-60">
            <div className="services-style-meta">
              <span className="services-style-line" />
              <span className="services-style-number">04</span>
              <span className="services-style-label">OUR PROCESS</span>
            </div>
            <h2 className="services-style-title">
              <span className="services-style-main">HOW WE</span>
              <span className="services-style-accent">BRING</span>
              <span className="services-style-bottom">YOUR VISION TO LIFE</span>
            </h2>
            <p className="sec-desc">
              A streamlined, transparent approach from concept to launch
            </p>
          </div>

          <div className="process-timeline">
            <div
              className="process-step"
              data-aos="fade-right"
              data-aos-delay="0"
            >
              <div className="process-number">01</div>
              <div className="process-content">
                {/* <div className="process-icon">
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle
                      cx="32"
                      cy="32"
                      r="30"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    <path
                      d="M32 16v32M16 32h32"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div> */}
                <h3>Discovery & Planning</h3>
                <p>
                  We dive deep into your business goals, target audience, and
                  project requirements to create a strategic roadmap.
                </p>
              </div>
              <div className="process-line"></div>
            </div>

            <div
              className="process-step"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="process-number">02</div>
              <div className="process-content">
                {/* <div className="process-icon">
                  <svg viewBox="0 0 64 64" fill="none">
                    <rect
                      x="12"
                      y="12"
                      width="40"
                      height="40"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    <path
                      d="M20 24h24M20 32h20M20 40h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div> */}
                <h3>Design & Prototype</h3>
                <p>
                  Our designers craft intuitive, beautiful interfaces with
                  interactive prototypes for your feedback and approval.
                </p>
              </div>
              <div className="process-line"></div>
            </div>

            <div
              className="process-step"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="process-number">03</div>
              <div className="process-content">
                {/* <div className="process-icon">
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle
                      cx="32"
                      cy="32"
                      r="30"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    <path
                      d="M22 32l8 8 16-16"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div> */}
                <h3>Development & Testing</h3>
                <p>
                  Expert developers build your solution with clean code,
                  followed by rigorous testing to ensure flawless performance.
                </p>
              </div>
              <div className="process-line"></div>
            </div>

            <div
              className="process-step"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div className="process-number">04</div>
              <div className="process-content">
                {/* <div className="process-icon">
                  <svg viewBox="0 0 64 64" fill="none">
                    <path
                      d="M32 8l8 16h16l-13 13 5 15-16-10-16 10 5-15-13-13h16z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div> */}
                <h3>Launch & Support</h3>
                <p>
                  Seamless deployment to production with ongoing maintenance,
                  updates, and dedicated support to ensure success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - NEW */}
      <section className="tech-stack-section section-padding">
        <div className="container">
          <div className="sec-head services-style-head mb-60">
            <div className="services-style-meta">
              <span className="services-style-line" />
              <span className="services-style-number">05</span>
              <span className="services-style-label">TECH STACK</span>
            </div>
            <h2 className="services-style-title">
              <span className="services-style-main">POWERED BY</span>
              <span className="services-style-accent">MODERN</span>
              <span className="services-style-bottom">TECHNOLOGIES</span>
            </h2>
            <p className="sec-desc" style={{ color: "white" }}>
              We use cutting-edge tools to build scalable, high-performance
              solutions
            </p>
          </div>

          <div className="tech-categories">
            <div
              className="tech-category"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <h3 className="tech-category-title">Frontend</h3>
              <div className="tech-grid">
                {[
                  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                  { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
                  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                ].map((tech) => (
                  <div className="tech-item" key={tech.name}>
                    <div className="tech-icon-box">
                      <img src={tech.logo} alt={tech.name} width="32" height="32" loading="lazy" />
                    </div>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="tech-category"
              data-aos="fade-up"
              data-aos-delay="100"
            >
                      <h3 className="tech-category-title">Backend</h3>
                      <div className="tech-grid">
                        {[
                          { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                          { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                          { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
                          { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                        ].map((tech) => (
                          <div className="tech-item" key={tech.name}>
                            <div className="tech-icon-box">
                              <img src={tech.logo} alt={tech.name} width="32" height="32" loading="lazy" />
                            </div>
                            <span>{tech.name}</span>
                          </div>
                        ))}
                      </div>
            </div>

            <div
              className="tech-category"
              data-aos="fade-up"
              data-aos-delay="200"
            >
                <h3 className="tech-category-title">Cloud & DevOps</h3>
                <div className="tech-grid">
                  {[
                    { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
                    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
                    { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
                  ].map((tech) => (
                    <div className="tech-item" key={tech.name}>
                      <div className="tech-icon-box">
                        <img src={tech.logo} alt={tech.name} width="32" height="32" loading="lazy" />
                      </div>
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
