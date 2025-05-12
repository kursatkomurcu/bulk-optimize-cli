#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import { walk } from '../src/walker.js';

const program = new Command();
program
  .name('bulk-optimize')
  .argument('<dir>', 'Target directory')
  .option('-r, --recursive', 'Recurse into subdirectories')
  .option('-o, --out <dir>', 'Output directory')
  .option('-v, --verbose', 'Verbose logging')
  .parse();

const options = program.opts();
const targetDir = path.resolve(program.args[0]);
const outDir = options.out ? path.resolve(options.out) : null;

walk(targetDir, { recursive: options.recursive, outDir, verbose: options.verbose })
  .then(() => console.log('Optimization complete.'))
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
