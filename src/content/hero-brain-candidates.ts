export type HeroBrainCandidateId =
  | "atlas"
  | "perfusion"
  | "neon"
  | "wireframe"
  | "flow";

const l = (tr: string, en: string) => ({ tr, en }) as const;

export const heroBrainLab = {
  aria: l("Etkileşimli 3B Şirket Beyni tasarım karşılaştırması", "Interactive 3D Company Brain design comparison"),
  previous: l("Önceki beyin tasarımı", "Previous brain design"),
  next: l("Sonraki beyin tasarımı", "Next brain design"),
  dragHint: l("Fareyle döndürün", "Drag to rotate"),
  autoHint: l("Kendiliğinden dönüyor", "Auto-rotating"),
  touchHint: l("Seçenekleri kaydırın", "Swipe between options"),
  loading: l("3B beyin yükleniyor", "Loading 3D brain"),
  fallback: l("Bu tarayıcı WebGL sahnesini açamadı.", "This browser could not open the WebGL scene."),
  compare: l("Geçici karşılaştırma", "Temporary comparison"),
  candidates: [
    {
      id: "atlas",
      label: l("Atlas", "Atlas"),
      note: l("Gerçek anatomi, sakin ve kurumsal", "Real anatomy, calm and enterprise"),
      source: l("Brain Project · Brain Game yedeği", "Brain Project · Brain Game fallback"),
      license: "Apache-2.0 · model CC BY-SA 4.0 · fallback model CC BY-SA 2.1 JP",
      modelUrl: "https://cdn.jsdelivr.net/gh/itayinbarr/brainproject@main/brain-atlas/models/brain.glb",
      dracoPath: "https://cdn.jsdelivr.net/gh/itayinbarr/brainproject@main/brain-atlas/vendor/draco/",
    },
    {
      id: "perfusion",
      label: l("Nabız", "Perfusion"),
      note: l("Canlı sinyal dalgası, organik hareket", "Living signal wave, organic motion"),
      source: l("Brain Game", "Brain Game"),
      license: "MIT · model CC BY-SA 2.1 JP",
      modelUrl: "https://cdn.jsdelivr.net/gh/Rickaym/brain-game@main/public/models/brain.glb",
    },
    {
      id: "neon",
      label: l("Neon Korteks", "Neon Cortex"),
      note: l("Cyan ve mor ışıkla güçlü teknoloji sahnesi", "Cyan and violet lighting for a stronger technology stage"),
      source: l("Brain Project modeli · Brain Game yedeği", "Brain Project model · Brain Game fallback"),
      license: "Apache-2.0 · model CC BY-SA 4.0 · fallback model CC BY-SA 2.1 JP",
      modelUrl: "https://cdn.jsdelivr.net/gh/itayinbarr/brainproject@main/brain-atlas/models/brain.glb",
      dracoPath: "https://cdn.jsdelivr.net/gh/itayinbarr/brainproject@main/brain-atlas/vendor/draco/",
    },
    {
      id: "wireframe",
      label: l("Sinir Ağı", "Neural Wire"),
      note: l("Wireframe ve bloom ile daha soyut şirket beyni", "A more abstract company brain with wireframe and bloom"),
      source: l("Brain Project modeli · Brain Game yedeği", "Brain Project model · Brain Game fallback"),
      license: "Apache-2.0 · model CC BY-SA 4.0 · fallback model CC BY-SA 2.1 JP",
      modelUrl: "https://cdn.jsdelivr.net/gh/itayinbarr/brainproject@main/brain-atlas/models/brain.glb",
      dracoPath: "https://cdn.jsdelivr.net/gh/itayinbarr/brainproject@main/brain-atlas/vendor/draco/",
    },
    {
      id: "flow",
      label: l("Nöral Akış", "Neural Flow"),
      note: l("Beyin yüzeyinde hareket eden nöral parçacıklar", "Neural particles moving across the brain surface"),
      source: l("Flow Field Particles yaklaşımı + Brain Game modeli", "Flow-field particles + Brain Game model"),
      license: "MIT · model CC BY-SA 2.1 JP",
      modelUrl: "https://cdn.jsdelivr.net/gh/Rickaym/brain-game@main/public/models/brain.glb",
    },
  ] as const,
} as const;
