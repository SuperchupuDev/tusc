#!/usr/bin/env node
import { argv, cwd } from 'node:process';
import { run } from './index.js';

const url = argv[2]?.replace(/https?:\/\//, '').replace('www.', '');
const path = `${cwd()}/videos`;
const openExplorer = argv[3] !== '-e';

run(url, path, openExplorer);
