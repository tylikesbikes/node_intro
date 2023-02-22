const fs = require('fs');
const axios = require('axios');
const { NONAME } = require('dns');


function parseCommandLine() {
    if (process.argv[2] == '--out') {
        return {
            out:true,
            outFile:process.argv[3],
            inFile:process.argv[4]
        }
    }
    return {
        out:false,
        outFile:undefined,
        inFile:process.argv[2]
        }
}



function handleOutput(data, out) {
    if (out) {
        fs.writeFile(out, data, 'utf8', (err) => {
            if (err) {
                console.log('ERROR WRITING DATA:\n',err);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR READING FILE\n", err);
            process.exit(1);
        } else {
            handleOutput(data, cmdOptions.outFile);
            // if (cmdOptions.out) {
            //     fs.writeFile(cmdOptions.outFile, data, (err) => {
            //         if (err) {
            //             console.log("ERROR WRITING FILE:\n",err);
            //         }
            //     });
            // } else {
            // console.log(data);
            // }
        }
    })
}

async function webCat(url) {
    try {
        const {data:webData} = await axios.get(url);
        handleOutput(webData, cmdOptions.outFile)
        // if (cmdOptions.out) {
        //     fs.writeFile(cmdOptions.outFile, webData, (err) => {
        //         if (err) {
        //             console.log("ERROR WRITING HTTP FILE:\n",err);
        //         }
        //     });
        // } else {
        //     console.log(webData);
        // }
    } catch(err) {
        console.log("WEB ERROR\n",err);
        process.kill(1);
    }
}



const cmdOptions = parseCommandLine();
if (cmdOptions.inFile.indexOf('http') == 0) {
    webCat(cmdOptions.inFile);
} else {
    cat(cmdOptions.inFile);
}