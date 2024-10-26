import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

function Model({ objContent }) {
  const [object, setObject] = useState(null);

  useEffect(() => {
    if (objContent) {
      const blob = new Blob([objContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      // Load the OBJ content into Three.js
      new OBJLoader().load(url, (loadedObject) => {
        setObject(loadedObject);
      });
    }
  }, [objContent]);

  if (!object) return null;

  return <primitive object={object} scale={0.5} />;

  // const obj = useLoader(OBJLoader, process.env.PUBLIC_URL + "/Scanned.obj");

  // return (
  //   <mesh>
  //     <primitive object={obj} />
  //   </mesh>
  // );
}

function App() {
  const [objContent, setObjContent] = useState("");

  useEffect(() => {
    // Listen for 'obj_file' event from the backend
    socket.on("obj_file", (data) => {
      console.log("Received OBJ file:", data);
      setObjContent(data.content);
    });

    return () => {
      socket.off("obj_file");
    };
  }, []);

  return (
    <Canvas>
      <ambientLight />
      <Environment preset="sunset" />
      <Suspense fallback={null}>
        <Model objContent={objContent} />
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
