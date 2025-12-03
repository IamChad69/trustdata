-- CreateTable
CREATE TABLE "DbCredential" (
    "id" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "database" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "ssl" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DbCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Startup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "logoUrl" TEXT,
    "provider" TEXT NOT NULL,
    "credentialsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Startup_slug_key" ON "Startup"("slug");

-- CreateIndex
CREATE INDEX "Startup_slug_idx" ON "Startup"("slug");

-- CreateIndex
CREATE INDEX "Startup_credentialsId_idx" ON "Startup"("credentialsId");

-- AddForeignKey
ALTER TABLE "Startup" ADD CONSTRAINT "Startup_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "DbCredential"("id") ON DELETE CASCADE ON UPDATE CASCADE;
