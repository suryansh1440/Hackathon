import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Stage } from '@react-three/drei'
// import { OrbitControls } from '@react-three/drei'

function Car() {
  const { scene } = useGLTF('/scene.gltf')
  const modelRef = useRef()

  useFrame(() => {
    modelRef.current.rotation.y += 0.01
  })

  return (
    <primitive 
      object={scene} 
      ref={modelRef}
      scale={1} 
      position={[0, 0, 0]} 
      rotation={[0, 0, 0]}
    />
  )
}

useGLTF.preload('/scene.gltf')

const Model = () => {
  return (
    <div className='fixed inset-0 bg-gradient-to-br from-gray-900 to-blue-900'>
      <Canvas 
        camera={{ 
          fov: 45, 
          near: 0.1, 
          far: 2000, 
          position: [0, 0, 5] 
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          <Stage environment="city" intensity={0.5}>
            <Car />
            {/* <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} /> */}
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Model
