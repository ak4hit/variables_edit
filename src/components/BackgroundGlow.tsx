import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../tokens";

export const BackgroundGlow: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle breathing movement for studio light pools
  const light1Y = interpolate(Math.sin(frame * 0.02), [-1, 1], [-20, 20]);
  const light2X = interpolate(Math.cos(frame * 0.018), [-1, 1], [-30, 30]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Soft Top-Center Key Light */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "20%",
          width: 700,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0) 70%)",
          transform: `translateY(${light1Y}px)`,
          filter: "blur(80px)",
        }}
      />

      {/* Warm Ambient Fill Light (Deep Violet / Indigo) */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-15%",
          width: 800,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.06) 0%, rgba(245, 158, 11, 0.03) 45%, transparent 70%)",
          transform: `translateX(${light2X}px)`,
          filter: "blur(90px)",
        }}
      />

      {/* Gentle Studio Vignette Falloff */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 45%, transparent 40%, rgba(14, 16, 21, 0.6) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
