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


if (thePath.indexOf('http') == 0) {
    webCat(thePath);
} else {
    cat(thePath);
}