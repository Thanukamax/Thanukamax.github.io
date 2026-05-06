import React from 'react';
import {AbsoluteFill, interpolate, spring, useVideoConfig} from 'remotion';

export type Biome =
  | 'cyber'
  | 'ocean'
  | 'unity'
  | 'ice'
  | 'volcano'
  | 'forest'
  | 'fusion'
  | 'oceanFinal';

type Props = {
  biome: Biome;
  frame: number;
  opacity?: number;
};

type Palette = {
  bg: string;
  glow: string;
  accent: string;
  accent2: string;
  dim: string;
  light: string;
};

const palettes: Record<Biome, Palette> = {
  cyber: {
    bg: '#060913', glow: '80,210,255', accent: '76,120,255', accent2: '255,70,190', dim: '8,12,24', light: '220,244,255',
  },
  ocean: {
    bg: '#020912', glow: '96,224,255', accent: '42,170,232', accent2: '34,115,178', dim: '8,26,42', light: '210,247,255',
  },
  unity: {
    bg: '#120c09', glow: '248,182,122', accent: '169,112,68', accent2: '92,64,42', dim: '28,16,10', light: '255,232,198',
  },
  ice: {
    bg: '#06101a', glow: '176,224,255', accent: '114,188,255', accent2: '218,248,255', dim: '10,24,40', light: '245,251,255',
  },
  volcano: {
    bg: '#110406', glow: '255,110,74', accent: '220,46,38', accent2: '255,180,108', dim: '30,8,8', light: '255,222,174',
  },
  forest: {
    bg: '#07110b', glow: '116,255,164', accent: '54,194,104', accent2: '178,255,196', dim: '10,25,16', light: '239,255,242',
  },
  fusion: {
    bg: '#050811', glow: '115,230,255', accent: '64,220,138', accent2: '255,88,88', dim: '8,16,30', light: '241,248,255',
  },
  oceanFinal: {
    bg: '#01060e', glow: '130,236,255', accent: '66,196,244', accent2: '194,246,255', dim: '8,22,42', light: '240,251,255',
  },
};

const rgba = (rgb: string, a: number) => `rgba(${rgb},${a})`;

export const SceneBackground: React.FC<Props> = ({biome, frame, opacity = 1}) => {
  const {fps} = useVideoConfig();
  const pal = palettes[biome];
  const intro = spring({fps, frame: frame - 2, config: {damping: 200, stiffness: 90}});
  const driftX = Math.sin(frame * 0.01) * 24;
  const driftY = Math.cos(frame * 0.009) * 16;

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: buildBaseGradient(biome, pal)}} />
      {biome === 'cyber' && <CyberScene pal={pal} frame={frame} intro={intro} driftX={driftX} driftY={driftY} />}
      {biome === 'ocean' && <OceanScene pal={pal} frame={frame} intro={intro} driftX={driftX} driftY={driftY} />}
      {biome === 'unity' && <UnityScene pal={pal} frame={frame} intro={intro} driftX={driftX} driftY={driftY} />}
      {biome === 'ice' && <IceScene pal={pal} frame={frame} intro={intro} driftX={driftX} driftY={driftY} />}
      {biome === 'volcano' && <VolcanoScene pal={pal} frame={frame} intro={intro} driftX={driftX} driftY={driftY} />}
      {biome === 'forest' && <ForestScene pal={pal} frame={frame} intro={intro} driftX={driftX} driftY={driftY} />}
      {biome === 'fusion' && <FusionScene pal={pal} frame={frame} intro={intro} driftX={driftX} driftY={driftY} />}
      {biome === 'oceanFinal' && <OceanFinalScene pal={pal} frame={frame} intro={intro} driftX={driftX} driftY={driftY} />}
      <div style={{position:'absolute', inset:0, background:'radial-gradient(ellipse 88% 72% at 50% 40%, transparent 34%, rgba(1,4,10,0.18) 70%, rgba(1,4,10,0.54) 100%)'}} />
    </AbsoluteFill>
  );
};

const buildBaseGradient = (biome: Biome, pal: Palette) => {
  switch (biome) {
    case 'cyber':
      return `
        radial-gradient(circle at 50% 18%, rgba(${pal.glow},0.16) 0%, transparent 28%),
        radial-gradient(circle at 74% 28%, rgba(${pal.accent2},0.12) 0%, transparent 24%),
        linear-gradient(180deg, #0b1227 0%, #090d18 26%, #050811 58%, #02040a 100%),
        linear-gradient(110deg, rgba(${pal.accent},0.10) 0%, transparent 30%, rgba(${pal.accent2},0.08) 68%, transparent 100%)`;
    case 'ocean':
      return `
        radial-gradient(circle at 50% 12%, rgba(${pal.glow},0.16) 0%, transparent 26%),
        radial-gradient(circle at 24% 18%, rgba(${pal.accent},0.12) 0%, transparent 22%),
        linear-gradient(180deg, #071728 0%, #041222 26%, #031019 58%, #02070f 100%)`;
    case 'unity':
      return `
        radial-gradient(ellipse 72% 30% at 50% 16%, rgba(${pal.glow},0.16) 0%, transparent 38%),
        linear-gradient(180deg, #3a2b1d 0%, #24180f 26%, #150d09 62%, #0b0604 100%)`;
    case 'ice':
      return `
        radial-gradient(ellipse 76% 34% at 50% 16%, rgba(${pal.glow},0.18) 0%, transparent 38%),
        radial-gradient(circle at 20% 18%, rgba(${pal.accent2},0.12) 0%, transparent 24%),
        linear-gradient(180deg, #12304b 0%, #0a1a2b 24%, #07131f 62%, #040a12 100%)`;
    case 'volcano':
      return `
        radial-gradient(ellipse 62% 28% at 50% 20%, rgba(${pal.glow},0.22) 0%, transparent 38%),
        linear-gradient(180deg, #361012 0%, #1d0808 26%, #120406 62%, #050102 100%)`;
    case 'forest':
      return `
        radial-gradient(ellipse 70% 34% at 50% 16%, rgba(${pal.glow},0.16) 0%, transparent 42%),
        linear-gradient(180deg, #102215 0%, #0a140d 24%, #070d09 58%, #040705 100%)`;
    case 'fusion':
      return `
        radial-gradient(circle at 24% 18%, rgba(${pal.glow},0.15) 0%, transparent 22%),
        radial-gradient(circle at 76% 22%, rgba(${pal.accent2},0.14) 0%, transparent 24%),
        radial-gradient(circle at 50% 58%, rgba(${pal.accent},0.12) 0%, transparent 28%),
        linear-gradient(180deg, #071525 0%, #08111c 24%, #070911 60%, #03050b 100%)`;
    case 'oceanFinal':
    default:
      return `
        radial-gradient(circle at 50% 14%, rgba(${pal.glow},0.18) 0%, transparent 28%),
        linear-gradient(180deg, #09182a 0%, #04111e 24%, #020811 60%, #01050d 100%)`;
  }
};

const CyberScene: React.FC<any> = ({pal, frame, intro, driftX, driftY}) => {
  const pulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.45, 1]);
  return (
    <>
      <div style={{position:'absolute', inset:0, opacity:0.32, backgroundImage:`linear-gradient(rgba(${pal.glow},0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(${pal.glow},0.06) 1px, transparent 1px)`, backgroundSize:'80px 80px, 80px 80px', transform:`translate(${driftX * 0.4}px, ${driftY * 0.3}px) perspective(1200px) rotateX(72deg) scale(1.25) translateY(24%)`}} />
      <div style={{position:'absolute', inset:'8% 14%', borderRadius:36, border:rgba(pal.glow,0.12), boxShadow:`0 0 90px rgba(${pal.glow},0.05)`}} />
      <div style={{position:'absolute', top:'50%', left:'50%', width:520, height:520, transform:`translate(-50%, -50%) scale(${0.92 + intro * 0.08})`, opacity:0.8}}>
        <div style={{position:'absolute', inset:0, borderRadius:'50%', border:`2px solid rgba(${pal.glow},${0.26 * pulse})`, boxShadow:`0 0 90px rgba(${pal.glow},0.10)`}} />
        <div style={{position:'absolute', inset:48, borderRadius:'50%', border:`1px solid rgba(${pal.accent},0.24)`, transform:`rotate(${frame * 0.8}deg)`}} />
        <div style={{position:'absolute', inset:96, borderRadius:'50%', border:`1px solid rgba(${pal.accent2},0.18)`, transform:`rotate(${-frame * 0.55}deg)`}} />
        <div style={{position:'absolute', inset:'48% 48%', borderRadius:'50%', background:`rgba(${pal.light},0.9)`, boxShadow:`0 0 26px rgba(${pal.glow},0.38),0 0 72px rgba(${pal.accent2},0.18)`}} />
        <div style={{position:'absolute', top:'50%', left:20, right:20, height:1, background:rgba(pal.glow,0.12)}} />
        <div style={{position:'absolute', left:'50%', top:20, bottom:20, width:1, background:rgba(pal.glow,0.12)}} />
      </div>
      {[18, 36, 64, 82].map((x, idx) => <div key={x} style={{position:'absolute', top:'-8%', left:`${x}%`, width:120 + idx * 34, height:'78%', background:`linear-gradient(180deg, rgba(${idx % 2 === 0 ? pal.glow : pal.accent2},0.10) 0%, rgba(${pal.glow},0.04) 24%, transparent 76%)`, filter:'blur(26px)', transform:`translateX(${driftX * (0.14 + idx * 0.04)}px)`}} />)}
    </>
  );
};

const OceanScene: React.FC<any> = ({pal, frame, intro, driftX, driftY}) => (
  <>
    <div style={{position:'absolute', inset:0, opacity:0.42, background:`radial-gradient(circle at 20% 18%, rgba(${pal.glow},0.12) 0%, transparent 24%), radial-gradient(circle at 80% 20%, rgba(${pal.accent},0.09) 0%, transparent 22%)`, filter:'blur(8px)'}} />
    {[18,44,70].map((x, idx) => <div key={x} style={{position:'absolute', top:'-6%', left:`${x}%`, width:160 + idx * 30, height:'82%', background:`linear-gradient(180deg, rgba(${pal.light},0.10) 0%, rgba(${pal.glow},0.03) 28%, transparent 78%)`, filter:'blur(34px)', transform:`translateX(${driftX * (0.12 + idx * 0.04)}px)`}} />)}
    <svg viewBox="0 0 1920 1080" style={{position:'absolute', inset:0, opacity:0.62, transform:`translateY(${driftY * 0.18}px)`}}>
      <path d="M0 728 L120 690 L268 706 L396 658 L548 700 L704 646 L880 690 L1040 634 L1210 692 L1384 642 L1560 696 L1738 658 L1920 682 L1920 1080 L0 1080 Z" fill="rgba(7,22,37,0.88)" />
    </svg>
    <div style={{position:'absolute', top:'48%', left:'50%', width:760, height:760, transform:`translate(-50%, -50%) scale(${0.84 + intro * 0.16})`, opacity:0.82}}>
      <div style={{position:'absolute', inset:0, borderRadius:'50%', border:rgba(pal.glow,0.18), boxShadow:`0 0 84px rgba(${pal.glow},0.06)`}} />
      <div style={{position:'absolute', inset:50, borderRadius:'50%', border:rgba(pal.glow,0.12), transform:`rotate(${frame * 0.14}deg)`}} />
      <div style={{position:'absolute', inset:108, borderRadius:'50%', border:rgba(pal.accent,0.10), transform:`rotate(${-frame * 0.09}deg)`}} />
      <div style={{position:'absolute', inset:188, borderRadius:'50%', border:rgba(pal.glow,0.07)}} />
      <div style={{position:'absolute', top:'50%', left:110, right:110, height:1, background:rgba(pal.glow,0.08)}} />
      <div style={{position:'absolute', left:'50%', top:110, bottom:110, width:1, background:rgba(pal.glow,0.08)}} />
      <div style={{position:'absolute', inset:'48% 48%', borderRadius:'50%', background:`rgba(${pal.glow},0.92)`, boxShadow:`0 0 24px rgba(${pal.glow},0.56),0 0 88px rgba(${pal.glow},0.18)`}} />
    </div>
  </>
);

const UnityScene: React.FC<any> = ({pal, frame, intro, driftX, driftY}) => (
  <>
    <div style={{position:'absolute', inset:0, background:`radial-gradient(ellipse 70% 30% at 50% 16%, rgba(${pal.glow},0.16) 0%, transparent 42%)`, filter:'blur(10px)'}} />
    <svg viewBox="0 0 1920 1080" style={{position:'absolute', inset:0, opacity:0.82, transform:`translateX(${driftX * 0.18}px) translateY(${driftY * 0.12}px)`}}>
      <path d="M0 788 L160 668 L290 734 L440 616 L590 762 L752 582 L918 780 L1102 604 L1286 770 L1472 568 L1668 764 L1820 698 L1920 742 L1920 1080 L0 1080 Z" fill="rgba(39,25,15,0.66)" />
      <path d="M0 858 L206 742 L386 832 L570 708 L758 846 L970 662 L1182 836 L1428 702 L1650 850 L1920 760 L1920 1080 L0 1080 Z" fill="rgba(20,12,8,0.92)" />
    </svg>
    <div style={{position:'absolute', top:'40%', left:'50%', width:620, height:620, transform:`translate(-50%, -50%) scale(${0.9 + intro * 0.1})`, opacity:0.54}}>
      <div style={{position:'absolute', inset:0, borderRadius:'50%', border:rgba(pal.glow,0.12)}} />
      <div style={{position:'absolute', inset:56, borderRadius:'50%', border:rgba(pal.accent,0.08)}} />
    </div>
  </>
);

const IceScene: React.FC<any> = ({pal, frame, intro, driftX, driftY}) => (
  <>
    <div style={{position:'absolute', inset:0, background:`radial-gradient(circle at 50% 16%, rgba(${pal.glow},0.18) 0%, transparent 32%), linear-gradient(180deg, rgba(${pal.accent2},0.06) 0%, transparent 42%)`}} />
    {[10,22,36,74,88].map((x, idx) => <div key={x} style={{position:'absolute', left:`${x}%`, bottom:'-6%', width:40 + (idx % 2) * 18, height:780 - idx * 40, background:`linear-gradient(180deg, rgba(${pal.accent2},0.10) 0%, rgba(${pal.dim},0.82) 28%, rgba(${pal.dim},0.98) 100%)`, clipPath:'polygon(38% 0, 64% 10%, 82% 30%, 100% 100%, 0 100%, 12% 46%, 20% 18%)', opacity:idx > 2 ? 0.74 : 0.94, transform:`translateX(${driftX * (0.1 + idx * 0.03)}px)`}} />)}
    <svg viewBox="0 0 1920 1080" style={{position:'absolute', inset:0, opacity:0.66}}>
      <path d="M0 772 L170 716 L336 744 L502 690 L692 748 L886 674 L1080 750 L1286 684 L1484 754 L1702 706 L1920 744 L1920 1080 L0 1080 Z" fill="rgba(11,28,46,0.78)" />
    </svg>
    <div style={{position:'absolute', top:'46%', left:'50%', width:640, height:640, transform:`translate(-50%, -50%) scale(${0.88 + intro * 0.12})`, opacity:0.7}}>
      <div style={{position:'absolute', inset:0, borderRadius:'50%', border:rgba(pal.glow,0.16), boxShadow:`0 0 90px rgba(${pal.glow},0.08)`}} />
      <div style={{position:'absolute', inset:70, borderRadius:'50%', border:rgba(pal.accent2,0.10)}} />
      <div style={{position:'absolute', inset:'48% 48%', borderRadius:'50%', background:`rgba(${pal.light},0.9)`}} />
    </div>
  </>
);

const VolcanoScene: React.FC<any> = ({pal, frame, intro, driftX, driftY}) => {
  const glow = interpolate(Math.sin(frame * 0.04), [-1, 1], [0.08, 0.24]);
  return (
    <>
      <div style={{position:'absolute', inset:0, background:`radial-gradient(ellipse 55% 28% at 50% 40%, rgba(${pal.glow},${glow}) 0%, transparent 52%)`, filter:'blur(10px)'}} />
      <svg viewBox="0 0 1920 1080" style={{position:'absolute', inset:0, opacity:0.76}}>
        <path d="M0 760 L140 726 L262 648 L354 706 L472 562 L556 634 L674 512 L768 600 L930 454 L1022 552 L1156 474 L1288 600 L1414 540 L1528 666 L1682 596 L1790 704 L1920 682 L1920 1080 L0 1080 Z" fill="rgba(18,5,6,0.94)" />
      </svg>
      {[0,1,2,3].map((i) => <div key={i} style={{position:'absolute', left:`${18 + i * 18}%`, bottom:'12%', width:74 + i * 18, height:390 + i * 42, background:`linear-gradient(180deg, rgba(${pal.glow},0.04) 0%, rgba(${pal.dim},0.92) 28%, rgba(${pal.dim},0.98) 100%)`, clipPath:'polygon(40% 0, 72% 18%, 84% 40%, 100% 100%, 0 100%, 14% 52%, 20% 24%)', opacity:0.92, transform:`translateX(${driftX * (0.15 + i * 0.03)}px)`}} />)}
      <div style={{position:'absolute', top:'46%', left:'50%', width:620, height:620, transform:`translate(-50%, -50%) scale(${0.86 + intro * 0.14})`, opacity:0.78}}>
        <div style={{position:'absolute', inset:0, borderRadius:'50%', border:rgba(pal.glow,0.18), boxShadow:`0 0 90px rgba(${pal.glow},0.08)`}} />
        <div style={{position:'absolute', inset:56, borderRadius:'50%', border:rgba(pal.accent2,0.10), transform:`rotate(${frame * 0.18}deg)`}} />
        <div style={{position:'absolute', inset:122, borderRadius:'50%', border:rgba(pal.glow,0.08)}} />
      </div>
    </>
  );
};

const ForestScene: React.FC<any> = ({pal, frame, intro, driftX, driftY}) => (
  <>
    {[12,26,40,58,76,88].map((x, idx) => <div key={x} style={{position:'absolute', left:`${x}%`, bottom:'-6%', width:28 + (idx % 2) * 16, height:760 + idx * 24, background:`linear-gradient(180deg, rgba(${pal.glow},0.03) 0%, rgba(${pal.dim},0.80) 22%, rgba(${pal.dim},0.98) 100%)`, opacity:idx > 3 ? 0.72 : 0.94, transform:`translateX(${driftX * (0.08 + idx * 0.02)}px)`, borderRadius:'18px 18px 0 0'}} />)}
    <div style={{position:'absolute', inset:0, background:`radial-gradient(ellipse 80% 42% at 50% 18%, rgba(${pal.glow},0.14) 0%, transparent 54%)`}} />
    {[18,40,70].map((x, idx) => <div key={x} style={{position:'absolute', top:'-6%', left:`${x}%`, width:210, height:'72%', transform:`translateX(${driftX * (0.12 + idx * 0.04)}px) skewX(${idx === 1 ? -4 : 4}deg)`, background:`linear-gradient(180deg, rgba(${pal.light},0.08) 0%, rgba(${pal.glow},0.03) 32%, transparent 76%)`, filter:'blur(32px)', opacity:0.62}} />)}
    <svg viewBox="0 0 1920 1080" style={{position:'absolute', inset:0, opacity:0.58, transform:`translateY(${driftY * 0.18}px)`}}>
      <path d="M0 760 L162 702 L320 748 L478 680 L634 734 L790 692 L936 734 L1102 676 L1266 744 L1434 692 L1592 754 L1762 706 L1920 742 L1920 1080 L0 1080 Z" fill="rgba(7,16,10,0.78)" />
    </svg>
  </>
);

const FusionScene: React.FC<any> = ({pal, frame, intro, driftX, driftY}) => (
  <>
    <div style={{position:'absolute', inset:0, background:`radial-gradient(circle at 24% 18%, rgba(${pal.glow},0.16) 0%, transparent 22%), radial-gradient(circle at 78% 24%, rgba(${pal.accent2},0.14) 0%, transparent 24%), radial-gradient(circle at 50% 56%, rgba(${pal.accent},0.12) 0%, transparent 28%)`, filter:'blur(8px)'}} />
    <div style={{position:'absolute', inset:'8% 10%', borderRadius:34, border:rgba(pal.glow,0.10), boxShadow:`0 0 80px rgba(${pal.glow},0.05)`}} />
    <div style={{position:'absolute', top:'46%', left:'50%', width:700, height:700, transform:`translate(-50%, -50%) scale(${0.88 + intro * 0.12})`, opacity:0.74}}>
      <div style={{position:'absolute', inset:0, borderRadius:'50%', border:rgba(pal.glow,0.12)}} />
      <div style={{position:'absolute', inset:54, borderRadius:'50%', border:rgba(pal.accent,0.10), transform:`rotate(${frame * 0.16}deg)`}} />
      <div style={{position:'absolute', inset:110, borderRadius:'50%', border:rgba(pal.accent2,0.10), transform:`rotate(${-frame * 0.11}deg)`}} />
      <div style={{position:'absolute', top:'50%', left:80, right:80, height:1, background:rgba(pal.glow,0.08)}} />
      <div style={{position:'absolute', left:'50%', top:80, bottom:80, width:1, background:rgba(pal.glow,0.08)}} />
    </div>
    <div style={{position:'absolute', inset:0, opacity:0.16, backgroundImage:`linear-gradient(rgba(${pal.glow},0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(${pal.glow},0.10) 1px, transparent 1px)`, backgroundSize:'110px 110px, 110px 110px', transform:`translate(${driftX * 0.3}px, ${driftY * 0.18}px) perspective(1200px) rotateX(68deg) scale(1.28) translateY(26%)`}} />
  </>
);

const OceanFinalScene: React.FC<any> = ({pal, frame, intro, driftX, driftY}) => (
  <>
    <OceanScene pal={pal} frame={frame} intro={intro} driftX={driftX} driftY={driftY} />
    <div style={{position:'absolute', inset:0, background:`radial-gradient(circle at 50% 18%, rgba(${pal.light},0.10) 0%, transparent 34%)`, filter:'blur(8px)', opacity:0.7}} />
  </>
);
