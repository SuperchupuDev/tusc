// @ts-check
import { execSync } from 'node:child_process';
import process from 'node:process';

switch (process.platform) {
  case 'darwin':
    execSync('curl -L -k https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos > ./dist/yt-dlp');
    break;
  case 'linux':
    execSync('curl -L -k https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp > ./dist/yt-dlp');
    break;
  case 'win32':
    execSync('curl -L -k https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe > ./dist/yt-dlp.exe');
    break;
}
