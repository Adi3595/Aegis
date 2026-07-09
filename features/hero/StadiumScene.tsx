"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sparkles, SpotLight } from "@react-three/drei"
import * as THREE from "three"

function CameraRig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()

  useFrame(() => {
    // Subtle parallax based on mouse
    vec.set(mouse.x * 2, mouse.y * 1 + 5, 20)
    camera.position.lerp(vec, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function StadiumGeometry() {
  return (
    <group position={[0, -2, 0]}>
      {/* Field */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial 
          color="#0a1a10" 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Stadium Bowl / Stands (Layered Torus geometries) */}
      {[...Array(4)].map((_, i) => (
        <mesh 
          key={i} 
          position={[0, i * 1.5, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[18 + i * 2, 1.5, 16, 100]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#121A2F" : "#0D1324"} 
            roughness={0.9} 
          />
        </mesh>
      ))}

      {/* Field Lines (Simple Box geometries on top of field) */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3, 3.2, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.2, 20]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.1} />
      
      {/* Main floodlights */}
      <SpotLight
        color="#32D4FF"
        position={[15, 15, 15]}
        target={new THREE.Object3D()}
        angle={0.4}
        penumbra={0.5}
        attenuation={40}
        anglePower={5}
        intensity={2}
        opacity={0.3}
        castShadow
      />
      <SpotLight
        color="#7C5CFF"
        position={[-15, 15, -15]}
        target={new THREE.Object3D()}
        angle={0.4}
        penumbra={0.5}
        attenuation={40}
        anglePower={5}
        intensity={2}
        opacity={0.3}
        castShadow
      />

      {/* Animated Light Beams mapping the field */}
      <SpotLight
        color="#00D26A"
        position={[0, 10, 0]}
        angle={0.2}
        penumbra={1}
        attenuation={20}
        intensity={1.5}
        opacity={0.2}
        castShadow
      />
    </>
  )
}

export default function StadiumScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-primary-bg overflow-hidden pointer-events-none hidden md:block">
      <Canvas 
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [0, 5, 20], fov: 45 }}
        dpr={[1, 2]} // Optimize pixel ratio
        gl={{ antialias: false }} // Disable antialias for performance if using postprocessing or rely on dpr
      >
        <fogExp2 attach="fog" args={["#050816", 0.03]} />
        
        <React.Suspense fallback={null}>
          <StadiumGeometry />
          <Lights />
          
          <Sparkles 
            count={200} 
            scale={25} 
            size={2} 
            speed={0.4} 
            opacity={0.2} 
            color="#32D4FF" 
          />
        </React.Suspense>
        
        <CameraRig />
      </Canvas>
      
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-bg via-transparent to-primary-bg" />
    </div>
  )
}
