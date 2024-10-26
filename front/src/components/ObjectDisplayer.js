import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";

function Model() {
  // Replace this URL with the actual URL where your .obj file is hosted on Heroku
  const obj = useLoader(OBJLoader, "https://da3-8bb6f9c7540a.herokuapp.com/uploads/da3.obj");

  return (
    <mesh>
      <primitive object={obj} />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <ambientLight />
      <Environment preset="sunset" />
      <Suspense fallback={null}>
        <Model />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}

export default App;
