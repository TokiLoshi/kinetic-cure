// "use client";
// import React, { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";

// const ModelViewer: React.FC = () => {
// 	const meshRef = useRef(null);
// 	useFrame(() => {
// 		if (meshRef.current) {
// 			meshRef.current.rotation.x += 0.01;
// 			meshRef.current.rotation.y += 0.01;
// 		}
// 	});
// 	return (
// 		<Canvas>
// 			<ambientLight />
// 			<pointLight position={[10, 10, 10]} />
// 			<mesh ref={meshRef}>
// 				<torusGeometry args={[1, 0.3, 32, 32]} />
// 				<meshStandardMaterial color={"hopink"} />
// 			</mesh>
// 		</Canvas>
// 	);
// };

// export default ModelViewer;

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
				<color args={["#000000"]} attach='background' />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<mesh>
					<boxGeometry args={[5, 5, 5]} />
					<meshStandardMaterial color={"orange"} />
				</mesh>
				{/* <primitive object={computer.scene} position-y={-1.2} />
				<PresentationControls
					global
					rotation={[0.13, 0.1, 0]}
					polar={[-0.4, 0.2]}
					azimuth={[-1, 0.75]}>
					<Float rotationIntensity={0.4}>
						<primitive object={computer.scene} position-y={-1.2} />
					</Float>
				</PresentationControls> */}
			</Canvas>
		</>
	);
};

export default ModelViewer;
