import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import React, { useEffect, useRef } from "react"
import * as THREE from "three"

useGLTF.preload("/robot.glb")
const Model = () => {
    const group = useRef<THREE.Group>(null)
    const {nodes, materials, animations, scene} = useGLTF('/robot.glb')
    const {actions, clips} = useAnimations(animations, scene)
    const scroll = useScroll()

    useEffect(() => {
        const experimentAction = actions["Experiment"]?.play();
        if (experimentAction) {
            experimentAction.paused = true;
        }
    }, [])
    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y -= delta * 0.5 
        }
        
        if (actions["Experiment"]) {
            actions["Experiment"].time = actions["Experiment"].getClip().duration * scroll.offset
        }
    })

  return (
    <group ref={group}>
        <primitive object={scene} scale={1.2} position={[0,-1,0]} rotation={[0,1,0]} />
    </group>
  )
}

export default Model