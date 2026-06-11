import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store/useStore'

export default function Zone({ id, label, position, color, children }) {
  const [near, setNear] = useState(false)
  const { scene } = useThree()
  const setCurrentZone = useStore(s => s.setCurrentZone)
  const openDetail     = useStore(s => s.openDetail)
  const prevNear       = useRef(false)
  const colorObj       = new THREE.Color(color)

  useFrame(() => {
    const avatar = scene.getObjectByName('avatar')
    if (!avatar) return
    const dist = avatar.position.distanceTo(new THREE.Vector3(...position))
    const isNear = dist < 5.5
    setNear(isNear)

    if (isNear && !prevNear.current) {
      setCurrentZone({ id, label, color })
    }
    if (!isNear && prevNear.current) {
      setCurrentZone(null)
    }
    prevNear.current = isNear
  })

  // E key to open detail
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === 'e' || e.key === 'E') && near) openDetail()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [near])

  return (
    <group position={position}>
      {/* Glowing platform */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[5, 5, 0.2, 32]} />
        <meshStandardMaterial
          color={color} emissive={color}
          emissiveIntensity={near ? 0.5 : 0.2}
          roughness={0.3} metalness={0.6}
        />
      </mesh>

      {/* Light beam */}
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[0.1, 1.5, 10, 8]} />
        <meshStandardMaterial
          color={color} transparent opacity={0.06}
          emissive={color} emissiveIntensity={0.3}
        />
      </mesh>

      {/* Zone point light */}
      <pointLight color={color} intensity={near ? 3 : 1.5} distance={14} />

      {/* Zone-specific 3D structure */}
      {children}

      {/* Floating label when near */}
      {near && (
        <Html position={[0, 4, 0]} center>
          <div style={{
            color: color, fontFamily: 'Courier New',
            fontSize: '13px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            textShadow: `0 0 12px ${color}`,
            whiteSpace: 'nowrap', pointerEvents: 'none'
          }}>
            [ {label} ]
            <div style={{ fontSize: '10px', color: '#64748B', textAlign: 'center', marginTop: '4px' }}>
              Press E to explore
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
