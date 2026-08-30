import React from "react";
import { Composition } from "remotion";
import { VariablesVideo } from "./Video";
import { FPS, TOTAL_FRAMES } from "./tokens";

export const Root: React.FC = () => {
  return (
    <>
      {/* Primary Vertical Reel / Short Composition (9:16) */}
      <Composition
        id="Variables"
        component={VariablesVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* Landscape YouTube Composition (16:9) */}
      <Composition
        id="VariablesLandscape"
        component={VariablesVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
