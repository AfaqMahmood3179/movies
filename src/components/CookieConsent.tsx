"use client";

import React from "react";
import Link from "next/link";
import { useConsent } from "@/context/ConsentContext";
import { ShieldCheck, Cookie, X } from "lucide-react";

export function CookieConsent() {
  const { showModal, acceptConsent, declineConsent, closeModal } = useConsent();

  if (!showModal) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-fade-in"
    >
      <div className="glass-panel rounded-xl p-5 shadow-2xl border border-cinema-700/60 text-cinema-100 bg-cinema-900/95 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
              <Cookie className="w-4 h-4" />
            </div>
            <h3 id="cookie-consent-title" className="font-semibold text-base text-white">
              Privacy & Cookie Preferences
            </h3>
          </div>
          <button
            onClick={closeModal}
            className="text-cinema-400 hover:text-white transition-colors p-1"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p id="cookie-consent-desc" className="text-xs text-cinema-300 leading-relaxed mb-4">
          We use essential cookies to keep our platform running, and optional advertising cookies to
          support legal preservation and streaming of public domain films. Ad scripts will only load
          if you give consent. Learn more in our{" "}
          <Link href="/privacy" className="text-rose-400 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex items-center gap-2.5">
          <button
            onClick={acceptConsent}
            className="flex-1 px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md shadow-rose-950/40 flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Accept All
          </button>
          <button
            onClick={declineConsent}
            className="flex-1 px-4 py-2 text-xs font-medium rounded-lg bg-cinema-800 hover:bg-cinema-750 text-cinema-200 border border-cinema-700 transition-colors"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
