import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KineticText } from "../components/KineticText";
import { colors, fonts } from "../tokens";

// NARRATION (Scene 7):
// "So: a variable is a labeled box. You declare it, you assign a
//  value, and that value can change any time. That's it — that's
//  the idea every single program is built on. Follow for the next
//  concept: functions."

const takeaways = [
  { num: "1", title: "DECLARE", desc: "Allocate the labeled container", color: colors.keyword, delay: 40 },
  { num: "2", title: "ASSIGN", desc: "Store the initial value inside", color: colors.accent, delay: 100 },
  { num: "3", title: "MUTATE", desc: "Update the value whenever needed", color: colors.value, delay: 160 },
];

export const Recap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaSpring = spring({
    frame: frame - 280,
    fps,
    config: { damping: 14, mass: 0.55, stiffness: 150 },
  });

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
        tag="Summary"
        text="A variable: a labeled box that can vary."
        startFrame={0}
        fontSize={50}
        weight={800}
        highlight={["labeled", "box", "vary."]}
        highlightColor={colors.label}
        staggerFrames={3}
      />

      {/* 3 Step Takeaways */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
          maxWidth: 680,
          marginTop: 10,
        }}
      >
        {takeaways.map((item, i) => {
          const itemSpring = spring({
            frame: frame - item.delay,
            fps,
            config: { damping: 15, mass: 0.55, stiffness: 140 },
          });

          return (
            <div
              key={i}
              style={{
                opacity: interpolate(itemSpring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(itemSpring, [0, 1], [20, 0])}px)`,
                backgroundColor: colors.bgSoft,
                border: `1px solid ${colors.cardBorder}`,
                borderRadius: 16,
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: 18,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  backgroundColor: `${item.color}18`,
                  border: `1px solid ${item.color}55`,
                  color: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: fonts.display,
                  fontWeight: 800,
                  fontSize: 16,
                }}
              >
                {item.num}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 17,
                    fontWeight: 700,
                    color: item.color,
                    letterSpacing: 0.5,
                  }}
                >
                  {item.title}
                </span>
                <span style={{ fontFamily: fonts.body, fontSize: 16, color: colors.textMuted }}>
                  {item.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: interpolate(ctaSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(ctaSpring, [0, 1], [0.9, 1])})`,
          marginTop: 16,
          backgroundColor: colors.bgCard,
          border: `1px solid ${colors.accent}66`,
          padding: "16px 36px",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
        }}
      >
        <span
          style={{
            fontFamily: fonts.display,
            fontSize: 22,
            fontWeight: 800,
            color: colors.text,
            letterSpacing: 0.5,
          }}
        >
          NEXT LESSON: <span style={{ color: colors.value }}>FUNCTIONS</span> →
        </span>
      </div>
    </AbsoluteFill>
  );
};
