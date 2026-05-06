import React from 'react';
import {AbsoluteFill, interpolate, Easing} from 'remotion';

export const MidBackground: React.FC<{frame: number; rdna: number}> = ({
  frame,
  rdna,
}) => {
  const accentColor = rdna > 0.5 ? '237, 28, 36' : '56, 189, 248';

  // Observatory ring rotation
  const ring1Rot = frame * 0.8;
  const ring2Rot = -frame * 0.6;
  const ring3Rot = frame * 0.4;

  // Ring reveal
  const ringOpacity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Ring scale entrance
  const ringScale = interpolate(frame, [20, 70], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      {/* Grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(${accentColor}, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${accentColor}, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage:
            'radial-gradient(ellipse 60% 55% at 50% 40%, rgba(0,0,0,0.5) 0%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 55% at 50% 40%, rgba(0,0,0,0.5) 0%, transparent 70%)',
          opacity: interpolate(frame, [0, 40], [0, 0.5], {
            extrapolateRight: 'clamp',
          }),
        }}
      />

      {/* Observatory ring system — centered */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          width: 520,
          height: 520,
          opacity: ringOpacity,
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `1px solid rgba(${accentColor}, 0.12)`,
            transform: `rotate(${ring1Rot}deg)`,
          }}
        >
          {/* Tick marks */}
          <div style={{position: 'absolute', top: -1, left: '50%', width: 22, height: 1, background: `rgba(${accentColor}, 0.2)`, transform: 'translateX(-50%)'}} />
          <div style={{position: 'absolute', bottom: -1, left: '50%', width: 22, height: 1, background: `rgba(${accentColor}, 0.2)`, transform: 'translateX(-50%)'}} />
        </div>

        {/* Middle ring */}
        <div
          style={{
            position: 'absolute',
            inset: 35,
            borderRadius: '50%',
            border: `1px solid rgba(${accentColor}, 0.09)`,
            transform: `rotate(${ring2Rot}deg)`,
          }}
        >
          <div style={{position: 'absolute', top: '50%', left: -1, width: 1, height: 16, background: `rgba(${accentColor}, 0.15)`, transform: 'translateY(-50%)'}} />
          <div style={{position: 'absolute', top: '50%', right: -1, width: 1, height: 16, background: `rgba(${accentColor}, 0.15)`, transform: 'translateY(-50%)'}} />
        </div>

        {/* Inner ring */}
        <div
          style={{
            position: 'absolute',
            inset: 80,
            borderRadius: '50%',
            border: `1px solid rgba(${accentColor}, 0.16)`,
            transform: `rotate(${ring3Rot}deg)`,
          }}
        />

        {/* Crosshairs */}
        <div style={{position: 'absolute', top: '50%', left: 80, right: 80, height: 1, background: `rgba(${accentColor}, 0.06)`, transform: 'translateY(-0.5px)'}} />
        <div style={{position: 'absolute', left: '50%', top: 80, bottom: 80, width: 1, background: `rgba(${accentColor}, 0.06)`, transform: 'translateX(-0.5px)'}} />

        {/* Core glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: rdna > 0.5 ? '#ed1c24' : '#38bdf8',
            boxShadow: `0 0 30px rgba(${accentColor}, 0.5), 0 0 80px rgba(${accentColor}, 0.2), 0 0 140px rgba(${accentColor}, 0.08)`,
          }}
        />
      </div>

      {/* Structural arches — large concentric circles */}
      {[900, 1200, 650].map((size, i) => (
        <div
          key={`arch-${i}`}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            top: -size * 0.3 + i * 50,
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '50%',
            border: `1px solid rgba(${accentColor}, ${0.03 + i * 0.01})`,
            opacity: interpolate(frame, [10 + i * 10, 50 + i * 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
