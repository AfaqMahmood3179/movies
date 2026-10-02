"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { Mail, MessageSquare, Send, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot placement="header-banner" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        <div className="border-b border-cinema-800 pb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            Get in Touch
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Contact HD MOVIES
          </h1>
          <p className="text-sm text-cinema-300 max-w-xl">
            Have questions about archival film discovery, press inquiries, or want to suggest a public domain film to be indexed?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="md:col-span-5 space-y-5 text-xs text-cinema-300">
            <div className="p-6 rounded-2xl bg-cinema-900 border border-cinema-800 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Direct Inquiries
              </h2>

              <div className="space-y-3">
                <div>
                  <span className="text-cinema-400 block text-[11px]">General Inquiries</span>
                  <a
                    href="mailto:contact@hdmovies.org"
                    className="text-white hover:text-rose-400 font-medium transition-colors"
                  >
                    contact@hdmovies.org
                  </a>
                </div>

                <div>
                  <span className="text-cinema-400 block text-[11px]">Copyright & DMCA Agent</span>
                  <a
                    href="mailto:dmca@hdmovies.org"
                    className="text-rose-400 hover:underline font-medium transition-colors"
                  >
                    dmca@hdmovies.org
                  </a>
                  <span className="text-[10px] text-cinema-500 block mt-0.5">
                    Guaranteed 24-hour turnaround
                  </span>
                </div>
              </div>
            </div>

            {/* DMCA banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/30 to-cinema-900 border border-rose-500/25 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
                <ShieldAlert className="w-4 h-4" />
                <span>Urgent Copyright Issue?</span>
              </div>
              <p className="text-[11px] text-cinema-400 leading-snug">
                For expedited takedown requests, please use our dedicated online form to generate an instant reference ticket.
              </p>
              <Link
                href="/dmca"
                className="inline-block text-xs font-semibold text-white hover:underline pt-1"
              >
                Go to DMCA Portal &rarr;
              </Link>
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-cinema-900 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Message Sent</h3>
                <p className="text-xs text-cinema-300">
                  Thank you for reaching out. We will review your message and reply as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-cinema-800 text-cinema-200 hover:text-white text-xs"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-7 rounded-2xl bg-cinema-900 border border-cinema-800/80 space-y-4 shadow-xl"
              >
                <h3 className="text-sm font-bold text-white pb-2 border-b border-cinema-800 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-500" />
                  <span>Send a Message</span>
                </h3>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-cinema-200">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-cinema-950 border border-cinema-750 text-white placeholder:text-cinema-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-cinema-200">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-cinema-950 border border-cinema-750 text-white placeholder:text-cinema-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-cinema-200">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-cinema-950 border border-cinema-750 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Public Domain Film Suggestion">Public Domain Film Suggestion</option>
                    <option value="Archival Partnership">Archival Partnership / Collaboration</option>
                    <option value="Sponsorship & Advertising">Sponsorship & Advertising</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-cinema-200">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help?"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-cinema-950 border border-cinema-750 text-white placeholder:text-cinema-500 focus:outline-none focus:border-rose-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
