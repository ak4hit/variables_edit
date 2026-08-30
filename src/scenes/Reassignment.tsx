import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CodeWindow } from "../components/CodeWindow";
import { KineticText } from "../components/KineticText";
import { VariableBox } from "../components/VariableBox";
import { colors, fonts } from "../tokens";

// NARRATION (Scene 5):
// "Here's the key idea in the name itself: variables can vary.
//  The box stays, the label stays — but what's inside can change.
//  Score equals zero. Then later, score equals ten. Same box.
//  New value. The old value is just gone, replaced."

export const Reassignment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const timelineSpring = spring({
    frame: frame - 320,
    fps,
    config: { damping: 15, mass: 0.55, stiffness: 140 },
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 48px",
        gap: 28,
      }}
    >
      <KineticText
        tag="Data Mutation"
        text="Variables can vary. That's the key idea."
        startFrame={0}
        fontSize={50}
        weight={800}
        highlight={["vary.", "idea."]}
        highlightColor={colors.value}
        staggerFrames={3}
      />

      {/* Multi-line Code Window */}
      <CodeWindow
        code="let score = 0;\nscore = 10;"
        filename="game.js"
        startFrame={60}
        charsPerFrame={0.7}
        fontSize={36}
        highlightedLine={2}
        width={720}
      />

      {/* Variable Box with Smooth 3D Flip Mutation */}
      <VariableBox
        name="score"
        value="0"
        type="number"
        address="0x7F4A"
        appearFrame={40}
        changeAtFrame={240}
        newValue="10"
        width={380}
      />

      {/* Memory Overwrite Card */}
      <div
        style={{
          opacity: interpolate(timelineSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(timelineSpring, [0, 1], [15, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: colors.bgSoft,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 16,
          padding: "12px 24px",
          fontFamily: fonts.display,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        }}
      >
        <span style={{ color: colors.danger, textDecoration: "line-through", fontSize: 22, opacity: 0.8 }}>
          0
        </span>
        <span style={{ color: colors.textMuted, fontSize: 18 }}>→ Replaced in memory with →</span>
        <span style={{ color: colors.value, fontWeight: 700, fontSize: 26 }}>
          10
        </span>
      </div>

      <KineticText
        text="Same label. New value. Old value replaced."
        startFrame={440}
        fontSize={34}
        color={colors.textMuted}
        highlight={["New", "value."]}
        highlightColor={colors.value}
      />
    </AbsoluteFill>
  );
};
