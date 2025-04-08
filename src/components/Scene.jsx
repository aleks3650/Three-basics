'use client'

import { Html, ScrollControls, useProgress } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Model from "./Model"

function Loader() {
  const {progress} = useProgress()
  return <Html center>{progress.toFixed(2)}% loaded</Html>
}

const Scene = () => {
  return (
    <Canvas gl={{antialias: true}} dpr={[1,1.5]} style={{position: 'relative', height: '100vh'}}>
       <color attach="background" args={['#1a1a1a']} />
      <directionalLight position={[-5,-5,5]} intensity={3} />
      <Suspense fallback={<Loader />}>
      <ScrollControls damping={1} pages={3}>
        <Model />
      </ScrollControls>
      </Suspense>
    </Canvas>
  )
}

export default Scene