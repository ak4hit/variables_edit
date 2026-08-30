import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KineticText } from "../components/KineticText";
import { colors, fonts } from "../tokens";

// NARRATION (Scene 4):
// "Names matter. Score tells you what's inside. X doesn't.
//  The rules are simple: no spaces, don't start with a number,
//  and skip words your language already uses, like let itself.
//  Good names are the difference between code you understand
//  in six months, and code you have to relearn from scratch."

const rules = [
  { code: "score", status: "VALID", note: "Descriptive & clear", good: true, delay: 60 },
  { code: "x", status: "AVOID", note: "Vague & ambiguous", good: false, delay: 130 },
  { code: "2total", status: "INVALID", note: "Cannot start with a number", good: false, delay: 200 },
  { code: "let", status: "INVALID", note: "Reserved keyword", good: false, delay: 270 },
];

export const NamingRules: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 48px",
        gap: 32,
      }}
    >
      <KineticText
        tag="Best Practices"
        text="Choose descriptive names. Avoid syntax errors."
        startFrame={0}
        fontSize={50}
        weight={800}
        highlight={["descriptive", "names."]}
        highlightColor={colors.label}
        staggerFrames={3}
      />

      {/* Rules List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
          maxWidth: 720,
          marginTop: 10,
        }}
      >
        {rules.map((r, i) => {
          const cardSpring = spring({
            frame: frame - r.delay,
            fps,
            config: { damping: 15, mass: 0.55, stiffness: 140 },
          });

          const opacity = interpolate(cardSpring, [0, 1], [0, 1]);
          const y = interpolate(cardSpring, [0, 1], [30, 0]);

          const statusColor = r.good ? colors.value : colors.danger;

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: colors.bgSoft,
                border: `1px solid ${colors.cardBorder}`,
                borderRadius: 16,
                padding: "16px 24px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: statusColor,
                  }}
                >
                  {r.good ? "✓" : "✗"}
                </span>
                <span
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 26,
                    fontWeight: 700,
                    color: colors.text,
                  }}
                >
                  {r.code}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 17,
                    color: colors.textMuted,
                  }}
                >
                  {r.note}
                </span>
                <span
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 13,
                    fontWeight: 700,
                    color: statusColor,
                    backgroundColor: `${statusColor}18`,
                    border: `1px solid ${statusColor}44`,
                    padding: "4px 10px",
                    borderRadius: 6,
                  }}
                >
                  {r.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 10 }}>
        <KineticText
          text="Clear names make your code readable forever."
          startFrame={440}
          fontSize={34}
          color={colors.textMuted}
          highlight={["readable"]}
          highlightColor={colors.accent}
        />
      </div>
    </AbsoluteFill>
  );
};
