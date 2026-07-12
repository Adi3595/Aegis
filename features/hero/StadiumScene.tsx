"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sparkles, SpotLight, Grid } from "@react-three/drei"
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
  const materials = React.useMemo(() => [
    new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.7, metalness: 0.5 }),
    new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.8, metalness: 0.3 })
  ], [])

  return (
    <group position={[0, -2, 0]}>
      {/* Field */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial 
          color="#064e3b" 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Stadium Bowl / Stands (Layered Torus geometries) */}
      {[...Array(5)].map((_, i) => (
        <mesh 
          key={i} 
          position={[0, i * 1.2, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
          material={materials[i % 2]}
        >
          <torusGeometry args={[18 + i * 2.5, 1.2, 32, 100]} />
        </mesh>
      ))}

      {/* Glowing Inner Ring */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[16, 0.1, 16, 100]} />
        <meshBasicMaterial color="#32D4FF" />
      </mesh>

      {/* Field Lines (Simple Box geometries on top of field) */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3, 3.2, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.2, 20]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function Lights() {
  const [l1, setL1] = React.useState(0)
  const [l2, setL2] = React.useState(0)
  const [l3, setL3] = React.useState(0)

  React.useEffect(() => {
    // Light 1: flickers on around 2.0s
    setTimeout(() => setL1(2), 2000)
    setTimeout(() => setL1(0), 2100)
    setTimeout(() => setL1(2), 2200)
    setTimeout(() => setL1(0), 2300)
    setTimeout(() => setL1(2), 2500)

    // Light 2: flickers on around 2.7s
    setTimeout(() => setL2(2), 2700)
    setTimeout(() => setL2(0), 2800)
    setTimeout(() => setL2(2), 2900)
    setTimeout(() => setL2(0), 3000)
    setTimeout(() => setL2(2), 3200)

    // Light 3: flickers on around 3.4s
    setTimeout(() => setL3(1.5), 3400)
    setTimeout(() => setL3(0), 3500)
    setTimeout(() => setL3(1.5), 3600)
    setTimeout(() => setL3(0), 3700)
    setTimeout(() => setL3(1.5), 3900)
  }, [])

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
        intensity={l1}
        opacity={l1 > 0 ? 0.3 : 0}
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
        intensity={l2}
        opacity={l2 > 0 ? 0.3 : 0}
        castShadow
      />

      {/* Animated Light Beams mapping the field */}
      <SpotLight
        color="#00D26A"
        position={[0, 10, 0]}
        angle={0.2}
        penumbra={1}
        attenuation={20}
        intensity={l3}
        opacity={l3 > 0 ? 0.2 : 0}
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
          
          <Grid
            position={[0, -2.01, 0]}
            args={[200, 200]}
            cellSize={1}
            cellThickness={1}
            cellColor="#32D4FF"
            sectionSize={5}
            sectionThickness={1.5}
            sectionColor="#7C5CFF"
            fadeDistance={80}
            fadeStrength={1}
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
