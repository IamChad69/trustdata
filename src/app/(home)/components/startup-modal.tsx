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
import DbToggle from "./db-toggle";
import {
  DatabaseProvider,
  DatabaseProviderConfig,
  getProviderConfig,
} from "@/lib/database-providers";
import {
  Plus,
  ArrowLeft,
  X,
  Check,
  Upload,
  Trash2,
  PenTool,
} from "lucide-react";

interface StartupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialStep?: 1 | 2 | 3 | 4;
  editingStartupId?: string;
  editingStartupName?: string;
}

export function StartupModal({
  open,
  onOpenChange,
  initialStep = 1,
  editingStartupId,
  editingStartupName,
}: StartupModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(initialStep);

  // Fetch startup data when editing
  useEffect(() => {
    if (open && editingStartupId) {
      setIsLoadingStartupData(true);
      fetch(`/api/connect/${editingStartupId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success !== false && data.data) {
            const startup = data.data;
            setStartupName(startup.startupName || "");
            setSlug(startup.slug || "");
            setTagline(startup.tagline || "");
            setDescription(startup.description || "");
            setWebsite(startup.website || "");
            setCategory(startup.category || "");
            setLogo(startup.logo || "");
            setFounderName(startup.founderName || "");
            setFounderHandle(startup.founderHandle || "");
            setFounderAvatar(startup.founderAvatar || "");
            setSelectedProvider(
              (startup.provider as DatabaseProvider) || "neon"
            );
            setConnectionId(editingStartupId);
          }
        })
        .catch((err) => {
          console.error("Error fetching startup data:", err);
        })
        .finally(() => {
          setIsLoadingStartupData(false);
        });
    } else if (open) {
      setStep(initialStep);
    }
  }, [open, editingStartupId, initialStep]);
  const [selectedProvider, setSelectedProvider] =
    useState<DatabaseProvider>("neon");
  const [hoveredProvider, setHoveredProvider] =
    useState<DatabaseProvider | null>(null);
  const [connectionInput, setConnectionInput] = useState("");
  const [startupName, setStartupName] = useState("");
  const [slug, setSlug] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [logo, setLogo] = useState("");
  const [founderName, setFounderName] = useState("");
  const [founderHandle, setFounderHandle] = useState("");
  const [founderAvatar, setFounderAvatar] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [, setIsLoadingStartupData] = useState(false);
  const [connectionId, setConnectionId] = useState<string | null>(null);
  const [isEditingStartupName, setIsEditingStartupName] = useState(false);
  const [editingSlug, setEditingSlug] = useState(false);
  const [editingTagline, setEditingTagline] = useState(false);
  const [tempStartupName, setTempStartupName] = useState("");
  const [tempSlug] = useState("");
  const [tempTagline, setTempTagline] = useState("");
  const logoInputRef = useRef<HTMLInputElement>(null);

  const displayProvider = hoveredProvider || selectedProvider;
  const providerConfig: DatabaseProviderConfig =
    getProviderConfig(displayProvider);

  const handleProviderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep(2);
  };

  const handleConnectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate connection string
    if (!connectionInput.trim()) {
      setError("Connection string is required");
      return;
    }

    setIsConnecting(true);
    setStep(3);

    try {
      let response;
      let responseData;

      // If editing, update existing connection; otherwise create new one
      if (editingStartupId) {
        // Update existing connection
        response = await fetch(`/api/connect/${editingStartupId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            connectionString: connectionInput.trim(),
          }),
        });

        responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message || "Failed to update connection"
          );
        }

        // Use the existing startup ID as connection ID
        setConnectionId(editingStartupId);
      } else {
        // Create new connection
        const apiEndpoint = `/api/connect/${selectedProvider}`;

        response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            connectionString: connectionInput.trim(),
          }),
        });

        responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || "Failed to connect database");
        }

        // safeHandler wraps the response in { success: true, data: T }
        const data = responseData.data || responseData;

        // Validate that we received a connection ID
        const receivedConnectionId = data.id || data.connectionId;
        if (!receivedConnectionId) {
          throw new Error("Connection was created but no ID was returned");
        }

        // Set project name if provided
        if (data.projectName) {
          setStartupName(data.projectName);
          // Auto-generate slug from project name
          const autoSlug = data.projectName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
          if (autoSlug) {
            setSlug(autoSlug);
          }
        }

        // Store connection ID
        setConnectionId(receivedConnectionId);
      }

      setIsConnecting(false);
      setStep(4);
    } catch (err) {
      setIsConnecting(false);
      setStep(2);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleStartupDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate connectionId exists
    if (!connectionId) {
      setError("Connection ID is missing. Please connect your database first.");
      return;
    }

    // Use current values (including temp values if editing)
    // When editing, startup name is already in database, so use it if field is empty
    const currentStartupName = isEditingStartupName
      ? tempStartupName
      : startupName || editingStartupName || "";
    const finalStartupName = currentStartupName.trim();

    // Auto-generate slug from startup name if not provided
    let currentSlug = editingSlug ? tempSlug : slug;
    if (!currentSlug.trim() && finalStartupName) {
      currentSlug = finalStartupName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    const finalSlug = currentSlug.trim();

    // Save any pending edits
    if (isEditingStartupName) {
      setStartupName(tempStartupName);
      setIsEditingStartupName(false);
    }
    if (editingSlug) {
      setSlug(tempSlug);
      setEditingSlug(false);
    }
    if (editingTagline) {
      setTagline(tempTagline);
      setEditingTagline(false);
    }

    // Validate inputs - when editing, startup name is already in DB, so use editingStartupName as fallback
    const startupNameToUse = finalStartupName || editingStartupName || "";
    if (!startupNameToUse.trim()) {
      setError("Startup name is required");
      return;
    }
    if (!finalSlug) {
      setError("Slug is required");
      return;
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(finalSlug.trim())) {
      setError(
        "Slug must contain only lowercase letters, numbers, and hyphens"
      );
      return;
    }

    // Validate website URL format if provided
    if (website.trim() && !/^https?:\/\/.+/.test(website.trim())) {
      setError(
        "Website must be a valid URL (starting with http:// or https://)"
      );
      return;
    }

    try {
      // Use editingStartupId if editing, otherwise use connectionId
      const updateId = editingStartupId || connectionId;
      if (!updateId) {
        setError(
          "Connection ID is missing. Please connect your database first."
        );
        return;
      }

      // Build request body - only include fields that have values or are being updated
      const requestBody: Record<string, string | undefined> = {};

      // Always include startup name if we have it (required)
      if (startupNameToUse.trim()) {
        requestBody.startupName = startupNameToUse.trim();
      }

      // Always include slug if we have it (required)
      if (finalSlug.trim()) {
        requestBody.slug = finalSlug.trim();
      }

      // Include optional fields only if they have values
      const currentTagline = editingTagline ? tempTagline : tagline;
      if (currentTagline.trim()) requestBody.tagline = currentTagline.trim();
      if (description.trim()) requestBody.description = description.trim();
      if (website.trim()) requestBody.website = website.trim();
      if (category.trim()) requestBody.category = category.trim();
      if (logo.trim()) requestBody.logo = logo.trim();
      if (founderName.trim()) requestBody.founderName = founderName.trim();
      if (founderHandle.trim())
        requestBody.founderHandle = founderHandle.trim();
      if (founderAvatar.trim())
        requestBody.founderAvatar = founderAvatar.trim();

      const response = await fetch(`/api/connect/${updateId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to save startup details"
        );
      }

      // Extract startup name from response
      const startupNameValue =
        responseData.data?.startupName ||
        responseData.startupName ||
        finalStartupName.trim();

      if (!startupNameValue) {
        throw new Error("Startup name not found in response");
      }

      // Success - close modal and redirect
      onOpenChange(false);
      // Reset state
      setStep(initialStep);
      setConnectionInput("");
      setStartupName(editingStartupName || "");
      setSlug("");
      setTagline("");
      setDescription("");
      setWebsite("");
      setCategory("");
      setLogo("");
      setFounderName("");
      setFounderHandle("");
      setFounderAvatar("");
      setError(null);
      setIsConnecting(false);
      setConnectionId(null);

      // Redirect to startup page using name (URL encoded)
      router.push(`/startup/${encodeURIComponent(startupNameValue)}`);
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleDelete = async () => {
    if (!editingStartupId) {
      return;
    }

    // Confirm deletion
    if (
      !confirm(
        "Are you sure you want to delete this startup? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/connect/${editingStartupId}`, {
        method: "DELETE",
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to delete startup");
      }

      // Success - close modal and redirect to home
      onOpenChange(false);
      router.push("/");
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      // If editing, close modal instead of going back to step 1
      if (editingStartupId) {
        onOpenChange(false);
      } else {
        setStep(1);
      }
    } else if (step === 4) {
      setStep(2);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when closing
      setStep(initialStep);
      setConnectionInput("");
      setStartupName(editingStartupName || "");
      setSlug("");
      setTagline("");
      setDescription("");
      setWebsite("");
      setCategory("");
      setLogo("");
      setFounderName("");
      setFounderHandle("");
      setFounderAvatar("");
      setError(null);
      setIsConnecting(false);
      setConnectionId(null);
    }
    onOpenChange(open);
  };

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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={
          step === 2 || step === 3 || step === 4
            ? "max-w-2xl bg-[#e4e4e4]"
            : step === 1
            ? "bg-[#e4e4e4]"
            : ""
        }
      >
        {(step === 2 || step === 4) && !(step === 2 && editingStartupId) && (
          <button
            type="button"
            onClick={handleBack}
            className="absolute top-0 left-0 border-r border-b border-gray-300 p-3 transition-colors hover:bg-gray-200 disabled:pointer-events-none"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <DialogTitle className="text-sm mt-4 font-mono text-foreground mb-2">
                {step === 1
                  ? "Add Startup"
                  : step === 2
                  ? editingStartupId
                    ? "Edit startup details"
                    : "Get your connection string"
                  : step === 3
                  ? "Connecting..."
                  : editingStartupId
                  ? "Edit Startup Details"
                  : "Add Startup Details"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                {step === 1
                  ? "Get a verified public profile showing real growth. And a free SEO backlink 😁 "
                  : step === 2
                  ? editingStartupId
                    ? `Please re-enter your ${providerConfig.name} db credentials to update `
                    : `Enter your ${providerConfig.name} database connection string`
                  : step === 3
                  ? "Establishing connection to your database"
                  : editingStartupId
                  ? "Update your startup information"
                  : "Tell us about your startup"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>{" "}
        {step === 1 ? (
          <form onSubmit={handleProviderSubmit}>
            <div className="">
              <span className="text-xs  flex items-center gap-2">
                <span className="text-[10px] border border-gray-300  px-1.5 py-1 text-muted-foreground">
                  1.1
                </span>
                Select your database provider *
              </span>
              {/* Unified Row Container */}
              <div className="flex border h-16  border-gray-300 mt-4">
                {/* Left Section - Two Buttons */}
                <div className="grid grid-cols-2 border-r border-gray-300">
                  <div className="border-r border-gray-300">
                    <DbToggle
                      provider="neon"
                      selected={selectedProvider === "neon"}
                      onSelect={() => setSelectedProvider("neon")}
                      onHover={() => setHoveredProvider("neon")}
                      onHoverEnd={() => setHoveredProvider(null)}
                    />
                  </div>
                  <div>
                    <DbToggle
                      provider="supabase"
                      selected={selectedProvider === "supabase"}
                      onSelect={() => setSelectedProvider("supabase")}
                      onHover={() => setHoveredProvider("supabase")}
                      onHoverEnd={() => setHoveredProvider(null)}
                    />
                  </div>
                </div>
                {/* Middle Section - Provider Info */}
                <div className="flex-1 px-4 py-3 border-r border-gray-300">
                  <p className="font-medium text-sm text-foreground">
                    {providerConfig.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {providerConfig.description}
                  </p>
                </div>
                {/* Right Section - Connect Button */}
                <div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1.5 bg-[#1A1A1A] text-white text-sm font-medium px-4 py-2 rounded-none hover:bg-[#e03d26] transition-colors shadow-sm h-full w-full"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
              <DialogFooter className="sm:justify-start mt-4  py-1">
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <p className="text-[11px] text-left">
                    <strong className="font-medium text-foreground">
                      Read-only access:
                    </strong>{" "}
                    We only need to read your metrics.
                  </p>
                </div>
              </DialogFooter>
            </div>
          </form>
        ) : step === 2 ? (
          <form onSubmit={handleConnectionSubmit}>
            <div className=" space-y-4">
              {/* Connection String */}
              <div className="space-y-2">
                <label
                  htmlFor="connection-string"
                  className="text-xs font-medium text-foreground "
                >
                  DB Credentials *
                </label>
                <div className="flex w-full items-center gap-2  mt-2 h-16 border border-gray-300 transition-all">
                  <input
                    id="connection-string"
                    type="text"
                    value={connectionInput}
                    onChange={(e) => setConnectionInput(e.target.value)}
                    placeholder="***********************"
                    className="pl-3 flex-1 bg-transparent border-none outline-none text-sm h-10 placeholder:text-gray-400 text-gray-900"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isConnecting}
                    className="flex items-center  h-full gap-1.5 bg-[#1A1A1A] text-white text-sm font-medium px-4 py-2 rounded-none hover:bg-[#e03d26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-5 h-6" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {!editingStartupId && selectedProvider === "neon" && (
                <div className="text-xs flex flex-col gap-2">
                  <div className="flex flex-row items-start gap-2">
                    <span className="text-[10px] border border-gray-300  px-1.5 py-1 text-muted-foreground inline-flex items-center gap-1">
                      1.1
                    </span>
                    <p className="text-xs">
                      In the Neon Console, go to Branches. Select the branch
                      that contains your data. Click &quot;Add Read
                      Replica&quot; to create a compute instance for read
                      operations..
                    </p>
                  </div>
                  <div className="flex flex-row items-start gap-2">
                    <span className="text-[10px] border border-gray-300  px-1.5 py-1 text-muted-foreground inline-flex items-center gap-1">
                      1.2
                    </span>
                    <p className="text-xs">
                      Cick the Connect button and copy the connection string.
                      and paste it into the input field above.
                    </p>
                  </div>
                </div>
              )}
              <DialogFooter className="sm:justify-start   py-1">
                <div className="flex items-start justify-center gap-2   text-muted-foreground">
                  <p className="text-[11px] text-left">
                    <strong className="font-medium text-foreground">
                      Read-only access:
                    </strong>{" "}
                    All credentials are encrypted using AES-256-GCM encryption.
                    We will never modify, update, or delete anything
                  </p>
                </div>
              </DialogFooter>
            </div>
          </form>
        ) : step === 3 ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center gap-6">
              {/* Database Provider Logo */}
              <div className="  p-2 ">
                <Image
                  src={providerConfig.logoPath}
                  alt={providerConfig.logoAlt}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              {/* App Logo */}
              <div className=" p-2  flex items-center justify-center">
                <Image
                  src={"/logo.png"}
                  alt="App Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {isConnecting ? (
                <span className="flex items-center gap-1">
                  <span>Connecting to {providerConfig.name}</span>
                  <span className="flex gap-0.5">
                    <span className="animate-[bounce_1.4s_ease-in-out_infinite] [animation-delay:0s]">
                      .
                    </span>
                    <span className="animate-[bounce_1.4s_ease-in-out_infinite] [animation-delay:0.2s]">
                      .
                    </span>
                    <span className="animate-[bounce_1.4s_ease-in-out_infinite] [animation-delay:0.4s]">
                      .
                    </span>
                  </span>
                </span>
              ) : (
                "Connection successful!"
              )}
            </p>
          </div>
        ) : step === 4 ? (
          <form onSubmit={handleStartupDetailsSubmit}>
            <div className=" space-y-4  max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* Founder Name and Handle */}
              <div className="grid grid-cols-2 gap-4 ">
                <div className="space-y-2">
                  <label
                    htmlFor="founder-name"
                    className="text-xs font-medium text-foreground"
                  >
                    <span className="text-[10px] border border-gray-300  px-1.5 py-1 text-muted-foreground">
                      {" "}
                      1.1
                    </span>{" "}
                    Founder Name
                  </label>
                  <input
                    id="founder-name"
                    type="text"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 mt-2 text-black/80 border border-gray-300 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="founder-handle"
                    className="text-xs font-medium text-foreground"
                  >
                    <span className="text-[10px] border border-gray-300  px-1.5 py-1 text-muted-foreground">
                      {" "}
                      1.2
                    </span>{" "}
                    Founder Handle
                  </label>
                  <input
                    id="founder-handle"
                    type="text"
                    value={founderHandle}
                    onChange={(e) => setFounderHandle(e.target.value)}
                    placeholder="@johndoe"
                    className="w-full px-3 py-2 mt-2 text-black/80 border border-gray-300 text-xs focus:outline-none"
                  />
                </div>
              </div>{" "}
              {/* Logo Upload */}
              <div className="space-y-2">
                <div className="flex items-start  w-full  gap-4">
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
                      className="w-24 h-24  p-2 border border-gray-300 overflow-hidden flex items-center justify-center cursor-pointer  hover:bg-muted/80 transition-colors group relative"
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
                            className="absolute top-1 right-1 p-1 bg-[#e03c26] text-white  opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
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
                  {/* Startup Name */}
                  <div className="flex-1 mt-8 space-y-2 min-w-0">
                    {isEditingStartupName ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempStartupName}
                          onChange={(e) => setTempStartupName(e.target.value)}
                          placeholder="Enter your startup name"
                          className="flex-1 px-3 py-2    border border-gray-300 text-xs focus:outline-none"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setStartupName(tempStartupName);
                              setIsEditingStartupName(false);
                            } else if (e.key === "Escape") {
                              setTempStartupName(startupName);
                              setIsEditingStartupName(false);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setStartupName(tempStartupName);
                            setIsEditingStartupName(false);
                          }}
                          className="p-2  border border-gray-300 hover:bg-[#f3f4f6] transition-colors"
                          aria-label="Confirm"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTempStartupName(startupName);
                            setIsEditingStartupName(false);
                          }}
                          className="p-2 text-[#e03c26] hover:bg-[#e03c26] hover:border-none hover:text-white border border-gray-300 transition-colors"
                          aria-label="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => {
                          setTempStartupName(startupName);
                          setIsEditingStartupName(true);
                        }}
                        className="flex items-center gap-2   cursor-pointer hover:text-gray-700 transition-colors group"
                      >
                        <span className="flex-1">
                          {startupName || "Enter your startup name"}
                        </span>
                        <PenTool className="w-4 h-4 text-gray-400 group-hover:text-gray-600 rotate-270 transition-colors" />
                      </p>
                    )}
                    {/* Tagline */}
                    {editingTagline ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempTagline}
                          onChange={(e) => setTempTagline(e.target.value)}
                          placeholder="Enter your tagline"
                          className="flex-1 px-3 py-2    text-muted-foreground border border-gray-300 text-xs focus:outline-none"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setTagline(tempTagline);
                              setEditingTagline(false);
                            } else if (e.key === "Escape") {
                              setTempTagline(tagline);
                              setEditingTagline(false);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setTagline(tempTagline);
                            setEditingTagline(false);
                          }}
                          className="p-2  border border-gray-300 hover:bg-[#f3f4f6] transition-colors"
                          aria-label="Confirm"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTempTagline(tagline);
                            setEditingTagline(false);
                          }}
                          className="p-2 text-[#e03c26] hover:bg-[#e03c26] hover:border-none hover:text-white border border-gray-300 transition-colors"
                          aria-label="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => {
                          setTempTagline(tagline);
                          setEditingTagline(true);
                        }}
                        className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors group"
                      >
                        <span className="flex-1">
                          {tagline || "Enter your tagline"}
                        </span>
                        <PenTool className="w-4 h-4 text-gray-400 group-hover:text-gray-600 rotate-270 transition-colors" />
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="space-y-2">
                <label
                  htmlFor="startup-description"
                  className="text-xs font-medium text-foreground"
                >
                  <span className="text-[10px] border border-gray-300  px-1.5 py-1 text-muted-foreground">
                    {" "}
                    1.3
                  </span>{" "}
                  Description
                </label>
                <textarea
                  id="startup-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your startup"
                  rows={3}
                  className="w-full px-3 py-4  mt-2 text-black/80 border border-gray-300 text-xs focus:outline-none resize-none"
                />
              </div>
              {/* Website */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="startup-website"
                  className="text-xs font-medium text-foreground"
                >
                  <span className="text-[10px] border border-gray-300  px-1.5 py-1 text-muted-foreground">
                    {" "}
                    1.4
                  </span>{" "}
                  Startup info
                </label>
                <div className="flex items-center w-full border border-gray-300 overflow-hidden">
                  <span className="px-3 py-2   text-xs border-r border-gray-300 w-32 shrink-0">
                    Website url:
                  </span>
                  <input
                    id="website"
                    type="text"
                    value={website.replace(/^https?:\/\//i, "")}
                    onChange={(e) => {
                      const value = e.target.value;
                      setWebsite(
                        value.startsWith("http") ? value : `https://${value}`
                      );
                    }}
                    placeholder="[www...]"
                    className="flex-1 px-3 py-2 text-black/80 text-xs focus:outline-none"
                  />
                </div>
                {/* Category/Tags */}
                <div className="space-y-2">
                  <div className="flex items-center w-full border border-gray-300 overflow-hidden">
                    <span className="px-3 py-2  text-xs border-r border-gray-300 w-32 shrink-0">
                      Category
                    </span>
                    <input
                      id="category"
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g., SaaS, Fintech, AI"
                      className="flex-1 px-3 py-2 text-muted-foreground text-xs focus:outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    [Separate multiple tags with commas]
                  </p>
                </div>{" "}
              </div>
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 ">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
              <DialogFooter
                className={`${
                  editingStartupId ? "sm:justify-between" : "sm:justify-end"
                } mt-6 h-10 `}
              >
                {editingStartupId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center text-muted-foreground gap-1.5 border border-gray-300 text-xs font-medium px-4 py-2 hover:bg-[#e03d26] hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Startup</span>
                  </button>
                )}
                <button
                  type="submit"
                  className="flex items-center hover:bg-[#e03c26] gap-1.5 bg-[#1A1A1A] text-white text-xs font-medium px-4 py-2  transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span> Save Startup</span>
                </button>
              </DialogFooter>
            </div>
          </form>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
