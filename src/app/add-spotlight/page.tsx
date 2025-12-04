"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Upload, X, Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function AddSpotlightForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No payment session found");
      setIsVerifying(false);
      return;
    }

    // Verify session is valid
    setIsVerifying(false);
  }, [sessionId]);

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

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
    setIsLoading(true);

    if (!name.trim()) {
      setError("Startup name is required");
      setIsLoading(false);
      return;
    }
    if (!tagline.trim()) {
      setError("Tagline is required");
      setIsLoading(false);
      return;
    }
    if (!url.trim()) {
      setError("URL is required");
      setIsLoading(false);
      return;
    }

    const urlToValidate = url.trim().startsWith("http")
      ? url.trim()
      : `https://${url.trim()}`;
    if (!/^https?:\/\/.+/.test(urlToValidate)) {
      setError("URL must be a valid URL (starting with http:// or https://)");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/spotlight/payment/success", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          name: name.trim(),
          tagline: tagline.trim(),
          url: urlToValidate,
          logo: logo.trim() || undefined,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create spotlight");
      }

      // Success - redirect to home with full page reload to show new spotlight immediately
      window.location.href = "/";
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e4e4e4]">
        <div className="text-center">
          <p className="text-lg">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e4e4e4]">
        <div className="text-center">
          <p className="text-lg text-red-600">Invalid payment session</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 flex items-center gap-1.5 bg-[#1A1A1A] text-white text-xs font-medium px-4 py-2 hover:bg-[#e03d26] transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e4e4e4] flex items-center justify-center p-4">
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="max-w-2xl bg-[#e4e4e4] sm:max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <DialogTitle className="text-sm mt-4 font-mono text-foreground mb-2">
                  Add Startup Details
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Payment successful! Now add your startup details to claim your
                  spotlight position.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* Logo Upload */}
              <div className="space-y-2">
                <div className="flex items-start w-full gap-4">
                  <div className="relative shrink-0">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
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
                  {/* Startup Name and Tagline */}
                  <div className="flex-1 mt-8 space-y-2 min-w-0">
                    {/* Startup Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="spotlight-name"
                        className="text-xs font-medium text-foreground"
                      >
                        <span className="text-[10px] border border-gray-300 px-1.5 py-1 text-muted-foreground">
                          1.1
                        </span>{" "}
                        Startup Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="spotlight-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your startup name *"
                        required
                        className="w-full px-3 py-2 border border-gray-300 text-xs focus:outline-none text-black/80"
                      />
                    </div>

                    {/* Tagline */}
                    <div className="space-y-2">
                      <label
                        htmlFor="spotlight-tagline"
                        className="text-xs font-medium text-foreground"
                      >
                        <span className="text-[10px] border border-gray-300 px-1.5 py-1 text-muted-foreground">
                          1.2
                        </span>{" "}
                        Tagline <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="spotlight-tagline"
                        type="text"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        placeholder="Enter your tagline *"
                        required
                        className="w-full px-3 py-2 text-muted-foreground border border-gray-300 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Website URL */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="spotlight-url"
                  className="text-xs font-medium text-foreground"
                >
                  <span className="text-[10px] border border-gray-300 px-1.5 py-1 text-muted-foreground">
                    1.3
                  </span>{" "}
                  Website URL <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center w-full border border-gray-300 overflow-hidden">
                  <span className="px-3 py-2 text-xs border-r border-gray-300 w-32 shrink-0">
                    Website url: <span className="text-red-500">*</span>
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
                    required
                    className="flex-1 px-3 py-2 text-black/80 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <DialogFooter className="sm:justify-end mt-6 h-10">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 border border-gray-300 text-xs font-medium px-4 py-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-muted-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center hover:bg-[#e03c26] gap-1.5 bg-[#1A1A1A] text-white text-xs font-medium px-4 py-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Spotlight</span>
                    </>
                  )}
                </button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AddSpotlightPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#e4e4e4]">
          <div className="text-center">
            <p className="text-lg">Loading...</p>
          </div>
        </div>
      }
    >
      <AddSpotlightForm />
    </Suspense>
  );
}
