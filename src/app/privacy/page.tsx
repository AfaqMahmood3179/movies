import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ShieldCheck, Cookie, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy & Cookie Usage",
  description:
    "Learn about our privacy practices, cookie consent mechanism, and ethical advertising standards.",
};

export default function PrivacyPage() {
  return (
    <div className="w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot placement="header-banner" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        <div className="border-b border-cinema-800 pb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            GDPR & CCPA Compliant
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Privacy Policy & Cookie Usage
          </h1>
          <p className="text-xs text-cinema-400">
            Last Updated: October 2026 &bull; Effective Immediately
          </p>
        </div>

        <div className="space-y-6 text-xs text-cinema-300 leading-relaxed">
          <section className="p-6 rounded-2xl bg-cinema-900 border border-cinema-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-rose-500" />
              1. Information We Do Not Collect
            </h2>
            <p>
              HD MOVIES believes in unrestricted access to historic art. We do not require registration, login accounts, credit cards, or personal billing profiles. You can browse and watch movies completely anonymously.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-cinema-900 border border-cinema-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cookie className="w-4 h-4 text-amber-500" />
              2. Cookies & Advertising Technology
            </h2>
            <p>
              We distinguish strictly between essential technical storage and optional advertising tags:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-cinema-400">
              <li>
                <strong className="text-cinema-200">Essential Storage:</strong> Local storage is used to remember your cookie preference choice and session storage ensures you do not see repetitive pre-roll sponsorships.
              </li>
              <li>
                <strong className="text-cinema-200">Advertising Cookies:</strong> We partner with certified ad networks and exchanges (IAB ads.txt compliant). Third-party ad vendors, including Google, use cookies to serve ads based on prior visits.
              </li>
              <li>
                <strong className="text-cinema-200">Gated Script Execution:</strong> Advertising scripts are strictly blocked from loading until you explicitly choose &ldquo;Accept All&rdquo; on our consent prompt.
              </li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-cinema-900 border border-cinema-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              3. Embedded Third-Party Media (Internet Archive)
            </h2>
            <p>
              Media playback is embedded directly from the <strong>Internet Archive</strong> (archive.org). When you press play on the archive.org player, the Internet Archive may log technical network requests according to its own privacy policy as a non-profit library.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-cinema-900 border border-cinema-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              4. Your Privacy Rights (GDPR & CCPA / CPRA)
            </h2>
            <p>
              Depending on your jurisdiction, you have the right to opt out of personalized tracking or request disclosure of any stored telemetry. You can reset your cookie preferences at any time by clearing your browser cache or submitting a request via our{" "}
              <Link href="/contact" className="text-rose-400 hover:underline">
                Contact Page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
