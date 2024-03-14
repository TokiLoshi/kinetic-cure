/*
  Warnings:

  - The primary key for the `ExerciseMuscleGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Biceps` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `Chest` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `Core` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `Delts` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `Glutes` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `Hamstrings` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `Hips` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `Lats` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `LowerBack` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `MidBack` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `Obliques` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `Quads` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `Shoulders` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `Traps` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `Triceps` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `UpperBack` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ExerciseMuscleGroup` table. All the data in the column will be lost.
  - You are about to drop the `PTExercises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PTMuscleGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PTWorkoutExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PTWorkouts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutExercise` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `muscleGroupId` to the `ExerciseMuscleGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseType` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseId` to the `PersonalRecords` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reps` to the `Workouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sets` to the `Workouts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('REGULAR', 'PT');

-- DropForeignKey
ALTER TABLE "PTExercises" DROP CONSTRAINT "PTExercises_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PTExercises" DROP CONSTRAINT "PTExercises_pTWorkoutsId_fkey";

-- DropForeignKey
ALTER TABLE "PTMuscleGroup" DROP CONSTRAINT "PTMuscleGroup_PTexerciseId_fkey";

-- DropForeignKey
ALTER TABLE "PTWorkoutExercise" DROP CONSTRAINT "PTWorkoutExercise_ptExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "PTWorkoutExercise" DROP CONSTRAINT "PTWorkoutExercise_ptWorkoutId_fkey";

-- DropForeignKey
ALTER TABLE "PTWorkouts" DROP CONSTRAINT "PTWorkouts_athleteId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_workoutId_fkey";

-- AlterTable
ALTER TABLE "ExerciseMuscleGroup" DROP CONSTRAINT "ExerciseMuscleGroup_pkey",
DROP COLUMN "Biceps",
DROP COLUMN "Chest",
DROP COLUMN "Core",
DROP COLUMN "Delts",
DROP COLUMN "Glutes",
DROP COLUMN "Hamstrings",
DROP COLUMN "Hips",
DROP COLUMN "Lats",
DROP COLUMN "LowerBack",
DROP COLUMN "MidBack",
DROP COLUMN "Obliques",
DROP COLUMN "Quads",
DROP COLUMN "Shoulders",
DROP COLUMN "Traps",
DROP COLUMN "Triceps",
DROP COLUMN "UpperBack",
DROP COLUMN "id",
ADD COLUMN     "muscleGroupId" INTEGER NOT NULL,
ADD CONSTRAINT "ExerciseMuscleGroup_pkey" PRIMARY KEY ("exerciseId", "muscleGroupId");

-- AlterTable
ALTER TABLE "Exercises" ADD COLUMN     "exerciseType" "ExerciseType" NOT NULL,
ADD COLUMN     "type" "ExerciseType" NOT NULL DEFAULT 'REGULAR',
ADD COLUMN     "workoutsId" INTEGER;

-- AlterTable
ALTER TABLE "PersonalRecords" ADD COLUMN     "exerciseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Workouts" ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "sets" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PTExercises";

-- DropTable
DROP TABLE "PTMuscleGroup";

-- DropTable
DROP TABLE "PTWorkoutExercise";

-- DropTable
DROP TABLE "PTWorkouts";

-- DropTable
DROP TABLE "WorkoutExercise";

-- CreateTable
CREATE TABLE "MuscleGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExerciseGroup" (
    "exerciseId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,

    CONSTRAINT "WorkoutExerciseGroup_pkey" PRIMARY KEY ("exerciseId","workoutId")
);

-- CreateTable
CREATE TABLE "_ExercisesToMuscleGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MuscleGroup_name_key" ON "MuscleGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ExercisesToMuscleGroup_AB_unique" ON "_ExercisesToMuscleGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ExercisesToMuscleGroup_B_index" ON "_ExercisesToMuscleGroup"("B");

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_workoutsId_fkey" FOREIGN KEY ("workoutsId") REFERENCES "Workouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalRecords" ADD CONSTRAINT "PersonalRecords_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMuscleGroup" ADD CONSTRAINT "ExerciseMuscleGroup_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseGroup" ADD CONSTRAINT "WorkoutExerciseGroup_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseGroup" ADD CONSTRAINT "WorkoutExerciseGroup_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExercisesToMuscleGroup" ADD CONSTRAINT "_ExercisesToMuscleGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExercisesToMuscleGroup" ADD CONSTRAINT "_ExercisesToMuscleGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "MuscleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
