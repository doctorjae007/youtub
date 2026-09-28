import {AbsoluteFill, Sequence, staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {HookScene} from './scenes/HookScene';
import {HeadlineScene} from './scenes/HeadlineScene';
import {StatScene} from './scenes/StatScene';
import {TacticalScene} from './scenes/TacticalScene';
import {CardScene} from './scenes/CardScene';
import {Subtitle} from './components/Subtitle';

const componentByType = {hook: HookScene, headline: HeadlineScene, stat: StatScene, tactical: TacticalScene};

export const FootballVideo = ({project}) => {
  let start = 0;
  return <AbsoluteFill>{project.scenes.map((scene) => {
    const Scene = componentByType[scene.type] || CardScene;
    const from = start;
    start += scene.durationInFrames;
    return <Sequence key={scene.id} from={from} durationInFrames={scene.durationInFrames} name={`${scene.order}. ${scene.label}`}><Scene scene={scene}/></Sequence>;
  })}<Subtitle captions={project.subtitles}/>{project.voice?.src ? <Audio src={project.voice.src.startsWith('/') ? staticFile(project.voice.src.slice(1)) : project.voice.src}/> : null}</AbsoluteFill>;
};
