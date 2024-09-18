/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `TaskList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TaskList_slug_key" ON "TaskList"("slug");
