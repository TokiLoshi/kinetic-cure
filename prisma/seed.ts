// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
// 	// Seed User data:
// 	const user1 = await prisma.user.create({
// 		data: {
// 			email: "hello@prisma.io",
// 			password: "hashedpassword",
// 			name: "alice",
// 			dateJoined: new Date(),
// 			distanceMetric: "miles",
// 			weightMetric: "kg",
// 			totalWorkouts: 1,
// 		},
// 	});

// 	const user2 = await prisma.user.create({
// 		data: {
// 			email: "flacor@narnia.com",
// 			password: "hashedpassword",
// 			dateJoined: new Date(),
// 			distanceMetric: "miles",
// 			weightMetric: "pounds",
// 			totalWorkouts: 2,
// 		},
// 	});

// 	const exercise1 = await prisma.exercises.create({
// 		data: {
// 			name: "Push-up",
// 			type: "REGULAR",
// 			authorId: user1.id,
// 			description: "A pushup is a common calisthenics exercises.",
// 			equipment: "None",
// 			videoLink: "https://example.com/push-up-video",
// 			exerciseType: "REGULAR",
// 		},
// 	});

// 	const exercise2 = await prisma.exercises.create({
// 		data: {
// 			name: "Bicep curl",
// 			authorId: user2.id,
// 			description: "Curl those biceps",
// 			equipment: "dumbell",
// 			videoLink: "https://example.com/bicep-curl",
// 			exerciseType: "REGULAR",
// 		},
// 	});

// 	const exercise3 = await prisma.exercises.create({
// 		data: {
// 			name: "wall pushup",
// 			authorId: user2.id,
// 			description:
// 				"stand hip width apart and place hands on the wall. Sink your shoulders and then push out.",
// 			equipment: "none",
// 			videoLink: "https://example.com/wall-pushup",
// 			exerciseType: "PT",
// 		},
// 	});

// 	const workout1 = await prisma.workouts.create({
// 		data: {
// 			athleteId: user1.id,
// 			dateCompleted: new Date(),
// 			notes: "Good to be back at it",
// 			personalRecord: false,
// 			distance: 0.0,
// 			reps: 20,
// 			sets: 3,
// 		},
// 	});

// 	const workout2 = await prisma.workouts.create({
// 		data: {
// 			athleteId: user2.id,
// 			dateCompleted: new Date(),
// 			notes: "shouler is on the ment",
// 			personalRecord: true,
// 			distance: 0.0,
// 			reps: 20,
// 			sets: 3,
// 		},
// 	});

// 	const workout3 = await prisma.workouts.create({
// 		data: {
// 			athleteId: user2.id,
// 			dateCompleted: new Date(),
// 			notes: "need to do this more often",
// 			personalRecord: false,
// 			distance: 0.0,
// 			reps: 30,
// 			sets: 6,
// 		},
// 	});

// 	const muscleGroup1 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Chest",
// 		},
// 	});

// 	const muscleGroup2 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Shoulders",
// 		},
// 	});

// 	const muscleGroup3 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Triceps",
// 		},
// 	});

// 	const muscleGroup4 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Hamstrings",
// 		},
// 	});

// 	const muscleGroup5 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Glutes",
// 		},
// 	});

// 	const muscleGroup6 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Quads",
// 		},
// 	});

// 	const muscleGroup7 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Hips",
// 		},
// 	});

// 	const muscleGroup8 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Core",
// 		},
// 	});

// 	const muscleGroup10 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "MidBack",
// 		},
// 	});

// 	const muscleGroup11 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "UpperBack",
// 		},
// 	});

// 	const muscleGroup12 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "LowerBack",
// 		},
// 	});

// 	const muscleGroup13 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Obliques",
// 		},
// 	});

// 	const muscleGroup14 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Biceps",
// 		},
// 	});

// 	const muscleGroup15 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Delts",
// 		},
// 	});

// 	const muscleGroup16 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Lats",
// 		},
// 	});

// 	const muscleGroup17 = await prisma.muscleGroup.create({
// 		data: {
// 			name: "Traps",
// 		},
// 	});

// 	const personalRecord1 = await prisma.personalRecords.create({
// 		data: {
// 			athleteId: 21,
// 			exerciseId: 1,
// 			reps: 10,
// 			distance: 0,
// 			weight: 100,
// 		},
// 	});
// 	const personalRecord2 = await prisma.personalRecords.create({
// 		data: {
// 			athleteId: 22,
// 			exerciseId: 2,
// 			reps: 20,
// 			distance: 0,
// 			weight: 200,
// 		},
// 	});

// 	console.log(
// 		`Muscle group10 ${muscleGroup10} 11: ${muscleGroup11} 12: ${muscleGroup12}`
// 	);
// 	console.log(
// 		`PersonalRecord1: ${personalRecord1} personal record2 ${personalRecord2}`
// 	);
// }

// main()
// 	.then(async () => {
// 		await prisma.$disconnect();
// 	})
// 	.catch(async (e) => {
// 		console.error(e);
// 		await prisma.$disconnect();
// 		process.exit(1);
// 	});
