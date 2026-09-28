import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {BrandFrame} from '../components/BrandFrame';
import {TacticalBoard} from '../components/TacticalBoard';

export const TacticalScene = ({scene}) => {const frame=useCurrentFrame(); return <BrandFrame accent={scene.accent} kicker="TACTICAL VIEW"><div style={{position:'absolute',inset:'190px 72px 230px',display:'grid',gridTemplateRows:'auto 1fr',gap:46}}><div><div style={{fontSize:76,lineHeight:1.05,fontWeight:950,letterSpacing:-3}}>{scene.headline}</div><div style={{fontSize:38,color:'#a9bab1',marginTop:16}}>{scene.body}</div></div><div style={{width:'78%',justifySelf:'center',opacity:interpolate(frame,[0,16],[0,1],{extrapolateRight:'clamp'}),translate:`0 ${interpolate(frame,[0,20],[60,0],{extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)})}px`}}><TacticalBoard accent={scene.accent}/></div></div></BrandFrame>};
