import {Easing, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';

const CaptionLine = ({caption}) => {
  const frame = useCurrentFrame();
  return <div style={{opacity: interpolate(frame, [0, 7], [0, 1], {extrapolateRight:'clamp'}), translate:`0 ${interpolate(frame, [0, 10], [20, 0], {extrapolateRight:'clamp', easing:Easing.bezier(.16,1,.3,1)})}px`, background:'rgba(3,8,5,.84)', color:'#f4f7f5', fontFamily:'Arial, Tahoma, sans-serif', border:'1px solid rgba(255,255,255,.14)', borderRadius:24, padding:'18px 28px', fontSize:42, lineHeight:1.35, fontWeight:800, textAlign:'center', boxShadow:'0 18px 50px rgba(0,0,0,.35)'}}>{caption.text.trim()}</div>;
};

export const Subtitle = ({captions = []}) => {
  const {fps} = useVideoConfig();
  return <div style={{position:'absolute', left:72, right:72, bottom:132, zIndex:20}}>{captions.map((caption, index) => {
    const from = Math.round(caption.startMs / 1000 * fps);
    const durationInFrames = Math.max(1, Math.round((caption.endMs - caption.startMs) / 1000 * fps));
    return <Sequence key={`${caption.startMs}-${index}`} from={from} durationInFrames={durationInFrames} layout="none"><CaptionLine caption={caption}/></Sequence>;
  })}</div>;
};
