"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Plus } from "lucide-react";
import { StartupModal } from "./startup-modal";

interface SearchResult {
  startupName: string;
  slug: string | null;
  logo: string | null;
}

export function SearchSection() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Debounce search queries
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }

    // Show dropdown immediately when user types
    setShowResults(true);
    setIsSearching(true);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmedQuery)}`
        );
        const data = await response.json();

        if (response.ok && data.data?.results) {
          setResults(data.data.results);
          // Keep dropdown open if there are results or if query is still active
          setShowResults(true);
        } else {
          setResults([]);
          // Still show dropdown to display "No results found"
          setShowResults(true);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
        setShowResults(true);
      } finally {
        setIsSearching(false);
      }
    }, 150); // Reduced debounce for faster response

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResultClick = (startupName: string) => {
    setShowResults(false);
    setSearchQuery("");
    router.push(`/startup/${encodeURIComponent(startupName)}`);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full gap-2 sm:gap-0">
        <div ref={searchContainerRef} className="relative flex-1">
          <div className="flex w-full items-center gap-2 bg-[#f6f6f6]  border border-gray-300 transition-all focus-within:shadow-md focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/10">
            <div className="pl-3 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // Show results immediately when typing
                if (e.target.value.trim().length >= 2) {
                  setShowResults(true);
                }
              }}
              onFocus={() => {
                // Show results if there's a query or existing results
                if (searchQuery.trim().length >= 2 || results.length > 0) {
                  setShowResults(true);
                }
              }}
              placeholder="Search startups, founders, metrics..."
              className="flex-1 bg-transparent border-none outline-none text-[12px] h-12 placeholder:text-gray-400 text-gray-900"
            />
          </div>

          {/* Search Results Dropdown */}
          {showResults && searchQuery.trim().length >= 2 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200/60 z-50 max-h-96 overflow-y-auto">
              {isSearching ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <div className="p-2">
                  {results.map((result) => (
                    <button
                      key={result.startupName}
                      onClick={() => handleResultClick(result.startupName)}
                      className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      {/* Logo */}
                      <div className="shrink-0 ml-3 ">
                        {result.logo ? (
                          <div className="w-12 h-12 rounded-full border border-gray-200 bg-background overflow-hidden flex items-center justify-center">
                            <Image
                              src={result.logo}
                              alt={result.startupName}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full border border-pink-200 bg-pink-100 flex items-center justify-center">
                            <span className="text-lg font-bold text-gray-700">
                              {result.startupName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Name and Slug */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">
                          {result.startupName}
                        </p>
                        {result.slug && (
                          <p className="text-xs text-gray-500 font-mono mt-0.5 truncate">
                            {result.slug}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center h-12 gap-1.5 bg-[#e03d26] text-white text-sm font-medium px-4 py-2 hover:bg-black transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus className="w-5 h-4" />
          <span className="hidden sm:inline">Add startup</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
      <StartupModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
