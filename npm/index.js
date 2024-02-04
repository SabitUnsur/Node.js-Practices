const c = require('ansi-colors');

const moment = require('moment');

/*console.log(c.red('This is a red string!'));
console.log(c.green('This is a red string!'));
console.log(c.cyan('This is a cyan string!'));
console.log(c.yellow('This is a yellow string!'));*/

moment.locale('tr');
console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));