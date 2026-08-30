import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../tokens";

type Props = {
  text: string;
  tag?: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  weight?: number;
  align?: "left" | "center" | "right";
  highlight?: string[];
  highlightColor?: string;
  staggerFrames?: number;
  fontFamily?: "display" | "body";
  maxWidth?: number | string;
};

export const KineticText: React.FC<Props> = ({
  text,
  tag,
  startFrame = 0,
  fontSize = 56,
  color = colors.text,
  weight = 700,
  align = "center",
  highlight = [],
  highlightColor = colors.label,
  staggerFrames = 3,
  fontFamily = "body",
  maxWidth = 920,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  // Tag entrance
  const tagProgress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 140 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : align === "left" ? "flex-start" : "flex-end",
        gap: 16,
        maxWidth,
        textAlign: align,
      }}
    >
      {tag && (
        <div
          style={{
            opacity: interpolate(tagProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(tagProgress, [0, 1], [10, 0])}px)`,
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: colors.textMuted,
            fontFamily: fonts.display,
            fontSize: 15,
            fontWeight: 600,
            padding: "5px 16px",
            borderRadius: 24,
            letterSpacing: 1.2,
            textTransform: "uppercase",
          }}
        >
          {tag}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: align === "center" ? "center" : align === "left" ? "flex-start" : "flex-end",
          gap: "0 0.32em",
          fontFamily: fontFamily === "display" ? fonts.display : fonts.body,
        }}
      >
        {words.map((word, i) => {
          const localStart = startFrame + (tag ? 6 : 0) + i * staggerFrames;
          const progress = spring({
            frame: frame - localStart,
            fps,
            config: { damping: 15, mass: 0.55, stiffness: 150 },
          });

          const opacity = interpolate(progress, [0, 1], [0, 1]);
          const y = interpolate(progress, [0, 1], [22, 0]);
          const scale = interpolate(progress, [0, 1], [0.96, 1]);

          const cleanWord = word.replace(/[.,!?:;\"'()]/g, "");
          const isHighlighted = highlight.some(
            (h) => h.toLowerCase() === cleanWord.toLowerCase() || h.toLowerCase() === word.toLowerCase()
          );

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity,
                transform: `translateY(${y}px) scale(${scale})`,
                fontSize,
                fontWeight: isHighlighted ? 800 : weight,
                color: isHighlighted ? highlightColor : color,
                lineHeight: 1.22,
                letterSpacing: fontFamily === "display" ? "0px" : "-0.5px",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
