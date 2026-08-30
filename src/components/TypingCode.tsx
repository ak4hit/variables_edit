import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, fonts } from "../tokens";

type Props = {
  code: string;
  startFrame: number;
  charsPerFrame?: number; // typing speed
  fontSize?: number;
};

/** Simulates someone typing a line of code, cursor included. */
export const TypingCode: React.FC<Props> = ({
  code,
  startFrame,
  charsPerFrame = 0.9,
  fontSize = 44,
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charsShown = Math.min(code.length, Math.floor(elapsed * charsPerFrame));
  const shown = code.slice(0, charsShown);
  const isTyping = charsShown < code.length;
  const cursorOn = Math.floor(frame / 10) % 2 === 0;

  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize,
        color: colors.text,
        background: colors.bgSoft,
        border: `1px solid ${colors.boxStroke}`,
        borderRadius: 12,
        padding: "20px 28px",
        minWidth: 480,
      }}
    >
      {shown}
      {(isTyping ? true : cursorOn) && (
        <span style={{ color: colors.value }}>▍</span>
      )}
    </div>
  );
};
