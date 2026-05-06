import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {Biome} from './SceneBackground';

type Props = {
  biome: Biome;
  frame: number;
  opacity?: number;
};

const baseColor = (biome: Biome) => {
  switch (biome) {
    case 'cyber': return '4,8,20';
    case 'ocean':
    case 'oceanFinal': return '2,9,19';
    case 'unity': return '18,10,6';
    case 'ice': return '8,18,30';
    case 'volcano': return '20,4,6';
    case 'forest': return '6,16,8';
    case 'fusion': return '7,10,20';
    default: return '7,10,20';
  }
};

export const SceneForeground: React.FC<Props> = ({biome, frame, opacity = 1}) => {
  const base = baseColor(biome);
  const leftIn = interpolate(frame, [0, 18], [-80, 0], {extrapolateRight: 'clamp'});
  const rightIn = interpolate(frame, [0, 18], [80, 0], {extrapolateRight: 'clamp'});
  const float = Math.sin(frame * 0.016) * 10;

  return (
    <AbsoluteFill style={{opacity, pointerEvents: 'none', overflow: 'hidden'}}>
      {biome === 'cyber' && <CyberForeground base={base} leftIn={leftIn} rightIn={rightIn} float={float} />}
      {biome === 'ocean' && <OceanForeground base={base} leftIn={leftIn} rightIn={rightIn} float={float} />}
      {biome === 'unity' && <UnityForeground base={base} leftIn={leftIn} rightIn={rightIn} float={float} />}
      {biome === 'ice' && <IceForeground base={base} leftIn={leftIn} rightIn={rightIn} float={float} />}
      {biome === 'volcano' && <VolcanoForeground base={base} leftIn={leftIn} rightIn={rightIn} float={float} />}
      {biome === 'forest' && <ForestForeground base={base} leftIn={leftIn} rightIn={rightIn} float={float} />}
      {biome === 'fusion' && <FusionForeground base={base} leftIn={leftIn} rightIn={rightIn} float={float} />}
      {biome === 'oceanFinal' && <OceanForeground base={base} leftIn={leftIn} rightIn={rightIn} float={float} denser />}
      <div style={{position:'absolute', inset:0, boxShadow:`inset 0 0 150px rgba(${base},0.40)`}} />
    </AbsoluteFill>
  );
};

const CyberForeground: React.FC<any> = ({base, leftIn, rightIn, float}) => (
  <>
    <div style={{position:'absolute', left:'-3%', bottom:'12%', width:280, height:700, background:`rgba(${base},0.92)`, clipPath:'polygon(0 100%, 0 0, 54% 0, 80% 18%, 100% 34%, 100% 100%)', transform:`translateX(${leftIn}px) translateY(${float * 0.35}px)`}} />
    <div style={{position:'absolute', right:'-3%', bottom:'8%', width:280, height:760, background:`rgba(${base},0.92)`, clipPath:'polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 32%, 16% 20%)', transform:`translateX(${rightIn}px) translateY(${float * -0.28}px)`}} />
    <svg viewBox="0 0 1920 260" style={{position:'absolute', inset:'auto 0 -6px 0', width:'100%', height:260, opacity:0.9}}>
      <path d="M0 260 L0 182 L138 166 L268 152 L428 172 L612 136 L812 174 L1024 138 L1240 180 L1450 144 L1670 188 L1920 156 L1920 260 Z" fill={`rgba(${base},0.92)`} />
    </svg>
  </>
);

const OceanForeground: React.FC<any> = ({base, leftIn, rightIn, float, denser = false}) => (
  <>
    <svg viewBox="0 0 680 1080" style={{position:'absolute', left:-80, bottom:-10, width:680, height:1080, transform:`translateX(${leftIn}px) translateY(${float * 0.5}px)`}}>
      <path d="M0 1080 L0 560 L80 504 L118 448 L154 392 L196 356 L240 330 L264 280 L312 252 L346 284 L364 338 L350 398 L398 460 L468 540 L542 1080 Z" fill={`rgba(${base},0.98)`} />
      <path d="M170 620 C160 566 190 520 230 496 C262 478 292 490 296 526 C300 566 270 612 226 646 Z" fill={`rgba(${base},0.76)`} />
      <path d="M248 738 C252 690 278 660 314 662 C352 664 370 702 360 748 C350 798 318 828 284 822 C262 818 246 782 248 738 Z" fill={`rgba(${base},0.82)`} />
      {denser ? <path d="M92 744 C100 678 142 632 184 630 C220 628 240 664 226 716 C214 764 172 800 134 798 C106 796 88 776 92 744 Z" fill={`rgba(${base},0.88)`} /> : null}
    </svg>
    <svg viewBox="0 0 680 1080" style={{position:'absolute', right:-80, bottom:-10, width:680, height:1080, transform:`translateX(${rightIn}px) translateY(${float * -0.46}px)`}}>
      <path d="M680 1080 L680 540 L624 502 L588 430 L548 372 L506 338 L458 306 L426 268 L370 250 L344 284 L340 336 L368 390 L332 450 L272 532 L204 1080 Z" fill={`rgba(${base},0.98)`} />
      <path d="M394 620 C402 570 432 522 470 500 C500 482 522 500 522 530 C522 566 488 612 444 646 Z" fill={`rgba(${base},0.78)`} />
      <path d="M450 748 C444 700 412 672 378 676 C344 680 328 716 338 764 C348 816 382 850 418 848 C440 846 454 812 450 748 Z" fill={`rgba(${base},0.84)`} />
      {denser ? <path d="M312 812 C318 762 344 734 372 736 C398 738 412 766 404 810 C396 848 372 876 344 874 C324 872 310 848 312 812 Z" fill={`rgba(${base},0.90)`} /> : null}
    </svg>
    <svg viewBox="0 0 1920 320" style={{position:'absolute', left:0, bottom:-10, width:'100%', height:320, opacity:0.86}}>
      <path d="M0 320 L0 190 L120 174 L188 142 L252 152 L330 120 L436 156 L548 124 L672 160 L790 128 L922 164 L1050 132 L1188 168 L1328 136 L1466 172 L1598 150 L1722 178 L1848 160 L1920 180 L1920 320 Z" fill={`rgba(${base},0.88)`} />
    </svg>
  </>
);

const UnityForeground: React.FC<any> = ({base, leftIn, rightIn, float}) => (
  <>
    <div style={{position:'absolute', left:'-4%', bottom:'8%', width:420, height:380, background:`rgba(${base},0.96)`, clipPath:'polygon(0 100%, 18% 60%, 34% 46%, 46% 28%, 58% 12%, 72% 0, 88% 36%, 100% 100%)', transform:`translateX(${leftIn * 0.75}px) translateY(${float * 0.28}px)`}} />
    <div style={{position:'absolute', right:'-4%', bottom:'10%', width:460, height:430, background:`rgba(${base},0.96)`, clipPath:'polygon(0 100%, 14% 56%, 38% 28%, 50% 8%, 66% 0, 80% 26%, 100% 100%)', transform:`translateX(${rightIn * 0.75}px) translateY(${float * -0.24}px)`}} />
    <svg viewBox="0 0 1920 300" style={{position:'absolute', left:0, bottom:-8, width:'100%', height:300, opacity:0.88}}>
      <path d="M0 300 L0 196 L156 166 L320 214 L468 142 L612 226 L778 130 L950 230 L1130 148 L1306 234 L1498 150 L1706 232 L1920 176 L1920 300 Z" fill={`rgba(${base},0.90)`} />
    </svg>
  </>
);

const IceForeground: React.FC<any> = ({base, leftIn, rightIn, float}) => (
  <>
    {[8, 18, 32].map((x, idx) => <div key={x} style={{position:'absolute', left:`${x}%`, bottom:'-4%', width:90 + idx * 24, height:640 - idx * 50, background:`rgba(${base},0.96)`, clipPath:'polygon(34% 0, 56% 10%, 72% 30%, 86% 60%, 100% 100%, 0 100%, 10% 44%, 18% 14%)', transform:`translateX(${leftIn * (0.65 + idx * 0.1)}px) translateY(${float * 0.25}px)`}} />)}
    {[68, 82, 92].map((x, idx) => <div key={x} style={{position:'absolute', left:`${x}%`, bottom:'-4%', width:84 + idx * 22, height:620 - idx * 50, background:`rgba(${base},0.96)`, clipPath:'polygon(38% 0, 62% 8%, 82% 36%, 100% 100%, 0 100%, 12% 52%, 22% 18%)', transform:`translateX(${rightIn * (0.65 + idx * 0.1)}px) translateY(${float * -0.22}px)`}} />)}
    <svg viewBox="0 0 1920 280" style={{position:'absolute', left:0, bottom:-8, width:'100%', height:280, opacity:0.84}}>
      <path d="M0 280 L0 196 L122 182 L250 160 L410 190 L596 146 L812 196 L1036 152 L1260 206 L1488 162 L1716 210 L1920 172 L1920 280 Z" fill={`rgba(${base},0.90)`} />
    </svg>
  </>
);

const VolcanoForeground: React.FC<any> = ({base, leftIn, rightIn, float}) => (
  <>
    {/* Frame the RDNA text instead of burying it */}
    {[0,1].map((i) => <div key={`vl-${i}`} style={{position:'absolute', left:`${-2 + i * 14}%`, bottom:`${8 + i * 2}%`, width:220 + i * 44, height:470 + i * 86, background:`rgba(${base},0.94)`, clipPath:'polygon(46% 0, 72% 18%, 90% 40%, 100% 100%, 0 100%, 12% 56%, 20% 22%)', transform:`translateX(${leftIn * (0.66 + i * 0.1)}px) translateY(${float * (0.4 + i * 0.05)}px)`}} />)}
    {[0,1].map((i) => <div key={`vr-${i}`} style={{position:'absolute', right:`${-1 + i * 15}%`, bottom:`${8 + i * 3}%`, width:230 + i * 42, height:460 + i * 88, background:`rgba(${base},0.94)`, clipPath:'polygon(42% 0, 68% 18%, 84% 44%, 100% 100%, 0 100%, 14% 54%, 18% 24%)', transform:`translateX(${rightIn * (0.62 + i * 0.1)}px) translateY(${float * (-0.38 - i * 0.05)}px)`}} />)}

    {/* Lower center silhouettes so the title remains readable */}
    <div style={{position:'absolute', left:'18%', bottom:'-2%', width:190, height:300, background:`rgba(${base},0.78)`, clipPath:'polygon(46% 0, 72% 18%, 90% 40%, 100% 100%, 0 100%, 12% 56%, 20% 22%)', transform:`translateY(${float * 0.16}px)`}} />
    <div style={{position:'absolute', right:'18%', bottom:'-2%', width:190, height:300, background:`rgba(${base},0.78)`, clipPath:'polygon(42% 0, 68% 18%, 84% 44%, 100% 100%, 0 100%, 14% 54%, 18% 24%)', transform:`translateY(${float * -0.14}px)`}} />

    <svg viewBox="0 0 1920 260" style={{position:'absolute', left:0, bottom:-8, width:'100%', height:260, opacity:0.84}}>
      <path d="M0 260 L0 188 L126 178 L258 146 L320 156 L426 112 L548 182 L664 122 L792 194 L946 118 L1100 188 L1252 134 L1416 194 L1568 142 L1714 188 L1828 164 L1920 176 L1920 260 Z" fill={`rgba(${base},0.88)`} />
    </svg>
  </>
);

const ForestForeground: React.FC<any> = ({base, leftIn, rightIn, float}) => (
  <>
    {[8,18,30,42,72,84,92].map((x, idx) => <div key={x} style={{position:'absolute', left:`${x}%`, bottom:'-6%', width:34 + (idx % 2) * 18, height:860 - idx * 36, background:`rgba(${base},0.96)`, transform:`translateX(${idx < 4 ? leftIn : rightIn}px) translateY(${float * (idx % 2 === 0 ? 0.34 : -0.3)}px)`, borderRadius:'22px 22px 0 0'}} />)}
    <svg viewBox="0 0 520 1080" style={{position:'absolute', left:-34, bottom:-10, width:520, height:1080, opacity:0.92}}>
      <path d="M0 1080 L0 660 L92 642 L134 594 L176 530 L208 482 L260 456 L284 492 L270 542 L302 604 L344 656 L386 1080 Z" fill={`rgba(${base},0.90)`} />
    </svg>
    <svg viewBox="0 0 520 1080" style={{position:'absolute', right:-34, bottom:-10, width:520, height:1080, opacity:0.92}}>
      <path d="M520 1080 L520 632 L466 616 L430 566 L388 498 L352 462 L294 442 L274 478 L286 532 L254 608 L212 660 L166 1080 Z" fill={`rgba(${base},0.90)`} />
    </svg>
    <div style={{position:'absolute', inset:'auto 0 -2% 0', height:'28%', background:`linear-gradient(180deg, transparent 0%, rgba(${base},0.34) 22%, rgba(${base},0.86) 100%)`}} />
  </>
);

const FusionForeground: React.FC<any> = ({base, leftIn, rightIn, float}) => (
  <>
    <div style={{position:'absolute', left:'4%', top:'12%', width:220, height:780, border:`1px solid rgba(144,220,255,0.10)`, background:`rgba(${base},0.34)`, borderRadius:34, transform:`translateX(${leftIn * 0.45}px) translateY(${float * 0.18}px)`}} />
    <div style={{position:'absolute', right:'4%', top:'14%', width:220, height:748, border:`1px solid rgba(255,110,110,0.10)`, background:`rgba(${base},0.34)`, borderRadius:34, transform:`translateX(${rightIn * 0.45}px) translateY(${float * -0.16}px)`}} />
    <svg viewBox="0 0 1920 240" style={{position:'absolute', left:0, bottom:-6, width:'100%', height:240, opacity:0.84}}>
      <path d="M0 240 L0 154 L168 138 L320 118 L482 146 L650 112 L824 150 L1010 116 L1186 154 L1378 120 L1578 156 L1768 128 L1920 140 L1920 240 Z" fill={`rgba(${base},0.86)`} />
    </svg>
  </>
);
