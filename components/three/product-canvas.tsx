"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Environment, Float, MeshTransmissionMaterial, Sparkles, useGLTF } from "@react-three/drei";
import {
  Box3,
  Color,
  Group,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  Object3D,
  Vector3
} from "three";

type ScenePhase =
  | "hero"
  | "reveal"
  | "features"
  | "exploded"
  | "sound"
  | "materials"
  | "lifestyle"
  | "colors"
  | "ecosystem"
  | "testimonials"
  | "buy";

type ProductCanvasProps = {
  selectedColor: string;
  scenePhase: ScenePhase;
  scrollProgress: number;
  luxMode: boolean;
  isMobile?: boolean;
};

function SceneRig({
  selectedColor,
  scenePhase,
  scrollProgress,
  luxMode,
  isMobile = false
}: ProductCanvasProps) {
  const modelRef = useRef<Group>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const { scene } = useGLTF("/models/Headphones.glb");

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      pointerRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1)
      };
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  const centered = useMemo(() => {
    const clone = scene.clone();
    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const scale = 4.8 / Math.max(size.x, size.y, size.z);

    clone.position.sub(center);
    clone.scale.setScalar(scale);

    clone.traverse((object: Object3D) => {
      if (!(object instanceof Mesh)) {
        return;
      }

      // Ensure bounding box is computed
      if (!object.geometry.boundingBox) {
        object.geometry.computeBoundingBox();
      }

      const meshCenter = new Vector3();
      object.geometry.boundingBox!.getCenter(meshCenter);

      object.castShadow = true;
      object.receiveShadow = true;
      object.userData.basePosition = object.position.clone();
      object.userData.baseQuaternion = object.quaternion.clone();

      // Use the geometry center for the explosion direction instead of local position
      const explodeDir = meshCenter.clone().normalize();

      // We still add the explosion offset to the object's local position (which might be 0,0,0)
      object.userData.explodeTarget = object.position
        .clone()
        .add(explodeDir.multiplyScalar(0.4 + Math.random() * 0.2));

      const isLuxuryAccent = meshCenter.y > 0.3 || meshCenter.x > 0.2;
      object.material = new MeshPhysicalMaterial({
        color: new Color(isLuxuryAccent ? "#d7b46a" : selectedColor),
        metalness: isLuxuryAccent ? 1 : 0.92,
        roughness: isLuxuryAccent ? 0.18 : 0.38,
        clearcoat: 1,
        clearcoatRoughness: 0.14,
        reflectivity: 1,
        envMapIntensity: luxMode ? 2.2 : 1.7
      });
    });

    return clone;
  }, [luxMode, scene, selectedColor]);

  useFrame((state, delta) => {
    if (!modelRef.current) {
      return;
    }

    const group = modelRef.current;
    const pointer = pointerRef.current;
    const phaseRotation =
      scenePhase === "exploded" ? 0.9 : scenePhase === "reveal" ? 0.6 : scenePhase === "buy" ? 1.05 : 0.34;
    const targetX = pointer.y * 0.18;
    const targetY = scrollProgress * Math.PI * 1.35 + pointer.x * 0.24;
    const explodedAmount = scenePhase === "exploded" ? 0.42 : scenePhase === "colors" ? 0.12 : 0;
    const transparent = scenePhase === "exploded" || scenePhase === "sound";

    group.rotation.x = MathUtils.lerp(group.rotation.x, targetX, 0.06);
    group.rotation.y += delta * phaseRotation * 0.25;
    group.rotation.y = MathUtils.lerp(group.rotation.y, targetY, 0.035);
    group.position.y = MathUtils.lerp(group.position.y, Math.sin(state.clock.elapsedTime * 0.8) * 0.12, 0.03);

    group.traverse((child) => {
      if (!(child instanceof Mesh)) {
        return;
      }

      const material = child.material;
      const basePosition = child.userData.basePosition as Vector3 | undefined;
      const explodeIndex = child.userData.explodeIndex as number | undefined;

      if (basePosition && typeof explodeIndex === "number") {
        const direction = explodeIndex % 2 === 0 ? 1 : -1;
        child.position.x = MathUtils.lerp(
          child.position.x,
          basePosition.x + direction * explodedAmount * (0.18 + explodeIndex * 0.002),
          0.08
        );
        child.position.z = MathUtils.lerp(
          child.position.z,
          basePosition.z + explodedAmount * ((explodeIndex % 5) * 0.06),
          0.08
        );
      }

      if (material instanceof MeshPhysicalMaterial) {
        material.transparent = transparent;
        material.opacity = transparent ? 0.6 : 1;
      }
    });
  });

  const stagePosition = scenePhase === "buy" ? [1.2, -0.6, 0] : scenePhase === "features" ? [1, -0.1, 0] : [0, 0, 0];
  const stageScale = scenePhase === "hero" ? 1.08 : scenePhase === "reveal" ? 1.22 : scenePhase === "buy" ? 1.28 : 1.1;

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 8, 22]} />
      <ambientLight intensity={0.9} color={luxMode ? "#f4d697" : "#d8d0c2"} />
      <directionalLight
        position={[4, 5, 4]}
        intensity={luxMode ? 3.4 : 2.6}
        color="#fff0d0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight position={[-5, 2, 6]} intensity={1.8} color="#87b3ff" angle={0.38} penumbra={1} />
      <spotLight position={[0, -2, 8]} intensity={1.4} color="#d7b46a" angle={0.45} penumbra={1} />
      <Float speed={2.2} rotationIntensity={0.22} floatIntensity={0.45}>
        <group ref={modelRef} position={stagePosition as [number, number, number]} scale={stageScale}>
          <primitive object={centered} />
        </group>
      </Float>
      <mesh position={[0, -3.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <shadowMaterial opacity={0.22} />
      </mesh>
      <Sparkles count={isMobile ? 60 : 160} scale={[10, 5, 8]} size={2.4} speed={0.5} color="#d7b46a" />
      <Sparkles count={isMobile ? 30 : 80} scale={[8, 4, 7]} size={1.7} speed={0.25} color="#7aa4d8" />
      <Environment preset="city" />
    </>
  );
}

function SoundHalo({ active }: { active: boolean }) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.z = state.clock.elapsedTime * 0.16;
    ref.current.scale.setScalar(active ? 1.4 + Math.sin(state.clock.elapsedTime * 2.2) * 0.06 : 1.2);
  });

  return (
    <mesh ref={ref} position={[0, 0.15, -0.4]}>
      <torusGeometry args={[2.4, 0.03, 24, 120]} />
      <MeshTransmissionMaterial
        color={active ? "#d7b46a" : "#5c6f92"}
        thickness={0.2}
        roughness={0.1}
        transmission={0.9}
        ior={1.3}
      />
    </mesh>
  );
}

export default function ProductCanvas(props: ProductCanvasProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.4, 7.8], fov: 34 }}
        dpr={[1, isMobile ? 1.2 : 1.5]}
        shadows
        performance={{ min: 0.5 }}
      >
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <SceneRig {...props} isMobile={isMobile} />
          <SoundHalo active={props.scenePhase === "sound"} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/Headphones.glb");
