'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Torus, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh } from 'three'

function FloatingShape({
  position,
  color,
  speed,
}: {
  position: [number, number, number]
  color: string
  speed: number
}) {
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.5
    ref.current.rotation.y = state.clock.elapsedTime * speed
  })

  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={1.5}>
      <RoundedBox ref={ref} args={[1.15, 1.15, 1.15]} radius={0.2} smoothness={6} position={position}>
        <MeshDistortMaterial color={color} speed={1.5} distort={0.18} roughness={0.15} metalness={0.4} />
      </RoundedBox>
    </Float>
  )
}

function RingShape() {
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.3
    ref.current.rotation.z = state.clock.elapsedTime * 0.25
  })

  return (
    <Float speed={1.1} floatIntensity={1.2}>
      <Torus ref={ref} args={[1.1, 0.28, 24, 64]} position={[0.8, -0.1, -0.8]}>
        <meshStandardMaterial color="#34d399" roughness={0.15} metalness={0.65} />
      </Torus>
    </Float>
  )
}

export function HeroScene() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-[32px] border border-white/12 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.35),_transparent_40%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.5))]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 4, 5]} intensity={1.8} color="#dbeafe" />
        <pointLight position={[-2, -2, 4]} intensity={2.2} color="#a855f7" />
        <pointLight position={[2, 1, 3]} intensity={1.8} color="#34d399" />
        <FloatingShape position={[-1.9, 0.9, 0]} color="#60a5fa" speed={0.4} />
        <FloatingShape position={[1.6, 1.2, -0.5]} color="#8b5cf6" speed={0.28} />
        <FloatingShape position={[-1.2, -1.15, 0.4]} color="#22d3ee" speed={0.22} />
        <RingShape />
      </Canvas>
    </div>
  )
}
