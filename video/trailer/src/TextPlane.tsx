
import React from 'react';
import {AbsoluteFill, interpolate, Easing} from 'remotion';

const mono = 'JetBrains Mono, monospace';
const sans = 'DM Sans, system-ui, sans-serif';

const slideUp = (frame:number, start:number, end:number, from=20) => ({
  opacity: interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft:'clamp',
    extrapolateRight:'clamp',
    easing: Easing.out(Easing.cubic),
  }),
  y: interpolate(frame, [start, end], [from, 0], {
    extrapolateLeft:'clamp',
    extrapolateRight:'clamp',
    easing: Easing.out(Easing.cubic),
  }),
});

const fadeRange = (frame:number, start:number, end:number) => interpolate(frame,[start,end],[1,0],{
  extrapolateLeft:'clamp',
  extrapolateRight:'clamp',
});

export const TextPlane: React.FC<{frame:number; rdna:number}> = ({frame, rdna}) => {
  const accent = rdna > 0.5 ? '#ff4b59' : '#62ddff';
  const accentGrad = rdna > 0.5
    ? 'linear-gradient(135deg,#ff6773 0%, #ff3b48 42%, #d81720 100%)'
    : 'linear-gradient(135deg,#a5efff 0%, #62ddff 35%, #1fb8e8 100%)';

  const seq1 = slideUp(frame, 4, 18, 12);
  const seq1Out = fadeRange(frame, 20, 34);

  const nameIntro = slideUp(frame, 8, 24, 28);
  const nameFade = fadeRange(frame, 92, 108);

  const rolesA = slideUp(frame, 36, 48, 14);
  const rolesB = slideUp(frame, 44, 56, 14);
  const rolesC = slideUp(frame, 52, 64, 14);
  const rolesFade = fadeRange(frame, 84, 96);

  const burstFade = fadeRange(frame, 140, 154);
  const proofFade = fadeRange(frame, 208, 222);

  const payoffIn = slideUp(frame, 224, 238, 20);
  const payoffOut = fadeRange(frame, 272, 282);

  const rdnaIn = slideUp(frame, 286, 294, 8);
  const rdnaOut = fadeRange(frame, 306, 314);

  const finalIn = slideUp(frame, 320, 336, 24);

  const identityBursts = [
    {t:'RENDERING', start:106},
    {t:'SYSTEMS', start:116},
    {t:'REVERSE ENGINEERING', start:126},
  ];

  const proofRows = [
    ['DONGHUA-CLI','BITBYBIT'],
    ['C++','PYTHON'],
    ['GRAPHICS','OPEN SOURCE'],
  ];

  return (
    <AbsoluteFill style={{display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
      {/* opening small system text */}
      {frame < 34 && (
        <div
          style={{
            position:'absolute',
            top:'27%',
            fontFamily: mono,
            fontSize: 14,
            letterSpacing:'0.26em',
            color: accent,
            textTransform:'uppercase',
            transform:`translateY(${seq1.y}px)`,
            opacity: seq1.opacity * seq1Out,
          }}
        >
          DEPTH LINK ESTABLISHED
        </div>
      )}

      {/* hero name */}
      {frame >= 8 && frame < 110 && (
        <div
          style={{
            position:'absolute',
            top:'31%',
            left:'50%',
            transform:`translateX(-50%) translateY(${nameIntro.y}px)`,
            opacity:nameIntro.opacity * nameFade,
            textAlign:'center',
          }}
        >
          <div style={{fontFamily:sans, fontSize:128, lineHeight:0.9, fontWeight:700, letterSpacing:'-0.055em', color:'#edf5fb'}}>
            THANUKA
          </div>
          <div style={{fontFamily:sans, fontSize:128, lineHeight:0.9, fontWeight:700, letterSpacing:'-0.055em', background:accentGrad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>
            PERERA
          </div>
        </div>
      )}

      {/* role lockup */}
      {frame >= 36 && frame < 96 && (
        <div
          style={{
            position:'absolute',
            top:'63%',
            display:'flex',
            gap:18,
            alignItems:'center',
            fontFamily:mono,
            fontSize:14,
            letterSpacing:'0.12em',
            color:'#86a6c0',
            textTransform:'uppercase',
            opacity: rolesFade,
          }}
        >
          <span style={{transform:`translateY(${rolesA.y}px)`, opacity:rolesA.opacity}}>GAME DEVELOPER</span>
          <span style={{opacity:0.35}}>·</span>
          <span style={{transform:`translateY(${rolesB.y}px)`, opacity:rolesB.opacity}}>GPU ARCHITECTURE</span>
          <span style={{opacity:0.35}}>·</span>
          <span style={{transform:`translateY(${rolesC.y}px)`, opacity:rolesC.opacity}}>SYSTEMS ENGINEER</span>
        </div>
      )}

      {/* identity burst */}
      {frame >= 104 && frame < 154 && (
        <div style={{position:'absolute', top:'36%', left:'12%'}}>
          {identityBursts.map((item, idx) => {
            const a = slideUp(frame, item.start, item.start + 8, 22);
            return (
              <div
                key={item.t}
                style={{
                  fontFamily: mono,
                  fontSize: idx === 2 ? 28 : 34,
                  fontWeight: 600,
                  letterSpacing:'0.12em',
                  color: idx === 0 ? accent : '#d5e4f0',
                  marginBottom: 10,
                  transform:`translateY(${a.y}px)`,
                  opacity:a.opacity * burstFade,
                }}
              >
                {item.t}
              </div>
            );
          })}
        </div>
      )}

      {/* proof montage */}
      {frame >= 150 && frame < 222 && (
        <div
          style={{
            position:'absolute',
            top:'34%',
            left:'50%',
            transform:'translateX(-50%)',
            display:'flex',
            flexDirection:'column',
            gap:16,
            opacity:proofFade,
          }}
        >
          {proofRows.map((row, i) => {
            const a = slideUp(frame, 154 + i*16, 162 + i*16, 16);
            return (
              <div key={i} style={{display:'flex', gap:18, transform:`translateY(${a.y}px)`, opacity:a.opacity}}>
                {row.map((item, j) => (
                  <div
                    key={item}
                    style={{
                      fontFamily: mono,
                      fontSize: 20,
                      letterSpacing:'0.14em',
                      color:j===0 && i===0 ? accent : '#d5e4f0',
                      background:'rgba(6,16,28,0.56)',
                      border:'1px solid rgba(98,221,255,0.14)',
                      borderRadius: 10,
                      padding:'10px 18px',
                      minWidth: j===0 ? 230 : 180,
                      textAlign:'center',
                      boxShadow:'0 10px 30px rgba(0,0,0,0.18)',
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

      {/* payoff */}
      {frame >= 224 && frame < 282 && (
        <div
          style={{
            position:'absolute',
            top:'40%',
            textAlign:'center',
            transform:`translateY(${payoffIn.y}px)`,
            opacity:payoffIn.opacity * payoffOut,
          }}
        >
          <div style={{fontFamily:sans, fontSize:66, fontWeight:700, letterSpacing:'-0.04em', color:'#eef5fa', lineHeight:1}}>
            BUILT LIKE
          </div>
          <div style={{fontFamily:sans, fontSize:74, fontWeight:700, letterSpacing:'-0.05em', background:accentGrad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', lineHeight:1}}>
            A WORLD
          </div>
        </div>
      )}

      {/* rdna */}
      {frame >= 286 && frame < 314 && (
        <div
          style={{
            position:'absolute',
            top:'46%',
            fontFamily:mono,
            fontSize:20,
            letterSpacing:'0.30em',
            color:'#ff4b59',
            textTransform:'uppercase',
            transform:`translateY(${rdnaIn.y}px)`,
            opacity:rdnaIn.opacity * rdnaOut,
          }}
        >
          RDNA SUBSYSTEM
        </div>
      )}

      {/* final */}
      {frame >= 320 && (
        <div
          style={{
            position:'absolute',
            top:'31%',
            left:'50%',
            transform:`translateX(-50%) translateY(${finalIn.y}px)`,
            opacity: finalIn.opacity,
            textAlign:'center',
          }}
        >
          <div style={{fontFamily:sans, fontSize:110, lineHeight:0.92, fontWeight:700, letterSpacing:'-0.052em', color:'#edf5fb'}}>
            THANUKA
          </div>
          <div style={{fontFamily:sans, fontSize:110, lineHeight:0.92, fontWeight:700, letterSpacing:'-0.052em', background:accentGrad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>
            PERERA
          </div>
          <div
            style={{
              marginTop: 20,
              fontFamily: mono,
              fontSize: 14,
              letterSpacing:'0.12em',
              color:'#9bb7cd',
              textTransform:'uppercase',
            }}
          >
            GAME DEVELOPER · GPU ARCHITECTURE · SYSTEMS ENGINEER
          </div>
          <div
            style={{
              marginTop: 18,
              fontFamily: mono,
              fontSize: 18,
              letterSpacing:'0.08em',
              color: accent,
            }}
          >
            thanukamax.github.io
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
