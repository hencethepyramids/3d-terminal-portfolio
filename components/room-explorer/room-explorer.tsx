"use client"

import { useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { motion } from "framer-motion"

interface RoomExplorerProps {
  onClose: () => void
}

function RoomScene() {
  const { camera } = useThree()

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 1.7, 0)
    camera.lookAt(0, 1.7, -1)
  }, [camera])

  return (
    <>
      {/* Enhanced lighting setup */}
      <directionalLight
        position={[2, 4, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <spotLight position={[-3, 3, 2]} intensity={1} angle={0.5} castShadow color="#b8ceff" />
      <pointLight position={[0, 1, 2]} intensity={0.8} color="#ffeed9" />
      <ambientLight intensity={0.6} />

      {/* Room environment - Office/Bedroom */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Floor baseboards */}
      {[
        { pos: [0, -0.55, -7.45], rot: [0, 0, 0], size: [15, 0.1, 0.1] },
        { pos: [0, -0.55, 7.45], rot: [0, 0, 0], size: [15, 0.1, 0.1] },
        { pos: [-7.45, -0.55, 0], rot: [0, Math.PI / 2, 0], size: [15, 0.1, 0.1] },
        { pos: [7.45, -0.55, 0], rot: [0, Math.PI / 2, 0], size: [15, 0.1, 0.1] },
      ].map((board, i) => (
        <mesh key={`baseboard-${i}`} position={board.pos} rotation={board.rot} receiveShadow>
          <boxGeometry args={board.size} />
          <meshStandardMaterial color="#5D4037" roughness={0.7} />
        </mesh>
      ))}

      {/* Back wall */}
      <mesh position={[0, 1.5, -3]} receiveShadow>
        <boxGeometry args={[15, 6, 0.1]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-7.45, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 6, 0.1]} />
        <meshStandardMaterial color="#d8d8d8" roughness={0.9} />
      </mesh>

      {/* Right wall */}
      <mesh position={[7.45, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 6, 0.1]} />
        <meshStandardMaterial color="#d8d8d8" roughness={0.9} />
      </mesh>

      {/* Front wall (added to prevent seeing void when turning around) */}
      <mesh position={[0, 1.5, 7]} receiveShadow>
        <boxGeometry args={[15, 6, 0.1]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 4.5, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 10]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
      </mesh>

      {/* Enhanced Window on back wall */}
      <group position={[3, 2, -2.95]}>
        {/* Window frame outer */}
        <mesh>
          <boxGeometry args={[2.4, 2.9, 0.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>

        {/* Window frame inner */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[2, 2.5, 0.2]} />
          <meshStandardMaterial color="#87CEEB" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Window panes - horizontal dividers */}
        {[-0.65, 0, 0.65].map((y, i) => (
          <mesh key={`h-divider-${i}`} position={[0, y, 0.06]}>
            <boxGeometry args={[2, 0.05, 0.1]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
          </mesh>
        ))}

        {/* Window panes - vertical dividers */}
        {[-0.65, 0, 0.65].map((x, i) => (
          <mesh key={`v-divider-${i}`} position={[x, 0, 0.06]}>
            <boxGeometry args={[0.05, 2.5, 0.1]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
          </mesh>
        ))}

        {/* Window sill */}
        <mesh position={[0, -1.35, 0.3]}>
          <boxGeometry args={[2.6, 0.1, 0.4]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>

        {/* Curtain rod */}
        <mesh position={[0, 1.5, 0.3]}>
          <cylinderGeometry args={[0.03, 0.03, 3, 8]} rotation={[0, Math.PI / 2, 0]} />
          <meshStandardMaterial color="#5D4037" roughness={0.7} />
        </mesh>

        {/* Curtain rod ends */}
        {[-1.5, 1.5].map((x, i) => (
          <mesh key={`rod-end-${i}`} position={[x, 1.5, 0.3]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#5D4037" roughness={0.7} />
          </mesh>
        ))}

        {/* Curtains */}
        {[-1.1, 1.1].map((x, i) => (
          <mesh key={`curtain-${i}`} position={[x, 0.3, 0.25]}>
            <planeGeometry args={[0.8, 2.4]} />
            <meshStandardMaterial color="#B39DDB" roughness={0.8} transparent opacity={0.9} side={2} />
          </mesh>
        ))}

        {/* Sky and clouds visible through window */}
        {[
          { pos: [-0.65, 0.65, 0.01], size: [0.6, 0.6] },
          { pos: [0, 0.65, 0.01], size: [0.6, 0.6] },
          { pos: [0.65, 0.65, 0.01], size: [0.6, 0.6] },
          { pos: [-0.65, 0, 0.01], size: [0.6, 0.6] },
          { pos: [0, 0, 0.01], size: [0.6, 0.6] },
          { pos: [0.65, 0, 0.01], size: [0.6, 0.6] },
          { pos: [-0.65, -0.65, 0.01], size: [0.6, 0.6] },
          { pos: [0, -0.65, 0.01], size: [0.6, 0.6] },
          { pos: [0.65, -0.65, 0.01], size: [0.6, 0.6] },
        ].map((pane, i) => (
          <mesh key={`sky-${i}`} position={pane.pos}>
            <planeGeometry args={pane.size} />
            <meshStandardMaterial color="#64B5F6" roughness={0.3} />
          </mesh>
        ))}

        {/* Clouds */}
        {[
          { pos: [-0.4, 0.8, 0.02], size: 0.15, color: "#ffffff" },
          { pos: [0.3, 0.7, 0.02], size: 0.2, color: "#ffffff" },
          { pos: [-0.2, 0.3, 0.02], size: 0.12, color: "#ffffff" },
          { pos: [0.5, 0.2, 0.02], size: 0.18, color: "#ffffff" },
          { pos: [-0.5, -0.2, 0.02], size: 0.14, color: "#ffffff" },
          { pos: [0.1, -0.4, 0.02], size: 0.16, color: "#ffffff" },
        ].map((cloud, i) => (
          <mesh key={`cloud-${i}`} position={cloud.pos}>
            <sphereGeometry args={[cloud.size, 8, 8]} />
            <meshStandardMaterial color={cloud.color} roughness={0.9} transparent opacity={0.9} />
          </mesh>
        ))}

        {/* Window light effect */}
        <pointLight position={[0, 0, 1]} intensity={0.5} color="#87CEEB" distance={5} decay={2} />
      </group>

      {/* Bookshelf on left wall - enhanced */}
      <group position={[-6.5, 0.5, -1]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 2, 0.4]} />
          <meshStandardMaterial color="#5d4037" roughness={0.8} />
        </mesh>

        {/* Shelves */}
        {[0.3, 0.7, 1.1, 1.5].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.05, 0.4]} />
            <meshStandardMaterial color="#8d6e63" roughness={0.8} />
          </mesh>
        ))}

        {/* Books on shelves - different colors and sizes */}
        {[
          { pos: [-0.3, 0.15, 0], size: [0.3, 0.2, 0.3], color: "#f44336" },
          { pos: [0, 0.15, 0], size: [0.3, 0.25, 0.3], color: "#2196f3" },
          { pos: [0.3, 0.15, 0], size: [0.3, 0.22, 0.3], color: "#4caf50" },
          { pos: [-0.25, 0.55, 0], size: [0.4, 0.2, 0.3], color: "#ff9800" },
          { pos: [0.2, 0.55, 0], size: [0.3, 0.18, 0.3], color: "#9c27b0" },
          { pos: [-0.3, 0.95, 0], size: [0.3, 0.23, 0.3], color: "#607d8b" },
          { pos: [0, 0.95, 0], size: [0.3, 0.21, 0.3], color: "#795548" },
          { pos: [0.3, 0.95, 0], size: [0.3, 0.19, 0.3], color: "#009688" },
          { pos: [-0.2, 1.35, 0], size: [0.5, 0.22, 0.3], color: "#673ab7" },
          { pos: [0.25, 1.35, 0], size: [0.3, 0.24, 0.3], color: "#ffeb3b" },
        ].map((book, i) => (
          <mesh key={`book-${i}`} position={book.pos} castShadow>
            <boxGeometry args={book.size} />
            <meshStandardMaterial color={book.color} roughness={0.7} />
          </mesh>
        ))}

        {/* Bookends and decorative items */}
        <mesh position={[-0.4, 0.15, 0.15]} castShadow>
          <boxGeometry args={[0.05, 0.2, 0.1]} />
          <meshStandardMaterial color="#212121" roughness={0.5} />
        </mesh>
        <mesh position={[0.4, 0.95, 0.15]} castShadow>
          <boxGeometry args={[0.05, 0.2, 0.1]} />
          <meshStandardMaterial color="#212121" roughness={0.5} />
        </mesh>
        <mesh position={[0.35, 1.35, 0.15]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#e91e63" roughness={0.6} />
        </mesh>
        <mesh position={[-0.35, 0.55, 0.15]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.15, 8]} />
          <meshStandardMaterial color="#ffc107" roughness={0.6} />
        </mesh>
      </group>

      {/* Poster on back wall - enhanced with frame */}
      <group position={[-3, 2, -2.95]}>
        {/* Poster frame */}
        <mesh>
          <boxGeometry args={[1.6, 2.1, 0.05]} />
          <meshStandardMaterial color="#212121" roughness={0.5} />
        </mesh>

        {/* Poster image */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.5, 2]} />
          <meshStandardMaterial color="#333333" roughness={0.7} />
        </mesh>

        {/* Poster content - abstract design */}
        <mesh position={[0, 0.5, 0.031]}>
          <circleGeometry args={[0.3, 32]} />
          <meshStandardMaterial color="#f44336" roughness={0.7} />
        </mesh>
        <mesh position={[0.3, -0.2, 0.031]}>
          <boxGeometry args={[0.4, 0.4, 0.01]} />
          <meshStandardMaterial color="#2196f3" roughness={0.7} />
        </mesh>
        <mesh position={[-0.3, -0.4, 0.031]}>
          <planeGeometry args={[0.5, 0.2]} />
          <meshStandardMaterial color="#4caf50" roughness={0.7} />
        </mesh>
        <mesh position={[-0.2, 0.2, 0.031]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshStandardMaterial color="#ffeb3b" roughness={0.7} />
        </mesh>
      </group>

      {/* Bed on right side - enhanced with more details */}
      <group position={[5, -0.3, 0]}>
        {/* Bed frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 0.3, 2]} />
          <meshStandardMaterial color="#5d4037" roughness={0.8} />
        </mesh>

        {/* Bed headboard */}
        <mesh position={[1.4, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 1.2, 2]} />
          <meshStandardMaterial color="#5d4037" roughness={0.8} />
        </mesh>

        {/* Mattress */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.2, 1.8]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.7} />
        </mesh>

        {/* Pillows */}
        <mesh position={[1, 0.4, 0.4]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.15, 0.6]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
        <mesh position={[1, 0.4, -0.4]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.15, 0.6]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>

        {/* Blanket with wrinkles */}
        <mesh position={[-0.2, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.05, 1.7]} />
          <meshStandardMaterial color="#3f51b5" roughness={0.6} />
        </mesh>

        {/* Blanket wrinkles */}
        {[
          { pos: [-0.5, 0.43, 0.4], size: [1, 0.02, 0.3], rot: [0.1, 0, 0.05] },
          { pos: [0.2, 0.44, -0.3], size: [0.8, 0.02, 0.4], rot: [0.05, 0.1, -0.05] },
          { pos: [-0.8, 0.42, 0], size: [0.5, 0.02, 0.6], rot: [-0.05, 0, 0.1] },
        ].map((wrinkle, i) => (
          <mesh key={`wrinkle-${i}`} position={wrinkle.pos} rotation={wrinkle.rot} castShadow>
            <boxGeometry args={wrinkle.size} />
            <meshStandardMaterial color="#303f9f" roughness={0.6} />
          </mesh>
        ))}

        {/* Bedside table */}
        <group position={[1.8, -0.15, -1.2]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.6, 0.8]} />
            <meshStandardMaterial color="#5d4037" roughness={0.8} />
          </mesh>

          {/* Table drawer */}
          <mesh position={[0, 0, 0.05]} castShadow>
            <boxGeometry args={[0.7, 0.2, 0.05]} />
            <meshStandardMaterial color="#4d3427" roughness={0.8} />
          </mesh>

          {/* Drawer handle */}
          <mesh position={[0, 0, 0.43]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#bdbdbd" roughness={0.5} metalness={0.5} />
          </mesh>

          {/* Lamp on bedside table */}
          <group position={[0, 0.35, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.1, 0.15, 0.05, 16]} />
              <meshStandardMaterial color="#616161" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
              <meshStandardMaterial color="#9e9e9e" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.4, 0]} castShadow>
              <coneGeometry args={[0.15, 0.2, 16, 1, true]} />
              <meshStandardMaterial color="#e0e0e0" roughness={0.5} side={2} />
            </mesh>
            <pointLight position={[0, 0.4, 0]} intensity={0.5} color="#fff9c4" distance={2} decay={2} />
          </group>
        </group>
      </group>

      {/* Small rug under desk */}
      <mesh position={[0, -0.59, -1.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#546e7a" roughness={0.9} />
      </mesh>

      {/* Rug pattern */}
      {[
        { pos: [0, -0.585, -1.5], size: [3.8, 0.01, 2.8], color: "#455a64" },
        { pos: [0, -0.583, -1.5], size: [3.5, 0.01, 2.5], color: "#37474f" },
      ].map((pattern, i) => (
        <mesh key={`rug-pattern-${i}`} position={pattern.pos} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[pattern.size[0], pattern.size[2]]} />
          <meshStandardMaterial color={pattern.color} roughness={0.9} />
        </mesh>
      ))}

      {/* Desk lamp light effect - soft glow on the wall */}
      <pointLight position={[0.9, 0.5, -2.7]} intensity={0.5} color="#ffeed9" distance={3} decay={2} />

      {/* Computer setup - RAISED TO PROPER HEIGHT */}
      <group position={[0, 0.35, -2.5]}>
        {/* Desk */}
        <mesh position={[0, -0.1, 0]} receiveShadow>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color="#3a2618" roughness={0.7} metalness={0.1} />
        </mesh>

        {/* Desk legs */}
        {[
          { pos: [-1.4, -0.35, -0.65], size: [0.1, 0.7, 0.1] },
          { pos: [1.4, -0.35, -0.65], size: [0.1, 0.7, 0.1] },
          { pos: [-1.4, -0.35, 0.65], size: [0.1, 0.7, 0.1] },
          { pos: [1.4, -0.35, 0.65], size: [0.1, 0.7, 0.1] },
        ].map((leg, i) => (
          <mesh key={`desk-leg-${i}`} position={leg.pos} castShadow>
            <boxGeometry args={leg.size} />
            <meshStandardMaterial color="#2a1a10" roughness={0.8} />
          </mesh>
        ))}

        {/* Desk mat */}
        <mesh position={[0, -0.04, 0.2]} receiveShadow>
          <boxGeometry args={[1.8, 0.02, 0.8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>

        {/* Computer tower - FIXED POSITION to avoid intersection with plant */}
        <group position={[-1.2, 0.3, -0.2]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.8, 0.6]} />
            <meshStandardMaterial color="#222222" roughness={0.8} />
          </mesh>

          {/* Power button */}
          <mesh position={[0.201, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
            <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
          </mesh>

          {/* Front panel details */}
          <mesh position={[0.201, 0.1, 0]} castShadow>
            <boxGeometry args={[0.01, 0.2, 0.3]} />
            <meshStandardMaterial color="#111111" />
          </mesh>

          {/* USB ports */}
          <mesh position={[0.201, 0.1, 0.1]} castShadow>
            <boxGeometry args={[0.01, 0.02, 0.05]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[0.201, 0.1, 0.05]} castShadow>
            <boxGeometry args={[0.01, 0.02, 0.05]} />
            <meshStandardMaterial color="#333333" />
          </mesh>

          {/* Ventilation grills */}
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} position={[-0.201, 0.1 - 0.1 + i * 0.05, 0]} castShadow>
              <boxGeometry args={[0.01, 0.02, 0.3]} />
              <meshStandardMaterial color="#111111" />
            </mesh>
          ))}
        </group>

        {/* Monitor stand */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.15, 0.1, 16]} />
          <meshStandardMaterial color="#111111" roughness={0.7} />
        </mesh>

        {/* Monitor stand base */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.05, 16]} />
          <meshStandardMaterial color="#222222" roughness={0.7} />
        </mesh>

        {/* Monitor */}
        <group position={[0, 0.6, 0]}>
          {/* Monitor frame */}
          <mesh castShadow>
            <boxGeometry args={[1.2, 0.8, 0.08]} />
            <meshStandardMaterial color="#111111" roughness={0.8} />
          </mesh>

          {/* Screen */}
          <group position={[0, 0, 0.04]}>
            {/* Base screen */}
            <mesh>
              <planeGeometry args={[1.1, 0.7]} />
              <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Login screen */}
            <>
              {/* Background */}
              <mesh position={[0, 0, 0.001]}>
                <planeGeometry args={[1.1, 0.7]} />
                <meshBasicMaterial color="#1a1a2e" />
              </mesh>

              {/* Login box */}
              <mesh position={[0, 0, 0.002]}>
                <planeGeometry args={[0.5, 0.4]} />
                <meshBasicMaterial color="#222639" />
              </mesh>

              {/* User avatar circle */}
              <mesh position={[0, 0.1, 0.003]}>
                <circleGeometry args={[0.08, 32]} />
                <meshBasicMaterial color="#333a5e" />
              </mesh>

              {/* User icon (simplified) */}
              <mesh position={[0, 0.1, 0.004]}>
                <circleGeometry args={[0.05, 32]} />
                <meshBasicMaterial color="#ffffff" opacity={0.7} transparent />
              </mesh>

              {/* Username field */}
              <mesh position={[0, -0.05, 0.003]}>
                <planeGeometry args={[0.3, 0.05]} />
                <meshBasicMaterial color="#2a3050" />
              </mesh>

              {/* Password field */}
              <mesh position={[0, -0.12, 0.003]}>
                <planeGeometry args={[0.3, 0.05]} />
                <meshBasicMaterial color="#2a3050" />
              </mesh>

              {/* Login button */}
              <mesh position={[0, -0.2, 0.003]}>
                <planeGeometry args={[0.2, 0.05]} />
                <meshBasicMaterial color="#4a5568" />
              </mesh>
            </>

            {/* Screen reflection */}
            <mesh position={[0, 0, 0.005]}>
              <planeGeometry args={[1.1, 0.7]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transparent
                opacity={0.05}
                roughness={0.2}
                metalness={0.8}
                clearcoat={1}
              />
            </mesh>
          </group>

          {/* Monitor details */}
          <mesh position={[0, -0.37, 0.04]} castShadow>
            <boxGeometry args={[0.2, 0.03, 0.01]} />
            <meshStandardMaterial color="#333333" />
          </mesh>

          {/* Power indicator */}
          <mesh position={[0.55, -0.37, 0.04]} castShadow>
            <sphereGeometry args={[0.01, 16, 16]} />
            <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
          </mesh>
        </group>

        {/* Keyboard */}
        <group position={[0, 0, 0.4]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.05, 0.3]} />
            <meshStandardMaterial color="#111111" roughness={0.7} />
          </mesh>

          {/* Key rows */}
          {Array.from({ length: 4 }).map((_, row) => (
            <group key={`row-${row}`} position={[0, 0.03, -0.08 + row * 0.08]}>
              {Array.from({ length: 10 }).map((_, col) => (
                <mesh key={`key-${row}-${col}`} position={[-0.35 + col * 0.08, 0, 0]} castShadow>
                  <boxGeometry args={[0.06, 0.02, 0.06]} />
                  <meshStandardMaterial color="#222222" roughness={0.9} />
                </mesh>
              ))}
            </group>
          ))}

          {/* Space bar */}
          <mesh position={[0, 0.03, 0.1]} castShadow>
            <boxGeometry args={[0.3, 0.02, 0.06]} />
            <meshStandardMaterial color="#222222" roughness={0.9} />
          </mesh>
        </group>

        {/* Mouse */}
        <group position={[0.6, 0, 0.4]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.04, 0.1, 8, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#111111" roughness={0.7} />
          </mesh>

          {/* Mouse buttons */}
          <group position={[0, 0.04, -0.03]}>
            <mesh castShadow>
              <boxGeometry args={[0.04, 0.01, 0.04]} />
              <meshStandardMaterial color="#222222" roughness={0.9} />
            </mesh>
          </group>
          <group position={[0, 0.04, 0.03]}>
            <mesh castShadow>
              <boxGeometry args={[0.04, 0.01, 0.04]} />
              <meshStandardMaterial color="#222222" roughness={0.9} />
            </mesh>
          </group>
        </group>

        {/* Coffee mug */}
        <group position={[-0.6, 0, 0.3]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.04, 0.1, 16]} />
            <meshStandardMaterial color="#dddddd" roughness={0.5} />
          </mesh>

          {/* Coffee */}
          <mesh position={[0, 0.03, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.05, 16]} />
            <meshStandardMaterial color="#3c2415" roughness={0.3} />
          </mesh>

          {/* Handle */}
          <mesh position={[0.07, 0, 0]} castShadow>
            <torusGeometry args={[0.03, 0.01, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#dddddd" roughness={0.5} />
          </mesh>
        </group>

        {/* Notebook */}
        <group position={[0.7, 0, 0]} rotation={[0, Math.PI * 0.15, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.3, 0.02, 0.4]} />
            <meshStandardMaterial color="#2c4f7c" roughness={0.8} />
          </mesh>

          {/* Pages */}
          <mesh position={[0, 0.015, 0]} castShadow>
            <boxGeometry args={[0.28, 0.01, 0.38]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
          </mesh>

          {/* Notebook lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={`line-${i}`} position={[0, 0.021, -0.15 + i * 0.05]} castShadow>
              <boxGeometry args={[0.25, 0.001, 0.005]} />
              <meshStandardMaterial color="#90caf9" roughness={0.5} />
            </mesh>
          ))}

          {/* Pen on notebook */}
          <mesh position={[0.1, 0.025, 0]} rotation={[0, Math.PI * 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.005, 0.005, 0.15, 8]} />
            <meshStandardMaterial color="#1a237e" roughness={0.5} />
          </mesh>
          <mesh position={[0.16, 0.025, 0.02]} rotation={[0, Math.PI * 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.005, 0.002, 0.02, 8]} />
            <meshStandardMaterial color="#f44336" roughness={0.5} />
          </mesh>
        </group>

        {/* Smartphone */}
        <group position={[-0.3, 0, 0.3]} rotation={[0, Math.PI * 0.1, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.01, 0.16]} />
            <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.6} />
          </mesh>

          {/* Screen */}
          <mesh position={[0, 0.006, 0]} castShadow>
            <boxGeometry args={[0.07, 0.001, 0.14]} />
            <meshStandardMaterial color="#1a1a2e" emissive="#1a1a2e" emissiveIntensity={0.5} roughness={0.2} />
          </mesh>

          {/* Phone camera */}
          <mesh position={[0.025, 0.006, -0.05]} castShadow>
            <cylinderGeometry args={[0.005, 0.005, 0.002, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Phone button */}
          <mesh position={[0, 0, 0.075]} castShadow>
            <boxGeometry args={[0.02, 0.002, 0.01]} />
            <meshStandardMaterial color="#333333" roughness={0.5} />
          </mesh>
        </group>

        {/* Plant - FIXED POSITION to avoid intersection with computer tower */}
        <group position={[-0.7, 0, -0.2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.06, 0.12, 16]} />
            <meshStandardMaterial color="#964B00" roughness={0.9} />
          </mesh>

          {/* Plant leaves */}
          {Array.from({ length: 5 }).map((_, i) => (
            <group key={`plant-${i}`} position={[0, 0.06, 0]} rotation={[0, (Math.PI * 2 * i) / 5, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.08, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                <meshStandardMaterial color="#2e8b57" roughness={0.8} side={2} />
              </mesh>
            </group>
          ))}

          {/* Soil */}
          <mesh position={[0, 0.01, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
            <meshStandardMaterial color="#3e2723" roughness={0.9} />
          </mesh>
        </group>

        {/* Desk lamp */}
        <group position={[0.9, 0, -0.2]}>
          {/* Base */}
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.05, 16]} />
            <meshStandardMaterial color="#444444" roughness={0.7} metalness={0.3} />
          </mesh>

          {/* Arm */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color="#444444" roughness={0.7} metalness={0.3} />
          </mesh>

          {/* Lamp head */}
          <group position={[0, 0.3, 0.1]} rotation={[-Math.PI * 0.25, 0, 0]}>
            <mesh castShadow>
              <coneGeometry args={[0.08, 0.15, 16]} />
              <meshStandardMaterial color="#444444" roughness={0.7} metalness={0.3} />
            </mesh>

            {/* Light bulb */}
            <pointLight position={[0, -0.05, 0]} intensity={1} color="#ffeed9" distance={2} decay={2} />

            <mesh position={[0, -0.05, 0]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#ffeed9" emissive="#ffeed9" emissiveIntensity={2} />
            </mesh>
          </group>
        </group>

        {/* Headphones */}
        <group position={[1.1, 0, 0.2]}>
          {/* Headband */}
          <mesh castShadow>
            <torusGeometry args={[0.1, 0.01, 16, 32, Math.PI]} rotation={[0, Math.PI / 2, 0]} />
            <meshStandardMaterial color="#212121" roughness={0.7} />
          </mesh>

          {/* Ear cups */}
          <mesh position={[0, -0.1, 0.1]} castShadow>
            <sphereGeometry args={[0.05, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial color="#212121" roughness={0.7} side={2} />
          </mesh>
          <mesh position={[0, -0.1, -0.1]} castShadow>
            <sphereGeometry args={[0.05, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial color="#212121" roughness={0.7} side={2} />
          </mesh>

          {/* Ear pads */}
          <mesh position={[0, -0.1, 0.1]} castShadow>
            <torusGeometry args={[0.04, 0.015, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#424242" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.1, -0.1]} castShadow>
            <torusGeometry args={[0.04, 0.015, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#424242" roughness={0.8} />
          </mesh>

          {/* Cable */}
          <mesh position={[0, -0.1, 0.1]} castShadow>
            <cylinderGeometry args={[0.005, 0.005, 0.2, 8]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#000000" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* Properly designed chair - moved back to not block the desk */}
      <group position={[0, -0.05, -1.2]} rotation={[0, Math.PI, 0]}>
        {/* Seat */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.1, 0.6]} />
          <meshStandardMaterial color="#212121" roughness={0.8} />
        </mesh>

        {/* Seat cushion */}
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.02, 0.55]} />
          <meshStandardMaterial color="#424242" roughness={0.9} />
        </mesh>

        {/* Back */}
        <mesh position={[0, 0.4, -0.25]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.7, 0.1]} />
          <meshStandardMaterial color="#212121" roughness={0.8} />
        </mesh>

        {/* Back cushion */}
        <mesh position={[0, 0.4, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.65, 0.02]} />
          <meshStandardMaterial color="#424242" roughness={0.9} />
        </mesh>

        {/* Center pole */}
        <mesh position={[0, -0.25, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#424242" roughness={0.5} metalness={0.5} />
        </mesh>

        {/* Base with wheels */}
        <mesh position={[0, -0.45, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
          <meshStandardMaterial color="#424242" roughness={0.5} metalness={0.5} />
        </mesh>

        {/* Wheels */}
        {Array.from({ length: 5 }).map((_, i) => (
          <group key={`wheel-${i}`} position={[0, -0.45, 0]} rotation={[0, (Math.PI * 2 * i) / 5, 0]}>
            <mesh position={[0.25, -0.05, 0]} castShadow>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#212121" roughness={0.7} />
            </mesh>
          </group>
        ))}

        {/* Armrests */}
        <mesh position={[0.35, 0.2, 0]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#212121" roughness={0.8} />
        </mesh>
        <mesh position={[-0.35, 0.2, 0]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#212121" roughness={0.8} />
        </mesh>

        {/* Armrest pads */}
        <mesh position={[0.35, 0.4, 0]} castShadow>
          <boxGeometry args={[0.12, 0.02, 0.2]} />
          <meshStandardMaterial color="#424242" roughness={0.9} />
        </mesh>
        <mesh position={[-0.35, 0.4, 0]} castShadow>
          <boxGeometry args={[0.12, 0.02, 0.2]} />
          <meshStandardMaterial color="#424242" roughness={0.9} />
        </mesh>
      </group>

      {/* Wall-mounted shelf with items */}
      <group position={[-2, 2, -2.9]}>
        {/* Shelf */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 0.1, 0.3]} />
          <meshStandardMaterial color="#8d6e63" roughness={0.8} />
        </mesh>

        {/* Shelf brackets */}
        <mesh position={[-0.8, -0.1, 0.1]} castShadow>
          <boxGeometry args={[0.1, 0.2, 0.05]} />
          <meshStandardMaterial color="#5d4037" roughness={0.7} />
        </mesh>
        <mesh position={[0.8, -0.1, 0.1]} castShadow>
          <boxGeometry args={[0.1, 0.2, 0.05]} />
          <meshStandardMaterial color="#5d4037" roughness={0.7} />
        </mesh>

        {/* Items on shelf */}
        <mesh position={[-0.7, 0.15, 0]} castShadow>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#e91e63" roughness={0.7} />
        </mesh>
        <mesh position={[-0.3, 0.25, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#4caf50" roughness={0.7} />
        </mesh>
        <mesh position={[0.2, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
          <meshStandardMaterial color="#2196f3" roughness={0.7} />
        </mesh>
        <mesh position={[0.7, 0.15, 0]} castShadow>
          <coneGeometry args={[0.1, 0.3, 16]} />
          <meshStandardMaterial color="#ff9800" roughness={0.7} />
        </mesh>
      </group>

      {/* Ceiling light */}
      <group position={[0, 4.4, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.3, 0.1, 16]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.1, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#bdbdbd" roughness={0.5} />
        </mesh>
        <pointLight position={[0, -0.5, 0]} intensity={0.8} color="#fff" distance={10} decay={2} />
      </group>

      {/* Wall decorations */}
      {/* Clock on wall */}
      <group position={[-5, 2, -1]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.03]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.01, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>

        {/* Clock hands */}
        <mesh position={[0, 0, 0.04]} rotation={[0, 0, Math.PI / 6]} castShadow>
          <boxGeometry args={[0.01, 0.15, 0.01]} />
          <meshStandardMaterial color="#000000" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.04]} rotation={[0, 0, Math.PI / 1.5]} castShadow>
          <boxGeometry args={[0.01, 0.2, 0.01]} />
          <meshStandardMaterial color="#000000" roughness={0.5} />
        </mesh>

        {/* Clock center */}
        <mesh position={[0, 0, 0.05]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.02, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#f44336" roughness={0.5} />
        </mesh>

        {/* Clock numbers */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh
            key={`num-${i}`}
            position={[Math.sin((i * Math.PI) / 6) * 0.25, Math.cos((i * Math.PI) / 6) * 0.25, 0.04]}
            castShadow
          >
            <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#212121" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Picture frames on wall */}
      <group position={[5, 2, -2.95]}>
        {/* Frame 1 */}
        <mesh position={[-1, 0.5, 0]}>
          <boxGeometry args={[0.8, 1, 0.05]} />
          <meshStandardMaterial color="#5d4037" roughness={0.7} />
        </mesh>
        <mesh position={[-1, 0.5, 0.03]}>
          <planeGeometry args={[0.7, 0.9]} />
          <meshStandardMaterial color="#bbdefb" roughness={0.5} />
        </mesh>

        {/* Frame 2 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.05]} />
          <meshStandardMaterial color="#5d4037" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[0.7, 0.7]} />
          <meshStandardMaterial color="#ffccbc" roughness={0.5} />
        </mesh>

        {/* Frame 3 */}
        <mesh position={[1, 0.3, 0]}>
          <boxGeometry args={[0.6, 1.2, 0.05]} />
          <meshStandardMaterial color="#5d4037" roughness={0.7} />
        </mesh>
        <mesh position={[1, 0.3, 0.03]}>
          <planeGeometry args={[0.5, 1.1]} />
          <meshStandardMaterial color="#c8e6c9" roughness={0.5} />
        </mesh>
      </group>

      {/* Area rug in center of room */}
      <mesh position={[0, -0.59, 2.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#b39ddb" roughness={0.9} />
      </mesh>

      {/* Rug pattern */}
      <mesh position={[0, -0.585, 2.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5.8, 3.8]} />
        <meshStandardMaterial color="#9575cd" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.583, 2.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5.5, 3.5]} />
        <meshStandardMaterial color="#7e57c2" roughness={0.9} />
      </mesh>
    </>
  )
}

export default function RoomExplorer({ onClose }: RoomExplorerProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <Canvas shadows>
        <color attach="background" args={["#050505"]} />
        <RoomScene />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI * 0.1}
          maxPolarAngle={Math.PI * 0.9}
          // Add touch-specific settings
          rotateSpeed={0.7}
          zoomSpeed={0.7}
          touchRotateSpeed={0.4}
          touchZoomSpeed={0.4}
        />
        <fog attach="fog" args={["#050505", 1, 15]} />
      </Canvas>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onClose}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition-colors"
        >
          Return to Terminal
        </motion.button>
      </div>

      <div className="absolute top-4 left-4 text-green-500 bg-black/50 p-2 rounded">
        <p className="hidden md:block">Use mouse to look around</p>
        <p className="hidden md:block">Scroll to zoom in/out</p>
        <p className="block md:hidden">Use one finger to rotate</p>
        <p className="block md:hidden">Pinch to zoom in/out</p>
      </div>
    </div>
  )
}
