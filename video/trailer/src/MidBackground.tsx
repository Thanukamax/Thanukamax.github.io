
import React from 'react';
import {AbsoluteFill, interpolate, spring, useVideoConfig} from 'remotion';

export const MidBackground: React.FC<{frame: number; rdna: number}> = ({frame, rdna}) => {
  const {fps} = useVideoConfig();
  const intro = spring({fps, frame: frame - 8, config: {damping: 200, stiffness: 90}});
  const slowFloat = Math.sin(frame * 0.015) * 14;
  const accent = rdna > 0.5 ? '237,28,36' : '86,214,255';

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      {/* Observatory / submerged window */}
      <div
        style={{
          position: 'absolute',
          top: '49%',
          left: '50%',
          width: 760,
          height: 760,
          transform: `translate(-50%, -50%) scale(${0.88 + intro * 0.12}) translateY(${slowFloat * 0.15}px)`,
          opacity: 0.25 + intro * 0.75,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `1px solid rgba(${accent},0.16)`,
            boxShadow: `0 0 80px rgba(${accent},0.05), inset 0 0 80px rgba(${accent},0.02)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 42,
            borderRadius: '50%',
            border: `1px solid rgba(${accent},0.10)`,
            transform: `rotate(${frame * 0.12}deg)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 96,
            borderRadius: '50%',
            border: `1px solid rgba(${accent},0.14)`,
            transform: `rotate(${-frame * 0.08}deg)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 164,
            borderRadius: '50%',
            border: `1px solid rgba(${accent},0.08)`,
          }}
        />

        {/* crosshair lines */}
        <div style={{position: 'absolute', top: '50%', left: 120, right: 120, height: 1, background: `rgba(${accent},0.08)`}} />
        <div style={{position: 'absolute', left: '50%', top: 120, bottom: 120, width: 1, background: `rgba(${accent},0.08)`}} />

        {/* core */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 18,
            height: 18,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: rdna > 0.5 ? '#ff4651' : '#6ce0ff',
            boxShadow: rdna > 0.5
              ? '0 0 26px rgba(255,70,81,0.65),0 0 90px rgba(255,70,81,0.18)'
              : '0 0 26px rgba(108,224,255,0.65),0 0 90px rgba(108,224,255,0.18)',
          }}
        />
      </div>

      {/* Midground pillar silhouettes */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.36,
          transform: `translateY(${slowFloat * 0.3}px)`,
        }}
      >
        <path d="M210 1080 L250 270 L335 180 L388 1080 Z" fill="rgba(10,29,46,0.9)" />
        <path d="M1480 1080 L1544 220 L1630 160 L1694 1080 Z" fill="rgba(10,29,46,0.9)" />
        <path d="M860 1080 L920 430 L1000 390 L1060 1080 Z" fill="rgba(10,29,46,0.55)" />
      </svg>

      {/* Soft side arches */}
      {[0,1].map((i)=>(
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-12%',
            [i===0 ? 'left' : 'right']: '-10%',
            width: 620,
            height: 1100,
            border: `1px solid rgba(${accent},0.05)`,
            borderRadius: '48% 52% 0 0 / 68% 68% 0 0',
            transform: `rotate(${i===0 ? -8 : 8}deg) translateY(${slowFloat * 0.1}px)`,
            opacity: 0.7,
          } as React.CSSProperties}
        />
      ))}

      {/* faint HUD glyphs */}
      <div
        style={{
          position: 'absolute',
          left: '8%',
          top: '18%',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12,
          letterSpacing: '0.18em',
          color: `rgba(${accent},0.26)`,
          textTransform: 'uppercase',
        }}
      >
        Depth / Observatory / Pelagic
      </div>
      <div
        style={{
          position: 'absolute',
          right: '8%',
          top: '20%',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12,
          letterSpacing: '0.18em',
          color: `rgba(${accent},0.22)`,
          textTransform: 'uppercase',
        }}
      >
        Signal // Build Archive
      </div>
    </AbsoluteFill>
  );
};
