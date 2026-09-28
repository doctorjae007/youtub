import trendData from '../../data/trends/2026-09-27.json';
import ideaData from '../../data/ideas/2026-09-27.json';
import {directIdea} from '../agents/directorAgent';

const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const staticMode = import.meta.env.PROD && !apiBase;

const request = async (path, options) => {
  const response = await fetch(`${apiBase}${path}`, options);
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;
  if (!response.ok) throw new Error(data?.error || `Request failed (${response.status})`);
  return data;
};

const staticApi = {
  dashboard: async () => ({date: trendData.date, mode: 'mock', trends: trendData.trends, ideas: ideaData.ideas}),
  scout: async () => ({date: trendData.date, mode: 'mock', trends: trendData.trends}),
  generateIdeas: async () => ({ideas: ideaData.ideas}),
  createProject: async (idea) => directIdea(idea),
  updateProject: async (project) => project,
  uploadVoice: async (file) => ({src: URL.createObjectURL(file), originalName: file.name}),
  render: async () => { throw new Error('การ Render MP4 ต้องเชื่อมต่อ Node.js backend'); },
};

export const api = {
  dashboard: () => staticMode ? staticApi.dashboard() : request('/api/dashboard'),
  scout: () => staticMode ? staticApi.scout() : request('/api/scout', {method: 'POST'}),
  generateIdeas: () => staticMode ? staticApi.generateIdeas() : request('/api/ideas/generate', {method: 'POST'}),
  createProject: (idea) => staticMode ? staticApi.createProject(idea) : request('/api/projects', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({idea})}),
  updateProject: (project) => staticMode ? staticApi.updateProject(project) : request(`/api/projects/${project.id}`, {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(project)}),
  uploadVoice: async (file) => {if (staticMode) return staticApi.uploadVoice(file); const body = new FormData(); body.append('voice', file); return request('/api/voice', {method: 'POST', body});},
  render: (project) => staticMode ? staticApi.render() : request('/api/render', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({project})}),
};
