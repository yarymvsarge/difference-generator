#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('1.3.0')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) =>
    console.log(genDiff(firstConfig, secondConfig, program.format)))
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
