
import React from "react";
import {
  AbsoluteFill,
  Composition,
  CalculateMetadataFunction,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => ({
  durationInFrames: 300,
  fps: 30,
  width: 1080,
  height: 1920,
});

const rain = Array.from({ length: 55 }, (_, i) => ({
  left: (i * 37) % 1080,
  top: (i * 83) % 1920,
  speed: 9 + (i % 7) * 2,
  opacity: 0.15 + (i % 5) * 0.07,
}));

export const MyComposition: React.FC = () => (
  <Composition
    id="MyComp"
    component={MyComponent}
    durationInFrames={300}
    fps={30}
    width={1080}
    height={1920}
    calculateMetadata={calculateMetadata}
  />
);

export const MyComponent: React.FC<Props> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = interpolate(frame, [0, 300], [1.08, 1], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [45, 90, 250, 290], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [45, 100], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glow = 0.5 + Math.sin(frame / 18) * 0.12;

  return (
    <AbsoluteFill
      style={{
        background: "#07111f",
        overflow: "hidden",
        fontFamily: "'Noto Sans Bengali', 'Nirmala UI', sans-serif",
      }}
    >
      {/* Night sky */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, #081426 0%, #152c42 48%, #09121e 100%)",
          transform: `scale(${zoom})`,
        }}
      />

      {/* Moon */}
      <div
        style={{
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "#f2e8cf",
          top: 190,
          right: 125,
          boxShadow: "0 0 90px 35px rgba(242,232,207,0.12)",
          opacity: 0.85,
        }}
      />

      {/* Distant city skyline */}
      {[130, 240, 390, 510, 690, 830, 960].map((x, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: 620,
            left: x,
            width: 100 + (i % 3) * 25,
            height: 280 + (i % 4) * 90,
            background: "#101d2c",
            borderRadius: "8px 8px 0 0",
            opacity: 0.8,
          }}
        />
      ))}

      {/* Distant building lights */}
      {Array.from({ length: 28 }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 145 + ((i * 71) % 800),
            bottom: 670 + ((i * 29) % 260),
            width: 9,
            height: 14,
            background: i % 3 === 0 ? "#e9b96e" : "#647c91",
            opacity: 0.35 + (Math.sin(frame / 12 + i) + 1) * 0.2,
          }}
        />
      ))}

      {/* Foreground house */}
      <div
        style={{
          position: "absolute",
          left: -50,
          right: -50,
          bottom: 0,
          height: 870,
          background: "linear-gradient(160deg, #263342, #101923)",
          borderRadius: "35px 35px 0 0",
          boxShadow: "0 -25px 90px rgba(0,0,0,0.35)",
        }}
      />

      {/* Roof */}
      <div
        style={{
          position: "absolute",
          bottom: 840,
          left: 0,
          right: 0,
          height: 55,
          background: "#354657",
          transform: "skewY(-2deg)",
        }}
      />

      {/* Warm window light */}
      <div
        style={{
          position: "absolute",
          bottom: 430,
          left: 290,
          width: 500,
          height: 410,
          background: `rgba(255,190,105,${glow})`,
          filter: "blur(85px)",
          opacity: 0.65,
        }}
      />

      {/* Window */}
      <div
        style={{
          position: "absolute",
          bottom: 520,
          left: 335,
          width: 410,
          height: 330,
          background: "#e8ae69",
          border: "18px solid #263747",
          boxShadow: "0 0 35px rgba(255,180,95,0.3)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "48%",
            width: 12,
            height: "100%",
            background: "#29394a",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "48%",
            width: "100%",
            height: 12,
            background: "#29394a",
          }}
        />
      </div>

      {/* Rain */}
      {rain.map((drop, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: drop.left,
            top: (drop.top + frame * drop.speed) % 2100 - 100,
            width: 2,
            height: 35,
            background: "rgba(190,215,235,0.65)",
            opacity: drop.opacity,
            transform: "rotate(12deg)",
          }}
        />
      ))}

      {/* Cinematic vignette */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25), transparent 35%, transparent 65%, rgba(0,0,0,0.65))",
        }}
      />

      {/* Story title */}
      <div
        style={{
          position: "absolute",
          top: 250,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            color: "#e9c99a",
            fontSize: 25,
            letterSpacing: 9,
            marginBottom: 35,
          }}
        >
          একটি ছোট্ট গল্প
        </div>

        <div
          style={{
            color: "#fff3df",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.55,
            textShadow: "0 5px 30px rgba(0,0,0,0.7)",
          }}
        >
          দরজাটা
          <br />
          খোলা রেখো
        </div>

        <div
          style={{
            width: 110,
            height: 3,
            background: "#d9ad78",
            margin: "45px auto",
            opacity: titleOpacity,
          }}
        />

        <div
          style={{
            color: "#d7d9df",
            fontSize: 27,
            letterSpacing: 2,
          }}
        >
          কিছু অপেক্ষার শেষ হয় না...
        </div>
      </div>

      {/* Bottom cinematic caption */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          width: "100%",
          textAlign: "center",
          color: "rgba(255,255,255,0.65)",
          fontSize: 22,
          letterSpacing: 4,
        }}
      >
        TRUSTECH ORIGINAL STORIES
      </div>
    </AbsoluteFill>
  );
};
