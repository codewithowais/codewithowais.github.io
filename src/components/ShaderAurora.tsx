"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform vec3 cA;
  uniform vec3 cB;
  uniform vec3 cC;
  uniform vec3 cBg;

  // hash / value-noise / fbm
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p){
    float v = 0.0; float amp = 0.5;
    for (int i = 0; i < 5; i++) { v += amp * noise(p); p *= 2.0; amp *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = (uv - 0.5); p.x *= aspect;
    p += uMouse * 0.18;
    float t = uTime * 0.045;

    float n1 = fbm(p * 1.6 + vec2(t, t * 0.6));
    float n2 = fbm(p * 2.3 - vec2(t * 0.7, t * 0.4));
    float n3 = fbm(p * 3.1 + vec2(t * 0.3, -t * 0.5));

    vec3 col = cBg;
    col = mix(col, cA, smoothstep(0.42, 1.02, n1) * 0.92);
    col = mix(col, cB, smoothstep(0.55, 1.05, n2) * 0.65);
    col = mix(col, cC, smoothstep(0.60, 1.15, n1 * n3) * 0.55);

    // vignette: keep color pooled toward the corners, darker ground center
    float vig = smoothstep(1.35, 0.35, length(uv - 0.5) * 1.6);
    col *= mix(0.55, 1.05, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function toVec3(hex: string) {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

function AuroraPlane({ colors }: { colors: string[] }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uRes: { value: new THREE.Vector2(1, 1) },
        cBg: { value: toVec3(colors[0]) },
        cA: { value: toVec3(colors[1]) },
        cB: { value: toVec3(colors[2]) },
        cC: { value: toVec3(colors[3]) },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    material.uniforms.cBg.value = toVec3(colors[0]);
    material.uniforms.cA.value = toVec3(colors[1]);
    material.uniforms.cB.value = toVec3(colors[2]);
    material.uniforms.cC.value = toVec3(colors[3]);
  }, [colors, material]);

  useFrame((state, delta) => {
    const m = material.uniforms;
    m.uTime.value += delta;
    m.uRes.value.set(size.width, size.height);
    mouse.current.lerp(target.current, 0.05);
    m.uMouse.value.copy(mouse.current);
    void viewport;
    void matRef;
  });

  // track pointer relative to viewport
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <ScreenQuad material={material} />;
}

export default function ShaderAurora({ colors }: { colors: string[] }) {
  return (
    <Canvas
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0 }}
    >
      <AuroraPlane colors={colors} />
    </Canvas>
  );
}
