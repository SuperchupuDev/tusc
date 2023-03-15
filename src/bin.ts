#!/usr/bin/env node
import { argv, cwd } from 'node:process';
import { run, update } from './index.js';

const url = argv[2]?.replace(/https?:\/\//, '').replace('www.', '');
const path = `${cwd()}/videos`;
const openExplorer = !argv.includes('-e');

if (argv.includes('-u') || argv.includes('--update')) {
  update();
} else {
  run({ url, path, openExplorer });
}
