-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "dateJoined" TIMESTAMP(3) NOT NULL,
    "distanceMetric" TEXT NOT NULL,
    "weightMetric" TEXT NOT NULL,
    "totalWorkouts" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workouts" (
    "id" SERIAL NOT NULL,
    "athleteId" INTEGER NOT NULL,
    "dateCompleted" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "personalRecord" BOOLEAN NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PTWorkouts" (
    "id" SERIAL NOT NULL,
    "athleteId" INTEGER NOT NULL,
    "dateCompleted" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "frequency" INTEGER NOT NULL,

    CONSTRAINT "PTWorkouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuscleGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercises" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "videoLink" TEXT NOT NULL,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PTExercises" (
    "id" SERIAL NOT NULL,
    "ptWorkoutId" INTEGER NOT NULL,
    "ptExerciseId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "videoLink" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "PTExercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExercise" (
    "workoutId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("workoutId","exerciseId")
);

-- CreateTable
CREATE TABLE "PTWorkoutExercise" (
    "ptWorkoutId" INTEGER NOT NULL,
    "ptExerciseId" INTEGER NOT NULL,

    CONSTRAINT "PTWorkoutExercise_pkey" PRIMARY KEY ("ptWorkoutId","ptExerciseId")
);

-- CreateTable
CREATE TABLE "ExerciseMuscleGroup" (
    "muscleGroupId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "ptExerciseId" INTEGER NOT NULL,
    "pTExercisesId" INTEGER,

    CONSTRAINT "ExerciseMuscleGroup_pkey" PRIMARY KEY ("exerciseId","muscleGroupId")
);

-- CreateTable
CREATE TABLE "PersonalRecords" (
    "id" SERIAL NOT NULL,
    "athleteId" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PersonalRecords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MuscleGroup_name_key" ON "MuscleGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Exercises_name_key" ON "Exercises"("name");

-- AddForeignKey
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PTWorkouts" ADD CONSTRAINT "PTWorkouts_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PTExercises" ADD CONSTRAINT "PTExercises_ptWorkoutId_fkey" FOREIGN KEY ("ptWorkoutId") REFERENCES "PTWorkouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PTExercises" ADD CONSTRAINT "PTExercises_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PTWorkoutExercise" ADD CONSTRAINT "PTWorkoutExercise_ptWorkoutId_fkey" FOREIGN KEY ("ptWorkoutId") REFERENCES "PTWorkouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PTWorkoutExercise" ADD CONSTRAINT "PTWorkoutExercise_ptExerciseId_fkey" FOREIGN KEY ("ptExerciseId") REFERENCES "PTExercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMuscleGroup" ADD CONSTRAINT "ExerciseMuscleGroup_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMuscleGroup" ADD CONSTRAINT "ExerciseMuscleGroup_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMuscleGroup" ADD CONSTRAINT "ExerciseMuscleGroup_pTExercisesId_fkey" FOREIGN KEY ("pTExercisesId") REFERENCES "PTExercises"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalRecords" ADD CONSTRAINT "PersonalRecords_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
