import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPopularFilms, getAllFilms } from "@/lib/db";
import { MovieCard } from "@/components/MovieCard";
import { AdSlot } from "@/components/AdSlot";
import { Sparkles, TrendingUp, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Popular Movies — HD MOVIES Most Watched",
  description:
    "Discover the most watched, highest-downloaded public domain and open license feature films.",
};

export default async function PopularMoviesPage() {
  const allFilms = await getAllFilms();
  // Sort by downloads descending
  const popularFilms = [...allFilms].sort((a, b) => (b.downloads || 0) - (a.downloads || 0));

  return (
    <div className="w-full pb-16">
      {/* Header Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot placement="header-banner" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Header */}
        <div className="border-b border-cinema-800 pb-5 mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>Trending & Popular</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Popular Feature Films
            </h1>
            <p className="text-xs text-cinema-400 mt-1">
              The most downloaded, streamed, and acclaimed movies in the public domain vault
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/browse"
              className="px-3.5 py-2 rounded-lg bg-cinema-850 hover:bg-cinema-750 text-cinema-200 border border-cinema-750 transition-colors"
            >
              Browse All Films ({allFilms.length})
            </Link>
          </div>
        </div>

        {/* Popular Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {popularFilms.map((film, index) => (
            <MovieCard key={film.id} film={film} priority={index < 6} />
          ))}
        </div>

        {/* Ad Placement */}
        <div className="my-10">
          <AdSlot placement="between-rows" />
        </div>
      </div>
    </div>
  );
}
