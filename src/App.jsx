
import './App.css'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import { useRef, useEffect } from 'react'
import { useScroll } from 'framer-motion'

function App() {
  const scrollRef = useRef(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const updateScrollValue = (v) => {
      scrollRef.current = v
    }
    const unsubscribe = scrollYProgress.on("change", updateScrollValue)
    return () => {
      unsubscribe()
    }
  }, [scrollYProgress])

  return (
    <div style={{ height: '200vh' }}> 
      <Canvas>
        <Experience scroll={scrollRef} />
      </Canvas>
      <h1>The End</h1>
    </div>
  )
}

export default App
