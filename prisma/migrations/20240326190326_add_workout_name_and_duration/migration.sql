/*
  Warnings:

  - Added the required column `duration` to the `Workouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Workouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workouts" ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
