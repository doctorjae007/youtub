const request = async (path, options) => {
  const response = await fetch(path, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
};

export const api = {
  dashboard: () => request('/api/dashboard'),
  scout: () => request('/api/scout', {method: 'POST'}),
  generateIdeas: () => request('/api/ideas/generate', {method: 'POST'}),
  createProject: (idea) => request('/api/projects', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({idea})}),
  updateProject: (project) => request(`/api/projects/${project.id}`, {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(project)}),
  uploadVoice: async (file) => {const body = new FormData(); body.append('voice', file); return request('/api/voice', {method: 'POST', body});},
  render: (project) => request('/api/render', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({project})}),
};
