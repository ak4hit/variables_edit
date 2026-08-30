import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../tokens";

type Props = {
  name: string; // variable identifier
  value: string; // value inside the container
  type?: "number" | "string" | "boolean" | "list" | "object" | string;
  address?: string; // e.g. "0x7F4A"
  appearFrame?: number;
  changeAtFrame?: number;
  newValue?: string;
  width?: number;
};

export const VariableBox: React.FC<Props> = ({
  name,
  value,
  type = "number",
  address = "0x7F4A",
  appearFrame = 0,
  changeAtFrame,
  newValue,
  width = 380,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enter = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 140 },
  });
  const scale = interpolate(enter, [0, 1], [0.88, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const enterY = interpolate(enter, [0, 1], [24, 0]);

  // Flip & Mutation Animation
  let displayValue = value;
  let rotateY = 0;
  let flashScale = 1;

  if (changeAtFrame !== undefined && newValue !== undefined) {
    const rel = frame - changeAtFrame;
    if (rel >= 0) {
      const flipProgress = spring({
        frame: rel,
        fps,
        config: { damping: 14, mass: 0.5, stiffness: 160 },
      });

      rotateY = interpolate(flipProgress, [0, 1], [0, 360]);
      displayValue = flipProgress >= 0.5 ? newValue : value;

      flashScale = interpolate(
        rel,
        [0, 6, 18],
        [1, 1.05, 1],
        { extrapolateRight: "clamp" }
      );
    }
  }

  const getTypeColor = (t: string) => {
    switch (t.toLowerCase()) {
      case "number":
        return colors.value;
      case "string":
        return colors.label;
      case "boolean":
        return colors.accent;
      case "list":
      case "array":
        return colors.keyword;
      default:
        return colors.textMuted;
    }
  };

  const typeColor = getTypeColor(type);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${enterY}px) scale(${scale * flashScale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        perspective: 1000,
      }}
    >
      {/* Variable Identifier Tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: colors.bgCard,
          border: `1px solid ${colors.label}88`,
          color: colors.label,
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 24,
          padding: "6px 20px",
          borderRadius: 12,
          letterSpacing: 0.5,
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.3)",
        }}
      >
        <span style={{ color: colors.textMuted, fontSize: 16, fontWeight: 400 }}>
          name:
        </span>
        <span>{name}</span>
      </div>

      {/* Subtle Connector */}
      <div
        style={{
          width: 2,
          height: 14,
          backgroundColor: colors.cardBorder,
        }}
      />

      {/* Tactile Memory Container */}
      <div
        style={{
          width,
          minHeight: 150,
          backgroundColor: colors.bgSoft,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "24px 28px",
          transform: `rotateY(${rotateY}deg)`,
          boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Memory Slot Header */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 18,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: fonts.display,
            fontSize: 13,
            color: colors.textDim,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: colors.accent,
              opacity: 0.8,
            }}
          />
          <span>RAM {address}</span>
        </div>

        {/* Stored Value */}
        <div
          style={{
            marginTop: 8,
            fontFamily: fonts.display,
            fontSize: 48,
            fontWeight: 700,
            color: colors.value,
            letterSpacing: 0.5,
          }}
        >
          {displayValue}
        </div>

        {/* Type Badge */}
        {type && (
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 18,
              display: "flex",
              alignItems: "center",
              gap: 4,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: `1px solid ${typeColor}33`,
              padding: "3px 10px",
              borderRadius: 6,
              fontFamily: fonts.display,
              fontSize: 13,
              fontWeight: 600,
              color: typeColor,
              textTransform: "lowercase",
            }}
          >
            <span>type:</span>
            <span>{type}</span>
          </div>
        )}
      </div>
    </div>
  );
};
