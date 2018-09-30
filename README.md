# Xliff Tool 
![Depfu](https://img.shields.io/depfu/depfu/example-ruby.svg)


Xliff Tool is a tool for generating and updating xliff from json and also json from xliff.

## Installation

`$ npm i -D xliff_tool`

### Requirements
* npm
* node.js

## Usage

```xliff_tool
const xliffTool = require('xliff_tool');

const src = './strings.en.json';
const tar = './strings.de.xliff';

xliffTool.j2x(src, tar); // export 
```

```xliff_tool
const xliffTool = require('xliff_tool');

const src = './strings.de.xliff';
const tar = './strings.en.json';

xliffTool.x2j(src, tar);
```

## Development
```
$ npm i -dev xliff_tool
$ npm run j2x // generate xliff from json
$ npm run x2j // generate json from xliff
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)