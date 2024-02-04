const myModule = {
    add(s1, s2) {
        return s1 + s2;
    },
    logToConsole(text){
        console.log(text);
    }
}

const myName = 'Sabit'
const getData = () => {
    return 'Data'
}

module.exports = {
    myModule,
    myName,
    getData
}

