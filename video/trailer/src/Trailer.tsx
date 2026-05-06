import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Biome, SceneBackground} from './SceneBackground';
import {SceneForeground} from './SceneForeground';
import {Particles} from './Particles';
import {TextOverlay} from './TextOverlay';

const TOTAL = 990;

const sceneMap = [
  {start:0, end:90, biome:'cyber' as Biome},
  {start:90, end:210, biome:'ocean' as Biome},
  {start:210, end:330, biome:'unity' as Biome},
  {start:330, end:450, biome:'ice' as Biome},
  {start:450, end:570, biome:'volcano' as Biome},
  {start:570, end:690, biome:'forest' as Biome},
  {start:690, end:840, biome:'fusion' as Biome},
  {start:840, end:990, biome:'oceanFinal' as Biome},
];

const sceneOpacity = (frame:number, start:number, end:number, fadeIn=14, fadeOut=18) => {
  if (start === 0) {
    return interpolate(frame, [start, end - fadeOut, end], [1, 1, 0], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  }
  if (end === TOTAL) {
    return interpolate(frame, [start, start + fadeIn, end], [0, 1, 1], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  }
  return interpolate(frame, [start, start + fadeIn, end - fadeOut, end], [0, 1, 1, 0], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
};

const pulse = (frame:number, center:number, width:number, amount:number) => interpolate(frame, [center - width, center, center + width], [0, amount, 0], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});

const boundaries = [90, 210, 330, 450, 570, 690, 840];

const colorForBiome = (biome: Biome) => {
  switch (biome) {
    case 'cyber': return '119,219,255';
    case 'ocean':
    case 'oceanFinal': return '98,224,255';
    case 'unity': return '240,193,143';
    case 'ice': return '190,234,255';
    case 'volcano': return '255,90,70';
    case 'forest': return '102,236,135';
    case 'fusion': return '121,231,255';
    default: return '121,150,255';
  }
};

const TransitionOverlay: React.FC<{frame:number; boundary:number; color:string; dir:number}> = ({frame, boundary, color, dir}) => {
  const op = pulse(frame, boundary, 18, 1);
  const travel = interpolate(frame, [boundary - 18, boundary + 18], [-86 * dir, 86 * dir], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const rotate = interpolate(frame, [boundary - 18, boundary + 18], [-8 * dir, 8 * dir], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  return (
    <>
      <div style={{position:'absolute', inset:'-18% -26%', pointerEvents:'none', opacity:op * 0.95, transform:`translateX(${travel}%) rotate(${rotate}deg)`, background:`linear-gradient(90deg, transparent 0%, rgba(${color},0.02) 22%, rgba(${color},0.15) 50%, rgba(${color},0.02) 78%, transparent 100%)`, filter:'blur(36px)', mixBlendMode:'screen'}} />
      <div style={{position:'absolute', inset:0, pointerEvents:'none', opacity:op * 0.26, background:`radial-gradient(circle at 50% 50%, rgba(${color},0.22) 0%, transparent 46%)`, filter:'blur(24px)', mixBlendMode:'screen'}} />
    </>
  );
};

const OccluderWipe: React.FC<{frame:number; boundary:number; dir:number}> = ({frame, boundary, dir}) => {
  const op = pulse(frame, boundary, 14, 1);
  const x = interpolate(frame, [boundary - 12, boundary + 12], [-140 * dir, 140 * dir], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  return (
    <div style={{position:'absolute', top:'-12%', left:'-30%', width:'160%', height:'124%', opacity:op * 0.48, transform:`translateX(${x}%) rotate(${dir * 12}deg)`, background:'linear-gradient(90deg, transparent 0%, rgba(1,4,10,0.0) 10%, rgba(1,4,10,0.92) 48%, rgba(1,4,10,0.0) 88%, transparent 100%)', filter:'blur(8px)', pointerEvents:'none'}} />
  );
};

export const Trailer: React.FC = () => {
  const frame = useCurrentFrame();
  const driftX = Math.sin(frame * 0.01) * 7;
  const driftY = Math.cos(frame * 0.008) * 5;
  const push = interpolate(frame, [0, TOTAL], [1.02, 1.0], {extrapolateRight:'clamp'});
  const whipX = boundaries.reduce((acc, boundary, idx) => acc + pulse(frame, boundary, 14, idx % 2 === 0 ? -52 : 52), 0);
  const whipY = boundaries.reduce((acc, boundary) => acc + pulse(frame, boundary, 16, -16), 0);
  const whipRot = boundaries.reduce((acc, boundary, idx) => acc + pulse(frame, boundary, 14, idx % 2 === 0 ? -2.1 : 2.1), 0);
  const zoomBurst = boundaries.reduce((acc, boundary) => acc + pulse(frame, boundary, 16, 0.045), 0);

  return (
    <AbsoluteFill style={{backgroundColor:'#02060f', overflow:'hidden'}}>
      <Audio
        src={staticFile('music.mp3')}
        volume={(f) => interpolate(f, [0, 900, 990], [1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />

      <AbsoluteFill style={{transform:`translate(${driftX + whipX * 0.22}px, ${driftY + whipY * 0.18}px) scale(${push + zoomBurst * 0.45}) rotate(${whipRot * 0.16}deg)`}}>
        {sceneMap.map((scene) => {
          const localFrame = Math.max(0, frame - scene.start);
          const opacity = sceneOpacity(frame, scene.start, scene.end);
          return <AbsoluteFill key={`${scene.start}-${scene.biome}`}><SceneBackground biome={scene.biome} frame={localFrame} opacity={opacity} /></AbsoluteFill>;
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{transform:`translate(${driftX * 0.72 + whipX * 0.48}px, ${driftY * 0.46 + whipY * 0.32}px) rotate(${whipRot * 0.32}deg)`}}>
        {sceneMap.map((scene) => {
          const localFrame = Math.max(0, frame - scene.start);
          const opacity = sceneOpacity(frame, scene.start, scene.end);
          return <AbsoluteFill key={`p-${scene.start}-${scene.biome}`}><Particles biome={scene.biome} frame={localFrame} opacity={opacity} /></AbsoluteFill>;
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{transform:`translate(${driftX * 0.22 + whipX * 0.12}px, ${driftY * 0.14 + whipY * 0.1}px) scale(${1 + zoomBurst * 0.08})`}}>
        <TextOverlay frame={frame} />
      </AbsoluteFill>

      <AbsoluteFill style={{transform:`translate(${driftX * 0.92 + whipX * 0.78}px, ${driftY * 0.58 + whipY * 0.48}px) scale(${1.03 + zoomBurst * 0.2}) rotate(${whipRot * 0.46}deg)`}}>
        {sceneMap.map((scene) => {
          const localFrame = Math.max(0, frame - scene.start);
          const opacity = sceneOpacity(frame, scene.start, scene.end);
          return <AbsoluteFill key={`f-${scene.start}-${scene.biome}`}><SceneForeground biome={scene.biome} frame={localFrame} opacity={opacity} /></AbsoluteFill>;
        })}
      </AbsoluteFill>

      {boundaries.map((boundary, idx) => {
        const nextBiome = sceneMap.find((scene) => scene.start === boundary)?.biome ?? 'ocean';
        const dir = idx % 2 === 0 ? 1 : -1;
        return <React.Fragment key={boundary}><TransitionOverlay frame={frame} boundary={boundary} color={colorForBiome(nextBiome)} dir={dir} /><OccluderWipe frame={frame} boundary={boundary} dir={dir} /></React.Fragment>;
      })}

      <div style={{position:'absolute', inset:0, background:'radial-gradient(ellipse 78% 72% at 50% 46%, transparent 34%, rgba(1,4,10,0.14) 66%, rgba(1,4,10,0.52) 100%)', pointerEvents:'none'}} />
      <div style={{position:'absolute', inset:'auto -8% -8% -8%', height:'32%', background:'linear-gradient(180deg, transparent 0%, rgba(1,4,10,0.14) 30%, rgba(1,4,10,0.58) 100%)', filter:'blur(8px)', pointerEvents:'none'}} />
    </AbsoluteFill>
  );
};
