import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";

function Model() {
  const obj = useLoader(OBJLoader, process.env.PUBLIC_URL + "/Scanned.obj");

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

// import React from "react";

// const ObjectDisplayer = () => {
//   return <div>ObjectDisplayer</div>;
// };

// export default ObjectDisplayer;
