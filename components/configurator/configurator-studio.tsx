"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, Sparkles } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { Box3, Color, Group, MathUtils, Mesh, MeshPhysicalMaterial, Vector3 } from "three";

import { productCatalog } from "@/lib/catalog";
import { formatCurrency } from "@/lib/currency";
import { computeBuildPrice } from "@/lib/services/pricing";
import { useCommerceStore } from "@/store/use-commerce-store";

type ConfiguratorState = {
  bodyColor: string;
  earCushionColor: string;
  frameFinish: string;
  engravingText: string;
  logoEngraving: boolean;
  earcupTexture: string;
  ambientLighting: string;
  edition: string;
  accessories: string[];
  renderQuality: "standard" | "cinema";
  exploded: boolean;
};

function ConfigurableModel({
  state
}: {
  state: ConfiguratorState;
}) {
  const groupRef = useRef<Group>(null);
  const scene = useLoader(OBJLoader, "/models/Headphones.obj");

  const model = useMemo(() => {
    const clone = scene.clone();
    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const scale = 4.5 / Math.max(size.x, size.y, size.z);

    clone.position.sub(center);
    clone.scale.setScalar(scale);
    let meshIndex = 0;

    clone.traverse((object) => {
      if (!(object instanceof Mesh)) {
        return;
      }
      object.castShadow = true;
      object.receiveShadow = true;
      object.userData.basePosition = object.position.clone();
      object.userData.explodeIndex = meshIndex++;
      object.material = new MeshPhysicalMaterial({
        color: new Color(state.bodyColor),
        metalness: 0.92,
        roughness: state.earcupTexture === "Carbon Fiber" ? 0.22 : 0.38,
        clearcoat: 1,
        clearcoatRoughness: 0.12
      });
    });

    return clone;
  }, [scene, state.bodyColor, state.earcupTexture]);

  useFrame((clockState) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      Math.sin(clockState.clock.elapsedTime * 0.3) * 0.08,
      0.04
    );

    groupRef.current.traverse((object) => {
      if (!(object instanceof Mesh)) {
        return;
      }
      const material = object.material;
      const basePosition = object.userData.basePosition as Vector3 | undefined;
      const explodeIndex = object.userData.explodeIndex as number | undefined;
      const isAccent = explodeIndex ? explodeIndex % 7 === 0 : false;

      if (basePosition && typeof explodeIndex === "number") {
        const direction = explodeIndex % 2 === 0 ? 1 : -1;
        object.position.x = MathUtils.lerp(
          object.position.x,
          basePosition.x + (state.exploded ? direction * (0.16 + explodeIndex * 0.002) : 0),
          0.08
        );
      }

      if (material instanceof MeshPhysicalMaterial) {
        material.color.set(isAccent ? state.frameFinish === "Satin Gold" ? "#d7b46a" : state.bodyColor : state.bodyColor);
        material.envMapIntensity = state.ambientLighting === "Gallery" ? 2.4 : 1.6;
      }
    });
  });

  return (
    <>
      <ambientLight intensity={state.ambientLighting === "Studio" ? 0.8 : 1.2} />
      <directionalLight position={[5, 6, 5]} intensity={state.renderQuality === "cinema" ? 3.1 : 2.4} color="#fff2db" />
      <spotLight position={[-4, 2, 5]} intensity={1.2} color="#7ea6d5" />
      <group ref={groupRef}>
        <primitive object={model} />
      </group>
      <Sparkles count={90} scale={[7, 4, 5]} size={2.2} speed={0.35} color="#d7b46a" />
      <Environment preset="city" />
    </>
  );
}

export default function ConfiguratorStudio() {
  const addToCart = useCommerceStore((state) => state.addToCart);
  const [state, setState] = useState<ConfiguratorState>({
    bodyColor: "#141414",
    earCushionColor: "Ivory Leather",
    frameFinish: "Satin Gold",
    engravingText: "AUREX",
    logoEngraving: true,
    earcupTexture: "Brushed Titanium",
    ambientLighting: "Gallery",
    edition: "Signature",
    accessories: ["Founders travel case"],
    renderQuality: "cinema",
    exploded: false
  });

  const price = computeBuildPrice({
    edition: state.edition,
    frameFinish: state.frameFinish,
    accessories: state.accessories
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="glass-panel overflow-hidden rounded-[2rem] p-4">
        <div className="mb-4 flex flex-wrap gap-3">
          {["Studio", "Gallery", "Night"].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setState((current) => ({ ...current, ambientLighting: preset }))}
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/72"
            >
              {preset}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setState((current) => ({ ...current, exploded: !current.exploded }))}
            className="rounded-full border border-[rgba(215,180,106,0.25)] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[rgba(215,180,106,0.92)]"
          >
            {state.exploded ? "Collapse View" : "Explode View"}
          </button>
        </div>
        <div className="h-[620px] rounded-[1.5rem] border border-white/8 bg-black/40">
          <Canvas shadows camera={{ position: [0, 0.3, 7.5], fov: 36 }} gl={{ preserveDrawingBuffer: true }}>
            <ConfigurableModel state={state} />
            <OrbitControls enablePan={false} minDistance={4.5} maxDistance={10} />
          </Canvas>
        </div>
      </section>
      <section className="grid gap-4">
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="eyebrow mb-3">Custom Build</p>
          <h2 className="text-3xl uppercase tracking-[0.14em] text-white">{state.edition} Edition</h2>
          <p className="mt-3 text-white/62">Live materials, engraving, accessories, ambient light presets, and exploded preview.</p>
          <p className="mt-6 font-display text-5xl uppercase tracking-[0.08em] text-white">{formatCurrency(price)}</p>
        </div>
        <div className="dashboard-grid dashboard-grid--2">
          <label className="metric-card">
            <span className="block text-xs uppercase tracking-[0.24em] text-white/48">Body Color</span>
            <input
              type="color"
              value={state.bodyColor}
              onChange={(event) => setState((current) => ({ ...current, bodyColor: event.target.value }))}
              className="mt-4 h-14 w-full rounded-xl border border-white/10 bg-transparent"
            />
          </label>
          <label className="metric-card">
            <span className="block text-xs uppercase tracking-[0.24em] text-white/48">Engraving</span>
            <input
              type="text"
              value={state.engravingText}
              onChange={(event) => setState((current) => ({ ...current, engravingText: event.target.value }))}
              className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
          </label>
          {(
            [
              ["Frame Finish", "frameFinish", productCatalog.metalFrames],
              ["Ear Cushion", "earCushionColor", productCatalog.earCushions],
              ["Texture", "earcupTexture", productCatalog.finishes],
              ["Edition", "edition", productCatalog.editions]
            ] as const
          ).map(([label, key, values]) => (
            <label key={label} className="metric-card">
              <span className="block text-xs uppercase tracking-[0.24em] text-white/48">{label}</span>
              <select
                value={state[key] as string}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    [key]: event.target.value
                  }))
                }
                className="mt-4 w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-white outline-none"
              >
                {(values as readonly string[]).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-white/52">Accessory Add-ons</p>
          <div className="grid gap-3">
            {productCatalog.accessories.map((accessory) => {
              const active = state.accessories.includes(accessory);
              return (
                <button
                  key={accessory}
                  type="button"
                  onClick={() =>
                    setState((current) => ({
                      ...current,
                      accessories: active
                        ? current.accessories.filter((item) => item !== accessory)
                        : [...current.accessories, accessory]
                    }))
                  }
                  className={`rounded-2xl border px-4 py-3 text-left ${
                    active ? "border-[rgba(215,180,106,0.4)] bg-[rgba(215,180,106,0.08)]" : "border-white/10 bg-white/5"
                  }`}
                >
                  {accessory}
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                addToCart({
                  id: "configurator-build",
                  title: `${productCatalog.name} - ${state.edition}`,
                  quantity: 1,
                  unitPrice: price,
                  configuration: state
                })
              }
              className="rounded-full border border-[rgba(215,180,106,0.35)] bg-[rgba(215,180,106,0.12)] px-6 py-3 text-sm uppercase tracking-[0.24em] text-white"
            >
              Add Build To Cart
            </button>
            <button
              type="button"
              className="rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-[0.24em] text-white/78"
            >
              Save Custom Build
            </button>
            <button
              type="button"
              className="rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-[0.24em] text-white/78"
            >
              Export Screenshot
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
