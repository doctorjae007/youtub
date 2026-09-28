import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const players = [{x:18,y:50},{x:38,y:28},{x:38,y:72},{x:61,y:50},{x:78,y:28},{x:78,y:72}];

export const TacticalBoard = ({accent = '#d7ff3f'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{position: 'relative', width: '100%', aspectRatio: '0.72', borderRadius: 36, overflow: 'hidden', border: '3px solid rgba(255,255,255,.35)', background: 'linear-gradient(90deg, #173f2b, #1e5136)'}}>
      <svg viewBox="0 0 100 140" style={{position:'absolute', inset:0, width:'100%', height:'100%', opacity:.6}}>
        <g fill="none" stroke="white" strokeWidth=".55"><rect x="3" y="3" width="94" height="134"/><line x1="3" y1="70" x2="97" y2="70"/><circle cx="50" cy="70" r="12"/><rect x="25" y="3" width="50" height="20"/><rect x="25" y="117" width="50" height="20"/><circle cx="50" cy="70" r="1.2" fill="white"/></g>
        <path d="M18 70 C32 60, 37 42, 51 38 S72 36, 80 25" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="4 3" strokeDashoffset={interpolate(frame, [0, fps * 2], [30, 0], {extrapolateRight:'clamp'})}/>
        <path d="M38 100 C48 88, 59 83, 76 91" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 3" strokeDashoffset={interpolate(frame, [0, fps * 2], [25, 0], {extrapolateRight:'clamp'})}/>
      </svg>
      {players.map((player, index) => <div key={index} style={{position:'absolute', left:`${player.x}%`, top:`${player.y}%`, width:42, height:42, borderRadius:'50%', background:index < 3 ? accent : '#60a5fa', border:'5px solid #07100c', scale: interpolate(frame, [index * 3, index * 3 + 16], [0, 1], {extrapolateLeft:'clamp', extrapolateRight:'clamp', easing:Easing.spring({damping:16}), output:'perceptual-scale'}), boxShadow:'0 8px 20px rgba(0,0,0,.4)'}} />)}
    </div>
  );
};
