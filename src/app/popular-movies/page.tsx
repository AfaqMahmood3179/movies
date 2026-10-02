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

interface PopularPageProps {
  searchParams: Promise<{ industry?: string }>;
}

export default async function PopularMoviesPage({ searchParams }: PopularPageProps) {
  const resolvedParams = await searchParams;
  const currentIndustry = resolvedParams.industry || "All";

  const allFilms = await getAllFilms();
  const filtered = currentIndustry === "All"
    ? allFilms
    : allFilms.filter(f => f.industry.toLowerCase() === currentIndustry.toLowerCase());

  // Sort by downloads descending
  const popularFilms = [...filtered].sort((a, b) => (b.downloads || 0) - (a.downloads || 0));

  const industries = ["All", "Hollywood", "Bollywood", "South Indian"];

  return (
    <div className="w-full pb-16">
      {/* Header Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot placement="header-banner" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Header */}
        <div className="border-b border-cinema-800 pb-5 mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>Trending & Popular</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              {currentIndustry !== "All" ? `Popular ${currentIndustry} Movies` : "Popular Feature Films"}
            </h1>
            <p className="text-xs text-cinema-400 mt-1">
              The most downloaded, streamed, and acclaimed movies across Hollywood, Bollywood, and South Indian cinema
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/browse"
              className="px-3.5 py-2 rounded-lg bg-cinema-850 hover:bg-cinema-750 text-cinema-200 border border-cinema-750 transition-colors"
            >
              Browse All ({allFilms.length})
            </Link>
          </div>
        </div>

        {/* Industry Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {industries.map((ind) => {
            const isActive = currentIndustry === ind;
            const badgeClass =
              ind === "Bollywood"
                ? isActive ? "bg-emerald-400 text-black font-bold shadow-md shadow-emerald-950/40" : "bg-emerald-950/40 text-emerald-300 border border-emerald-800 hover:bg-emerald-900/50"
                : ind === "South Indian"
                ? isActive ? "bg-purple-400 text-black font-bold shadow-md shadow-purple-950/40" : "bg-purple-950/40 text-purple-300 border border-purple-800 hover:bg-purple-900/50"
                : ind === "Hollywood"
                ? isActive ? "bg-amber-400 text-black font-bold shadow-md shadow-amber-950/40" : "bg-amber-950/40 text-amber-300 border border-amber-800 hover:bg-amber-900/50"
                : isActive ? "bg-white text-black font-bold shadow-md" : "bg-cinema-850 hover:bg-cinema-750 text-cinema-300 border border-cinema-750";

            return (
              <Link
                key={ind}
                href={ind === "All" ? "/popular-movies" : `/popular-movies?industry=${encodeURIComponent(ind)}`}
                className={`text-xs px-3.5 py-1.5 rounded-lg transition-colors font-semibold ${badgeClass}`}
              >
                {ind}
              </Link>
            );
          })}
        </div>

        {/* Popular Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {popularFilms.slice(0, 48).map((film, index) => (
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
