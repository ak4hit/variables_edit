import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KineticText } from "../components/KineticText";
import { VariableBox } from "../components/VariableBox";
import { colors, fonts } from "../tokens";

// NARRATION (Scene 2):
// "Think of a variable as a labeled box. The label is its name.
//  Whatever's inside the box — a number, a word, anything —
//  that's its value. You give the box a name so you can find it
//  again later, without caring exactly where it lives in memory."

export const WhatIsVariable: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const callout1 = spring({
    frame: frame - 150,
    fps,
    config: { damping: 15, mass: 0.55, stiffness: 140 },
  });
  const callout2 = spring({
    frame: frame - 230,
    fps,
    config: { damping: 15, mass: 0.55, stiffness: 140 },
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 48px",
        gap: 36,
      }}
    >
      <KineticText
        tag="Visual Metaphor"
        text="A variable is simply a labeled storage box."
        startFrame={0}
        fontSize={54}
        weight={800}
        highlight={["labeled", "storage", "box."]}
        highlightColor={colors.label}
        staggerFrames={3}
      />

      <div style={{ marginTop: 16 }}>
        <VariableBox
          name="score"
          value="0"
          type="number"
          address="0x7F4A"
          appearFrame={40}
          width={400}
        />
      </div>

      {/* Anatomy Breakdown Cards */}
      <div
        style={{
          display: "flex",
          gap: 18,
          width: "100%",
          maxWidth: 680,
          marginTop: 10,
        }}
      >
        {/* Label Card */}
        <div
          style={{
            flex: 1,
            opacity: interpolate(callout1, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(callout1, [0, 1], [20, 0])}px)`,
            backgroundColor: colors.bgSoft,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 16,
            padding: "18px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: fonts.display,
              fontSize: 15,
              fontWeight: 700,
              color: colors.label,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            🏷️ Variable Name
          </span>
          <span
            style={{
              fontFamily: fonts.body,
              fontSize: 17,
              color: colors.textMuted,
              lineHeight: 1.35,
            }}
          >
            The label used to find and reference the box.
          </span>
        </div>

        {/* Value Card */}
        <div
          style={{
            flex: 1,
            opacity: interpolate(callout2, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(callout2, [0, 1], [20, 0])}px)`,
            backgroundColor: colors.bgSoft,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 16,
            padding: "18px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: fonts.display,
              fontSize: 15,
              fontWeight: 700,
              color: colors.value,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            📦 Stored Value
          </span>
          <span
            style={{
              fontFamily: fonts.body,
              fontSize: 17,
              color: colors.textMuted,
              lineHeight: 1.35,
            }}
          >
            The actual data stored inside computer memory.
          </span>
        </div>
      </div>

      <div style={{ marginTop: 8 }}>
        <KineticText
          text="Name it once. Access it anywhere."
          startFrame={340}
          fontSize={36}
          color={colors.textMuted}
          highlight={["Access", "anywhere."]}
          highlightColor={colors.accent}
        />
      </div>
    </AbsoluteFill>
  );
};
