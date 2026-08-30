import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KineticText } from "../components/KineticText";
import { colors, fonts } from "../tokens";

// NARRATION (Scene 1):
// "Every app you use — Instagram, Spotify, your calculator app —
//  is built on one simple idea. It's called a variable.
//  And in the next few minutes, you'll actually understand it."

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appCards = [
    { name: "Instagram", varName: "likesCount", val: "1,420", dotColor: "#E1306C", delay: 40 },
    { name: "Spotify", varName: "currentTrack", val: '"Starboy"', dotColor: "#1DB954", delay: 65 },
    { name: "Calculator", varName: "totalAmount", val: "42.50", dotColor: colors.label, delay: 90 },
  ];

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
        tag="Core Concept"
        text="Every app you use is built on one simple idea."
        startFrame={0}
        fontSize={56}
        weight={800}
        highlight={["one", "simple", "idea."]}
        highlightColor={colors.accent}
        staggerFrames={3}
      />

      {/* Floating App Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
          maxWidth: 680,
          marginTop: 10,
        }}
      >
        {appCards.map((app, idx) => {
          const cardSpring = spring({
            frame: frame - app.delay,
            fps,
            config: { damping: 15, mass: 0.6, stiffness: 140 },
          });
          const opacity = interpolate(cardSpring, [0, 1], [0, 1]);
          const y = interpolate(cardSpring, [0, 1], [30, 0]);

          return (
            <div
              key={idx}
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: colors.bgSoft,
                border: `1px solid ${colors.cardBorder}`,
                borderRadius: 16,
                padding: "18px 26px",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: app.dotColor,
                  }}
                />
                <span
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 22,
                    fontWeight: 700,
                    color: colors.text,
                  }}
                >
                  {app.name}
                </span>
              </div>

              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 19,
                  color: colors.textMuted,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: colors.label, fontWeight: 600 }}>{app.varName}</span>
                <span style={{ color: colors.textDim }}>=</span>
                <span style={{ color: colors.value, fontWeight: 600 }}>{app.val}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Reveal */}
      <div style={{ marginTop: 20 }}>
        <KineticText
          text="It's called a VARIABLE."
          startFrame={170}
          fontSize={66}
          weight={900}
          fontFamily="display"
          highlight={["VARIABLE."]}
          highlightColor={colors.value}
          staggerFrames={4}
        />
      </div>
    </AbsoluteFill>
  );
};
