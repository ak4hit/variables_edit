import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../tokens";

type Props = {
  code: string;
  filename?: string;
  startFrame?: number;
  charsPerFrame?: number;
  fontSize?: number;
  highlightedLine?: number;
  width?: number | string;
};

export const CodeWindow: React.FC<Props> = ({
  code,
  filename = "script.js",
  startFrame = 0,
  charsPerFrame = 0.85,
  fontSize = 36,
  highlightedLine,
  width = 820,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 130 },
  });
  const scale = interpolate(enter, [0, 1], [0.95, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const translateY = interpolate(enter, [0, 1], [20, 0]);

  const elapsed = Math.max(0, frame - startFrame);
  const charsShown = Math.min(code.length, Math.floor(elapsed * charsPerFrame));
  const shownCode = code.slice(0, charsShown);
  const isTyping = charsShown < code.length;
  const cursorOn = Math.floor(frame / 12) % 2 === 0;

  const lines = shownCode.split("\n");

  const renderHighlightedToken = (token: string, key: number) => {
    if (["let", "const", "var"].includes(token)) {
      return (
        <span key={key} style={{ color: colors.keyword, fontWeight: 700 }}>
          {token}
        </span>
      );
    }
    if (token === "=" || token === ";" || token === "+" || token === ":") {
      return (
        <span key={key} style={{ color: colors.textDim }}>
          {token}
        </span>
      );
    }
    if (!isNaN(Number(token))) {
      return (
        <span key={key} style={{ color: colors.value, fontWeight: 600 }}>
          {token}
        </span>
      );
    }
    if (token.startsWith('"') || token.startsWith("'")) {
      return (
        <span key={key} style={{ color: colors.label }}>
          {token}
        </span>
      );
    }
    if (token === "true" || token === "false") {
      return (
        <span key={key} style={{ color: colors.accent, fontWeight: 600 }}>
          {token}
        </span>
      );
    }
    if (["score", "username", "isLoggedIn", "scores"].includes(token)) {
      return (
        <span key={key} style={{ color: colors.text, fontWeight: 600 }}>
          {token}
        </span>
      );
    }
    return (
      <span key={key} style={{ color: colors.text }}>
        {token}
      </span>
    );
  };

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        width,
        maxWidth: "92vw",
        backgroundColor: colors.bgSoft,
        borderRadius: 18,
        border: `1px solid ${colors.cardBorder}`,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)",
        overflow: "hidden",
      }}
    >
      {/* Clean Window Title Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 22px",
          backgroundColor: colors.bgCard,
          borderBottom: `1px solid ${colors.cardBorder}`,
        }}
      >
        {/* Window Dots */}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F56", opacity: 0.85 }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FFBD2E", opacity: 0.85 }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27C93F", opacity: 0.85 }} />
        </div>

        {/* Tab File Title */}
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 15,
            color: colors.textMuted,
            fontWeight: 500,
          }}
        >
          {filename}
        </div>

        <div style={{ width: 40 }} />
      </div>

      {/* Editor Content Area */}
      <div
        style={{
          padding: "24px 28px",
          fontFamily: fonts.display,
          fontSize,
          lineHeight: 1.6,
        }}
      >
        {lines.map((line, lineIdx) => {
          const isLineHighlighted = highlightedLine === lineIdx + 1;
          const tokens = line.split(/(\s+|[=;:,+\(\)\[\]])/).filter(Boolean);

          return (
            <div
              key={lineIdx}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isLineHighlighted
                  ? "rgba(59, 130, 246, 0.08)"
                  : "transparent",
                borderRadius: 6,
                padding: "2px 0",
              }}
            >
              {/* Line Number */}
              <span
                style={{
                  width: 36,
                  userSelect: "none",
                  color: colors.textDim,
                  fontSize: fontSize * 0.7,
                  textAlign: "right",
                  marginRight: 24,
                }}
              >
                {lineIdx + 1}
              </span>

              {/* Code Line */}
              <div style={{ display: "flex", flexWrap: "wrap", whiteSpace: "pre" }}>
                {tokens.map((t, tIdx) => renderHighlightedToken(t, tIdx))}
                {lineIdx === lines.length - 1 && (isTyping || cursorOn) && (
                  <span style={{ color: colors.accent, marginLeft: 2, fontWeight: 700 }}>▍</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
