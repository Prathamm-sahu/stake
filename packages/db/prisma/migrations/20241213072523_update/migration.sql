/*
  Warnings:

  - Added the required column `game` to the `GameTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameTransaction" ADD COLUMN     "game" TEXT NOT NULL;
