import { execSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { blue, bold, red } from 'yoctocolors';

export async function run(_url: string | null, path: string, openExplorer: boolean) {
  const url = _url?.replace(/https?:\/\//, '').replace('www.', '');

  if (!url) {
    console.log(`Hi! Provide a URL to download a video from.\nYou can use ${blue('-e')} to stop explorer from opening on success`);
    process.exit(0);
  }

  const [domain] = url.split('.');
  
  if (['youtube', 'youtu'].includes(domain)) {
    console.log(`Downloading ${bold(red('YouTube'))} video...`);
    await mkdir(path, { recursive: true });
    execSync(`yt-dlp https://${url}`, { cwd: path, stdio: 'inherit' });
  }
  
  if (['twitter', 't'].includes(domain)) {
    console.log(`Downloading ${bold(blue('Twitter'))} video...`);
    await mkdir(path, { recursive: true });
    execSync(`yt-dlp https://${url}`, { cwd: path, stdio: 'inherit' });
  }
  
  try {
    if (openExplorer) execSync(`explorer "${path.replaceAll('/', '\\')}"`);
  } catch (_e) {}

}
