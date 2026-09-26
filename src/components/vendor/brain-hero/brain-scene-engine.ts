import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import type { HeroBrainCandidateId } from "@/content/hero-brain-candidates";

export type BrainCandidateRuntime = {
  id: HeroBrainCandidateId;
  modelUrl: string;
  dracoPath?: string;
};

export type BrainSceneState = "loading" | "ready" | "error";

const CYAN = new THREE.Color(0x27d3ff);
const VIOLET = new THREE.Color(0x8b5cf6);
const IVORY = new THREE.Color(0xe8e6df);
const GRAPHITE = new THREE.Color(0x172033);
const HOVER_IVORY = new THREE.Color(0xfff6d9);
const FALLBACK_MODEL_URL = "https://cdn.jsdelivr.net/gh/Rickaym/brain-game@main/public/models/brain.glb";

export function mountBrainCandidate({
  host,
  candidate,
  coarse,
  reduced,
  onState,
}: {
  host: HTMLDivElement;
  candidate: BrainCandidateRuntime;
  coarse: boolean;
  reduced: boolean;
  onState: (state: BrainSceneState) => void;
}) {
  let disposed = false;
  let frame = 0;
  let root: THREE.Object3D | null = null;
  let flowMaterial: THREE.ShaderMaterial | null = null;
  let composer: EffectComposer | null = null;
  let hovered: THREE.Mesh | null = null;
  const meshes: THREE.Mesh[] = [];

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.05, 50);
  camera.position.set(0.15, 0.2, 5.35);

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    onState("error");
    return () => undefined;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.2 : 1.7));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = candidate.id === "neon" ? 1.25 : 1.05;
  renderer.domElement.className = "absolute inset-0 size-full";
  host.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  renderer.domElement.style.touchAction = coarse ? "pan-y" : "none";
  controls.enablePan = false;
  controls.enableZoom = !coarse;
  controls.enableRotate = !coarse;
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.minDistance = 3.25;
  controls.maxDistance = 7.5;
  controls.autoRotate = !coarse && !reduced;
  controls.autoRotateSpeed = candidate.id === "flow" ? 0.75 : 0.48;

  scene.add(new THREE.HemisphereLight(0xdbeafe, 0x05070d, candidate.id === "wireframe" ? 0.18 : 0.62));

  if (candidate.id === "neon") {
    const cyan = new THREE.DirectionalLight(0x6eeae2, 2.2);
    cyan.position.set(-4, 3, 4);
    scene.add(cyan);
    const magenta = new THREE.DirectionalLight(0xff28c9, 1.75);
    magenta.position.set(4, 4, 2);
    scene.add(magenta);
    const blue = new THREE.PointLight(0x4263ff, 7, 12);
    blue.position.set(0, -2, -3);
    scene.add(blue);
  } else {
    const key = new THREE.DirectionalLight(0xffffff, candidate.id === "perfusion" ? 1.35 : 1.6);
    key.position.set(4, 6, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(candidate.id === "perfusion" ? 0x8ac7ff : 0x89a9ff, 1.15);
    rim.position.set(-5, 2, -5);
    scene.add(rim);
    const warm = new THREE.DirectionalLight(0xffb48f, 0.42);
    warm.position.set(4, -3, -4);
    scene.add(warm);
  }

  if (candidate.id === "wireframe" || candidate.id === "flow" || candidate.id === "neon") {
    try {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new UnrealBloomPass(
        new THREE.Vector2(1, 1),
        candidate.id === "flow" ? 1.0 : candidate.id === "wireframe" ? 0.8 : 0.55,
        0.62,
        candidate.id === "neon" ? 0.72 : 0.18,
      ));
    } catch (error) {
      console.warn(`[brain-hero] Bloom setup failed for "${candidate.id}". Rendering without post-processing.`, error);
      composer?.dispose();
      composer = null;
    }
  }

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(9, 9);

  const onPointerMove = (event: PointerEvent) => {
    if (coarse || meshes.length === 0) return;
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    hovered = (raycaster.intersectObjects(meshes, false)[0]?.object as THREE.Mesh | undefined) ?? null;
  };
  renderer.domElement.addEventListener("pointermove", onPointerMove);

  const loadModel = async (url: string, dracoPath?: string) => {
    const loader = new GLTFLoader();
    let decoder: DRACOLoader | null = null;
    if (dracoPath) {
      decoder = new DRACOLoader();
      decoder.setDecoderPath(dracoPath);
      loader.setDRACOLoader(decoder);
    }

    let timeoutId: number | undefined;
    try {
      const timeout = new Promise<never>((_, reject) => {
        timeoutId = window.setTimeout(
          () => reject(new Error(`Timed out while loading 3D brain asset: ${url}`)),
          9000,
        );
      });
      return await Promise.race([loader.loadAsync(url), timeout]);
    } finally {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      decoder?.dispose();
    }
  };

  const installModel = (gltf: Awaited<ReturnType<typeof loadModel>>) => {
    if (disposed) return;
    root = gltf.scene;

    if (candidate.id === "perfusion" || candidate.id === "flow") {
      root.rotation.set(-Math.PI / 2, 0, -0.08);
    } else {
      root.rotation.set(0.03, Math.PI, -0.03);
    }

    scene.add(root);
    fitBrain(root, candidate.id === "flow" ? 1.72 : 1.82);
    scene.updateMatrixWorld(true);

    const whole = new THREE.Box3().setFromObject(root);
    const minY = whole.min.y;
    const spanY = Math.max(0.001, whole.max.y - whole.min.y);

    let meshIndex = 0;
    root.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (!mesh.isMesh || !mesh.geometry) return;
      meshIndex += 1;
      meshes.push(mesh);

      mesh.geometry.computeVertexNormals();
      const center = new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3());
      mesh.userData.heroPulse = THREE.MathUtils.clamp((center.y - minY) / spanY, 0, 1);
      mesh.userData.heroPhase = (meshIndex * 0.61803398875) % 1;

      if (candidate.id === "atlas") {
        const original = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
        const base =
          original && "color" in original && original.color instanceof THREE.Color
            ? original.color.clone()
            : new THREE.Color(0xd9dce4);
        mesh.material = new THREE.MeshStandardMaterial({
          color: base.lerp(new THREE.Color(0xdfe3ec), 0.38),
          roughness: 0.73,
          metalness: 0.02,
          emissive: base.clone().multiplyScalar(0.09),
          emissiveIntensity: 0.22,
        });
      } else if (candidate.id === "perfusion") {
        mesh.material = new THREE.MeshStandardMaterial({
          color: IVORY.clone(),
          roughness: 0.78,
          metalness: 0,
          emissive: new THREE.Color(0xfff0c8),
          emissiveIntensity: 0.08,
        });
      } else if (candidate.id === "neon") {
        const tint = meshIndex % 3 === 0 ? CYAN : meshIndex % 3 === 1 ? VIOLET : new THREE.Color(0x5a7dff);
        mesh.material = new THREE.MeshStandardMaterial({
          color: GRAPHITE.clone().lerp(tint, 0.14),
          roughness: 0.34,
          metalness: 0.08,
          emissive: tint.clone(),
          emissiveIntensity: 0.2,
          transparent: true,
          opacity: 0.93,
        });
      } else {
        const tint = meshIndex % 3 === 0 ? CYAN : meshIndex % 3 === 1 ? VIOLET : new THREE.Color(0x6ea8ff);
        mesh.material = new THREE.MeshBasicMaterial({
          color: tint,
          wireframe: true,
          transparent: true,
          opacity: candidate.id === "flow" ? 0.075 : 0.22,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
      }
    });

    if (meshes.length === 0) throw new Error(`Brain candidate "${candidate.id}" loaded without renderable meshes.`);

    if (candidate.id === "flow") {
      try {
        flowMaterial = addFlowParticles(scene, root);
      } catch (error) {
        console.warn("[brain-hero] Neural Flow particles failed; keeping the wireframe fallback.", error);
        flowMaterial = null;
      }
    }

    onState("ready");
  };

  const bootModel = async () => {
    try {
      let gltf;
      try {
        gltf = await loadModel(candidate.modelUrl, candidate.dracoPath);
      } catch (primaryError) {
        if (candidate.modelUrl === FALLBACK_MODEL_URL) throw primaryError;
        console.warn(
          `[brain-hero] Primary model failed for "${candidate.id}". Falling back to the proven secondary brain model.`,
          primaryError,
        );
        gltf = await loadModel(FALLBACK_MODEL_URL);
      }

      if (disposed) return;

      try {
        installModel(gltf);
      } catch (setupError) {
        console.error(`[brain-hero] Scene setup failed for "${candidate.id}".`, setupError);
        onState("error");
      }
    } catch (loadError) {
      if (!disposed) {
        console.error(`[brain-hero] Model load failed for "${candidate.id}".`, loadError);
        onState("error");
      }
    }
  };

  void bootModel();

  const resize = () => {
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    composer?.setSize(width, height);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  const timer = new THREE.Timer();
  timer.connect(document);
  const animate = (timestamp: number) => {
    if (disposed) return;
    timer.update(timestamp);
    const elapsed = timer.getElapsed();
    const delta = timer.getDelta();
    controls.update(delta);

    if (root && coarse && !reduced) root.rotation.y += 0.0016;

    for (const mesh of meshes) {
      const material = mesh.material;
      if (!(material instanceof THREE.MeshStandardMaterial)) continue;

      const hover = mesh === hovered ? 0.78 : 0;
      if (candidate.id === "perfusion") {
        const d = mesh.userData.heroPulse as number;
        const wave = perfusionPulse(elapsed, d);
        material.emissiveIntensity += (0.08 + wave + hover - material.emissiveIntensity) * 0.12;
        material.color.lerp(mesh === hovered ? HOVER_IVORY : IVORY, 0.08);
      } else if (candidate.id === "neon") {
        const phase = mesh.userData.heroPhase as number;
        const pulse = reduced ? 0 : Math.max(0, Math.sin(elapsed * 1.65 + phase * Math.PI * 2)) * 0.12;
        material.emissiveIntensity += (0.2 + pulse + hover - material.emissiveIntensity) * 0.1;
      } else {
        material.emissiveIntensity += (0.22 + hover * 0.5 - material.emissiveIntensity) * 0.1;
      }
    }

    if (flowMaterial) flowMaterial.uniforms.uTime.value = reduced ? 0 : elapsed;
    if (composer) composer.render();
    else renderer.render(scene, camera);

    frame = window.requestAnimationFrame(animate);
  };
  frame = window.requestAnimationFrame(animate);

  return () => {
    disposed = true;
    window.cancelAnimationFrame(frame);
    observer.disconnect();
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    controls.dispose();
    timer.dispose();
    composer?.dispose();
    scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((material) => material.dispose());
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}

function fitBrain(root: THREE.Object3D, targetRadius: number) {
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root);
  const center = box.getCenter(new THREE.Vector3());
  root.position.sub(center);
  root.updateMatrixWorld(true);
  const sphere = new THREE.Box3().setFromObject(root).getBoundingSphere(new THREE.Sphere());
  const scale = sphere.radius > 0 ? targetRadius / sphere.radius : 1;
  root.scale.multiplyScalar(scale);
}

function perfusionPulse(time: number, distance: number) {
  const phase = time * 0.58 - distance * 2.6;
  const fraction = phase - Math.floor(phase);
  return Math.pow(Math.max(0, 1 - fraction), 4) * 0.72;
}

function addFlowParticles(scene: THREE.Scene, root: THREE.Object3D) {
  const positions: number[] = [];
  const phases: number[] = [];
  const temp = new THREE.Vector3();
  const target = 18000;
  let totalVertices = 0;

  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    const attr = mesh.geometry?.getAttribute("position");
    if (attr) totalVertices += attr.count;
  });

  const stride = Math.max(1, Math.ceil(totalVertices / target));
  let cursor = 0;
  root.updateMatrixWorld(true);

  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    const attr = mesh.geometry?.getAttribute("position");
    if (!attr) return;

    for (let i = 0; i < attr.count; i += stride) {
      temp.fromBufferAttribute(attr as THREE.BufferAttribute, i).applyMatrix4(mesh.matrixWorld);
      positions.push(temp.x, temp.y, temp.z);
      phases.push((cursor * 0.61803398875) % 1);
      cursor += 1;
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aPhase", new THREE.Float32BufferAttribute(phases, 1));

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: CYAN.clone() },
      uColorB: { value: VIOLET.clone() },
    },
    vertexShader: `
      uniform float uTime;
      attribute float aPhase;
      varying float vPulse;
      varying float vMix;
      void main() {
        vec3 p = position;
        vec3 dir = normalize(position + vec3(0.0001));
        float waveA = sin(uTime * 1.55 + aPhase * 6.2831853);
        float waveB = sin(uTime * 0.82 + p.x * 2.4 + p.y * 1.8 + p.z * 1.25);
        p += dir * (waveA * 0.018 + waveB * 0.010);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float pulse = 0.5 + 0.5 * sin(uTime * 2.1 + aPhase * 12.0);
        gl_PointSize = (1.55 + pulse * 2.15) * (220.0 / max(1.0, -mv.z));
        vPulse = pulse;
        vMix = 0.5 + 0.5 * sin(aPhase * 9.0 + uTime * 0.25);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying float vPulse;
      varying float vMix;
      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float d = length(uv);
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.0, d) * (0.45 + vPulse * 0.55);
        vec3 color = mix(uColorA, uColorB, vMix);
        gl_FragColor = vec4(color, alpha);
      }
    `,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);
  return material;
}
