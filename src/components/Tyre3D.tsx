import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

function TyreRealastic() {
  const group = useRef<THREE.Group>(null);
  const innerGroup = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.3;
    }
    if (innerGroup.current) {
      innerGroup.current.rotation.y += delta * 0.3;
    }
  });

  // Generate tread block positions
  const treadBlocks = useMemo(() => {
    const blocks = [];
    const numBlocks = 36;
    for (let i = 0; i < numBlocks; i++) {
      const angle = (i / numBlocks) * Math.PI * 2;
      blocks.push({ angle, index: i });
    }
    return blocks;
  }, []);

  // Sidewall text-like bumps
  const sidewallRibs = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      angle: (i / 60) * Math.PI * 2,
    }));
  }, []);

  const spokes = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        angle: (i / 5) * Math.PI * 2,
      })),
    [],
  );

  return (
    <group ref={group} rotation={[0.38, 0, 0.15]}>
      {/* ── Outer tyre rubber body ── */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1.62, 0.58, 80, 160]} />
        <meshStandardMaterial
          color="#0c0c0c"
          roughness={0.82}
          metalness={0.08}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* ── Tread shoulder groove – inner ring ── */}
      <mesh>
        <torusGeometry args={[1.62, 0.52, 40, 160]} />
        <meshStandardMaterial color="#080808" roughness={0.95} metalness={0} />
      </mesh>

      {/* ── Tread blocks across the crown ── */}
      {treadBlocks.map(({ angle, index }) => {
        const offset = index % 3 === 0 ? 0.06 : index % 3 === 1 ? -0.04 : 0.02;
        return (
          <group key={index}>
            {/* Main tread block */}
            <mesh
              position={[Math.cos(angle) * 1.62, Math.sin(angle) * 1.62, offset]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.22, 0.16, 1.22]} />
              <meshStandardMaterial color="#0f0f0f" roughness={0.9} metalness={0.05} />
            </mesh>
            {/* Sub-groove sipe lines */}
            <mesh
              position={[
                Math.cos(angle + 0.035) * 1.62,
                Math.sin(angle + 0.035) * 1.62,
                offset * 0.5,
              ]}
              rotation={[0, 0, angle + 0.035]}
            >
              <boxGeometry args={[0.055, 0.06, 1.18]} />
              <meshStandardMaterial color="#040404" roughness={1} />
            </mesh>
          </group>
        );
      })}

      {/* ── Sidewall circumferential grooves ── */}
      {[0.38, 0.46].map((zOff, gi) => (
        <mesh key={gi} position={[0, 0, zOff * (gi === 0 ? 1 : -1)]}>
          <torusGeometry args={[1.62, 0.025, 12, 160]} />
          <meshStandardMaterial color="#060606" roughness={1} />
        </mesh>
      ))}

      {/* ── Sidewall rib details ── */}
      {sidewallRibs.map(({ angle }, i) => (
        <group key={i}>
          <mesh
            position={[Math.cos(angle) * 1.38, Math.sin(angle) * 1.38, 0.52]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.04, 0.025, 0.14]} />
            <meshStandardMaterial color="#141414" roughness={0.9} />
          </mesh>
          <mesh
            position={[Math.cos(angle) * 1.38, Math.sin(angle) * 1.38, -0.52]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.04, 0.025, 0.14]} />
            <meshStandardMaterial color="#141414" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* ── Bead & inner liner ring ── */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[0, 0, side * 0.54]}>
          <torusGeometry args={[1.06, 0.06, 16, 80]} />
          <meshStandardMaterial color="#1c1c1c" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}

      {/* ── Alloy Rim – barrel / flange ── */}
      <mesh>
        <cylinderGeometry args={[1.04, 1.04, 1.08, 80]} />
        <meshStandardMaterial
          color="#1e1e1e"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* ── Rim face plate ── */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[0, 0, side * 0.55]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.32, 1.04, 64]} />
          <meshStandardMaterial
            color="#252525"
            metalness={0.98}
            roughness={0.1}
            envMapIntensity={1.5}
          />
        </mesh>
      ))}

      {/* ── Spokes (5-spoke design) ── */}
      {spokes.map(({ angle }, i) => (
        <group key={i} rotation={[Math.PI / 2, 0, angle]}>
          {/* Main spoke body */}
          <mesh position={[0, 0.68, 0]}>
            <boxGeometry args={[0.22, 1.38, 0.08]} />
            <meshStandardMaterial
              color="#2e2e2e"
              metalness={1}
              roughness={0.1}
              envMapIntensity={2}
            />
          </mesh>
          {/* Spoke highlight chamfer */}
          <mesh position={[0, 0.68, 0.042]}>
            <boxGeometry args={[0.1, 1.38, 0.01]} />
            <meshStandardMaterial color="#888" metalness={1} roughness={0.05} envMapIntensity={3} />
          </mesh>
          {/* Spoke pocket cutout indication */}
          <mesh position={[0.14, 0.68, 0]}>
            <boxGeometry args={[0.04, 1.2, 0.09]} />
            <meshStandardMaterial color="#111" roughness={0.9} />
          </mesh>
          <mesh position={[-0.14, 0.68, 0]}>
            <boxGeometry args={[0.04, 1.2, 0.09]} />
            <meshStandardMaterial color="#111" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* ── Center hub cap ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 1.14, 48]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* ── Center emblem / logo disc ── */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[0, 0, side * 0.58]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 32]} />
          <meshStandardMaterial
            color="#FF6B00"
            metalness={0.7}
            roughness={0.2}
            emissive="#FF4500"
            emissiveIntensity={0.55}
          />
        </mesh>
      ))}

      {/* ── Lug nut holes (10 – 5 per side) ── */}
      {spokes.map(({ angle }, i) => (
        <group key={i}>
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              position={[
                Math.cos(angle + (side * Math.PI) / 10) * 0.72,
                Math.sin(angle + (side * Math.PI) / 10) * 0.72,
                0.6 * side,
              ]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.07, 0.07, 0.1, 6]} />
              <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── Inner glow ring ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.68, 0.018, 8, 64]} />
        <meshStandardMaterial
          color="#FF6B00"
          emissive="#FF4500"
          emissiveIntensity={1.2}
          metalness={0}
          roughness={0}
        />
      </mesh>
    </group>
  );
}

export default function Tyre3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.8], fov: 42 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      shadows
    >
      <ambientLight intensity={0.25} />
      {/* Key light */}
      <directionalLight position={[6, 8, 5]} intensity={2.2} color="#ffffff" castShadow />
      {/* Fill light */}
      <directionalLight position={[-5, -3, 3]} intensity={0.6} color="#c0d8ff" />
      {/* Orange rim accent light */}
      <pointLight position={[0, 0, 4]} intensity={3.5} color="#FF6B00" distance={8} />
      {/* Backlight */}
      <pointLight position={[-3, 4, -3]} intensity={1.8} color="#ffaa55" distance={12} />
      {/* Bottom bounce */}
      <pointLight position={[0, -5, 2]} intensity={1.2} color="#FF8C30" distance={10} />

      <Suspense fallback={null}>
        <Float speed={1.0} rotationIntensity={0.12} floatIntensity={0.5}>
          <TyreRealastic />
        </Float>
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
