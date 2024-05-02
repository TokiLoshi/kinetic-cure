"use client";
import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto"; // Note it's nb to use 'auto with the newer versions

interface ChartProps {
	label: string;
}

const GraphComponent: React.FC<ChartProps> = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		if (canvasRef.current) {
			const chart = new Chart(canvasRef.current, {
				type: "line",
				data: {
					datasets: [
						{
							label: "Placeholder Data",
							data: [12, 19, 3, 5, 2, 0, 10],
							borderColor: "rgb(75, 192, 192)",
							backgroundColor: "rgba(75, 192, 192, 0.2)",
						},
					],
				},
			});
			return () => chart.destroy();
		}
	}, []);

	return <canvas ref={canvasRef} />;
};

export default GraphComponent;
