const sceneNames = {hook: 'Hook', headline: 'Headline', player: 'Player card', team: 'Team card', stat: 'Stat card', tactical: 'Tactical board', quote: 'Quote', source: 'Source', cta: 'Call to action'};

export const directIdea = (idea) => {
  let cursor = 0;
  return {
    id: `project-${idea.id}`,
    ideaId: idea.id,
    title: idea.title,
    status: 'draft',
    createdAt: new Date().toISOString(),
    video: {width: 1080, height: 1920, fps: 30, durationInSeconds: idea.scenes.reduce((sum, scene) => sum + scene.duration, 0)},
    script: idea.script,
    caption: idea.caption,
    hashtags: idea.hashtags,
    voice: {provider: 'mock', source: null},
    assets: {provider: 'css-svg', userAssets: []},
    subtitles: idea.scenes.map((scene) => {
      const startMs = cursor * 1000;
      cursor += scene.duration;
      return {text: ` ${scene.body}`, startMs, endMs: cursor * 1000, timestampMs: startMs, confidence: 1};
    }),
    scenes: idea.scenes.map((scene, index) => ({...scene, order: index + 1, label: sceneNames[scene.type] || 'Scene', durationInFrames: scene.duration * 30})),
    sourceNotes: idea.sourceNotes,
  };
};
