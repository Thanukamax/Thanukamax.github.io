import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';

export const FarBackground: React.FC<{frame: number; rdna: number}> = ({
  frame,
  rdna,
}) => {
  const blueHue = interpolate(rdna, [0, 1], [210, 0]);
  const hueShift = `hue-rotate(${interpolate(rdna, [0, 1], [0, -30])}deg)`;

  return (
    <AbsoluteFill style={{filter: hueShift}}>
      {/* Deep abyss gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 120% 90% at 40% 30%, rgba(6, 60, 120, 0.35) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 75% 70%, rgba(4, 40, 80, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 100% 50% at 50% 100%, rgba(6, 30, 60, 0.25) 0%, transparent 50%),
            linear-gradient(180deg, #010812 0%, #020e1c 40%, #010a14 100%)
          `,
        }}
      />

      {/* Distant horizon glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background:
            'linear-gradient(180deg, transparent 0%, rgba(6, 50, 100, 0.08) 60%, rgba(8, 60, 110, 0.05) 100%)',
          opacity: interpolate(frame, [0, 30], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      />

      {/* Slow-moving distant architectural ribs — left */}
      {[1, 2, 3].map((i) => (
        <div
          key={`rib-l-${i}`}
          style={{
            position: 'absolute',
            left: 20 + i * 40,
            top: '5%',
            bottom: 0,
            width: 2,
            background: `rgba(56, 189, 248, ${0.015 + i * 0.005})`,
            transform: `rotate(${1.5 + i * 1.5}deg)`,
            transformOrigin: 'bottom center',
            opacity: interpolate(frame, [0, 60], [0, 0.6], {
              extrapolateRight: 'clamp',
            }),
          }}
        />
      ))}

      {/* Distant ribs — right (mirrored) */}
      {[1, 2, 3].map((i) => (
        <div
          key={`rib-r-${i}`}
          style={{
            position: 'absolute',
            right: 20 + i * 40,
            top: '5%',
            bottom: 0,
            width: 2,
            background: `rgba(56, 189, 248, ${0.015 + i * 0.005})`,
            transform: `rotate(${-1.5 - i * 1.5}deg)`,
            transformOrigin: 'bottom center',
            opacity: interpolate(frame, [0, 60], [0, 0.6], {
              extrapolateRight: 'clamp',
            }),
          }}
        />
      ))}

      {/* Ambient pressure orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `rgba(6, 78, 130, ${0.15 + rdna * 0.05})`,
          filter: 'blur(120px)',
          transform: `translate(${Math.sin(frame * 0.008) * 20}px, ${Math.cos(frame * 0.006) * 15}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `rgba(6, 50, 90, ${0.1 + rdna * 0.03})`,
          filter: 'blur(100px)',
          transform: `translate(${Math.sin(frame * 0.005 + 2) * 15}px, ${Math.cos(frame * 0.007 + 1) * 12}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
