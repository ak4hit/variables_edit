// Curated studio design tokens for modern motion graphics.
// Inspired by high-end human editorial motion design (Apple / Linear / Figma style)
// Avoids generic AI neon/cyberpunk aesthetics.

export const colors = {
  // Studio Dark Canvas
  bg: "#0E1015", // warm deep obsidian
  bgSoft: "#161922", // elevated card surface
  bgCard: "#1D212D", // interactive card background
  cardBorder: "rgba(255, 255, 255, 0.08)",
  cardBorderHover: "rgba(255, 255, 255, 0.16)",

  // Refined Color Palette
  label: "#F59E0B", // warm golden amber — variable identifier
  value: "#10B981", // crisp studio emerald — data value
  keyword: "#8B5CF6", // soft designer violet — 'let', 'const'
  accent: "#3B82F6", // electric studio cobalt
  coral: "#F43F5E", // vivid coral rose for warnings/emphasis
  danger: "#EF4444", // clean red
  success: "#10B981", // natural emerald

  // Editorial Typography
  text: "#F8FAFC", // crisp warm white
  textMuted: "#94A3B8", // soft slate grey
  textDim: "#64748B", // dark slate
  boxStroke: "rgba(255, 255, 255, 0.1)",
};

export const fonts = {
  display: "'JetBrains Mono', 'SF Mono', Consolas, monospace",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const FPS = 30;

// Calibrated scene durations in seconds (synchronized with voiceover.mp3)
export const SCENE_SECONDS = {
  hook: 14.6,
  whatIs: 18.5,
  declareAssign: 23.4,
  namingRules: 22.4,
  reassignment: 23.6,
  dataTypes: 21.7,
  recap: 17.7,
};

export const toFrames = (s: number) => Math.round(s * FPS);

export const SCENE_FRAMES = Object.fromEntries(
  Object.entries(SCENE_SECONDS).map(([k, v]) => [k, toFrames(v)])
) as Record<keyof typeof SCENE_SECONDS, number>;

export const TOTAL_FRAMES = Object.values(SCENE_FRAMES).reduce(
  (a, b) => a + b,
  0
);
