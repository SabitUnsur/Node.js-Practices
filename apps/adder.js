const readline = require('readline');
const process = require('process');
const c = require('ansi-colors');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a number: ', (answer) => {
    rl.question('Enter another number: ', (answer2) => {
        const result = Number(answer) + Number(answer2);
        console.log(c.bold.red(`Result:  ${result}`));
        rl.close();
    })
})
