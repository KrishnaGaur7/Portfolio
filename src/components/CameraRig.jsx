import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)
const OFFSET = isMobile ? new THREE.Vector3(0, 3.5, 7) : new THREE.Vector3(0, 4.5, 9)

export default function CameraRig() {
  const { camera, scene } = useThree()
  const targetPos = useRef(new THREE.Vector3())

  useFrame(() => {
    const avatar = scene.getObjectByName('avatar')
    if (!avatar) return
    const ap = avatar.position

    targetPos.current.set(ap.x + OFFSET.x, ap.y + OFFSET.y, ap.z + OFFSET.z)
    camera.position.lerp(targetPos.current, 0.06)
    camera.lookAt(ap.x, ap.y + 1.5, ap.z)
  })

  return null
}
