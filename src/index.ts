import { spawn as _spawn, type SpawnOptions } from 'node:child_process';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

export interface TuscOptions {
  url: string | null;
  path: string;
  openExplorer: boolean;
  ytDlpPath?: string;
  extension?: Extension;
  resolution?: number | 'best';
  onData?: (data: string) => unknown;
  onErrorData?: (data: string) => unknown;
}

export type Extension = 'mp4' | 'mp3' | 'webm' | '3gp' | 'm4a' | 'ogg' | 'wav';

export const defaultYtDlpPath = path.resolve('./yt-dlp.exe');

export const audioFormats = ['m4a', 'mp3', 'ogg', 'wav'];

function getFormat(extension: Extension, resolution: number | 'best') {
  const audioFormat = extension === 'mp4' ? 'm4a' : 'webm';
  if (audioFormats.includes(extension)) {
    return ['--extract-audio', '--audio-format', extension];
  }

  return resolution === 'best'
    ? ['-f', `bv*[ext=${extension}]+ba[ext=${audioFormat}]/b[ext=${extension}] / bv*+ba/b`]
    : [
        '-f',
        `bv*[height<=${resolution}][ext=${extension}]+ba[ext=${audioFormat}]/b[height<=${resolution}][ext=${extension}] / bv*+ba/b`
      ];
}

async function spawn(
  command: string,
  args: readonly string[],
  options: SpawnOptions,
  onData?: TuscOptions['onData'],
  onErrorData?: TuscOptions['onErrorData']
) {
  return new Promise((resolve, reject) => {
    const child = _spawn(command, args, options);
    child.stdout?.setEncoding('utf8');
    child.stdout?.on('data', (_data: string | Buffer) => {
      const data = _data.toString();
      onData?.(data) ?? console.log(data);
    });

    child.stderr?.setEncoding('utf8');
    child.stderr?.on('data', (_data: string | Buffer) => {
      const data = _data.toString();
      onErrorData?.(data) ?? console.error(data);
    });
    child.on('close', code => (code === 0 ? resolve(code) : reject(code)));
  });
}

export async function run({
  url: _url,
  path,
  openExplorer,
  ytDlpPath = defaultYtDlpPath,
  extension = 'mp4',
  resolution = 1080,
  onData,
  onErrorData
}: TuscOptions) {
  const url = _url?.replace(/https?:\/\//, '').replace('www.', '');

  if (!url) {
    return null;
  }

  console.log(`Downloading video...`);
  await mkdir(path, { recursive: true });

  const format = getFormat(extension, resolution);
  await spawn(ytDlpPath, [`https://${url}`, ...format], { cwd: path }, onData, onErrorData);

  try {
    if (openExplorer) await spawn('explorer', [path.replaceAll('/', '\\')], { stdio: 'inherit' });
  } catch {}

  return true;
}

export async function update(path: string = defaultYtDlpPath) {
  return spawn(path, ['-U'], { stdio: 'inherit' });
}
