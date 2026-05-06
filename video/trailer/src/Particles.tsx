import React, {useMemo} from 'react';
import {AbsoluteFill} from 'remotion';
import {Biome} from './SceneBackground';

type Props = {
  biome: Biome;
  frame: number;
  opacity?: number;
};

type Mote = {x:number;y:number;size:number;speed:number;phase:number;alpha:number};

const buildMotes = (count:number) => {
  const arr:Mote[] = [];
  for (let i=0;i<count;i++) {
    const n = i * 91.233;
    arr.push({
      x: (n * 3.7) % 100,
      y: (n * 5.3) % 110,
      size: 1 + ((n * 1.2) % 4.8),
      speed: 0.5 + ((n * 0.21) % 1.5),
      phase: (n * 0.39) % 6.28,
      alpha: 0.08 + ((n * 0.17) % 0.30),
    });
  }
  return arr;
};

const biomeConfig = (biome: Biome) => {
  switch (biome) {
    case 'cyber': return {rgb:'118,220,255', streak:'96,118,255', count:96, speed:1};
    case 'ocean': return {rgb:'136,227,255', streak:'95,210,255', count:110, speed:0.9};
    case 'unity': return {rgb:'255,204,158', streak:'194,132,82', count:124, speed:1.12};
    case 'ice': return {rgb:'220,242,255', streak:'166,214,255', count:126, speed:0.92};
    case 'volcano': return {rgb:'255,126,88', streak:'255,74,60', count:124, speed:1.2};
    case 'forest': return {rgb:'156,255,182', streak:'92,224,128', count:130, speed:0.76};
    case 'fusion': return {rgb:'164,228,255', streak:'255,88,88', count:118, speed:1.04};
    case 'oceanFinal': return {rgb:'194,244,255', streak:'110,222,255', count:118, speed:0.88};
    default: return {rgb:'160,216,255', streak:'118,138,255', count:100, speed:1};
  };
};

export const Particles: React.FC<Props> = ({biome, frame, opacity = 1}) => {
  const cfg = biomeConfig(biome);
  const items = useMemo(() => buildMotes(cfg.count), [cfg.count]);

  return (
    <AbsoluteFill style={{opacity, pointerEvents:'none'}}>
      {items.map((m, i) => {
        const rise = frame * (0.15 + m.speed * 0.08) * cfg.speed;
        const x = m.x + Math.sin(frame * 0.012 + m.phase) * (i % 5 === 0 ? 8 : 4);
        const y = ((m.y - rise) % 116 + 116) % 116 - 8;
        const op = m.alpha * (0.54 + Math.sin(frame * 0.03 + m.phase) * 0.24);
        return (
          <div
            key={i}
            style={{
              position:'absolute',
              left:`${x}%`,
              top:`${y}%`,
              width:m.size,
              height:m.size,
              borderRadius:'50%',
              background:`rgba(${cfg.rgb},${op})`,
              filter:'blur(0.4px)',
            }}
          />
        );
      })}

      {biome === 'ocean' || biome === 'oceanFinal' ? <OceanBubbles frame={frame} rgb={cfg.rgb} streak={cfg.streak} count={biome === 'oceanFinal' ? 44 : 34} /> : null}
      {biome === 'unity' ? <DustParticles frame={frame} rgb={cfg.rgb} streak={cfg.streak} count={72} /> : null}
      {biome === 'ice' ? <SnowDust frame={frame} rgb={cfg.rgb} streak={cfg.streak} count={96} /> : null}
      {biome === 'volcano' ? <FireParticles frame={frame} rgb={cfg.rgb} streak={cfg.streak} count={78} /> : null}
      {biome === 'forest' ? <FallingLeaves frame={frame} rgb={cfg.rgb} streak={cfg.streak} count={70} /> : null}
      {biome === 'fusion' ? <FusionSparks frame={frame} rgb={cfg.rgb} streak={cfg.streak} count={54} /> : null}
      {biome === 'cyber' ? <CyberScan frame={frame} rgb={cfg.rgb} streak={cfg.streak} /> : null}

      <div
        style={{
          position:'absolute',
          inset:'-12% -12% 0 -12%',
          background: `
            linear-gradient(112deg, transparent 4%, rgba(${cfg.streak},0.05) 28%, transparent 52%),
            linear-gradient(90deg, transparent 18%, rgba(${cfg.streak},0.03) 36%, transparent 62%)
          `,
          transform:`translateX(${Math.sin(frame * 0.011) * 140}px) translateY(${Math.cos(frame * 0.009) * 22}px)`,
          filter:'blur(10px)',
          opacity: biome === 'volcano' ? 0.52 : 0.62,
        }}
      />
    </AbsoluteFill>
  );
};

const OceanBubbles: React.FC<{frame:number; rgb:string; streak:string; count:number}> = ({frame, rgb, streak, count}) => (
  <>
    {Array.from({length: count}).map((_, i) => {
      const x = 4 + ((i * 11.9) % 92);
      const sway = Math.sin(frame * 0.022 + i * 0.6) * (8 + (i % 4) * 3);
      const y = 106 - ((frame * (0.24 + (i % 6) * 0.04) + i * 13) % 128);
      const size = 6 + (i % 5) * 5;
      const alpha = 0.08 + (i % 4) * 0.04;
      return <div key={i} style={{position:'absolute', left:`calc(${x}% + ${sway}px)`, top:`${y}%`, width:size, height:size, borderRadius:'50%', border:`1px solid rgba(${rgb},${alpha})`, boxShadow:`0 0 12px rgba(${streak},${alpha * 0.6})`, background:`radial-gradient(circle at 35% 35%, rgba(255,255,255,0.24) 0%, rgba(${rgb},0.03) 56%, transparent 72%)`, filter:'blur(0.2px)'}} />;
    })}
  </>
);

const DustParticles: React.FC<{frame:number; rgb:string; streak:string; count:number}> = ({frame, rgb, streak, count}) => (
  <>
    {Array.from({length: count}).map((_, i) => {
      const x = 2 + ((i * 7.7) % 96);
      const y = 72 - ((frame * (0.10 + (i % 4) * 0.015) + i * 4) % 80);
      const drift = Math.sin(frame * 0.03 + i * 0.4) * (18 + (i % 3) * 10);
      const size = 3 + (i % 5) * 2.6;
      const alpha = 0.08 + (i % 4) * 0.03;
      return <div key={i} style={{position:'absolute', left:`calc(${x}% + ${drift}px)`, top:`${y}%`, width:size, height:size, borderRadius:'50%', background:`rgba(${rgb},${alpha})`, boxShadow:`0 0 10px rgba(${streak},${alpha * 0.2})`, filter:'blur(0.5px)'}} />;
    })}
  </>
);

const SnowDust: React.FC<{frame:number; rgb:string; streak:string; count:number}> = ({frame, rgb, streak, count}) => (
  <>
    {Array.from({length: count}).map((_, i) => {
      const x = 2 + ((i * 6.2) % 96);
      const y = -12 + ((frame * (0.24 + (i % 6) * 0.02) + i * 8) % 126);
      const drift = Math.sin(frame * 0.018 + i * 0.5) * (18 + (i % 4) * 5);
      const size = 2 + (i % 5) * 2;
      const alpha = 0.10 + (i % 4) * 0.03;
      return <div key={i} style={{position:'absolute', left:`calc(${x}% + ${drift}px)`, top:`${y}%`, width:size, height:size, borderRadius:'50%', background:`rgba(${rgb},${alpha})`, boxShadow:`0 0 10px rgba(${streak},${alpha * 0.25})`, filter:'blur(0.2px)'}} />;
    })}
  </>
);

const FireParticles: React.FC<{frame:number; rgb:string; streak:string; count:number}> = ({frame, rgb, streak, count}) => (
  <>
    {Array.from({length: count}).map((_, i) => {
      const x = 2 + ((i * 8.4) % 96);
      const y = 98 - ((frame * (0.34 + (i % 4) * 0.05) + i * 7) % 104);
      const drift = Math.sin(frame * 0.05 + i) * (12 + (i % 2) * 7);
      const size = 4 + (i % 4) * 3.8;
      const alpha = 0.14 + (i % 5) * 0.025;
      return <div key={i} style={{position:'absolute', left:`calc(${x}% + ${drift}px)`, top:`${y}%`, width:size, height:size * 1.6, borderRadius:'50% 50% 45% 45%', background:`radial-gradient(circle at 50% 20%, rgba(255,220,150,${alpha}) 0%, rgba(${streak},${alpha}) 38%, rgba(${rgb},0.03) 74%, transparent 100%)`, filter:'blur(0.5px)', transform:`rotate(${Math.sin(frame * 0.03 + i) * 22}deg)`}} />;
    })}
  </>
);

const FallingLeaves: React.FC<{frame:number; rgb:string; streak:string; count:number}> = ({frame, rgb, streak, count}) => (
  <>
    {Array.from({length: count}).map((_, i) => {
      const x = 2 + ((i * 7.4) % 96);
      const y = -8 + ((frame * (0.30 + (i % 5) * 0.03) + i * 12) % 126);
      const drift = Math.sin(frame * 0.03 + i * 0.8) * (24 + (i % 3) * 8);
      const rotate = (frame * (1 + (i % 4) * 0.18) + i * 26) % 360;
      const s = 8 + (i % 5) * 3.8;
      return <div key={i} style={{position:'absolute', left:`calc(${x}% + ${drift}px)`, top:`${y}%`, width:s * 1.2, height:s * 0.7, background:`rgba(${streak},${0.11 + (i % 3) * 0.03})`, clipPath:'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)', filter:'blur(0.2px)', transform:`rotate(${rotate}deg)`}} />;
    })}
  </>
);

const FusionSparks: React.FC<{frame:number; rgb:string; streak:string; count:number}> = ({frame, rgb, streak, count}) => (
  <>
    {Array.from({length: count}).map((_, i) => {
      const x = 6 + ((i * 9.2) % 88);
      const y = 16 + ((i * 11.8 + frame * 0.1) % 74);
      const w = 18 + (i % 4) * 10;
      const alpha = 0.05 + (i % 4) * 0.02;
      return <div key={i} style={{position:'absolute', left:`${x}%`, top:`${y}%`, width:w, height:2, background:`linear-gradient(90deg, rgba(${i % 2 === 0 ? rgb : streak},0), rgba(${i % 2 === 0 ? rgb : streak},${alpha}), rgba(${i % 2 === 0 ? rgb : streak},0))`, transform:`translateX(${Math.sin(frame * 0.04 + i) * 24}px) rotate(${(i % 3 === 0 ? 18 : -18)}deg)`}} />;
    })}
  </>
);

const CyberScan: React.FC<{frame:number; rgb:string; streak:string}> = ({frame, rgb, streak}) => (
  <>
    <div style={{position:'absolute', inset:'14% 12%', border:`1px solid rgba(${rgb},0.10)`, borderRadius:30, opacity:0.7}} />
    <div style={{position:'absolute', left:'12%', right:'12%', top:`${18 + ((frame * 0.9) % 58)}%`, height:2, background:`linear-gradient(90deg, transparent 0%, rgba(${streak},0.0) 18%, rgba(${streak},0.32) 48%, rgba(${streak},0.0) 82%, transparent 100%)`, filter:'blur(1px)', opacity:0.9}} />
  </>
);
