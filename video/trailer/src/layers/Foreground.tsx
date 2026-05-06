import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';

export const Foreground: React.FC<{frame: number; rdna: number}> = ({
  frame,
  rdna,
}) => {
  const baseColor = rdna > 0.5 ? '10, 4, 4' : '1, 8, 18';

  // Foreground rocks/structure slide in from edges
  const leftSlide = interpolate(frame, [0, 30], [-60, 0], {
    extrapolateRight: 'clamp',
  });
  const rightSlide = interpolate(frame, [0, 30], [60, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {/* Left rock/structure silhouette */}
      <svg
        viewBox="0 0 200 1080"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: 200,
          transform: `translateX(${leftSlide}px)`,
          opacity: 0.6,
        }}
      >
        <path
          d="M0 0 L80 0 L70 80 L95 140 L85 300 L100 360 L90 520 L105 580 L95 720 L85 800 L95 920 L70 1080 L0 1080 Z"
          fill={`rgb(${baseColor})`}
        />
        <path
          d="M50 200 L72 215 L65 280 L50 290 Z"
          fill={`rgb(${baseColor})`}
          opacity="0.7"
        />
      </svg>

      {/* Right structure silhouette */}
      <svg
        viewBox="0 0 180 1080"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          width: 180,
          transform: `translateX(${rightSlide}px)`,
          opacity: 0.6,
        }}
      >
        <path
          d="M180 0 L110 0 L120 60 L100 120 L110 280 L95 340 L105 500 L90 560 L100 700 L92 780 L105 900 L115 1080 L180 1080 Z"
          fill={`rgb(${baseColor})`}
        />
        <path
          d="M120 400 L98 415 L105 480 L120 490 Z"
          fill={`rgb(${baseColor})`}
          opacity="0.7"
        />
      </svg>

      {/* Top hanging silhouette */}
      <svg
        viewBox="0 0 1920 80"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 80,
          opacity: interpolate(frame, [0, 20], [0, 0.45], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <path
          d="M0 0 L1920 0 L1920 20 L1600 16 L1500 35 L1400 22 L1100 26 L1050 50 L980 28 L700 22 L650 42 L580 25 L300 18 L240 35 L180 20 L0 22 Z"
          fill={`rgb(${baseColor})`}
        />
      </svg>

      {/* Bottom ground silhouette */}
      <svg
        viewBox="0 0 1920 60"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 60,
          opacity: interpolate(frame, [0, 20], [0, 0.5], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <path
          d="M0 60 L1920 60 L1920 45 L1650 47 L1580 30 L1500 42 L1200 44 L1120 25 L1050 38 L800 42 L720 28 L650 38 L400 44 L320 32 L250 42 L0 46 Z"
          fill={`rgb(${baseColor})`}
        />
      </svg>

      {/* Edge vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(90deg, rgba(${baseColor}, 0.4) 0%, transparent 10%, transparent 90%, rgba(${baseColor}, 0.4) 100%),
            linear-gradient(180deg, rgba(${baseColor}, 0.2) 0%, transparent 6%, transparent 94%, rgba(${baseColor}, 0.25) 100%)
          `,
        }}
      />
    </AbsoluteFill>
  );
};
