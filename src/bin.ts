#!/usr/bin/env node
import { argv, cwd } from 'node:process';
import { run, update } from './index.js';

const url = argv[2] ?? '';
const path = `${cwd()}/videos`;
const openExplorer = !argv.includes('-e');

async function main() {
  if (!url.trim()) {
    const { blue } = await import('yoctocolors');
    console.log(
      `Hi! Provide a URL to download a video from.\nYou can use ${blue(
        '-e'
      )} to stop explorer from opening on success and ${blue('-u')} to update yt-dlp.`
    );
    process.exit(0);
  }

  if (argv.includes('-u') || argv.includes('--update')) {
    await update();
  } else {
    await run({ url, path, openExplorer });
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
