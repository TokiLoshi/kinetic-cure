"use client";
import { useState, useEffect, useRef } from "react";

interface time {
	seconds: number;
}

interface running {
	running: boolean;
}

// Helpful tutorial: https://www.geeksforgeeks.org/create-a-stop-watch-using-reactjs/
// Another helpful tutorial: https://medium.com/@deepanshushukla/building-a-simple-stopwatch-in-react-a-step-by-step-guide-d37a2cb162a9
export default function Timer() {
	// Time variables
	const [seconds, setSeconds] = useState<number>(0);
	const [minutes, setMinutes] = useState<number>(0);
	const [hours, setHours] = useState<number>(0);
	const [time, setTime] = useState<number>(0);

	// Stopwatch states
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isPaused, setIsPaused] = useState<boolean>(true);

	// run once when the component has mounted
	useEffect(() => {}, []);
	// if not active and not paused set interval to time plus 10
	// else clear the interval
	// return the interval
	// clean up function to clear the interval
	// dependency array is based in the isActive and isPaused states

	// create start handler
	// set active to true and paused to false
	// create resume handler
	// set active to false and paused to true
	const handleUpdate = () => {};

	// Create a dive with two buttons play and pause
	// create display to show the time
	const pauseStopWatch = () => {
		setTime(time + 1);
		setIsPaused(!isPaused);
		setIsActive(!isActive);
	};

	const startStopWatch = () => {
		setTime(time + 1);
		setIsPaused(!isActive);
		setIsActive(!isActive);
	};

	const stopWatch = () => {
		setTime(time + 10);
		setIsPaused(true);
		setIsActive(false);
	};

	return (
		<>
			<div className='justify-center text-center bg-slate-200 m-5 rounded shadow'>
				<h1 className='text-4xl text-indigo-500 text-center'>
					Time to go here
				</h1>
				<p className='text-slate-400'>
					Time: {time}, PAUSED:{" "}
					{isPaused ? "no it's running" : "yes it's paused"} ACTIVE:{" "}
					{isActive ? "affirmative, running" : "stationary as a rock"}{" "}
				</p>
				<div className='flex justify-center gap-5 p-5'>
					<button
						onClick={stopWatch}
						className='bg-rose-500 p-3 rounded shadow hover:bg-rose-700'>
						⏹️ Stop
					</button>
					<button
						onClick={pauseStopWatch}
						className='bg-blue-500 p-3 rounded shadow hover:bg-blue-800'>
						⏸️ Pause
					</button>
					<button
						onClick={startStopWatch}
						className='bg-lime-500 p-3 rounded shadow hover:bg-green-600'>
						▶️ Play
					</button>
				</div>
			</div>
		</>
	);
}
