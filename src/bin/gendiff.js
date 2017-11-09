#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('1.2.0')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    if (program.format === 'plain') {
      console.log(genDiff(firstConfig, secondConfig, 'plain'));
    } else console.log(genDiff(firstConfig, secondConfig, 'json'));
  })
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
