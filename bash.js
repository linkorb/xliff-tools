#!/usr/bin/env node

const program = require('commander');
const xliffTool = require('./index');

program
  .version('1.0.0')
  .description('Xliff Management Tool');

program
  .command('json2xliff <json> <xliff> <srcLang> <trgLang>')
  .alias('j2x')
  .description('convert json to xliff')
  .action((json, xliff, srcLang, trgLang) => {
    xliffTool.j2x(json, xliff, srcLang, trgLang);
  });

program
  .command('xliff2json <xliff> <json>')
  .alias('x2j')
  .description('convert xliff to json')
  .action((xliff, json) => {
    xliffTool.x2j(json, xliff);
  });

program.parse(process.argv);