/*
  Warnings:

  - You are about to drop the column `distance` on the `Workouts` table. All the data in the column will be lost.
  - You are about to drop the column `personalRecord` on the `Workouts` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `Workouts` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `Workouts` table. All the data in the column will be lost.
  - Added the required column `distance` to the `WorkoutExerciseGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pr` to the `WorkoutExerciseGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reps` to the `WorkoutExerciseGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restTime` to the `WorkoutExerciseGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sets` to the `WorkoutExerciseGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `WorkoutExerciseGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkoutExerciseGroup" DROP CONSTRAINT "WorkoutExerciseGroup_exerciseId_fkey";

-- AlterTable
ALTER TABLE "WorkoutExerciseGroup" ADD COLUMN     "distance" INTEGER NOT NULL,
ADD COLUMN     "exercisesId" INTEGER,
ADD COLUMN     "pr" BOOLEAN NOT NULL,
ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "restTime" INTEGER NOT NULL,
ADD COLUMN     "sets" INTEGER NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Workouts" DROP COLUMN "distance",
DROP COLUMN "personalRecord",
DROP COLUMN "reps",
DROP COLUMN "sets";

-- AddForeignKey
ALTER TABLE "WorkoutExerciseGroup" ADD CONSTRAINT "WorkoutExerciseGroup_exercisesId_fkey" FOREIGN KEY ("exercisesId") REFERENCES "Exercises"("id") ON DELETE SET NULL ON UPDATE CASCADE;
