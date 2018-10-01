
const program = require('commander');
const { prompt } = require('inquirer');
const xliffTool = require('./index');

const json2xliff_question = [
  {
    type : 'input',
    name : 'json',
    message : 'Enter Json path ...'
  },
  {
    type : 'input',
    name : 'xliff',
    message : 'Enter Xliff path ...'
  },
  {
    type : 'input',
    name : 'srcLang',
    message : 'Enter source language ...'
  },
  {
    type : 'input',
    name : 'trgLang',
    message : 'Enter target language ...'
  }
];

const xliff2json_question = [
  {
    type : 'input',
    name : 'xliff',
    message : 'Enter Xliff path ...'
  },
  {
    type : 'input',
    name : 'json',
    message : 'Enter Json path ...'
  }
];

program
  .command('json2xliff')
  .alias('j2x')
  .description('Convert json to xliff')
  .action(() => {
    prompt(json2xliff_question).then(( json, xliff, srcLang, trgLang ) => {
      xliffTool.j2x(json, xliff, srcLang, trgLang);
    }
  )});

program
  .command('xliff2json')
  .alias('x2j')
  .description('Convert xliff to json')
  .action(() => {
    prompt(xliff2json_question).then(( json, xliff ) => {
      xliffTool.x2j(xliff, json);
    }
  )});

program.parse(process.argv);