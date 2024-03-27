/*
  Warnings:

  - Added the required column `sets` to the `PersonalRecords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PersonalRecords" ADD COLUMN     "sets" INTEGER NOT NULL;
