import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { searchFilms, getPopularFilms } from "@/lib/db";
import { MovieCard } from "@/components/MovieCard";
import { AdSlot } from "@/components/AdSlot";
import { Search, Clapperboard, Sparkles } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  return {
    title: q ? `Search results for "${q}"` : "Search Public Domain Films",
    description: `Search our public domain collection for ${q || "classic movies"}.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";

  const [results, popular] = await Promise.all([
    query ? searchFilms(query) : Promise.resolve([]),
    getPopularFilms(4),
  ]);

  return (
    <div className="w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot placement="header-banner" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Search header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
            Search Public Domain Cinema
          </h1>
          <form method="GET" action="/search" className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cinema-400" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by title, director, keyword, or genre..."
              className="w-full pl-11 pr-24 py-3 rounded-full bg-cinema-900 border border-cinema-750 text-cinema-100 placeholder:text-cinema-400 focus:outline-none focus:border-rose-500 shadow-xl"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {query ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-cinema-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                Results for &ldquo;<span className="text-rose-400">{query}</span>&rdquo;
              </h2>
              <span className="text-xs text-cinema-400">
                {results.length} film{results.length === 1 ? "" : "s"} found
              </span>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {results.map((film) => (
                  <MovieCard key={film.id} film={film} />
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-2xl bg-cinema-900 border border-cinema-800 text-center space-y-4">
                <Clapperboard className="w-12 h-12 text-cinema-500 mx-auto opacity-50" />
                <h3 className="text-lg font-bold text-white">No exact matches found</h3>
                <p className="text-xs text-cinema-400 max-w-md mx-auto">
                  We only index verified public domain works. Check your spelling or browse our curated categories.
                </p>
                <div className="pt-2">
                  <Link
                    href="/browse"
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
                  >
                    Browse All Films
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3>Popular Titles to Explore</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {popular.map((film) => (
                <MovieCard key={film.id} film={film} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
