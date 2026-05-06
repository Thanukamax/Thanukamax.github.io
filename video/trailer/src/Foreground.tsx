
import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';

export const Foreground: React.FC<{frame: number; rdna: number}> = ({frame, rdna}) => {
  const leftIn = interpolate(frame, [0, 26], [-90, 0], {extrapolateRight: 'clamp'});
  const rightIn = interpolate(frame, [0, 26], [90, 0], {extrapolateRight: 'clamp'});
  const float = Math.sin(frame * 0.018) * 10;
  const base = rdna > 0.5 ? '18,4,6' : '2,8,18';

  return (
    <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
      {/* Left foreground rock */}
      <svg
        viewBox="0 0 500 1080"
        style={{
          position: 'absolute',
          left: -40,
          bottom: -20,
          width: 500,
          height: 1080,
          transform: `translateX(${leftIn}px) translateY(${float * 0.6}px)`,
          opacity: 0.96,
          filter: 'blur(0.2px)',
        }}
      >
        <path
          d="M0 1080 L0 460 L120 420 L170 360 L210 290 L260 240 L340 220 L380 260 L430 355 L462 520 L470 1080 Z"
          fill={`rgba(${base},0.94)`}
        />
        <path
          d="M220 460 L290 418 L330 510 L250 560 Z"
          fill={`rgba(${base},0.58)`}
        />
      </svg>

      {/* Right foreground rock / structural shard */}
      <svg
        viewBox="0 0 520 1080"
        style={{
          position: 'absolute',
          right: -40,
          bottom: -20,
          width: 520,
          height: 1080,
          transform: `translateX(${rightIn}px) translateY(${float * -0.45}px)`,
          opacity: 0.96,
          filter: 'blur(0.2px)',
        }}
      >
        <path
          d="M520 1080 L520 430 L438 396 L380 330 L344 260 L268 220 L196 250 L140 330 L94 462 L58 1080 Z"
          fill={`rgba(${base},0.94)`}
        />
        <path
          d="M296 504 L224 470 L188 558 L272 594 Z"
          fill={`rgba(${base},0.58)`}
        />
      </svg>

      {/* Bottom occlusion shelf */}
      <svg
        viewBox="0 0 1920 220"
        style={{
          position: 'absolute',
          bottom: -8,
          left: 0,
          width: '100%',
          height: 240,
          opacity: 0.74,
        }}
      >
        <path
          d="M0 220 L0 146 L160 132 L242 96 L360 122 L476 92 L620 126 L760 84 L908 118 L1028 78 L1182 124 L1310 90 L1450 126 L1580 94 L1714 138 L1820 128 L1920 146 L1920 220 Z"
          fill={`rgba(${base},0.84)`}
        />
      </svg>

      {/* top near-camera shadow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, rgba(${base},0.28) 0%, rgba(${base},0.08) 8%, transparent 18%, transparent 82%, rgba(${base},0.14) 100%)`,
        }}
      />

      {/* Edge blur / camera vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: `inset 0 0 120px rgba(${base},0.32)`,
        }}
      />
    </AbsoluteFill>
  );
};
