#!/usr/bin/env node
import { argv, cwd } from 'node:process';
import { run, update } from './index.js';
const url = argv[2];
const path = `${cwd()}/videos`;
const openExplorer = !argv.includes('-e');
if (!url.trim()) {
  (async () => {
    const { blue } = await import('yoctocolors');
    console.log(
      `Hi! Provide a URL to download a video from.\nYou can use ${blue('-e')} to stop explorer from opening on success`
    );
    process.exit(0);
  })();
}

if (argv.includes('-u') || argv.includes('--update')) {
  update();
} else {
  run({ url, path, openExplorer });
}
