import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { BackgroundGlow } from "./components/BackgroundGlow";
import { SCENE_FRAMES } from "./tokens";
import { Hook } from "./scenes/Hook";
import { WhatIsVariable } from "./scenes/WhatIsVariable";
import { DeclareAssign } from "./scenes/DeclareAssign";
import { NamingRules } from "./scenes/NamingRules";
import { Reassignment } from "./scenes/Reassignment";
import { DataTypes } from "./scenes/DataTypes";
import { Recap } from "./scenes/Recap";

const HAS_VOICEOVER = true;

export const VariablesVideo: React.FC = () => {
  const scenes = [
    { Comp: Hook, frames: SCENE_FRAMES.hook },
    { Comp: WhatIsVariable, frames: SCENE_FRAMES.whatIs },
    { Comp: DeclareAssign, frames: SCENE_FRAMES.declareAssign },
    { Comp: NamingRules, frames: SCENE_FRAMES.namingRules },
    { Comp: Reassignment, frames: SCENE_FRAMES.reassignment },
    { Comp: DataTypes, frames: SCENE_FRAMES.dataTypes },
    { Comp: Recap, frames: SCENE_FRAMES.recap },
  ];

  let cursor = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0E1015" }}>
      {/* Refined Ambient Studio Lighting */}
      <BackgroundGlow />

      {/* Voiceover Narration Stream */}
      {HAS_VOICEOVER && <Audio src={staticFile("voiceover.mp3")} volume={1.0} />}

      {/* Clean Full-Frame Scene Sequences */}
      {scenes.map(({ Comp, frames }, i) => {
        const from = cursor;
        cursor += frames;
        return (
          <Sequence key={i} from={from} durationInFrames={frames}>
            <Comp />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
