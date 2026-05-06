import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate} from 'remotion';

interface Mote {
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
  brightness: number;
}

const generateMotes = (count: number, seed: number): Mote[] => {
  const motes: Mote[] = [];
  for (let i = 0; i < count; i++) {
    const s = seed + i * 137.508;
    motes.push({
      x: ((s * 7.31) % 100),
      y: ((s * 3.97) % 100),
      size: 1.5 + ((s * 1.23) % 3),
      speed: 0.15 + ((s * 0.47) % 0.4),
      phase: (s * 2.13) % 6.28,
      brightness: 0.3 + ((s * 0.67) % 0.5),
    });
  }
  return motes;
};

export const Particles: React.FC<{frame: number; rdna: number}> = ({
  frame,
  rdna,
}) => {
  const motes = useMemo(() => generateMotes(35, 42), []);
  const accentR = rdna > 0.5 ? 237 : 56;
  const accentG = rdna > 0.5 ? 28 : 189;
  const accentB = rdna > 0.5 ? 36 : 248;

  const globalFade = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Caustic light sweep
  const causticX = interpolate(frame, [0, 360], [-200, 200]);
  const causticOpacity = 0.04 + Math.sin(frame * 0.04) * 0.02;

  // Scan line (beat-synced moments)
  const scanY = interpolate(frame, [0, 360], [-2, 1082]);
  const scanVisible =
    (frame > 40 && frame < 80) ||
    (frame > 130 && frame < 160) ||
    (frame > 264 && frame < 300);

  return (
    <AbsoluteFill style={{pointerEvents: 'none', opacity: globalFade}}>
      {/* Floating motes */}
      {motes.map((m, i) => {
        const drift = frame * m.speed;
        const px = m.x + Math.sin(drift * 0.03 + m.phase) * 2;
        const py = m.y + Math.cos(drift * 0.02 + m.phase) * 1.5 - drift * 0.08;
        const wrappedY = ((py % 110) + 110) % 110 - 5;
        const fade = Math.sin(drift * 0.015 + m.phase) * 0.5 + 0.5;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${px}%`,
              top: `${wrappedY}%`,
              width: m.size,
              height: m.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(${accentR},${accentG},${accentB},${m.brightness * fade}) 0%, transparent 70%)`,
            }}
          />
        );
      })}

      {/* Caustic light sweep */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `calc(50% + ${causticX}px)`,
          width: 300,
          height: '100%',
          background: `linear-gradient(180deg, rgba(${accentR},${accentG},${accentB},0.02) 0%, transparent 25%, rgba(${accentR},${accentG},${accentB},0.015) 50%, transparent 75%)`,
          transform: 'skewX(-10deg)',
          opacity: causticOpacity,
        }}
      />

      {/* Bloom / pressure haze at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '20%',
          right: '20%',
          height: 200,
          background: `radial-gradient(ellipse 80% 100% at 50% 100%, rgba(${accentR},${accentG},${accentB},0.04) 0%, transparent 70%)`,
          opacity: 0.6 + Math.sin(frame * 0.03) * 0.2,
        }}
      />

      {/* Horizontal scan line */}
      {scanVisible && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: scanY % 1080,
            height: 1,
            background: `linear-gradient(90deg, transparent 5%, rgba(${accentR},${accentG},${accentB},0.08) 25%, rgba(${accentR},${accentG},${accentB},0.15) 50%, rgba(${accentR},${accentG},${accentB},0.08) 75%, transparent 95%)`,
          }}
        />
      )}

      {/* Bokeh circles — 4 large soft ones */}
      {[
        {x: 15, y: 25, s: 50, sp: 0.4},
        {x: 72, y: 60, s: 35, sp: 0.3},
        {x: 40, y: 80, s: 45, sp: 0.5},
        {x: 85, y: 20, s: 30, sp: 0.35},
      ].map((b, i) => {
        const bx = b.x + Math.sin(frame * 0.01 * b.sp + i) * 3;
        const by = b.y + Math.cos(frame * 0.008 * b.sp + i * 2) * 2;
        const bOpacity =
          (Math.sin(frame * 0.02 * b.sp + i * 1.5) * 0.5 + 0.5) * 0.25;
        return (
          <div
            key={`bokeh-${i}`}
            style={{
              position: 'absolute',
              left: `${bx}%`,
              top: `${by}%`,
              width: b.s,
              height: b.s,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(${accentR},${accentG},${accentB},0.12) 0%, transparent 60%)`,
              filter: 'blur(2px)',
              opacity: bOpacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
