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

generateXliffFromJSON = (src, xliffPath) => {
  let jsonData, xliffData;
  const sourceJSON = require(src);
  const targetJSON = Object.assign({}, sourceJSON, unflatten(getTargetJSONFromXliff(xliffPath)));

  createjs(
    "en-US",
    "de-CH",
    flatten(sourceJSON),
    flatten(targetJSON),
    "translateFromEnToDe",
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


const env = process.argv[3];

if (env === 'j2x') {
  generateXliffFromJSON('./strings.en.json', './string.de.xliff');
}
else if (env === 'x2j') {
  generateTargetJSONFromXliff('./string.de.xliff', './strings.de.json');
}

const j2x = generateXliffFromJSON;
const x2j = generateTargetJSONFromXliff;

module.exports = {
  j2x,
  x2j
};