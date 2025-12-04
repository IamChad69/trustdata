-- CreateTable
CREATE TABLE "Spotlight" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "logo" TEXT,
    "position" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "stripePaymentIntentId" TEXT,
    "stripeSessionId" TEXT,
    "paymentAmount" INTEGER,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spotlight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Spotlight_position_idx" ON "Spotlight"("position");

-- CreateIndex
CREATE INDEX "Spotlight_isActive_expiresAt_idx" ON "Spotlight"("isActive", "expiresAt");

