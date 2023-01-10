#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { argv, cwd } from 'node:process';
import { blue, bold, red } from 'yoctocolors';

const url = argv[2]?.replace(/https?:\/\//, '').replace('www.', '');

if (!url) {
  console.log(`Hi! Provide a URL to download a video from.\nYou can use ${blue('-e')} to stop explorer from opening on success`);
  process.exit(0);
}

const [domain] = url.split('.');

if (['youtube', 'youtu'].includes(domain)) {
  console.log(`Downloading ${bold(red('YouTube'))} video...`);
  await mkdir(`${cwd()}/videos`, { recursive: true });
  execSync(`yt-dlp https://${url}`, { cwd: `${cwd()}/videos`, stdio: 'inherit' });
}

if (['twitter', 't'].includes(domain)) {
  console.log(`Downloading ${bold(blue('Twitter'))} video...`);
  await mkdir(`${cwd()}/videos`, { recursive: true });
  execSync(`yt-dlp https://${url}`, { cwd: `${cwd()}/videos`, stdio: 'inherit' });
}

try {
  if (argv[3] !== '-e') execSync(`explorer ${cwd()}\\videos`);
} catch (_e) {}
