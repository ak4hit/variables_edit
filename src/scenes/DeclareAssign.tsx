import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CodeWindow } from "../components/CodeWindow";
import { KineticText } from "../components/KineticText";
import { VariableBox } from "../components/VariableBox";
import { colors, fonts } from "../tokens";

// NARRATION (Scene 3):
// "Creating one is called declaring. And putting something inside
//  it is called assigning. Watch: we write let score equals zero.
//  Let declares the box. The equals sign isn't math here —
//  it means put this value inside. Now score holds zero,
//  and we can use that name anywhere in our code."

export const DeclareAssign: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chipSpring = spring({
    frame: frame - 380,
    fps,
    config: { damping: 15, mass: 0.55, stiffness: 140 },
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 48px",
        gap: 30,
      }}
    >
      <KineticText
        tag="Syntax & Mechanics"
        text="Declare the box. Assign the value."
        startFrame={0}
        fontSize={50}
        weight={800}
        highlight={["Declare", "Assign"]}
        highlightColor={colors.accent}
        staggerFrames={3}
      />

      {/* Code Window */}
      <CodeWindow
        code="let score = 0;"
        filename="app.js"
        startFrame={70}
        charsPerFrame={0.65}
        fontSize={38}
        width={720}
      />

      {/* Variable Box Memory Visualization */}
      <VariableBox
        name="score"
        value="0"
        type="number"
        address="0x7F4A"
        appearFrame={250}
        width={380}
      />

      {/* Operator Breakdown Chip */}
      <div
        style={{
          opacity: interpolate(chipSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(chipSpring, [0, 1], [15, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: colors.bgSoft,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 16,
          padding: "14px 24px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        }}
      >
        <span style={{ fontFamily: fonts.display, color: colors.keyword, fontWeight: 700, fontSize: 20 }}>
          let
        </span>
        <span style={{ color: colors.textMuted, fontSize: 18 }}>creates box</span>
        <span style={{ color: colors.cardBorder }}>|</span>
        <span style={{ fontFamily: fonts.display, color: colors.label, fontWeight: 700, fontSize: 22 }}>
          =
        </span>
        <span style={{ color: colors.textMuted, fontSize: 18 }}>assigns value</span>
      </div>

      <KineticText
        text="The = sign means 'assign', not math equality!"
        startFrame={470}
        fontSize={34}
        color={colors.textMuted}
        highlight={["'assign',"]}
        highlightColor={colors.value}
      />
    </AbsoluteFill>
  );
};
