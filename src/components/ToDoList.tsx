"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface Todos {
	id: number;
	task: string;
	status: boolean;
}

const tasks: Todos[] = [
	{
		id: 1,
		status: false,
		task: "yoga",
	},
	{ id: 2, status: false, task: "cardio" },
	{ id: 3, status: false, task: "strength" },
];

export default function ToDos() {
	const [todos, setTodos] = useState<Todos[]>(tasks);
	console.log("todos");
	const handleTaskChange = (id: number) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, status: !todo.status };
				} else {
					return todo;
				}
			})
		);
	};
	return (
		<>
			<div>
				<h1>To Dos</h1>
				{tasks.map((todo) => (
					<div key={todo.id} className='flex mt-2'>
						<Checkbox
							checked={todo.status}
							onChange={() => handleTaskChange}
							className='mr-3'
						/>
						<p
							style={{ textDecoration: todo.status ? "line-through" : "none" }}
							className='py-0'>
							{todo.task}
						</p>
					</div>
				))}

				<p>To dos go here</p>
			</div>
		</>
	);
}
