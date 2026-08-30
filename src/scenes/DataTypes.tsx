import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KineticText } from "../components/KineticText";
import { colors, fonts } from "../tokens";

// NARRATION (Scene 6):
// "And boxes don't just hold numbers. A name could hold text,
//  like your username. It could hold true or false, called a boolean —
//  perfect for yes-or-no questions like is logged in. It could even
//  hold a whole list of things. Same idea every time: a name,
//  pointing at a value."

const typeCards = [
  { name: "score", value: "95", type: "number", icon: "🔢", color: colors.value, delay: 50 },
  { name: "username", value: '"alex_dev"', type: "string", icon: "🔤", color: colors.label, delay: 110 },
  { name: "isLoggedIn", value: "true", type: "boolean", icon: "⚡", color: colors.accent, delay: 170 },
  { name: "scores", value: "[9, 7, 10]", type: "array", icon: "📦", color: colors.keyword, delay: 230 },
];

export const DataTypes: React.FC = () => {
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
        tag="Data Types"
        text="Variables can store any type of data."
        startFrame={0}
        fontSize={50}
        weight={800}
        highlight={["any", "type"]}
        highlightColor={colors.accent}
        staggerFrames={3}
      />

      {/* 2x2 Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          width: "100%",
          maxWidth: 720,
          marginTop: 10,
        }}
      >
        {typeCards.map((card, i) => {
          const cardSpring = spring({
            frame: frame - card.delay,
            fps,
            config: { damping: 15, mass: 0.55, stiffness: 140 },
          });

          const opacity = interpolate(cardSpring, [0, 1], [0, 1]);
          const scale = interpolate(cardSpring, [0, 1], [0.92, 1]);
          const y = interpolate(cardSpring, [0, 1], [25, 0]);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${y}px) scale(${scale})`,
                backgroundColor: colors.bgSoft,
                border: `1px solid ${colors.cardBorder}`,
                borderRadius: 18,
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.35)",
              }}
            >
              {/* Type Badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 18 }}>{card.icon}</span>
                <span
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 12,
                    fontWeight: 700,
                    color: card.color,
                    backgroundColor: `${card.color}15`,
                    border: `1px solid ${card.color}44`,
                    padding: "3px 9px",
                    borderRadius: 6,
                    textTransform: "uppercase",
                  }}
                >
                  {card.type}
                </span>
              </div>

              {/* Variable Name */}
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 20,
                  fontWeight: 700,
                  color: colors.text,
                }}
              >
                {card.name}
              </div>

              {/* Stored Value */}
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 24,
                  fontWeight: 700,
                  color: card.color,
                }}
              >
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 10 }}>
        <KineticText
          text="Same core idea: a name pointing to a value."
          startFrame={360}
          fontSize={34}
          color={colors.textMuted}
          highlight={["name", "value."]}
          highlightColor={colors.label}
        />
      </div>
    </AbsoluteFill>
  );
};
