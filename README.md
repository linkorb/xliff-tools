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

xliffTool.j2x(src, tar, 'En', 'De'); // export 
```

```xliff_tool
const xliffTool = require('xliff_tool');

const src = './strings.de.xliff';
const tar = './strings.en.json';

xliffTool.x2j(src, tar);
```

## Development
```
$ npm i -D xliff_tool

$  node bash.js j2x ./strings.en.json ./strings.de.xliff En De // generate xliff from json
$ node bash.js x2j ./strings.de.xliff ./strings.de.json // generate json from xliff

$  node prompt.js j2x // generate xliff from json
$ node prompt.js x2j // generate json from xliff
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)