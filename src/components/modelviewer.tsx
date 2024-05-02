"use client"; // Ensure this runs only on the client-side

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	useGLTF,
	OrbitControls,
	PresentationControls,
	Float,
	Environment,
} from "@react-three/drei";

const ModelViewer: React.FC = () => {
	const computer = useGLTF(
		"https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
	);
	return (
		<>
			<Canvas>
				<OrbitControls />
				<color args={["#010101"]} attach='background' />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<mesh>
					<boxGeometry args={[1, 1, 1]} />
					<meshStandardMaterial color={"orange"} />
				</mesh>
				<primitive object={computer.scene} position-y={-1.2} />
				<PresentationControls>
					<Float rotationIntensity={0.4}>
						<primitive object={computer.scene} position-y={-1.2} />
					</Float>
				</PresentationControls>
			</Canvas>
		</>
	);
};

export default ModelViewer;
