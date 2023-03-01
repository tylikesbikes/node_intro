const fs = require('fs');

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

if (process.argv.length !== 3) {
    console.log('Error in command line.');
    console.log('To run, use:   node step1.js [path]');
    console.log('[path] can be either a file on your computer or an http address');
    console.log('Example:   node step1.js my_info.txt');
    process.exit(1);
}

cat(process.argv[2]);