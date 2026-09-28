import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import {mkdir, readFile, readdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import {scoutYouTube} from '../src/agents/scoutAgent.js';
import {analyzeTrends} from '../src/agents/analystAgent.js';
import {createIdeas} from '../src/agents/creatorAgent.js';
import {directIdea} from '../src/agents/directorAgent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dataRoot = path.join(root, 'data');
const publicRoot = path.join(root, 'public');
const uploadsRoot = path.join(publicRoot, 'uploads');
const outputRoot = path.join(root, 'out');
await Promise.all([mkdir(uploadsRoot, {recursive: true}), mkdir(outputRoot, {recursive: true}), mkdir(path.join(dataRoot, 'projects'), {recursive: true})]);

const app = express();
const upload = multer({dest: uploadsRoot, limits: {fileSize: 25 * 1024 * 1024}});
app.use(cors());
app.use(express.json({limit: '2mb'}));
app.use('/out', express.static(outputRoot));
app.use('/uploads', express.static(uploadsRoot));

const latestJson = async (folder) => {
  const files = (await readdir(path.join(dataRoot, folder))).filter((file) => file.endsWith('.json')).sort().reverse();
  if (!files[0]) throw new Error(`No ${folder} data found`);
  return JSON.parse(await readFile(path.join(dataRoot, folder, files[0]), 'utf8'));
};

app.get('/api/dashboard', async (_req, res, next) => {
  try {
    const [trendData, ideaData] = await Promise.all([latestJson('trends'), latestJson('ideas')]);
    res.json({date: trendData.date, mode: trendData.mode, trends: trendData.trends, ideas: ideaData.ideas});
  } catch (error) { next(error); }
});

app.post('/api/scout', async (_req, res, next) => {
  try {
    const fallback = await latestJson('trends');
    const apiKey = process.env.VITE_YOUTUBE_API_KEY;
    const trends = apiKey ? await scoutYouTube(apiKey) : fallback.trends;
    const analyses = analyzeTrends(trends);
    const date = new Date().toISOString().slice(0, 10);
    const payload = {date, mode: apiKey ? 'youtube' : 'mock', generatedAt: new Date().toISOString(), trends: analyses};
    await writeFile(path.join(dataRoot, 'trends', `${date}.json`), JSON.stringify(payload, null, 2), 'utf8');
    res.json(payload);
  } catch (error) { next(error); }
});

app.post('/api/ideas/generate', async (_req, res, next) => {
  try {
    const [trendData, ideaData] = await Promise.all([latestJson('trends'), latestJson('ideas')]);
    const analyses = analyzeTrends(trendData.trends);
    res.json({ideas: createIdeas({templateIdeas: ideaData.ideas, analyses})});
  } catch (error) { next(error); }
});

app.post('/api/projects', async (req, res, next) => {
  try {
    const project = directIdea(req.body.idea);
    await writeFile(path.join(dataRoot, 'projects', `${project.id}.json`), JSON.stringify(project, null, 2), 'utf8');
    res.status(201).json(project);
  } catch (error) { next(error); }
});

app.patch('/api/projects/:id', async (req, res, next) => {
  try {
    const file = path.join(dataRoot, 'projects', `${req.params.id}.json`);
    const current = JSON.parse(await readFile(file, 'utf8'));
    const project = {...current, ...req.body, updatedAt: new Date().toISOString()};
    await writeFile(file, JSON.stringify(project, null, 2), 'utf8');
    res.json(project);
  } catch (error) { next(error); }
});

app.post('/api/voice', upload.single('voice'), (req, res) => {
  res.json({src: `/uploads/${req.file.filename}`, originalName: req.file.originalname});
});

let bundledLocation;
app.post('/api/render', async (req, res, next) => {
  try {
    const project = req.body.project;
    if (!project) return res.status(400).json({error: 'Project is required'});
    bundledLocation ||= await bundle({entryPoint: path.join(root, 'src', 'remotion', 'index.jsx'), webpackOverride: (config) => config});
    const inputProps = {project};
    const composition = await selectComposition({serveUrl: bundledLocation, id: 'FootballStory', inputProps});
    const fileName = `${project.id}-${Date.now()}.mp4`;
    await renderMedia({composition, serveUrl: bundledLocation, codec: 'h264', outputLocation: path.join(outputRoot, fileName), inputProps});
    res.json({url: `/out/${fileName}`});
  } catch (error) { next(error); }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({error: error.message || 'Unexpected server error'});
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => console.log(`Touchline API ready at http://localhost:${port}`));
