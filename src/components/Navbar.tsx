"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Film,
  Search,
  Menu,
  X,
  Shield,
  Clock,
  Clapperboard,
  ChevronDown,
  Sparkles,
  Compass,
  Calendar,
} from "lucide-react";

const GENRES = [
  "Film Noir",
  "Horror",
  "Sci-Fi",
  "Comedy",
  "Drama",
  "Mystery",
  "Silent",
  "Cult",
  "Adventure",
  "Thriller",
];

const DECADES = [
  { label: "1920s — Silent Pioneers", value: "1920s" },
  { label: "1930s — Golden Age", value: "1930s" },
  { label: "1940s — Film Noir Era", value: "1940s" },
  { label: "1950s — Sci-Fi & B-Movies", value: "1950s" },
  { label: "1960s — Cult & Gothic", value: "1960s" },
];

export function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const moviesRef = useRef<HTMLDivElement>(null);
  const genresRef = useRef<HTMLDivElement>(null);
  const decadesRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        moviesRef.current &&
        !moviesRef.current.contains(event.target as Node) &&
        genresRef.current &&
        !genresRef.current.contains(event.target as Node) &&
        decadesRef.current &&
        !decadesRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
      setOpenDropdown(null);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* HD MOVIES Logo (Moviespedia / HDToday styled) */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="px-2 py-1 rounded bg-amber-400 text-black font-extrabold text-sm tracking-wider shadow-md shadow-amber-950/40 group-hover:scale-105 transition-transform">
              HD
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-white tracking-tight leading-none">
                MOVIES<span className="text-amber-400">.</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-cinema-400 font-semibold mt-0.5">
                Public Domain
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cinema-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, actors, directors, genres..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-cinema-850 border border-cinema-750 text-cinema-100 placeholder:text-cinema-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
              />
            </div>
          </form>

          {/* Desktop Navigation Links with Dropdowns (HDToday style) */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-cinema-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>

            {/* Movies Dropdown */}
            <div className="relative" ref={moviesRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === "movies" ? null : "movies")}
                className="flex items-center gap-1 hover:text-white transition-colors py-2"
              >
                <span>Movies</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {openDropdown === "movies" && (
                <div className="absolute top-full left-0 mt-1 w-48 rounded-xl bg-cinema-900 border border-cinema-750 shadow-2xl p-2 z-50 animate-fade-in text-xs space-y-1">
                  <Link
                    href="/browse"
                    onClick={() => setOpenDropdown(null)}
                    className="block px-3 py-2 rounded-lg hover:bg-cinema-800 text-cinema-200 hover:text-white transition-colors font-medium"
                  >
                    All Feature Films
                  </Link>
                  <Link
                    href="/browse?sort=recent"
                    onClick={() => setOpenDropdown(null)}
                    className="block px-3 py-2 rounded-lg hover:bg-cinema-800 text-cinema-200 hover:text-white transition-colors"
                  >
                    Latest Restorations
                  </Link>
                  <Link
                    href="/popular-movies"
                    onClick={() => setOpenDropdown(null)}
                    className="block px-3 py-2 rounded-lg hover:bg-cinema-800 text-amber-400 font-semibold transition-colors flex items-center justify-between"
                  >
                    <span>Popular Movies</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-400">HOT</span>
                  </Link>
                  <Link
                    href="/browse?sort=year_desc"
                    onClick={() => setOpenDropdown(null)}
                    className="block px-3 py-2 rounded-lg hover:bg-cinema-800 text-cinema-200 hover:text-white transition-colors"
                  >
                    Release Year (Newest)
                  </Link>
                </div>
              )}
            </div>

            {/* Genres Dropdown (Multi-column like Moviespedia) */}
            <div className="relative" ref={genresRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === "genres" ? null : "genres")}
                className="flex items-center gap-1 hover:text-white transition-colors py-2"
              >
                <span>Genres</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {openDropdown === "genres" && (
                <div className="absolute top-full -left-20 mt-1 w-80 rounded-xl bg-cinema-900 border border-cinema-750 shadow-2xl p-3 z-50 animate-fade-in">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cinema-400 px-2 pb-2 mb-2 border-b border-cinema-800">
                    Explore Film Genres
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {GENRES.map((g) => (
                      <Link
                        key={g}
                        href={`/browse?genre=${encodeURIComponent(g)}`}
                        onClick={() => setOpenDropdown(null)}
                        className="px-2.5 py-1.5 rounded-lg hover:bg-cinema-800 text-cinema-200 hover:text-amber-400 transition-colors"
                      >
                        {g}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Decades Dropdown */}
            <div className="relative" ref={decadesRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === "decades" ? null : "decades")}
                className="flex items-center gap-1 hover:text-white transition-colors py-2"
              >
                <span>Decades</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {openDropdown === "decades" && (
                <div className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-cinema-900 border border-cinema-750 shadow-2xl p-2 z-50 animate-fade-in text-xs space-y-1">
                  {DECADES.map((d) => (
                    <Link
                      key={d.value}
                      href={`/browse?decade=${d.value}`}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-3 py-2 rounded-lg hover:bg-cinema-800 text-cinema-200 hover:text-amber-400 transition-colors"
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>

            <Link
              href="/dmca"
              className="text-xs px-2.5 py-1 rounded-md bg-cinema-800 text-cinema-300 hover:text-white border border-cinema-700/80 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              DMCA
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-cinema-850 border border-cinema-700 text-cinema-200 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-cinema-800 space-y-4 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cinema-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-cinema-850 border border-cinema-700 text-cinema-100 placeholder:text-cinema-400 focus:outline-none focus:border-amber-400"
              />
            </form>

            <nav className="flex flex-col space-y-2 text-sm font-medium text-cinema-200">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-cinema-850 hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/popular-movies"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-cinema-850 hover:text-white font-semibold text-amber-400 flex items-center justify-between"
              >
                <span>Popular Movies</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-400">HOT</span>
              </Link>
              <Link
                href="/browse"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-cinema-850 hover:text-white text-cinema-200"
              >
                Browse All Movies
              </Link>

              <div className="px-3 pt-2 text-[11px] font-bold uppercase tracking-wider text-cinema-400">
                Popular Genres
              </div>
              <div className="grid grid-cols-2 gap-1 px-3">
                {GENRES.slice(0, 6).map((g) => (
                  <Link
                    key={g}
                    href={`/browse?genre=${encodeURIComponent(g)}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs py-1 text-cinema-300 hover:text-white"
                  >
                    {g}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-cinema-800/80">
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-cinema-850 hover:text-white text-xs"
                >
                  About & Public Domain Framework
                </Link>
                <Link
                  href="/dmca"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-cinema-850 text-rose-400 font-medium text-xs"
                >
                  DMCA Takedown Policy (24h)
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
