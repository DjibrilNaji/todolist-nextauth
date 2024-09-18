/*
  Warnings:

  - Added the required column `slug` to the `TaskList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TaskList" ADD COLUMN     "description" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;
