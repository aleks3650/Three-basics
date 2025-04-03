import React, { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Model } from './Chlopek'
import { useFrame, useThree } from '@react-three/fiber'

const Experience = ({ scroll }) => {
  const { camera } = useThree()
  const modelRef = useRef()

  useFrame((state, delta) => {
    const zoomLevel = 5 + scroll.current * 15 
    camera.position.set(0, 2, zoomLevel)
    camera.lookAt(0, 0, 0)
    
    if(modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5 
    }
  })

  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        makeDefault
      />
      <ambientLight intensity={0.5} />
      <Model ref={modelRef} scale={0.5} />
    </>
  )
}

export default Experience