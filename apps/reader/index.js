const readline = require('readline');
const fs = require('fs');
const color = require('ansi-colors');

const fileName = process.argv[2]; 
// process.argv is an array of command line arguments. 2.si first.txt e denk getirdik

const colors = ['red',  'blue', 'yellow', 'green', 'cyan'];

const readFileLineByLine = async ()=> {
    const fileStream = fs.createReadStream(fileName); 
    const rl = readline.createInterface({
        input: fileStream,   
    });

    for await (const line of rl) {
        const rNumber = Math.floor(Math.random()*4) ;
        const rlColor = colors[rNumber];
        console.log(color[rlColor](line));
    }

}   

readFileLineByLine();

//interface acıp stdin stdout yerine filestreami kullandık