'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Torus, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh } from 'three'
import { cn } from '@/lib/utils'

const scenePalette = {
  blue: '#7c9cff',
  violet: '#a78bfa',
  aqua: '#67e8f9',
  ring: '#8be9ff',
  lightCool: '#dbeafe',
  lightViolet: '#c084fc',
  lightAqua: '#5eead4',
}

function FloatingShape({
  position,
  color,
  speed,
  delay = 0,
  scale = 1,
  floatSpeed = 1.4,
  floatIntensity = 1.5,
  distort = 0.18,
}: {
  position: [number, number, number]
  color: string
  speed: number
  delay?: number
  scale?: number
  floatSpeed?: number
  floatIntensity?: number
  distort?: number
}) {
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return

    const introProgress = Math.min(Math.max((state.clock.elapsedTime - delay) / 0.9, 0), 1)
    const easedIntro = 1 - (1 - introProgress) ** 3

    ref.current.scale.setScalar(Math.max(easedIntro, 0.001))
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.5
    ref.current.rotation.y = state.clock.elapsedTime * speed
  })

  return (
    <Float speed={floatSpeed} rotationIntensity={1.15} floatIntensity={floatIntensity}>
      <RoundedBox
        ref={ref}
        args={[1.15 * scale, 1.15 * scale, 1.15 * scale]}
        radius={0.2}
        smoothness={6}
        position={position}
      >
        <MeshDistortMaterial
          color={color}
          speed={1.8}
          distort={distort}
          roughness={0.15}
          metalness={0.45}
        />
      </RoundedBox>
    </Float>
  )
}

function RingShape({ boost = 1, delay = 0 }: { boost?: number; delay?: number }) {
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return

    const introProgress = Math.min(Math.max((state.clock.elapsedTime - delay) / 0.9, 0), 1)
    const easedIntro = 1 - (1 - introProgress) ** 3

    ref.current.scale.setScalar(Math.max(easedIntro, 0.001))
    ref.current.rotation.x = state.clock.elapsedTime * 0.3
    ref.current.rotation.z = state.clock.elapsedTime * 0.25
  })

  return (
    <Float speed={1.1 * boost} floatIntensity={1.2 * boost}>
      <Torus ref={ref} args={[1.1, 0.28, 24, 64]} position={[0.8, -0.1, -0.8]}>
        <meshStandardMaterial color={scenePalette.ring} roughness={0.15} metalness={0.65} />
      </Torus>
    </Float>
  )
}

interface HeroSceneProps {
  mode?: 'card' | 'background'
  className?: string
}

export function HeroScene({ mode = 'card', className }: HeroSceneProps) {
  const isBackground = mode === 'background'
  const motionBoost = isBackground ? 1.9 : 1

  return (
    <div
      className={cn(
        'w-full overflow-hidden',
        isBackground
          ? 'h-full bg-[radial-gradient(circle_at_24%_20%,_rgba(124,156,255,0.48),_transparent_52%),radial-gradient(circle_at_76%_24%,_rgba(167,139,250,0.28),_transparent_38%),radial-gradient(circle_at_62%_74%,_rgba(103,232,249,0.22),_transparent_44%),linear-gradient(180deg,rgba(15,23,42,0.5),rgba(15,23,42,0.12))]'
          : 'h-[250px] rounded-[28px] border border-white/12 bg-[radial-gradient(circle_at_top,_rgba(124,156,255,0.34),_transparent_42%),radial-gradient(circle_at_70%_72%,_rgba(103,232,249,0.18),_transparent_36%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.5))] sm:h-[340px] sm:rounded-[32px] lg:h-[420px]',
        className
      )}
    >
      <Canvas camera={{ position: [0, 0, isBackground ? 4.2 : 6], fov: isBackground ? 68 : 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={isBackground ? 1.75 : 1.1} />
        <directionalLight position={[4, 4, 5]} intensity={isBackground ? 3.4 : 1.8} color={scenePalette.lightCool} />
        <pointLight position={[-2, -2, 4]} intensity={isBackground ? 3.8 : 2.2} color={scenePalette.lightViolet} />
        <pointLight position={[2, 1, 3]} intensity={isBackground ? 3.2 : 1.8} color={scenePalette.lightAqua} />
        <FloatingShape
          position={isBackground ? [-1.15, 0.52, 0.12] : [-1.9, 0.9, 0]}
          color={scenePalette.blue}
          speed={0.4 * motionBoost}
          delay={1}
          scale={isBackground ? 1.42 : 1}
          floatSpeed={isBackground ? 2 : 1.4}
          floatIntensity={isBackground ? 2.5 : 1.5}
          distort={isBackground ? 0.28 : 0.18}
        />
        <FloatingShape
          position={isBackground ? [1.15, 0.68, -0.22] : [1.6, 1.2, -0.5]}
          color={scenePalette.violet}
          speed={0.28 * motionBoost}
          delay={2}
          scale={isBackground ? 1.36 : 1}
          floatSpeed={isBackground ? 1.85 : 1.4}
          floatIntensity={isBackground ? 2.35 : 1.5}
          distort={isBackground ? 0.27 : 0.18}
        />
        <FloatingShape
          position={isBackground ? [0.04, -0.78, 0.18] : [-1.2, -1.15, 0.4]}
          color={scenePalette.aqua}
          speed={0.22 * motionBoost}
          delay={3}
          scale={isBackground ? 1.34 : 1}
          floatSpeed={isBackground ? 1.75 : 1.4}
          floatIntensity={isBackground ? 2.35 : 1.5}
          distort={isBackground ? 0.26 : 0.18}
        />
        <RingShape boost={isBackground ? 2.1 : 1} delay={4} />
      </Canvas>
    </div>
  )
}
