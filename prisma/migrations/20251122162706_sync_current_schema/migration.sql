/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('RESULT', 'ERROR');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "DatabaseConnection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "connectionString" TEXT NOT NULL,
    "selectedTables" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startupName" TEXT NOT NULL,
    "paidUsers" INTEGER,
    "totalUsers" INTEGER,
    "category" TEXT,
    "description" TEXT,
    "founderAvatar" TEXT,
    "founderHandle" TEXT,
    "founderName" TEXT,
    "logo" TEXT,
    "tagline" TEXT,
    "website" TEXT,
    "readOnlyConnString" TEXT,
    "readOnlyRoleName" TEXT,

    CONSTRAINT "DatabaseConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricSnapshot" (
    "id" TEXT NOT NULL,
    "connectionId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "totalUsers" INTEGER NOT NULL DEFAULT 0,
    "paidUsers" INTEGER NOT NULL DEFAULT 0,
    "activeUsers" INTEGER NOT NULL DEFAULT 0,
    "newSignups" INTEGER NOT NULL DEFAULT 0,
    "churnedUsers" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetricSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MetricSnapshot_connectionId_date_idx" ON "MetricSnapshot"("connectionId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "MetricSnapshot_connectionId_date_key" ON "MetricSnapshot"("connectionId", "date");

-- AddForeignKey
ALTER TABLE "MetricSnapshot" ADD CONSTRAINT "MetricSnapshot_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "DatabaseConnection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
