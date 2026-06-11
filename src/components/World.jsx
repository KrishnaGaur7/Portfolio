import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Sky, Stars, Environment, Float, Sparkles } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import Zone from './Zone'
import { ZONES } from '../data/portfolio'

// Zone 3D structures
function AboutStructure() {
  return (
    <group>
      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[1.5, 0.08, 8, 40]} />
        <meshStandardMaterial color="#0EA5E9" emissive="#0EA5E9" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

function SkillsStructure() {
  const floors = [2, 1.7, 1.4, 1.1, 0.8, 0.5, 0.3]
  return (
    <group>
      {floors.map((w, i) => (
        <mesh key={i} position={[0, i * 0.5 + 0.35, 0]}>
          <boxGeometry args={[w * 2, 0.4, w * 2]} />
          <meshStandardMaterial
            color="#22D3EE" emissive="#22D3EE"
            emissiveIntensity={0.1 + i * 0.05}
            roughness={0.4} metalness={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

function ProjectsStructure() {
  const heights = [3, 4.5, 2.5, 5, 3.5, 2, 4]
  const positions = [[-2,-1],[-0.5,1],[1,-1],[2.5,0.5],[-1.5,2],[0.5,-2],[3,-1.5]]
  return (
    <group>
      {heights.map((h, i) => (
        <mesh key={i} position={[positions[i][0], h/2, positions[i][1]]} castShadow>
          <boxGeometry args={[1.2, h, 1.2]} />
          <meshStandardMaterial color="#818CF8" emissive="#818CF8" emissiveIntensity={0.15} roughness={0.3} metalness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

function CertsStructure() {
  return (
    <group>
      {[0,1,2,3].map(i => (
        <mesh key={i} position={[Math.cos(i * Math.PI/2) * 2.5, 1.2, Math.sin(i * Math.PI/2) * 2.5]}>
          <boxGeometry args={[1.5, 2, 0.1]} />
          <meshStandardMaterial color="#34D399" emissive="#34D399" emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function ExperienceStructure() {
  return (
    <group>
      {[-2, 0, 2].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
            <meshStandardMaterial color="#F472B6" emissive="#F472B6" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0, 1.3, 0]}>
            <sphereGeometry args={[0.25, 12, 12]} />
            <meshStandardMaterial color="#F472B6" emissive="#F472B6" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[6, 0.1, 0.8]} />
        <meshStandardMaterial color="#831843" />
      </mesh>
    </group>
  )
}

function ContactStructure() {
  return (
    <group>
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 5, 8]} />
        <meshStandardMaterial color="#FBBF24" emissive="#FBBF24" emissiveIntensity={0.6} />
      </mesh>
      {[0.5, 1, 1.5].map((y, i) => (
        <mesh key={i} position={[0, y + 2.5, 0]}>
          <boxGeometry args={[2.5 - i * 0.5, 0.08, 0.05]} />
          <meshStandardMaterial color="#FBBF24" emissive="#FBBF24" emissiveIntensity={0.8} />
        </mesh>
      ))}
      <Sparkles count={30} scale={4} size={2} speed={0.4} color="#FBBF24" position={[0, 1, 0]} />
    </group>
  )
}

const ZONE_STRUCTURES = {
  about:    <AboutStructure />,
  skills:   <SkillsStructure />,
  projects: <ProjectsStructure />,
  certs:    <CertsStructure />,
  exp:      <ExperienceStructure />,
  contact:  <ContactStructure />,
}

// Trees
function Tree({ position }) {
  return (
    <Float speed={0.5} rotationIntensity={0} floatIntensity={0.3}>
      <group position={position}>
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 1.5, 6]} />
          <meshStandardMaterial color="#4A3728" />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <coneGeometry args={[0.7, 1.8, 7]} />
          <meshStandardMaterial color="#064E3B" />
        </mesh>
        <mesh position={[0, 3.2, 0]}>
          <coneGeometry args={[0.5, 1.4, 7]} />
          <meshStandardMaterial color="#065F46" />
        </mesh>
      </group>
    </Float>
  )
}

const TREE_POSITIONS = [
  [6,-6],[-6,6],[8,8],[-8,-8],[10,-4],[-10,4],[4,-20],[-4,20],[12,12],[-12,-12]
].map(([x,z]) => [x, 0, z])

export default function World() {
  const { scene } = useThree()

  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x020C1A, 0.04)
  }, [])

  return (
    <>
      <Sky sunPosition={[100, 10, 100]} turbidity={10} rayleigh={0.5} />
      <Stars radius={100} depth={50} count={3000} factor={4} fade />
      <Environment preset="night" />
      <ambientLight intensity={0.4} />
      <directionalLight castShadow position={[10, 20, 10]} intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-30} shadow-camera-right={30}
        shadow-camera-top={30} shadow-camera-bottom={-30}
      />

      {/* Ground */}
      <RigidBody type="fixed">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[120, 120]} />
          <meshStandardMaterial color="#0A1628" roughness={0.9} />
        </mesh>
      </RigidBody>
      <gridHelper args={[120, 60, "#0E2A47", "#0E2A47"]} position={[0, 0.01, 0]} />

      {/* Spawn monogram */}
      <Float speed={1} floatIntensity={0.5}>
        <mesh position={[0, 3, 0]}>
          <torusGeometry args={[0.8, 0.05, 8, 30]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={1} />
        </mesh>
      </Float>
      <pointLight color="#38BDF8" intensity={2} distance={8} position={[0, 2, 0]} />

      {/* Paths */}
      {ZONES.map(z => {
        const [tx,,tz] = z.position
        const dx = tx, dz = tz
        const len = Math.sqrt(dx*dx + dz*dz)
        const angle = Math.atan2(dx, dz)
        return (
          <mesh key={z.id} position={[tx/2, 0.04, tz/2]} rotation={[0, angle, 0]}>
            <boxGeometry args={[1.2, 0.06, len]} />
            <meshStandardMaterial color="#0F3460" emissive="#0F3460" emissiveIntensity={0.5} />
          </mesh>
        )
      })}

      {/* Trees */}
      {TREE_POSITIONS.map((pos,i) => (
        <Tree key={i} position={pos} />
      ))}

      {/* Zones */}
      {ZONES.map(z => (
        <Zone key={z.id} {...z}>
          {ZONE_STRUCTURES[z.id]}
        </Zone>
      ))}
    </>
  )
}
