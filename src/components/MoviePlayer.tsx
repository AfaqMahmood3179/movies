"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Film } from "@/types/film";
import { PreRollAd } from "./PreRollAd";
import { ShieldCheck, ExternalLink, AlertTriangle, Maximize2, Share2, Check } from "lucide-react";

interface MoviePlayerProps {
  film: Film;
}

export function MoviePlayer({ film }: MoviePlayerProps) {
  const [prerollFinished, setPrerollFinished] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [activeServer, setActiveServer] = useState<"server1" | "server2">("server1");

  // Official Internet Archive embed URL format
  const embedUrl = activeServer === "server1"
    ? `https://archive.org/embed/${film.ia_identifier}`
    : `https://archive.org/embed/${film.ia_identifier}?autoplay=1`;
  const sourceDetailsUrl = `https://archive.org/details/${film.ia_identifier}`;

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className={`w-full transition-all duration-300 ${theaterMode ? "max-w-6xl mx-auto" : "w-full"}`}>
      {/* Moviespedia-style Streaming Server Selection */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-cinema-400 uppercase tracking-wider hidden sm:inline">
            Servers:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveServer("server1")}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                activeServer === "server1"
                  ? "bg-amber-400 text-black shadow-amber-950/40"
                  : "bg-cinema-850 hover:bg-cinema-750 text-cinema-300 hover:text-white border border-cinema-700"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeServer === "server1" ? "bg-emerald-700 animate-pulse" : "bg-cinema-500"}`} />
              <span>Server 1 (Archive Cloud HD)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveServer("server2")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeServer === "server2"
                  ? "bg-amber-400 text-black font-bold shadow-md shadow-amber-950/40"
                  : "bg-cinema-850 hover:bg-cinema-750 text-cinema-300 hover:text-white border border-cinema-700"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeServer === "server2" ? "bg-emerald-700 animate-pulse" : "bg-cinema-500"}`} />
              <span>Server 2 (Archive Embed)</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[11px] font-bold">
            1080p HD
          </span>
          <span className="px-2 py-0.5 rounded bg-cinema-800 text-cinema-300 text-[11px] font-medium border border-cinema-700">
            English
          </span>
        </div>
      </div>

      {/* Video Container (16:9 responsive) */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-cinema-700/80 group">
        {!prerollFinished ? (
          <PreRollAd filmTitle={film.title} onComplete={() => setPrerollFinished(true)} />
        ) : (
          <iframe
            src={embedUrl}
            title={`${film.title} (${film.year}) - Internet Archive Official Player`}
            className="w-full h-full border-0 absolute inset-0"
            allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>

      {/* Control bar below player */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3 px-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Public Domain Stream
          </span>
          <span className="text-xs text-cinema-400 hidden sm:inline">&bull;</span>
          <span className="text-xs text-cinema-400 hidden sm:inline">Official Internet Archive Player</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheaterMode(!theaterMode)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cinema-850 hover:bg-cinema-750 text-cinema-200 border border-cinema-700 text-xs font-medium transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{theaterMode ? "Normal View" : "Theater Mode"}</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cinema-850 hover:bg-cinema-750 text-cinema-200 border border-cinema-700 text-xs font-medium transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{isCopied ? "Link Copied!" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Prominent Legal & License Note (Strictly required) */}
      <div className="mt-4 p-4 rounded-xl border border-cinema-700/60 bg-cinema-900/80 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                License & Attribution
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-cinema-800 text-cinema-200 border border-cinema-700">
                {film.license_name}
              </span>
            </div>
            <p className="text-xs text-cinema-300 leading-relaxed">
              This film is free of known copyright restrictions and hosted by the non-profit{" "}
              <strong className="text-cinema-100">Internet Archive</strong> under open licensing.
              HD MOVIES embeds the official archive player without re-hosting video media files.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col items-end gap-2 shrink-0">
            <a
              href={sourceDetailsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:underline transition-colors"
            >
              <span>View Source on Archive.org</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <Link
              href={`/dmca?film=${encodeURIComponent(film.title)}&id=${encodeURIComponent(film.ia_identifier)}`}
              className="inline-flex items-center gap-1 text-[11px] text-cinema-400 hover:text-cinema-200 hover:underline transition-colors"
            >
              <AlertTriangle className="w-3 h-3 text-amber-500/80" />
              <span>Report copyright question</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
