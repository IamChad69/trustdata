"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Upload, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Invalid payment session</p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e4e4e4] py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-5 h-5 text-green-600" />
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
          </div>
          <p className="text-muted-foreground">
            Now add your startup details to claim your spotlight position.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Logo Upload */}
            <div className="space-y-2">
              <div className="flex items-start w-full gap-4">
                <div className="relative shrink-0 flex flex-col">
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
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
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
                <div className="flex-1 space-y-4">
                  {/* Startup Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="spotlight-name"
                      className="text-sm font-medium"
                    >
                      Startup Name *
                    </label>
                    <input
                      id="spotlight-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Startup Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Tagline */}
                  <div className="space-y-2">
                    <label
                      htmlFor="spotlight-tagline"
                      className="text-sm font-medium"
                    >
                      Tagline *
                    </label>
                    <input
                      id="spotlight-tagline"
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="A brief description of your startup"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* URL */}
            <div className="space-y-2">
              <label htmlFor="spotlight-url" className="text-sm font-medium">
                Website URL *
              </label>
              <input
                id="spotlight-url"
                type="text"
                value={url.replace(/^https?:\/\//i, "")}
                onChange={(e) => {
                  const value = e.target.value;
                  setUrl(value.startsWith("http") ? value : value);
                }}
                placeholder="example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Add to Spotlight"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddSpotlightPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
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
