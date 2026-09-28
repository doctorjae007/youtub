import {Composition} from 'remotion';
import ideas from '../../data/ideas/2026-09-27.json';
import {directIdea} from '../agents/directorAgent';
import {FootballVideo} from './FootballVideo';

const defaultProject = directIdea(ideas.ideas[0]);

export const RemotionRoot = () => <Composition id="FootballStory" component={FootballVideo} width={1080} height={1920} fps={30} durationInFrames={defaultProject.video.durationInSeconds * 30} defaultProps={{project: defaultProject}} calculateMetadata={({props}) => ({durationInFrames: props.project.video.durationInSeconds * 30, props})}/>;
