import { exec as _exec } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { promisify } from 'node:util';

const exec = promisify(_exec);

export async function run(_url: string | null, path: string, openExplorer: boolean) {
  const { blue, bold, red } = await import('yoctocolors');
  const url = _url?.replace(/https?:\/\//, '').replace('www.', '');

  if (!url) {
    console.log(`Hi! Provide a URL to download a video from.\nYou can use ${blue('-e')} to stop explorer from opening on success`);
    process.exit(0);
  }

  const [domain] = url.split('.');
  
  if (['youtube', 'youtu'].includes(domain)) {
    console.log(`Downloading ${bold(red('YouTube'))} video...`);
    await mkdir(path, { recursive: true });
    await exec(`yt-dlp https://${url}`, { cwd: path }).then(({ stdout }) => console.log(stdout));
  }
  
  if (['twitter', 't'].includes(domain)) {
    console.log(`Downloading ${bold(blue('Twitter'))} video...`);
    await mkdir(path, { recursive: true });
    await exec(`yt-dlp https://${url}`, { cwd: path }).then(({ stdout }) => console.log(stdout));
  }
  
  try {
    if (openExplorer) await exec(`explorer "${path.replaceAll('/', '\\')}"`);
  } catch (_e) {}

}
