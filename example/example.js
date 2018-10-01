const xliffTool = require('../index');

const src = './strings.en.json';
const tar = './strings.de.xliff';

xliffTool.j2x(src, tar, 'En', 'De');

const src2 = './strings.de.xliff';
const tar2 = './strings.de.json';

 xliffTool.x2j(src2, tar2);