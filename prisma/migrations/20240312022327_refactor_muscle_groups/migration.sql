/*
  Warnings:

  - The primary key for the `ExerciseMuscleGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `muscleGroupId` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `pTExercisesId` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `ptExerciseId` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `ptExerciseId` on the `PTExercises` table. All the data in the column will be lost.
  - You are about to drop the column `ptWorkoutId` on the `PTExercises` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PTExercises` table. All the data in the column will be lost.
  - You are about to drop the `MuscleGroup` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `PTExercises` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `PTExercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipment` to the `PTExercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `PTExercises` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExerciseMuscleGroup" DROP CONSTRAINT "ExerciseMuscleGroup_muscleGroupId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseMuscleGroup" DROP CONSTRAINT "ExerciseMuscleGroup_pTExercisesId_fkey";

-- DropForeignKey
ALTER TABLE "PTExercises" DROP CONSTRAINT "PTExercises_ptWorkoutId_fkey";

-- DropForeignKey
ALTER TABLE "PTExercises" DROP CONSTRAINT "PTExercises_userId_fkey";

-- AlterTable
ALTER TABLE "ExerciseMuscleGroup" DROP CONSTRAINT "ExerciseMuscleGroup_pkey",
DROP COLUMN "muscleGroupId",
DROP COLUMN "pTExercisesId",
DROP COLUMN "ptExerciseId",
ADD COLUMN     "Biceps" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Chest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Core" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Delts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Glutes" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Hamstrings" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Hips" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Lats" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "LowerBack" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "MidBack" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Obliques" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Quads" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Shoulders" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Traps" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Triceps" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "UpperBack" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ExerciseMuscleGroup_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PTExercises" DROP COLUMN "ptExerciseId",
DROP COLUMN "ptWorkoutId",
DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "equipment" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "pTWorkoutsId" INTEGER;

-- DropTable
DROP TABLE "MuscleGroup";

-- CreateTable
CREATE TABLE "PTMuscleGroup" (
    "id" SERIAL NOT NULL,
    "PTexerciseId" INTEGER NOT NULL,
    "Glutes" BOOLEAN NOT NULL DEFAULT false,
    "Hamstrings" BOOLEAN NOT NULL DEFAULT false,
    "Quads" BOOLEAN NOT NULL DEFAULT false,
    "Hips" BOOLEAN NOT NULL DEFAULT false,
    "Core" BOOLEAN NOT NULL DEFAULT false,
    "Chest" BOOLEAN NOT NULL DEFAULT false,
    "Shoulders" BOOLEAN NOT NULL DEFAULT false,
    "MidBack" BOOLEAN NOT NULL DEFAULT false,
    "UpperBack" BOOLEAN NOT NULL DEFAULT false,
    "LowerBack" BOOLEAN NOT NULL DEFAULT false,
    "Obliques" BOOLEAN NOT NULL DEFAULT false,
    "Triceps" BOOLEAN NOT NULL DEFAULT false,
    "Biceps" BOOLEAN NOT NULL DEFAULT false,
    "Delts" BOOLEAN NOT NULL DEFAULT false,
    "Lats" BOOLEAN NOT NULL DEFAULT false,
    "Traps" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PTMuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PTExercises_name_key" ON "PTExercises"("name");

-- AddForeignKey
ALTER TABLE "PTExercises" ADD CONSTRAINT "PTExercises_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PTExercises" ADD CONSTRAINT "PTExercises_pTWorkoutsId_fkey" FOREIGN KEY ("pTWorkoutsId") REFERENCES "PTWorkouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PTMuscleGroup" ADD CONSTRAINT "PTMuscleGroup_PTexerciseId_fkey" FOREIGN KEY ("PTexerciseId") REFERENCES "PTExercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
