"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sparkles, SpotLight, Grid } from "@react-three/drei"
import * as THREE from "three"

function CameraRig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Slow orbit around the stadium, enhanced by mouse movement
    vec.set(
      Math.sin(t * 0.1) * 25 + mouse.x * 5, 
      Math.max(mouse.y * 3 + 12, 5), // Keep camera above ground
      Math.cos(t * 0.1) * 25 + mouse.y * 2
    )
    camera.position.lerp(vec, 0.03)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Hologram() {
  const groupRef = React.useRef<THREE.Group>(null)
  const outerRef = React.useRef<THREE.Mesh>(null)
  const innerRef = React.useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.position.y = 3 + Math.sin(t * 2) * 0.5
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.2
      outerRef.current.rotation.z = t * 0.1
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.3
      innerRef.current.rotation.x = t * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer Hologram */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial color="#10B981" wireframe transparent opacity={0.15} />
      </mesh>
      {/* Inner Core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshBasicMaterial color="#F59E0B" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Central glowing orb */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Downward scanner light */}
      <SpotLight
        color="#10B981"
        position={[0, 0, 0]}
        target={new THREE.Object3D()}
        angle={0.5}
        penumbra={1}
        intensity={3}
        distance={8}
        castShadow
      />
    </group>
  )
}

function StadiumGeometry() {
  const materials = React.useMemo(() => [
    new THREE.MeshStandardMaterial({ color: "#0A0A0A", roughness: 0.8, metalness: 0.6 }),
    new THREE.MeshStandardMaterial({ color: "#171717", roughness: 0.9, metalness: 0.4 })
  ], [])

  return (
    <group position={[0, -2, 0]}>
      {/* Field */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[32, 22]} />
        <meshStandardMaterial 
          color="#062F20" 
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Stadium Bowl / Stands (Layered Torus geometries) */}
      {[...Array(6)].map((_, i) => (
        <mesh 
          key={i} 
          position={[0, i * 1.5, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
          material={materials[i % 2]}
        >
          <torusGeometry args={[19 + i * 2.8, 1.5, 16, 64]} />
        </mesh>
      ))}

      {/* Glowing Inner Ring */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[17, 0.1, 16, 100]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>
      
      {/* Tactical Outer Ring */}
      <mesh position={[0, 8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[35, 0.05, 16, 100]} />
        <meshBasicMaterial color="#F59E0B" />
      </mesh>

      {/* Field Lines (Simple geometries on top of field) */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4, 4.1, 32]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 22]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.4} />
      </mesh>
      {/* Outer Field Boundary */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[15.8, 16, 64]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

function Lights() {
  const [l1, setL1] = React.useState(0)
  const [l2, setL2] = React.useState(0)
  
  const scannerRef = React.useRef<THREE.SpotLight>(null)

  React.useEffect(() => {
    // Light 1: flickers on around 1.0s
    setTimeout(() => setL1(2), 1000)
    setTimeout(() => setL1(0), 1100)
    setTimeout(() => setL1(2), 1200)
    setTimeout(() => setL1(0), 1300)
    setTimeout(() => setL1(3), 1500)

    // Light 2: flickers on around 2.0s
    setTimeout(() => setL2(2), 2000)
    setTimeout(() => setL2(0), 2100)
    setTimeout(() => setL2(2), 2200)
    setTimeout(() => setL2(0), 2300)
    setTimeout(() => setL2(3), 2500)
  }, [])

  useFrame((state) => {
    if (scannerRef.current) {
      // Sweeping scanner light effect
      const target = scannerRef.current.target
      target.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 15
      target.position.z = Math.cos(state.clock.elapsedTime * 0.3) * 10
      target.updateMatrixWorld()
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} color="#10B981" />
      
      {/* Main floodlights */}
      <SpotLight
        color="#F59E0B"
        position={[20, 20, 20]}
        target={new THREE.Object3D()}
        angle={0.5}
        penumbra={0.5}
        attenuation={50}
        anglePower={5}
        intensity={l1}
        opacity={l1 > 0 ? 0.2 : 0}
        castShadow
      />
      <SpotLight
        color="#10B981"
        position={[-20, 20, -20]}
        target={new THREE.Object3D()}
        angle={0.5}
        penumbra={0.5}
        attenuation={50}
        anglePower={5}
        intensity={l2}
        opacity={l2 > 0 ? 0.2 : 0}
        castShadow
      />

      {/* Sweeping Scanner Light */}
      <SpotLight
        ref={scannerRef as any}
        color="#34D399"
        position={[0, 15, 0]}
        angle={0.15}
        penumbra={1}
        attenuation={30}
        intensity={l1 > 0 ? 4 : 0} // Wait for first lights to come on
        opacity={0.15}
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
        camera={{ position: [0, 10, 30], fov: 45 }}
        dpr={[1, 2]} 
        gl={{ antialias: false, powerPreference: "high-performance" }} 
      >
        <fogExp2 attach="fog" args={["#0A0A0A", 0.025]} />
        
        <React.Suspense fallback={null}>
          <StadiumGeometry />
          <Hologram />
          <Lights />
          
          <Sparkles 
            count={300} 
            scale={35} 
            size={3} 
            speed={0.2} 
            opacity={0.4} 
            color="#10B981" 
          />
          <Sparkles 
            count={100} 
            scale={20} 
            size={2} 
            speed={0.5} 
            opacity={0.8} 
            color="#F59E0B" 
          />
          
          <Grid
            position={[0, -1.99, 0]}
            args={[200, 200]}
            cellSize={2}
            cellThickness={1}
            cellColor="#10B981"
            sectionSize={10}
            sectionThickness={1.5}
            sectionColor="#10B981"
            fadeDistance={100}
            fadeStrength={2}
          />
        </React.Suspense>
        
        <CameraRig />
      </Canvas>
      
      {/* Tactical Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#0A0A0A_100%)] opacity-80" />
    </div>
  )
}
