"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Film as FilmIcon, Clapperboard, Sparkles } from "lucide-react";

interface MoviePosterProps {
  src?: string;
  alt: string;
  title: string;
  year: number;
  genre?: string;
  priority?: boolean;
}

export function MoviePoster({
  src,
  alt,
  title,
  year,
  genre,
  priority = false,
}: MoviePosterProps) {
  const [imageError, setImageError] = useState(false);

  // If no source or image errored, show a stylish cinematic art poster card
  if (!src || imageError) {
    return (
      <div className="w-full h-full relative flex flex-col justify-between p-4 bg-gradient-to-br from-cinema-850 via-cinema-900 to-cinema-950 text-cinema-100 select-none overflow-hidden border border-cinema-800/50">
        {/* Subtle decorative background watermarks */}
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
          <Clapperboard className="w-36 h-36 text-amber-400 transform -rotate-12" />
        </div>
        <div className="absolute -left-4 -top-4 opacity-10 pointer-events-none">
          <Sparkles className="w-24 h-24 text-amber-400" />
        </div>

        {/* Top meta */}
        <div className="flex items-center justify-between text-[10px] text-amber-400/90 font-bold uppercase tracking-wider z-10">
          <span>{genre || "Classic"}</span>
          <span>{year}</span>
        </div>

        {/* Center Title */}
        <div className="my-auto text-center z-10 px-1 py-4">
          <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
            <FilmIcon className="w-5 h-5" />
          </div>
          <h4 className="text-xs sm:text-sm font-extrabold text-white leading-tight font-display line-clamp-3 drop-shadow-md">
            {title}
          </h4>
          <span className="text-[10px] text-cinema-400 font-medium mt-1 inline-block">
            Archival Feature Film
          </span>
        </div>

        {/* Bottom subtle bar */}
        <div className="z-10 text-center pt-2 border-t border-cinema-800/80">
          <span className="text-[9px] uppercase tracking-widest text-cinema-400 font-semibold">
            HD MOVIES Vault
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      priority={priority}
      onError={() => setImageError(true)}
      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
      unoptimized
    />
  );
}
