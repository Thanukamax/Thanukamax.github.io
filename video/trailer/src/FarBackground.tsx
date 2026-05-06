
import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';

export const FarBackground: React.FC<{frame: number; rdna: number}> = ({frame, rdna}) => {
  const drift = Math.sin(frame * 0.01) * 18;
  const hue = rdna > 0.5 ? 'hue-rotate(-32deg) saturate(1.05)' : 'none';
  const glowOpacity = interpolate(frame, [0, 40, 360], [0.45, 1, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{overflow: 'hidden', filter: hue}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 90% 80% at 50% 18%, rgba(32,125,196,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 120% 90% at 50% 100%, rgba(5,25,44,0.95) 0%, rgba(3,12,22,1) 55%, #01060f 100%),
            linear-gradient(180deg, #04111d 0%, #03101b 28%, #020913 65%, #01060f 100%)
          `,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: glowOpacity,
          transform: `translateY(${drift * 0.18}px)`,
          background: `
            radial-gradient(circle at 50% 22%, rgba(64, 194, 255, 0.14) 0%, transparent 26%),
            radial-gradient(circle at 18% 16%, rgba(20, 110, 176, 0.10) 0%, transparent 28%),
            radial-gradient(circle at 82% 24%, rgba(20, 110, 176, 0.08) 0%, transparent 26%)
          `,
        }}
      />

      {/* Distant waterline / horizon haze */}
      <div
        style={{
          position: 'absolute',
          left: '-5%',
          right: '-5%',
          top: '34%',
          height: '22%',
          opacity: 0.45,
          transform: `translateX(${drift * 0.12}px)`,
          background:
            'linear-gradient(180deg, transparent 0%, rgba(40,130,196,0.05) 35%, rgba(72,195,255,0.08) 50%, rgba(20,70,110,0.05) 80%, transparent 100%)',
          filter: 'blur(18px)',
        }}
      />

      {/* Distant cliff / structure silhouettes */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          transform: `translateX(${drift * 0.3}px)`,
        }}
      >
        <path
          d="M0 660 L120 610 L250 640 L360 590 L520 645 L680 560 L820 608 L930 570 L1100 630 L1260 555 L1410 600 L1590 548 L1750 610 L1920 580 L1920 1080 L0 1080 Z"
          fill="rgba(7,19,31,0.85)"
        />
      </svg>

      {/* Tall distant observatory ribs */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: '-5%',
            left: `${18 + i * 20}%`,
            width: 2,
            height: `${48 + i * 8}%`,
            transform: `rotate(${i % 2 === 0 ? -6 : 5}deg) translateX(${drift * (0.08 + i * 0.02)}px)`,
            transformOrigin: 'bottom center',
            background: `linear-gradient(180deg, rgba(95,210,255,0.00) 0%, rgba(95,210,255,${0.05 + i * 0.01}) 35%, rgba(25,78,120,0.22) 100%)`,
            filter: 'blur(0.4px)',
            opacity: 0.8,
          }}
        />
      ))}

      {/* Very soft top-down light shafts */}
      {[18, 42, 68].map((x, idx) => (
        <div
          key={x}
          style={{
            position: 'absolute',
            top: '-6%',
            left: `${x}%`,
            width: 180,
            height: '78%',
            transform: `translateX(${drift * (0.15 + idx * 0.05)}px) skewX(${idx === 1 ? -5 : 4}deg)`,
            background: 'linear-gradient(180deg, rgba(120,220,255,0.08) 0%, rgba(70,160,220,0.03) 32%, transparent 72%)',
            filter: 'blur(40px)',
            opacity: 0.5,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
