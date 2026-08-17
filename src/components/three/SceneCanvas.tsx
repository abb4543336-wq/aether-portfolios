import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, Line } from "@react-three/drei";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { damp, rangeProgress, readScrollProgress, scrollState } from "@/lib/scroll-progress";

const NEON = "#e62222";
const VIOLET = "#9b1a1a";

/** Fades + lifts a group in/out based on a scroll sub-range. */
function Stage({
  start,
  end,
  children,
}: {
  start: number;
  end: number;
  children: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const weight = useRef(0);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const p = scrollState.progress;
    const inW = rangeProgress(p, start - 0.045, start + 0.015);
    const outW = 1 - rangeProgress(p, end - 0.015, end + 0.045);
    const target = Math.min(inW, outW);
    weight.current = damp(weight.current, target, 6, Math.min(dt, 0.05));
    const w = weight.current;

    g.visible = w > 0.015;
    g.position.y = (1 - w) * -2.2;
    g.scale.setScalar(0.8 + w * 0.2);
    g.traverse((o) => {
      const mesh = o as THREE.Mesh;
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (!mat) return;
      for (const m of Array.isArray(mat) ? mat : [mat]) {
        m.transparent = true;
        m.opacity = w;
        m.depthWrite = w > 0.9;
      }
    });
  });

  return <group ref={group}>{children}</group>;
}

function ServerRack({ x, ports = 6 }: { x: number; ports?: number }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh>
        <boxGeometry args={[1.5, 3.4, 1.1]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
      {Array.from({ length: ports }).map((_, i) => (
        <mesh key={i} position={[-0.35 + (i % 2) * 0.7, 1.35 - Math.floor(i / 2) * 0.55, 0.57]}>
          <boxGeometry args={[0.5, 0.14, 0.04]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? VIOLET : NEON}
            emissive={i % 3 === 0 ? VIOLET : NEON}
            emissiveIntensity={1.6}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Ethernet cable that plugs into the glowing server port as you scroll. */
function EthernetCable() {
  const plug = useRef<THREE.Group>(null);
  const cable = useRef<THREE.Mesh>(null);
  const port = useRef<THREE.Mesh>(null);
  const t = useRef(0);
  const START_Z = 7;
  const END_Z = 1.02;

  useFrame((_, dt) => {
    const target = rangeProgress(scrollState.progress, 0.01, 0.15);
    t.current = damp(t.current, target, 5, Math.min(dt, 0.05));
    const e = t.current * t.current * (3 - 2 * t.current);
    const z = START_Z + (END_Z - START_Z) * e;

    if (plug.current) {
      plug.current.position.set(0, Math.sin((1 - e) * Math.PI) * 0.35, z);
      plug.current.rotation.z = (1 - e) * 0.5;
    }
    if (cable.current) {
      const len = Math.max(0.1, START_Z + 5 - z);
      cable.current.scale.set(1, len, 1);
      cable.current.position.set(0, plug.current ? plug.current.position.y * 0.5 : 0, z + len / 2);
    }
    if (port.current) {
      const mat = port.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1 + e * 4;
    }
  });

  return (
    <group>
      <mesh ref={port} position={[0, 0, 0.58]}>
        <boxGeometry args={[0.56, 0.2, 0.06]} />
        <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={1} />
      </mesh>
      <group ref={plug}>
        <mesh>
          <boxGeometry args={[0.42, 0.3, 0.75]} />
          <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, -0.4]}>
          <boxGeometry args={[0.3, 0.2, 0.1]} />
          <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={2.4} />
        </mesh>
      </group>
      <mesh ref={cable} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 1, 12, 1, true]} />
        <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
}

function DataCenterStage() {
  return (
    <group>
      <ServerRack x={-2.6} />
      <ServerRack x={2.6} ports={4} />
      <group position={[0, 0, -0.4]}>
        <ServerRack x={0} ports={8} />
      </group>
      <EthernetCable />
      <Grid
        position={[0, -1.75, 1]}
        args={[40, 40]}
        cellColor={NEON}
        sectionColor={VIOLET}
        cellSize={0.7}
        sectionSize={3}
        fadeDistance={26}
        infiniteGrid
      />
    </group>
  );
}

function CloudNodesStage() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const r = 2 + (i % 3) * 0.75;
        return [Math.cos(a) * r, Math.sin(i * 1.7) * 1.2, Math.sin(a) * r] as [
          number,
          number,
          number,
        ];
      }),
    [],
  );

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.16;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color={NEON}
          emissive={NEON}
          emissiveIntensity={0.7}
          wireframe
        />
      </mesh>
      {nodes.map((p, i) => (
        <Float key={i} speed={1.4} floatIntensity={0.7} rotationIntensity={0.4}>
          <mesh position={p}>
            <boxGeometry args={[0.34, 0.34, 0.34]} />
            <meshStandardMaterial
              color={i % 2 ? VIOLET : NEON}
              emissive={i % 2 ? VIOLET : NEON}
              emissiveIntensity={1.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ShieldStage() {
  const ring = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ring.current) {
      ring.current.rotation.z += dt * 0.4;
      ring.current.rotation.x = Math.sin(performance.now() / 3000) * 0.25;
    }
  });
  return (
    <group>
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[1.8, 40, 24]} />
        <meshStandardMaterial
          color={VIOLET}
          emissive={VIOLET}
          emissiveIntensity={0.55}
          wireframe
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={1.5} />
      </mesh>
      <group ref={ring}>
        {[2.4, 2.8, 3.2].map((r, i) => (
          <mesh key={r} rotation={[Math.PI / 2 + i * 0.4, i * 0.3, 0]}>
            <torusGeometry args={[r, 0.02, 8, 90]} />
            <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function NetworkHubStage() {
  const group = useRef<THREE.Group>(null);
  const spokes = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return { a, p: [Math.cos(a) * 2.7, ((i % 3) - 1) * 0.9, Math.sin(a) * 2.7] as const };
      }),
    [],
  );
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y -= dt * 0.22;
  });
  return (
    <group ref={group}>
      <mesh>
        <cylinderGeometry args={[0.9, 0.9, 0.3, 6]} />
        <meshStandardMaterial color="#1a0d0d" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.95, 0.95, 0.06, 6]} />
        <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={1.8} />
      </mesh>
      {spokes.map(({ p }, i) => (
        <group key={i}>
          <mesh position={[p[0] / 2, p[1] / 2, p[2] / 2]}>
            <boxGeometry args={[Math.hypot(p[0], p[2]) * 0.98, 0.02, 0.02]} />
            <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={1.4} />
          </mesh>
          <Float speed={2} floatIntensity={0.6}>
            <mesh position={[p[0], p[1], p[2]]}>
              <sphereGeometry args={[0.22, 20, 20]} />
              <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={1.8} />
            </mesh>
          </Float>
        </group>
      ))}
    </group>
  );
}
export function GrowthStage() {
  const group = useRef<THREE.Group>(null);
  const bars = [0.8, 1.4, 2.1, 2.9, 3.6];

  const { tubeGeometry, arrowHeadGeometry, arrowPos, arrowRot } = useMemo(() => {
    // 🔴 Z-value ko 0.45 kar diya hai taaki arrow bars ke bilkul Samne (Outer Layer par) aaye
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-2.0, -0.5, -1.55), // Start point (Bars ke aage outer space mein)
      new THREE.Vector3(0.6, -0.5, -1.90),  // Middle curve bend
      new THREE.Vector3(2.0, 2.3, -1.55)    // Top-right tip position
    );

    // Thick 3D Curved Stem (Tube)
    const tubeGeo = new THREE.TubeGeometry(curve, 60, 0.06, 12, false);

    // Image jaisa Flat Sharp Triangular Arrow Head
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.45);        // Top sharp tip
    shape.lineTo(-0.28, -0.25);   // Bottom-left corner
    shape.lineTo(0, -0.1);        // Inner notch bend
    shape.lineTo(0.28, -0.25);    // Bottom-right corner
    shape.closePath();

    const arrowHeadGeo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
    });
    arrowHeadGeo.center();

    // End Position & Tangent Rotation
    const endPoint = curve.getPoint(1);
    const tangent = curve.getTangent(1);
    const angle = Math.atan2(tangent.y, tangent.x);

    return {
      tubeGeometry: tubeGeo,
      arrowHeadGeometry: arrowHeadGeo,
      arrowPos: [endPoint.x, endPoint.y, endPoint.z] as [number, number, number],
      arrowRot: [0, 0, angle - Math.PI / 2] as [number, number, number],
    };
  }, []);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y = damp(group.current.rotation.y, 0.5, 2, dt);
  });

  return (
    <group ref={group} rotation={[0, -0.4, 0]}>
      {/* 📊 Bars Rendering */}
      {bars.map((h, i) => (
        <mesh key={i} position={[(i - 2) * 0.85, h / 2 - 1.2, 0]}>
          <boxGeometry args={[0.5, h, 0.5]} />
          <meshStandardMaterial
            color={i % 2 ? VIOLET : NEON}
            emissive={i % 2 ? VIOLET : NEON}
            emissiveIntensity={0.9}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* 📈 CURVED ARROW (Shifted Forward / Outer) */}
      <group>
        {/* Curved Stem */}
        <mesh geometry={tubeGeometry}>
          <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={2} />
        </mesh>

        {/* Sharp Triangular Arrowhead */}
        <mesh position={arrowPos} rotation={arrowRot} geometry={arrowHeadGeometry}>
          <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* Floating TorusKnot */}
      {/* <Float speed={1.5} floatIntensity={1}>
        <mesh position={[1.9, 2.9, 0]}>
          <torusKnotGeometry args={[0.45, 0.12, 90, 12]} />
          <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={1.6} />
        </mesh>
      </Float> */}
    </group>
  );
}
const CAM_KEYS: { p: number; pos: [number, number, number] }[] = [
  { p: 0, pos: [0, 0.4, 9] },
  { p: 0.18, pos: [1.2, 1.1, 10.5] },
  { p: 0.4, pos: [0, 0.6, 11] },
  { p: 0.6, pos: [-1.2, 0.8, 11.5] },
  { p: 0.8, pos: [0.8, 0.5, 11] },
  { p: 1, pos: [0, 0.3, 10.5] },
];

function CameraRig() {
  const vec = useRef(new THREE.Vector3(0, 0.4, 9));
  useFrame(({ camera }, dt) => {
    const p = scrollState.progress;
    let a = CAM_KEYS[0]!;
    let b = CAM_KEYS[CAM_KEYS.length - 1]!;
    for (let i = 0; i < CAM_KEYS.length - 1; i++) {
      const cur = CAM_KEYS[i]!;
      const next = CAM_KEYS[i + 1]!;
      if (p >= cur.p && p <= next.p) {
        a = cur;
        b = next;
        break;
      }
    }
    const local = rangeProgress(p, a.p, b.p);
    vec.current.set(
      a.pos[0] + (b.pos[0] - a.pos[0]) * local,
      a.pos[1] + (b.pos[1] - a.pos[1]) * local,
      a.pos[2] + (b.pos[2] - a.pos[2]) * local,
    );

    const d = Math.min(dt, 0.05);
    camera.position.x = damp(camera.position.x, vec.current.x, 3, d);
    camera.position.y = damp(camera.position.y, vec.current.y, 3, d);
    camera.position.z = damp(camera.position.z, vec.current.z, 3, d);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/** Nudges the scene away from the side the copy sits on. */
const SHIFTS: { p: number; x: number }[] = [
  { p: 0.09, x: 4.8 },   // DataCenter Stage
  { p: 0.29, x: -4.8 },  // CloudNodes Stage
  { p: 0.49, x: 4.8 },   // Shield Stage
  { p: 0.50, x: -4.8 },  // NetworkHub Stage
  { p: 0.65, x: 4.8 },   // Growth Stage
];

function SceneShift({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!g.current) return;
    const wide = state.size.width >= 1024;
    let target = SHIFTS[0]!.x;
    let best = Infinity;
    for (const k of SHIFTS) {
      const d = Math.abs(scrollState.progress - k.p);
      if (d < best) {
        best = d;
        target = k.x;
      }
    }
    g.current.position.x = damp(g.current.position.x, wide ? target : 0, 2.2, Math.min(dt, 0.05));
  });
  return <group ref={g}>{children}</group>;
}

function ScrollTracker() {
  useFrame(() => {
    scrollState.progress = damp(scrollState.progress, readScrollProgress(), 1, 0.12);
  });
  return null;
}

export default function SceneCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.4, 9], fov: 45 }}
    >
      <color attach="background" args={["#f8f8f8"]} />
      <fog attach="fog" args={["#f8f8f8", 12, 30]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 6]} intensity={1.1} />
      <pointLight position={[-5, 2, 4]} color={VIOLET} intensity={40} distance={20} />
      <pointLight position={[5, -1, 5]} color={NEON} intensity={35} distance={20} />

      <ScrollTracker />
      <CameraRig />

      <SceneShift>
  <Stage start={0} end={0.18}>
    <DataCenterStage />
  </Stage>
  <Stage start={0.2} end={0.38}>
    <CloudNodesStage />
  </Stage>
  <Stage start={0.4} end={0.45}>
    <ShieldStage />
  </Stage>
  <Stage start={0.47} end={0.6}>
    <NetworkHubStage />
  </Stage>
  <Stage start={0.62} end={1.01}>
    <GrowthStage />
  </Stage>
</SceneShift>
    </Canvas>
  );
}