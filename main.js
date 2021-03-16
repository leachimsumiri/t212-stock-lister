let finalString = ""
let finalResult = ""
let calc = 0;

const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('input_trading212.csv');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (let line of rl) {
        line = line.replace('Market buy', 'BUY');
        line = line.replace('Market sell', 'SELL');
        line = line.replace(/\"/g, '');

        let arr = line.split(',');
        arr.forEach(el => {
            if(el.length && arr.indexOf(el) < arr.length-1){
                if((!line.search("SELL") || !line.search("Dividend")) && arr.indexOf(el) === 9){

                    if(!line.search("Dividend")){
                        console.log(line)
                    }

                    finalResult += el + "\n";
                    calc = calc + parseFloat(el);
                }

                el = el.replace(/\./g, ',');

                finalString += el + ";";
            }
        });

        finalString += "\n";
    }

    finalString = finalString.replace(/\./g, ',');
    finalResult = finalResult.replace(/\./g, ',');

    console.log(calc)
    //console.log(finalString);
    //console.log(finalResult)

    fs.writeFile('output.txt', finalString, function (err,data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
    });

    fs.writeFile('outputResult.txt', finalResult, function (err,data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
    });

    //sort by Ticker
    //then sort by sell/buy inside Ticker
}

processLineByLine();