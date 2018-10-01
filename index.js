#!/usr/bin/env node
const fs = require('fs');
const flatten = require('flat');
const unflatten = require('flat').unflatten;
const js2xliff = require('xliff/js2xliff');
const xliff2js = require('xliff/xliff2js');
const createjs = require('xliff/createjs');
const targetOfjs = require('xliff/targetOfjs');

saveToFile = (path, data) => {
  fs.writeFile(path, data, (err) => {
    if (err) {
        console.error(err);
        return false;
    };
    console.log("File has been created");
    return true;
  });
}

readFromFile = (path) => {
  try {
    return fs.readFileSync(path, 'utf8');
  }
  catch (err) {
    return;
  }
}

saveJsonToFile = (path, json) => {
  saveToFile(path, JSON.stringify(unflatten(json), null, 2));
}

generateXliffFromJSON = (src, xliffPath, srcLang, trgLang) => {
  let jsonData, xliffData;
  const sourceJSON = require(src);
  const targetJSON = Object.assign({}, sourceJSON, unflatten(getTargetJSONFromXliff(xliffPath)));

  createjs(
    srcLang,
    trgLang,
    flatten(sourceJSON),
    flatten(targetJSON),
    `translateFrom${srcLang}To${trgLang}`,
    (err, res) => {
      if (res) {
        jsonData = res;
      }
      else if (err) {
        console.log(err);
        return false;
      }
    }
  );

  js2xliff(jsonData, (err, res) => {
    if (res) {
      xliffData = res;
    }
    else if (err) {
      console.log(err);
      return false;
    }
  });

  return saveToFile(xliffPath, xliffData);
}

generateTargetJSONFromXliff = (xliffPath, tarJSON) => {
  const targetJSON = getTargetJSONFromXliff(xliffPath);

  saveJsonToFile(tarJSON, targetJSON);
}

getTargetJSONFromXliff = (xliffPath) => {
  let jsonData, targetJSON;
  const srcXliff = readFromFile(xliffPath);

  if (srcXliff === undefined) {
    return {};
  }

  xliff2js(srcXliff, (err, res) => {
    if (res) {
      jsonData = res;
    }
    else if (err) {
      console.log(err);
      return {};
    }
  });

  targetOfjs(jsonData, (err, res) => {
    if (res) {
      targetJSON = res;
    }
    else if (err) {
      console.log(err);
      return {};
    }
  });
  
  return targetJSON;
}

const j2x = generateXliffFromJSON;
const x2j = generateTargetJSONFromXliff;

module.exports = {
  j2x,
  x2j
};