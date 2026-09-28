const TOPICS = ['Premier League', 'Champions League', 'Football News', 'Player Stories', 'Football Tactics', 'Football Facts'];

const hoursSince = (iso) => Math.max(1, (Date.now() - new Date(iso).getTime()) / 36e5);
const number = (value) => Number.parseInt(value || '0', 10);

export const enrichVideo = (video, stats) => {
  const views = number(stats.viewCount);
  const likes = number(stats.likeCount);
  const comments = number(stats.commentCount);
  const videoAgeHours = Number(hoursSince(video.snippet.publishedAt).toFixed(1));
  const viewsPerHour = Math.round(views / videoAgeHours);
  const likeRate = views ? Number(((likes / views) * 100).toFixed(2)) : 0;
  const commentRate = views ? Number(((comments / views) * 100).toFixed(2)) : 0;
  const velocity = Math.min(100, Math.log10(Math.max(viewsPerHour, 1)) * 20);
  const engagement = Math.min(100, likeRate * 8 + commentRate * 20);
  const freshness = Math.max(0, 100 - videoAgeHours * 2);
  const trendScore = Math.round(velocity * 0.48 + engagement * 0.32 + freshness * 0.2);

  return {
    id: `yt-${video.id.videoId}`,
    videoId: video.id.videoId,
    title: video.snippet.title,
    channel: video.snippet.channelTitle,
    publishedAt: video.snippet.publishedAt,
    views,
    likes,
    comments,
    url: `https://youtube.com/watch?v=${video.id.videoId}`,
    topic: 'Football News',
    videoAgeHours,
    viewsPerHour,
    likeRate,
    commentRate,
    trendScore,
    freshness: videoAgeHours < 8 ? 'สดมาก' : videoAgeHours < 24 ? 'วันนี้' : 'ล่าสุด',
    risk: 'ต้องตรวจสอบ',
  };
};

export const scoutYouTube = async (apiKey) => {
  const publishedAfter = new Date(Date.now() - 36 * 36e5).toISOString();
  const query = TOPICS.map((topic) => `"${topic}"`).join('|');
  const search = new URL('https://www.googleapis.com/youtube/v3/search');
  search.search = new URLSearchParams({part: 'snippet', type: 'video', maxResults: '25', order: 'date', q: query, publishedAfter, key: apiKey});
  const searchResponse = await fetch(search);
  if (!searchResponse.ok) throw new Error(`YouTube search failed (${searchResponse.status})`);
  const searchData = await searchResponse.json();
  const ids = searchData.items.map((item) => item.id.videoId).join(',');
  const statsUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
  statsUrl.search = new URLSearchParams({part: 'statistics', id: ids, key: apiKey});
  const statsResponse = await fetch(statsUrl);
  if (!statsResponse.ok) throw new Error(`YouTube statistics failed (${statsResponse.status})`);
  const statsData = await statsResponse.json();
  const statsMap = new Map(statsData.items.map((item) => [item.id, item.statistics]));
  return searchData.items.map((item) => enrichVideo(item, statsMap.get(item.id.videoId) || {})).sort((a, b) => b.trendScore - a.trendScore).slice(0, 10);
};
