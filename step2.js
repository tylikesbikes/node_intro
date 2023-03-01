const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR READING FILE\n", err);
            process.exit(1);
        } else {
            console.log(data);
        }
    })
}

async function webCat(url) {
    try {
        const {data:webData} = await axios.get(url);
        console.log(webData);
    } catch(err) {
        console.log("WEB ERROR\n",err);
        process.kill(1);
    }

}

if (process.argv.length !== 3) {
    console.log('Error in command line.');
    console.log('To run, use:   node step2.js [path]');
    console.log('[path] can be either a file on your computer or an http address');
    console.log('Example:   node step2.js my_info.txt');
    process.exit(1);
}

const thePath = process.argv[2];


if (thePath.indexOf('http') == 0) {
    webCat(thePath);
} else {
    cat(thePath);
}