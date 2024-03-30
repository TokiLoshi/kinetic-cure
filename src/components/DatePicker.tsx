"use client";
import React from "react";
import { Calendar } from "./ui/calendar";

export default function DatePicker() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	console.log(`In DatePicker and date is: ${date}`); // <console>
	const displayDate = date?.toLocaleDateString();
	return (
		<>
			<Calendar
				mode='single'
				selected={date}
				onSelect={setDate}
				className='rounded-md border'
			/>
			<p>{displayDate}</p>
		</>
	);
}
