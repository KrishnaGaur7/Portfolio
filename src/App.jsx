import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import World from './components/World'
import Avatar from './components/Avatar'
import CameraRig from './components/CameraRig'
import HUD from './components/HUD'
import DetailPanel from './components/DetailPanel'
import LoadingScreen from './components/LoadingScreen'
import { useStore } from './store/useStore'

const CONTROLS = [
  { name: 'forward',  keys: ['w', 'W', 'ArrowUp']    },
  { name: 'backward', keys: ['s', 'S', 'ArrowDown']  },
  { name: 'left',     keys: ['a', 'A', 'ArrowLeft']  },
  { name: 'right',    keys: ['d', 'D', 'ArrowRight'] },
  { name: 'interact', keys: ['e', 'E']               },
]

export default function App() {
  const loading = useStore(s => s.loading)

  return (
    <>
      {loading && <LoadingScreen />}
      <KeyboardControls map={CONTROLS}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          camera={{ position: [0, 4.5, 9], fov: 65, near: 0.1, far: 200 }}
          style={{ width: '100vw', height: '100vh' }}
        >
          <Suspense fallback={null}>
            <Physics gravity={[0, -20, 0]}>
              <World />
              <Avatar />
              <CameraRig />
            </Physics>
          </Suspense>
        </Canvas>
        <HUD />
        <DetailPanel />
      </KeyboardControls>
    </>
  )
}
