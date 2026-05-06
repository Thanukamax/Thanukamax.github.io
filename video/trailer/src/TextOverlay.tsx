import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useVideoConfig} from 'remotion';

const mono = 'JetBrains Mono, monospace';
const sans = 'DM Sans, system-ui, sans-serif';

type Props = {frame:number};

const seg = {
  intro:[0,118],
  ocean:[118,210],
  unity:[210,330],
  reverse:[330,450],
  rdna:[450,570],
  cuda:[570,690],
  fusion:[690,840],
  final:[840,990],
} as const;

const pal = {
  cyber: {accent:'#77dbff', accent2:'#ff76ce', grad:'linear-gradient(135deg,#eff7ff 0%,#7adfff 44%,#8f65ff 100%)', subtle:'#a7c0db', plate:'rgba(5,12,24,0.64)', plate2:'rgba(8,18,34,0.86)'},
  ocean: {accent:'#6be6ff', accent2:'#2ab2e8', grad:'linear-gradient(135deg,#d8f9ff 0%,#79e6ff 36%,#29bfe8 100%)', subtle:'#9db8ca', plate:'rgba(6,18,28,0.56)', plate2:'rgba(8,20,32,0.84)'},
  unity: {accent:'#f0c18f', accent2:'#bf7f45', grad:'linear-gradient(135deg,#fff1d9 0%,#f0c18f 38%,#9d6333 100%)', subtle:'#d3beaa', plate:'rgba(20,11,6,0.58)', plate2:'rgba(28,16,9,0.86)'},
  ice: {accent:'#dcefff', accent2:'#7db9ff', grad:'linear-gradient(135deg,#ffffff 0%,#dcefff 34%,#7db9ff 100%)', subtle:'#b7c8d8', plate:'rgba(8,14,24,0.56)', plate2:'rgba(12,18,30,0.84)'},
  volcano: {accent:'#ff6d56', accent2:'#ffca8b', grad:'linear-gradient(135deg,#ffd4b0 0%,#ff7b58 38%,#d92b2b 100%)', subtle:'#d9a79d', plate:'rgba(18,3,3,0.68)', plate2:'rgba(12,2,2,0.9)'},
  forest: {accent:'#8ff6a8', accent2:'#35bc6a', grad:'linear-gradient(135deg,#f0fff3 0%,#8ff6a8 36%,#33bc69 100%)', subtle:'#b8ceb8', plate:'rgba(6,18,10,0.58)', plate2:'rgba(10,22,14,0.84)'},
  fusion: {accent:'#79e7ff', accent2:'#ff6f6f', grad:'linear-gradient(135deg,#edf9ff 0%,#6bf0b1 30%,#79e7ff 58%,#ff6f6f 100%)', subtle:'#bac9df', plate:'rgba(7,12,22,0.62)', plate2:'rgba(10,16,28,0.86)'},
};

const fade = (frame:number, start:number, end:number, pad=14) => interpolate(frame, [start, start + pad, end - pad, end], [0,1,1,0], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
const slideY = (frame:number, start:number, end:number, from=24) => interpolate(frame, [start, end], [from, 0], {extrapolateLeft:'clamp', extrapolateRight:'clamp', easing:Easing.out(Easing.cubic)});
const slideX = (frame:number, start:number, end:number, from=24) => interpolate(frame, [start, end], [from, 0], {extrapolateLeft:'clamp', extrapolateRight:'clamp', easing:Easing.out(Easing.cubic)});

type Theme = typeof pal.cyber;

const FrostedCard: React.FC<{
  theme: Theme;
  children: React.ReactNode;
  width?: number | string;
  padding?: string;
  radius?: number;
  glow?: number;
}> = ({theme, children, width='auto', padding='30px 44px', radius=30, glow=0.16}) => {
  return (
    <div
      style={{
        width,
        padding,
        borderRadius: radius,
        background: `linear-gradient(180deg, ${theme.plate} 0%, ${theme.plate2} 100%)`,
        border: `1px solid ${theme.accent}33`,
        boxShadow: `0 24px 80px rgba(0,0,0,0.40), 0 0 42px rgba(0,0,0,0.12), 0 0 46px rgba(${hexToRgb(theme.accent)},${glow})`,
        backdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{position:'absolute', inset:1, borderRadius: radius - 1, boxShadow:`inset 0 0 0 1px rgba(255,255,255,0.04)`, pointerEvents:'none'}} />
      <div style={{position:'absolute', left:18, right:18, top:0, height:1, background:`linear-gradient(90deg, transparent 0%, ${theme.accent}55 20%, ${theme.accent2}44 50%, ${theme.accent}22 80%, transparent 100%)`, pointerEvents:'none'}} />
      {children}
    </div>
  );
};

const hexToRgb = (hex:string) => {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  return `${(num >> 16) & 255},${(num >> 8) & 255},${num & 255}`;
};

const Chip: React.FC<{text:string;color:string;frame:number;start:number;width?:number;dir?:number}> = ({text,color,frame,start,width=220,dir=1}) => {
  const alpha = fade(frame, start, start + 56, 10);
  const y = slideY(frame, start, start + 12, 16);
  const x = slideX(frame, start, start + 12, dir * 22);
  return (
    <div style={{minWidth:width, padding:'12px 20px', borderRadius:16, border:`1px solid ${color}33`, background:'rgba(6,12,20,0.56)', boxShadow:'0 14px 34px rgba(0,0,0,0.18)', fontFamily:mono, fontSize:21, letterSpacing:'0.11em', color, textTransform:'uppercase', textAlign:'center', transform:`translate(${x}px, ${y}px)`, opacity:alpha, backdropFilter:'blur(4px)'}}>
      {text}
    </div>
  );
};

export const TextOverlay: React.FC<Props> = ({frame}) => {
  const {fps} = useVideoConfig();
  const finalSpring = spring({fps, frame: frame - seg.final[0] + 6, config:{damping:180, stiffness:80}});
  const beatPulse = 1 + Math.max(0, Math.sin(frame * 0.18)) * 0.06;

  return (
    <AbsoluteFill style={{pointerEvents:'none'}}>
      {frame < seg.unity[0] && (
        <ExtendedIntro frame={frame} end={seg.unity[0]} beatPulse={beatPulse} />
      )}

      {frame >= seg.unity[0] && frame < seg.unity[1] && (
        <Centered
          frame={frame}
          start={seg.unity[0]}
          end={seg.unity[1]}
          kicker="mountain engine chamber"
          line1="UNITY"
          line2="UE5"
          sub="real-time worlds · gameplay systems"
          theme={pal.unity}
          extra={<div style={{marginTop:24, display:'flex', gap:16, justifyContent:'center'}}><Chip text="Unity" color={pal.unity.accent} frame={frame} start={seg.unity[0] + 18} width={180} dir={-1} /><Chip text="Unreal Engine 5" color="#fff3e1" frame={frame} start={seg.unity[0] + 32} width={320} dir={1} /></div>}
        />
      )}

      {frame >= seg.reverse[0] && frame < seg.reverse[1] && (
        <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', opacity:fade(frame, seg.reverse[0], seg.reverse[1], 16), transform:`translateY(${slideY(frame, seg.reverse[0], seg.reverse[0] + 12, 18)}px)`}}>
          <FrostedCard theme={pal.ice} width={1040}>
            <div style={{textAlign:'center'}}>
              <div style={{fontFamily:mono, fontSize:14, letterSpacing:'0.28em', color:pal.ice.accent, textTransform:'uppercase', marginBottom:18}}>glacial inspection</div>
              <div style={{fontFamily:sans, fontSize:104, lineHeight:0.92, fontWeight:700, letterSpacing:'-0.055em', color:'#f4f8fb'}}>REVERSE</div>
              <div style={{fontFamily:sans, fontSize:104, lineHeight:0.92, fontWeight:700, letterSpacing:'-0.055em', background:pal.ice.grad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>ENGINEERING</div>
              <div style={{marginTop:24, fontFamily:mono, fontSize:16, letterSpacing:'0.12em', color:pal.ice.subtle, textTransform:'uppercase'}}>ghidra · hxd · wireshark · systems analysis</div>
              <div style={{marginTop:26, display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center'}}>
                <Chip text="Ghidra" color={pal.ice.accent} frame={frame} start={seg.reverse[0] + 16} width={180} dir={-1} />
                <Chip text="Binary Analysis" color="#eff9ff" frame={frame} start={seg.reverse[0] + 30} width={260} dir={1} />
                <Chip text="Protocol Tracing" color="#eff9ff" frame={frame} start={seg.reverse[0] + 44} width={280} dir={-1} />
              </div>
            </div>
          </FrostedCard>
        </div>
      )}

      {frame >= seg.rdna[0] && frame < seg.rdna[1] && (
        <RDNABlock frame={frame} start={seg.rdna[0]} end={seg.rdna[1]} />
      )}

      {frame >= seg.cuda[0] && frame < seg.cuda[1] && (
        <Centered
          frame={frame}
          start={seg.cuda[0]}
          end={seg.cuda[1]}
          kicker="forest compute"
          line1="CUDA"
          line2="PARALLEL THINKING"
          sub="compute · tooling · systems"
          theme={pal.forest}
        />
      )}

      {frame >= seg.fusion[0] && frame < seg.fusion[1] && (
        <div style={{position:'absolute', inset:0, opacity:fade(frame, seg.fusion[0], seg.fusion[1], 18), display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{position:'absolute', left:'8%', top:'28%', display:'flex', flexDirection:'column', gap:18}}>
            <Chip text="DONGHUA-CLI" color={pal.fusion.accent} frame={frame} start={seg.fusion[0] + 10} width={320} dir={-1} />
            <Chip text="BITBYBIT" color="#f1f6ff" frame={frame} start={seg.fusion[0] + 22} width={240} dir={1} />
            <Chip text="CROW-B3" color={pal.fusion.accent2} frame={frame} start={seg.fusion[0] + 34} width={220} dir={-1} />
          </div>
          <div style={{position:'absolute', right:'8%', top:'28%', display:'flex', flexDirection:'column', gap:18}}>
            <Chip text="C++" color="#f1f6ff" frame={frame} start={seg.fusion[0] + 16} width={160} dir={1} />
            <Chip text="PYTHON" color={pal.fusion.accent} frame={frame} start={seg.fusion[0] + 28} width={180} dir={-1} />
            <Chip text="GRAPHICS" color={pal.fusion.accent2} frame={frame} start={seg.fusion[0] + 40} width={210} dir={1} />
            <Chip text="OPEN SOURCE" color="#f1f6ff" frame={frame} start={seg.fusion[0] + 52} width={240} dir={-1} />
          </div>
          <FrostedCard theme={pal.fusion} width={980}>
            <div style={{textAlign:'center', opacity:fade(frame, seg.fusion[0] + 8, seg.fusion[1], 12)}}>
              <div style={{fontFamily:mono, fontSize:14, letterSpacing:'0.24em', color:pal.fusion.accent, textTransform:'uppercase', marginBottom:12}}>synthesis archive</div>
              <div style={{fontFamily:sans, fontSize:74, fontWeight:700, letterSpacing:'-0.05em', color:'#edf5fb'}}>BUILT LIKE</div>
              <div style={{fontFamily:sans, fontSize:88, fontWeight:700, letterSpacing:'-0.055em', background:pal.fusion.grad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>A WORLD</div>
              <div style={{marginTop:18, fontFamily:mono, fontSize:16, letterSpacing:'0.12em', color:pal.fusion.subtle, textTransform:'uppercase'}}>systems · style · motion · tooling</div>
            </div>
          </FrostedCard>
        </div>
      )}

      {frame >= seg.final[0] && (
        <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', opacity:fade(frame, seg.final[0], seg.final[1], 18), transform:`scale(${0.94 + finalSpring * 0.06}) translateY(${slideY(frame, seg.final[0], seg.final[0] + 18, 20)}px)`}}>
          <FrostedCard theme={pal.ocean} width={1120} padding="34px 58px 38px">
            <div style={{textAlign:'center'}}>
              <div style={{fontFamily:mono, fontSize:14, letterSpacing:'0.28em', color:pal.ocean.accent, textTransform:'uppercase', marginBottom:18}}>final signal</div>
              <div style={{fontFamily:sans, fontSize:126, lineHeight:0.9, fontWeight:700, letterSpacing:'-0.055em', color:'#edf7fc'}}>THANUKA</div>
              <div style={{fontFamily:sans, fontSize:126, lineHeight:0.9, fontWeight:700, letterSpacing:'-0.055em', background:pal.ocean.grad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>PERERA</div>
              <div style={{marginTop:24, fontFamily:mono, fontSize:16, letterSpacing:'0.12em', color:pal.ocean.subtle, textTransform:'uppercase'}}>GAME DEVELOPER · GPU ARCHITECTURE · SYSTEMS ENGINEER</div>
              <div style={{marginTop:18, fontFamily:mono, fontSize:22, letterSpacing:'0.06em', color:pal.ocean.accent}}>thanukamax.github.io</div>
            </div>
          </FrostedCard>
        </div>
      )}
    </AbsoluteFill>
  );
};

const ExtendedIntro: React.FC<{frame:number; end:number; beatPulse:number}> = ({frame, end, beatPulse}) => {
  const alpha = fade(frame, 0, end, 24);
  const settle = interpolate(frame, [0, 90, end], [1.04, 1, 0.98], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const circleScale = 1 + Math.max(0, Math.sin(frame * 0.18)) * 0.08 + (frame > 90 ? 0.08 : 0);
  const ringShift = frame > 90 ? interpolate(frame, [90, end], [0, 18], {extrapolateLeft:'clamp', extrapolateRight:'clamp'}) : 0;
  return (
    <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', opacity:alpha, transform:`scale(${settle})`}}>
      <div style={{position:'relative', width:250, height:250, marginBottom:24, transform:`scale(${circleScale})`, opacity:0.94}}>
        <div style={{position:'absolute', inset:0, borderRadius:'50%', border:'2px solid rgba(119,219,255,0.46)', boxShadow:'0 0 58px rgba(119,219,255,0.16), inset 0 0 36px rgba(119,219,255,0.06)'}} />
        <div style={{position:'absolute', inset:18, borderRadius:'50%', border:'1px solid rgba(255,118,206,0.20)', transform:`rotate(${frame * 0.8}deg)`}} />
        <div style={{position:'absolute', inset:42, borderRadius:'50%', border:'1px solid rgba(119,219,255,0.22)', transform:`rotate(${-frame * 1.2}deg)`}} />
        <div style={{position:'absolute', inset:74, borderRadius:'50%', border:'1px solid rgba(119,219,255,0.18)'}} />
        <div style={{position:'absolute', top:'50%', left:'50%', width:18, height:18, borderRadius:'50%', transform:'translate(-50%, -50%)', background:'rgba(239,247,255,0.98)', boxShadow:'0 0 24px rgba(119,219,255,0.44)'}} />
        <div style={{position:'absolute', top:'50%', left:14, right:14, height:2, background:'linear-gradient(90deg, transparent 0%, rgba(119,219,255,0.0) 12%, rgba(119,219,255,0.34) 48%, rgba(119,219,255,0.0) 88%, transparent 100%)'}} />
        <div style={{position:'absolute', inset:'-8%', borderRadius:'50%', background:'radial-gradient(circle, rgba(119,219,255,0.14) 0%, transparent 62%)', filter:'blur(20px)', opacity:0.7}} />
      </div>
      <FrostedCard theme={pal.cyber} width={960} padding="28px 42px 30px">
        <div style={{textAlign:'center'}}>
          <div style={{fontFamily:mono, fontSize:14, letterSpacing:'0.28em', color:pal.cyber.accent, textTransform:'uppercase', marginBottom:18}}>signal acquired</div>
          <div style={{fontFamily:sans, fontSize:72, lineHeight:0.94, fontWeight:700, letterSpacing:'-0.05em', color:'#edf6ff', textAlign:'center', transform:`translateY(${slideY(frame, 0, 26, 18)}px)`}}>LOADING USER DATA,</div>
          <div style={{fontFamily:sans, fontSize:72, lineHeight:0.94, fontWeight:700, letterSpacing:'-0.05em', background:pal.cyber.grad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', textAlign:'center', transform:`translateY(${slideY(frame, 8, 30, 14)}px)`}}>COMMENCING ANALYSIS</div>

          <div style={{marginTop:18, width:'100%', height:10, borderRadius:999, background:'rgba(8,18,32,0.58)', border:'1px solid rgba(119,219,255,0.18)', overflow:'hidden', boxShadow:'0 10px 24px rgba(0,0,0,0.22), inset 0 0 18px rgba(119,219,255,0.05)'}}>
            <div style={{width:`${Math.min(100, (frame / end) * 112)}%`, height:'100%', background:'linear-gradient(90deg, rgba(119,219,255,0.35) 0%, rgba(255,118,206,0.55) 50%, rgba(119,219,255,0.9) 100%)', boxShadow:'0 0 18px rgba(119,219,255,0.26)'}} />
          </div>

          <div style={{display:'flex', gap:14, marginTop:22, flexWrap:'wrap', justifyContent:'center', transform:`translateY(${ringShift}px)`}}>
            <IntroPill text="repositories" frame={frame} start={72} color={pal.cyber.accent} />
            <IntroPill text="engines" frame={frame} start={96} color="#eff7ff" />
            <IntroPill text="toolchains" frame={frame} start={118} color={pal.cyber.accent2} />
            <IntroPill text="gpu profiles" frame={frame} start={140} color="#eff7ff" />
          </div>
        </div>
      </FrostedCard>
    </div>
  );
};

const IntroPill: React.FC<{text:string; frame:number; start:number; color:string}> = ({text, frame, start, color}) => {
  const alpha = fade(frame, start, start + 80, 10);
  const y = slideY(frame, start, start + 14, 16);
  return <div style={{padding:'10px 18px', borderRadius:999, border:`1px solid ${color}30`, background:'rgba(7,12,22,0.52)', color, fontFamily:mono, fontSize:14, letterSpacing:'0.14em', textTransform:'uppercase', opacity:alpha, transform:`translateY(${y}px)`, boxShadow:'0 10px 24px rgba(0,0,0,0.16)'}}>{text}</div>;
};

const RDNABlock: React.FC<{frame:number; start:number; end:number}> = ({frame, start, end}) => {
  const alpha = fade(frame, start, end, 18);
  const lift = slideY(frame, start, start + 12, 20);
  return (
    <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', opacity:alpha, transform:`translateY(${lift}px)`}}>
      <FrostedCard theme={pal.volcano} width={980} padding="30px 54px 30px" radius={32} glow={0.18}>
        <div style={{textAlign:'center'}}>
          <div style={{fontFamily:mono, fontSize:15, letterSpacing:'0.30em', color:'#ff8f70', textTransform:'uppercase', marginBottom:14, textShadow:'0 0 10px rgba(255,120,86,0.20)'}}>volcanic subsystem</div>
          <div style={{fontFamily:sans, fontSize:132, lineHeight:0.88, fontWeight:900, letterSpacing:'-0.06em', color:'#fff7ef', WebkitTextStroke:'1px rgba(0,0,0,0.20)', textShadow:'0 2px 0 rgba(0,0,0,0.25), 0 0 28px rgba(255,160,120,0.20), 0 0 60px rgba(255,88,54,0.10)'}}>RDNA</div>
          <div style={{fontFamily:sans, fontSize:116, lineHeight:0.88, fontWeight:900, letterSpacing:'-0.055em', background:'linear-gradient(135deg,#fff6e7 0%,#ffd09b 28%,#ff8c66 58%,#f24b2e 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', WebkitTextStroke:'1.5px rgba(18,2,2,0.55)', filter:'drop-shadow(0 0 20px rgba(255,100,62,0.18))'}}>ARCHITECTURE</div>
          <div style={{marginTop:18, fontFamily:mono, fontSize:18, letterSpacing:'0.14em', color:'#ffe0d1', textTransform:'uppercase', textShadow:'0 1px 8px rgba(0,0,0,0.28)'}}>low-level performance · gpu systems</div>
        </div>
      </FrostedCard>
    </div>
  );
};

const Centered: React.FC<{theme:Theme; frame:number; start:number; end:number; kicker:string; line1:string; line2:string; sub:string; extra?:React.ReactNode}> = ({theme, frame, start, end, kicker, line1, line2, sub, extra}) => (
  <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', opacity:fade(frame, start, end, 16), transform:`translateY(${slideY(frame, start, start + 12, 22)}px)`}}>
    <FrostedCard theme={theme} width={980}>
      <div style={{textAlign:'center'}}>
        <div style={{fontFamily:mono, fontSize:14, letterSpacing:'0.28em', color:theme.accent, textTransform:'uppercase', marginBottom:18}}>{kicker}</div>
        <div style={{fontFamily:sans, fontSize:108, lineHeight:0.9, fontWeight:700, letterSpacing:'-0.055em', color:'#f4f8fb'}}>{line1}</div>
        <div style={{fontFamily:sans, fontSize:108, lineHeight:0.9, fontWeight:700, letterSpacing:'-0.055em', background:theme.grad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>{line2}</div>
        <div style={{marginTop:24, fontFamily:mono, fontSize:16, letterSpacing:'0.12em', color:theme.subtle, textTransform:'uppercase'}}>{sub}</div>
        {extra}
      </div>
    </FrostedCard>
  </div>
);
