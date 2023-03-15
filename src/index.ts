import { exec as _exec } from 'node:child_process';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import { promisify } from 'node:util';

export interface TuscOptions {
  url: string | null;
  path: string;
  openExplorer: boolean;
  ytDlpPath?: string;
}

const exec = promisify(_exec);

export const defaultYtDlpPath = path.resolve('./yt-dlp.exe');

export async function run({ url: _url, path, openExplorer, ytDlpPath = defaultYtDlpPath }: TuscOptions) {
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
    await exec(`${ytDlpPath} https://${url}`, { cwd: path }).then(({ stdout }) => console.log(stdout));
  }
  
  if (['twitter', 't'].includes(domain)) {
    console.log(`Downloading ${bold(blue('Twitter'))} video...`);
    await mkdir(path, { recursive: true });
    await exec(`${ytDlpPath} https://${url}`, { cwd: path }).then(({ stdout }) => console.log(stdout));
  }
  
  try {
    if (openExplorer) await exec(`explorer "${path.replaceAll('/', '\\')}"`);
  } catch {}

}

export async function update(path: string = defaultYtDlpPath) {
  return exec(`${path} -U`).then(({ stdout }) => console.log(stdout));
}
