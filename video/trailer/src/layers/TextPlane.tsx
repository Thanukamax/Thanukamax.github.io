import React from 'react';
import {AbsoluteFill, interpolate, Easing} from 'remotion';

const mono = 'JetBrains Mono, monospace';
const sans = 'DM Sans, system-ui, sans-serif';

// Beat-synced text snap helper
const snapIn = (frame: number, start: number, dur = 8) => ({
  opacity: interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  }),
  transform: `translateY(${interpolate(frame, [start, start + dur], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })}px)`,
});

const fadeOut = (frame: number, start: number, dur = 10) =>
  interpolate(frame, [start, start + dur], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const TextPlane: React.FC<{frame: number; rdna: number}> = ({
  frame,
  rdna,
}) => {
  const accentColor = rdna > 0.5 ? '#ed1c24' : '#38bdf8';
  const accentGrad =
    rdna > 0.5
      ? 'linear-gradient(135deg, #ed1c24, #ff4444, #c41018)'
      : 'linear-gradient(135deg, #38bdf8, #22d3ee, #06b6d4)';

  // === SEQUENCE 1: Opening (0-36) ===
  const seq1Opacity = fadeOut(frame, 28, 8);
  const signalSnap = snapIn(frame, 4, 10);

  // === SEQUENCE 2: Identity lock (36-84) ===
  const nameSnap = snapIn(frame, 10, 12);
  const nameOut = fadeOut(frame, 115, 12);
  const nameOp = Math.min(nameSnap.opacity, frame > 115 ? nameOut : 1);

  const role1 = snapIn(frame, 40, 6);
  const role2 = snapIn(frame, 48, 6);
  const role3 = snapIn(frame, 56, 6);
  const rolesOut = fadeOut(frame, 78, 8);

  // === SEQUENCE 3: Tech identity (84-132) ===
  const techWords = ['RENDERING', 'SYSTEMS', 'REVERSE ENGINEERING', 'CREATIVE TOOLING'];
  const techStart = 88;
  const techGap = 11;

  // === SEQUENCE 4: Proof montage (132-204) ===
  const proofItems = [
    ['h-cli', 'DONGHUA-CLI'],
    ['C++', 'PYTHON'],
    ['BITBYBIT', 'OPEN SOURCE'],
  ];
  const proofStart = 136;
  const proofGap = 22;

  // === SEQUENCE 5: Payoff (204-264) ===
  const payoffSnap = snapIn(frame, 210, 14);
  const payoffOut = fadeOut(frame, 254, 10);

  // === SEQUENCE 6: RDNA rupture text (264-306) ===
  const rdnaTextSnap = snapIn(frame, 268, 6);
  const rdnaTextOut = fadeOut(frame, 298, 6);

  // === SEQUENCE 7: Final lockup (306-360) ===
  const finalNameSnap = snapIn(frame, 310, 12);
  const finalRoleSnap = snapIn(frame, 320, 10);
  const finalUrlSnap = snapIn(frame, 335, 10);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: sans,
      }}
    >
      {/* SEQ 1: Signal acquired + Name */}
      {frame < 36 && (
        <div
          style={{
            ...signalSnap,
            opacity: signalSnap.opacity * seq1Opacity,
            fontFamily: mono,
            fontSize: 14,
            letterSpacing: '0.25em',
            color: accentColor,
            textTransform: 'uppercase' as const,
            position: 'absolute',
            top: '42%',
          }}
        >
          SIGNAL ACQUIRED
        </div>
      )}

      {/* SEQ 2: Name — big, center */}
      {frame >= 10 && frame < 130 && (
        <div
          style={{
            position: 'absolute',
            textAlign: 'center' as const,
            ...nameSnap,
            opacity: nameOp,
          }}
        >
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 0.92,
              color: '#e4edf7',
            }}
          >
            THANUKA
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 0.92,
              background: accentGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            PERERA
          </div>
        </div>
      )}

      {/* SEQ 2: Roles snapping in */}
      {frame >= 40 && frame < 88 && (
        <div
          style={{
            position: 'absolute',
            top: '68%',
            display: 'flex',
            gap: 24,
            fontFamily: mono,
            fontSize: 13,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: '#6890b0',
          }}
        >
          <span style={{...role1, opacity: role1.opacity * rolesOut}}>
            GAME DEVELOPER
          </span>
          <span style={{color: `rgba(56,189,248,${0.3 * rolesOut})`, ...role2}}>
            ·
          </span>
          <span style={{...role2, opacity: role2.opacity * rolesOut}}>
            GPU ARCHITECTURE
          </span>
          <span style={{color: `rgba(56,189,248,${0.3 * rolesOut})`, ...role3}}>
            ·
          </span>
          <span style={{...role3, opacity: role3.opacity * rolesOut}}>
            SYSTEMS ENGINEER
          </span>
        </div>
      )}

      {/* SEQ 3: Tech identity shards */}
      {frame >= 84 && frame < 136 && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            gap: 12,
          }}
        >
          {techWords.map((word, i) => {
            const s = snapIn(frame, techStart + i * techGap, 6);
            const o = fadeOut(frame, 126, 8);
            return (
              <div
                key={word}
                style={{
                  fontFamily: mono,
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: i === 0 ? accentColor : '#a0c0dd',
                  ...s,
                  opacity: s.opacity * o,
                }}
              >
                {word}
              </div>
            );
          })}
        </div>
      )}

      {/* SEQ 4: Proof montage — panel labels */}
      {frame >= 132 && frame < 210 && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            gap: 20,
          }}
        >
          {proofItems.map((row, ri) => {
            const rowSnap = snapIn(frame, proofStart + ri * proofGap, 8);
            const rowOut = fadeOut(frame, 196, 10);
            return (
              <div
                key={ri}
                style={{
                  display: 'flex',
                  gap: 32,
                  ...rowSnap,
                  opacity: rowSnap.opacity * rowOut,
                }}
              >
                {row.map((item) => (
                  <div
                    key={item}
                    style={{
                      fontFamily: mono,
                      fontSize: 20,
                      fontWeight: 500,
                      letterSpacing: '0.14em',
                      color: '#a0c0dd',
                      padding: '8px 20px',
                      border: `1px solid rgba(56,189,248,0.15)`,
                      borderRadius: 8,
                      background: 'rgba(6, 16, 32, 0.6)',
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* SEQ 5: Payoff statement */}
      {frame >= 204 && frame < 268 && (
        <div
          style={{
            position: 'absolute',
            textAlign: 'center' as const,
            ...payoffSnap,
            opacity: payoffSnap.opacity * payoffOut,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#e4edf7',
              lineHeight: 1.2,
            }}
          >
            ENGINEERED
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              background: accentGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.2,
            }}
          >
            WITH DEPTH
          </div>
        </div>
      )}

      {/* SEQ 6: RDNA rupture text */}
      {frame >= 264 && frame < 310 && (
        <div
          style={{
            position: 'absolute',
            fontFamily: mono,
            fontSize: 18,
            letterSpacing: '0.3em',
            color: '#ed1c24',
            textTransform: 'uppercase' as const,
            ...rdnaTextSnap,
            opacity: rdnaTextSnap.opacity * rdnaTextOut,
          }}
        >
          RDNA SUBSYSTEM ONLINE
        </div>
      )}

      {/* SEQ 7: Final lockup */}
      {frame >= 306 && (
        <div
          style={{
            position: 'absolute',
            textAlign: 'center' as const,
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{...finalNameSnap}}>
            <div
              style={{
                fontSize: 88,
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#e4edf7',
              }}
            >
              THANUKA
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                background: accentGrad,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              PERERA
            </div>
          </div>
          <div
            style={{
              fontFamily: mono,
              fontSize: 12,
              letterSpacing: '0.1em',
              color: '#6890b0',
              textTransform: 'uppercase' as const,
              ...finalRoleSnap,
            }}
          >
            GAME DEVELOPER · GPU ARCHITECTURE · SYSTEMS ENGINEER
          </div>
          <div
            style={{
              fontFamily: mono,
              fontSize: 14,
              letterSpacing: '0.08em',
              color: accentColor,
              marginTop: 12,
              ...finalUrlSnap,
            }}
          >
            thanukamax.github.io
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
