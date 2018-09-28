const xliffTool = require('../index');

const src = './strings.en.json';
const tar = './strings.de.xliff';

xliffTool.j2x(src, tar);

const src2 = './strings.de.xliff';
const tar2 = './strings.de.json';

xliffTool.x2j('./strings.de.xliff', './strings.de.json');