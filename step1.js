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

cat(process.argv[2]);