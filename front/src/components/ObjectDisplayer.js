// ObjectDisplayer.js

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Model({ objContent }) {
  const [object, setObject] = useState(null);

  useEffect(() => {
    if (objContent) {
      const blob = new Blob([objContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      new OBJLoader().load(url, (loadedObject) => {
        setObject(loadedObject);
      });
    }
  }, [objContent]);

  if (!object) return null;

  return <primitive object={object} scale={0.5} />;
}

function App() {
  const [objContent, setObjContent] = useState(null);

  useEffect(() => {
    socket.on("obj_file", (data) => {
      console.log("Received OBJ file:", data);
      setObjContent(data.content);
    });

    return () => {
      socket.off("obj_file");
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      {!objContent ? (
        <div className="text-center space-y-4">
          <div className="animate-pulse text-4xl font-bold text-gray-700">
            No items to display yet...
          </div>
          <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        // <div className="relative shadow-xl p-4 rounded-lg bg-white">
        <Canvas
          className="w-[80vw] h-[80vh]"
          shadows
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            castShadow
            shadow-mapSize={{ width: 1024, height: 1024 }}
          />
          <Environment preset="warehouse" />
          <Suspense
            fallback={
              <div className="text-center animate-pulse text-xl">
                Loading Model...
              </div>
            }
          >
            <Model objContent={objContent} />
            <OrbitControls />
          </Suspense>
        </Canvas>
        // </div>
      )}
    </div>
  );
}

export default App;
