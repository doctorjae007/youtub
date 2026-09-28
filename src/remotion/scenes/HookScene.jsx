import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BrandFrame} from '../components/BrandFrame';

export const HookScene = ({scene}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return <BrandFrame accent={scene.accent} kicker="THE OPENING"><div style={{position:'absolute', inset:'230px 72px 260px', display:'flex', flexDirection:'column', justifyContent:'center'}}><div style={{fontSize:30, color:scene.accent, fontWeight:900, letterSpacing:5, marginBottom:28}}>หยุดดูเกมไว้ตรงนี้</div><div style={{fontSize:118, lineHeight:.98, fontWeight:950, letterSpacing:-6, opacity:interpolate(frame,[0,15],[0,1],{extrapolateRight:'clamp'}), translate:`0 ${interpolate(frame,[0,fps],[80,0],{extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)})}px`}}>{scene.headline}</div><div style={{marginTop:42, fontSize:48, lineHeight:1.35, color:'#b8c6bf', maxWidth:820}}>{scene.body}</div><div style={{position:'absolute', right:-80, bottom:40, width:330, height:330, borderRadius:'50%', border:`55px solid ${scene.accent}`, opacity:.09, scale:interpolate(frame,[0,fps*2],[.6,1.1],{extrapolateRight:'clamp'})}}/></div></BrandFrame>;
};
