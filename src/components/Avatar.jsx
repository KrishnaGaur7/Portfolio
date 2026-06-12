import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store/useStore'

// Helper component to render the primitive safely if it exists, or a fallback box
function AvatarModel({ model }) {
  if (model) {
    return <primitive object={model} scale={1} />
  }
  // Fallback placeholder if no model loads
  return (
    <mesh position={[0, 1, 0]} castShadow>
      <capsuleGeometry args={[0.4, 1.2, 8, 16]} />
      <meshStandardMaterial color="#38BDF8" roughness={0.3} metalness={0.8} />
    </mesh>
  )
}

export default function Avatar() {
  const avatarRef = useRef()

  const gltf = useGLTF('/models/avatar.glb')
  const model = gltf.scene

  const idleG = useGLTF('/animations/idle.glb')
  const walkG = useGLTF('/animations/walk.glb')
  const waveG = useGLTF('/animations/wave.glb')

  // Helper to rename and scale tracks from cm (Mixamo) to meters (Three.js)
  const cleanTracks = (clip) => {
    if (clip && clip.tracks) {
      // Filter out scale tracks to prevent shrinking/deformation
      clip.tracks = clip.tracks.filter(track => !track.name.endsWith('.scale'))

      clip.tracks.forEach(track => {
        // Rename track paths to match model's bones
        track.name = track.name
          .replace(/mixamorig:/g, '')
          .replace(/mixamorig/g, '')

        // Scale position tracks (e.g. Hips.position) from cm to meters
        if (track.name.endsWith('.position')) {
          for (let i = 0; i < track.values.length; i++) {
            track.values[i] *= 0.01
          }
        }
      })
    }
    return clip
  }

  // Safely rename animation clips to avoid collision and match exact state name
  const idleAnims = (idleG.animations || []).map(clip => {
    const c = cleanTracks(clip.clone())
    c.name = 'Idle'
    return c
  })
  const walkAnims = (walkG.animations || []).map(clip => {
    const c = cleanTracks(clip.clone())
    c.name = 'Walk'
    return c
  })
  const waveAnims = (waveG.animations || []).map(clip => {
    const c = cleanTracks(clip.clone())
    c.name = 'Wave'
    return c
  })

  const allAnims = [...idleAnims, ...walkAnims, ...waveAnims]
  const { actions } = useAnimations(allAnims, avatarRef)

  const [, getKeys] = useKeyboardControls()
  const setAvatarPos = useStore(s => s.setAvatarPosition)
  const currentAnim = useRef('Idle')

  useEffect(() => {
    if (avatarRef.current) avatarRef.current.name = 'avatar'
  }, [])

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const idleAction = actions['Idle'] || actions[Object.keys(actions)[0]]
      idleAction?.play()
    }
  }, [actions])

  const switchAnim = (name) => {
    if (!actions || currentAnim.current === name) return
    const prev = actions[currentAnim.current]
    const next = actions[name]
    if (!next) return
    prev?.fadeOut(0.2)
    next.reset().fadeIn(0.2).play()
    currentAnim.current = name
  }

  useFrame((state, delta) => {
    if (!avatarRef.current) return
    const keys = getKeys()
    const { forward, backward, left, right } = keys
    const moving = forward || backward || left || right
    const speed = 4.5

    if (moving) {
      switchAnim('Walk')
      
      let moveX = 0
      let moveZ = 0
      if (forward)  moveZ -= 1
      if (backward) moveZ += 1
      if (left)     moveX -= 1
      if (right)    moveX += 1

      // Normalize diagonal movement speed
      if (moveX !== 0 && moveZ !== 0) {
        const length = Math.sqrt(moveX * moveX + moveZ * moveZ)
        moveX /= length
        moveZ /= length
      }

      const speed = 4.5
      avatarRef.current.position.x += moveX * speed * delta
      avatarRef.current.position.z += moveZ * speed * delta

      // Smooth rotation towards movement direction
      const targetAngle = Math.atan2(moveX, moveZ)
      let diff = targetAngle - avatarRef.current.rotation.y
      diff = Math.atan2(Math.sin(diff), Math.cos(diff)) // Normalize angle diff to -PI to PI
      avatarRef.current.rotation.y += diff * 0.2 // Smooth lerp turning speed
    } else {
      switchAnim('Idle')
    }

    // Clamp to world bounds
    avatarRef.current.position.x = THREE.MathUtils.clamp(avatarRef.current.position.x, -28, 28)
    avatarRef.current.position.z = THREE.MathUtils.clamp(avatarRef.current.position.z, -26, 24)

    // Update store
    setAvatarPos({ x: avatarRef.current.position.x, z: avatarRef.current.position.z })
  })

  return (
    <group ref={avatarRef} position={[0, 0, 0]}>
      <AvatarModel model={model} />
      <pointLight color="#38BDF8" intensity={1.5} distance={6} position={[0, 1.5, 0]} />
    </group>
  )
}

// Preload assets to speed up R3F canvas loading
try {
  useGLTF.preload('/models/avatar.glb')
  useGLTF.preload('/animations/idle.glb')
  useGLTF.preload('/animations/walk.glb')
  useGLTF.preload('/animations/wave.glb')
} catch(e){}
