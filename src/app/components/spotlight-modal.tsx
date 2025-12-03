"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, X, Upload } from "lucide-react";

interface SpotlightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MAX_SPOTLIGHTS = 10;

export function SpotlightModal({ open, onOpenChange }: SpotlightModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [spotlightCount, setSpotlightCount] = useState<number | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Fetch spotlight count when modal opens
  useEffect(() => {
    if (open) {
      fetch("/api/spotlight")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.data)) {
            // Cap at MAX_SPOTLIGHTS for display
            const count = Math.min(data.data.length, MAX_SPOTLIGHTS);
            setSpotlightCount(count);
          } else {
            setSpotlightCount(0);
          }
        })
        .catch(() => {
          setSpotlightCount(0);
        });
    }
  }, [open]);

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    // Read file and convert to data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setLogo(result);
      setError(null);
    };
    reader.onerror = () => {
      setError("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const handleLogoRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLogo("");
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate inputs
    if (!name.trim()) {
      setError("Startup name is required");
      return;
    }
    if (!tagline.trim()) {
      setError("Tagline is required");
      return;
    }
    if (!url.trim()) {
      setError("URL is required");
      return;
    }

    // Validate URL format
    const urlToValidate = url.trim().startsWith("http")
      ? url.trim()
      : `https://${url.trim()}`;
    if (!/^https?:\/\/.+/.test(urlToValidate)) {
      setError("URL must be a valid URL (starting with http:// or https://)");
      return;
    }

    try {
      const response = await fetch("/api/spotlight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          tagline: tagline.trim(),
          url: urlToValidate,
          logo: logo.trim() || undefined,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to add startup to spotlight"
        );
      }

      // Success - close modal and refresh
      onOpenChange(false);

      // Reset form
      setName("");
      setTagline("");
      setUrl("");
      setLogo("");
      setError(null);

      // Update spotlight count
      if (spotlightCount !== null) {
        setSpotlightCount(spotlightCount + 1);
      }

      // Refresh the page to show the new spotlight
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when closing
      setName("");
      setTagline("");
      setUrl("");
      setLogo("");
      setError(null);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl bg-[#e4e4e4]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <DialogTitle className="text-sm mt-4 font-mono text-foreground mb-2">
                Add Your Startup to Spotlight
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Showcase your startup and get discovered by potential users
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Logo Upload */}
            <div className="space-y-2">
              <div className="flex items-start w-full gap-4">
                <div className="relative shrink-0 flex flex-col mt-8">
                  
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden "
                    aria-label="Upload logo"
                  />
                  <div
                    onClick={handleLogoClick}
                    className="w-24 h-24 p-2 border border-gray-300 overflow-hidden flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors group relative"
                  >
                    {logo ? (
                      <>
                        <Image
                          src={logo}
                          alt="Logo preview"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 border-none bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Upload className="w-5 h-5 text-white" />
                        </div>
                        <button
                          type="button"
                          onClick={handleLogoRemove}
                          className="absolute top-1 right-1 p-1 bg-[#e03c26] text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          aria-label="Remove logo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                        <Upload className="w-6 h-6" />
                        <span className="text-xs">Logo</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-2 min-w-0">
                  {/* Startup Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="spotlight-name"
                      className="text-xs font-medium text-foreground"
                    >
                      Startup Name
                    </label>
                    <input
                      id="spotlight-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Startup Name"
                      className="w-full px-3 py-2 mt-2 text-black/80 border border-gray-300 text-xs focus:outline-none"
                      required
                    />
                  </div>

                  {/* Tagline */}
                  <div className="space-y-2">
                    <label
                      htmlFor="spotlight-tagline"
                      className="text-xs font-medium text-foreground"
                    >
                      Tagline
                    </label>
                    <input
                      id="spotlight-tagline"
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="A brief description of your startup"
                      className="w-full px-3 py-2 mt-2 text-black/80 border border-gray-300 text-xs focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* URL */}
            <div className="space-y-2">
              <label
                htmlFor="spotlight-url"
                className="text-xs font-medium text-foreground"
              >
                Website URL
              </label>
              <div className="flex items-center w-full border border-gray-300 overflow-hidden">
                <span className="px-3 py-2 text-xs border-r border-gray-300 w-32 shrink-0">
                  Website url:
                </span>
                <input
                  id="spotlight-url"
                  type="text"
                  value={url.replace(/^https?:\/\//i, "")}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUrl(value.startsWith("http") ? value : value);
                  }}
                  placeholder="[www...]"
                  className="flex-1 px-3 py-2 text-black/80 text-xs focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <DialogFooter className="sm:justify-between mt-6 h-10">
              {spotlightCount !== null && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {spotlightCount}/{MAX_SPOTLIGHTS}
                  </span>
                  <span>
                    {spotlightCount >= MAX_SPOTLIGHTS
                      ? "spots filled"
                      : "Free spots remaining"}
                  </span>
                </div>
              )}
              <button
                type="submit"
                disabled={
                  spotlightCount !== null && spotlightCount >= MAX_SPOTLIGHTS
                }
                className="flex items-center hover:bg-[#e03c26] gap-1.5 bg-[#1A1A1A] text-white text-xs font-medium px-4 py-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                <span>Claim Your Spot</span>
              </button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
