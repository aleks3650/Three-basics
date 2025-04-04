import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Physics } from "@react-three/rapier";
import Experience from "./components/Experience";
import { Suspense, useMemo } from "react";
import { KeyboardControls, Loader } from "@react-three/drei";
import { Controls } from "./constans/Const";



function App() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );
  return (
    <>
    <KeyboardControls map={map}>
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
        <color attach="background" args={["#ececec"]} />
        <Suspense fallback={null}>
          <Physics>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
      <Loader/>
    </KeyboardControls>
    </>
  );
}

export default App;
