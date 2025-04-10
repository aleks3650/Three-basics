import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import './app.css'
import { KeyboardControls, PerspectiveCamera, Grid, OrbitControls, useKeyboardControls } from '@react-three/drei'

const Sphere = ({ positionRef }) => {
  const sphereRef = useRef()
  const [, get] = useKeyboardControls()
  const speed = 0.15
  const boundary = 4.5

  useFrame(() => {
    const { left, right, forward, backward } = get()
    const position = sphereRef.current.position
    
    if (left) position.x = Math.max(-boundary, position.x - speed)
    if (right) position.x = Math.min(boundary, position.x + speed)
    if (forward) position.z = Math.max(-boundary, position.z - speed)
    if (backward) position.z = Math.min(boundary, position.z + speed)
    
    positionRef.current = [position.x, position.y, position.z]
  })

  return (
    <mesh ref={sphereRef} position={[0, 0.5, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="skyblue" metalness={0.3} roughness={0.2} />
    </mesh>
  )
}

const Camera = ({ target }) => {
  const { camera } = useThree()
  const offset = useRef([10, 8, 10])
  const cameraPosition = useRef([0, 0, 0])

  useFrame((state, delta) => {
    const [tx, ty, tz] = target.current
    const [offsetX, offsetY, offsetZ] = offset.current
    
    cameraPosition.current = [
      tx + offsetX,
      ty + offsetY,
      tz + offsetZ
    ]
    
    camera.position.lerp(
      new THREE.Vector3(...cameraPosition.current),
      5 * delta
    )
    
    camera.lookAt(tx, ty, tz)
  })

  return (
    <PerspectiveCamera
      makeDefault
      fov={65}
      near={0.1}
      far={1000}
    />
  )
}

const Scene = () => {
  const spherePosition = useRef([0, 0.5, 0])

  return (
    <>
      <Sphere positionRef={spherePosition} />
      <Grid args={[10, 10]} cellColor="#404040" position={[0, -0.01, 0]} />
      <Camera target={spherePosition} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI/4}
        maxPolarAngle={Math.PI/2}
      />
    </>
  )
}

export default function App() {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] }
      ]}>
      <Canvas shadows style={{ width: '100vw', height: '100vh' }}>
        <Scene />
      </Canvas>
    </KeyboardControls>
  )
}