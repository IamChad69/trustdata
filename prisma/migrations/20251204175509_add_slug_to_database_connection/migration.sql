-- AlterTable
ALTER TABLE "DatabaseConnection" ADD COLUMN "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseConnection_slug_key" ON "DatabaseConnection"("slug");

