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

  // Load model and animations safely. They suspend by default, so we wrap them in try/catch if preloading
  let model = null
  let idleAnims = []
  let walkAnims = []
  let waveAnims = []

  try {
    const gltf = useGLTF('/models/avatar.glb')
    model = gltf.scene
  } catch (e) {
    console.warn("Avatar model missing, using placeholder.")
  }

  try {
    const idleG = useGLTF('/animations/idle.glb')
    idleAnims = idleG.animations
  } catch (e) {}

  try {
    const walkG = useGLTF('/animations/walk.glb')
    walkAnims = walkG.animations
  } catch (e) {}

  try {
    const waveG = useGLTF('/animations/wave.glb')
    waveAnims = waveG.animations
  } catch (e) {}

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
    const { forward, backward, left, right } = getKeys()
    const moving = forward || backward || left || right
    const speed  = 4

    if (moving) {
      switchAnim('Walk')
      if (forward)  avatarRef.current.position.z -= speed * delta
      if (backward) avatarRef.current.position.z += speed * delta
      if (left)     avatarRef.current.position.x -= speed * delta
      if (right)    avatarRef.current.position.x += speed * delta

      // Face direction
      if (forward)  avatarRef.current.rotation.y = 0
      if (backward) avatarRef.current.rotation.y = Math.PI
      if (left)     avatarRef.current.rotation.y = Math.PI / 2
      if (right)    avatarRef.current.rotation.y = -Math.PI / 2
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
