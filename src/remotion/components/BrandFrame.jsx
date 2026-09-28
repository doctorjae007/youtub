import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export const BrandFrame = ({children, accent = '#d7ff3f', kicker = 'TOUCHLINE / AI'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{backgroundColor: '#07100c', color: '#f4f7f5', fontFamily: 'Arial, Tahoma, sans-serif', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 10%, rgba(45,110,75,.35), transparent 38%), linear-gradient(160deg, #0b1a13 0%, #050806 65%)'}} />
      <div style={{position: 'absolute', inset: 0, opacity: .12, backgroundImage: 'linear-gradient(rgba(255,255,255,.11) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.11) 1px, transparent 1px)', backgroundSize: '72px 72px', translate: `0 ${interpolate(frame, [0, fps * 8], [0, 72], {extrapolateRight: 'clamp'})}px`}} />
      <div style={{position: 'absolute', top: 72, left: 72, right: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'center', letterSpacing: 4, fontSize: 22, fontWeight: 800}}>
        <span style={{color: accent}}>{kicker}</span><span style={{color: '#90a49a'}}>90° / ORIGINAL</span>
      </div>
      <div style={{position: 'absolute', top: 126, left: 72, width: interpolate(frame, [0, fps], [0, 936], {extrapolateRight: 'clamp', easing: Easing.bezier(.16, 1, .3, 1)}), height: 3, background: accent}} />
      {children}
      <div style={{position: 'absolute', bottom: 64, left: 72, display: 'flex', gap: 10}}>{[0,1,2].map((dot) => <div key={dot} style={{width: dot === 0 ? 34 : 10, height: 10, borderRadius: 10, background: dot === 0 ? accent : '#3c4c44'}} />)}</div>
    </AbsoluteFill>
  );
};
