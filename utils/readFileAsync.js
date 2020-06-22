const path = require('path');
const fs = require('fs');

const readFileAsync = (pathTo, fileName) => {
    return new Promise((resolve, reject) => [
        fs.readFile(
            path.join(__dirname, '..', pathTo, fileName),
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(Buffer.from(data).toString()));
                }
            }
        )
    ])
}

module.exports = readFileAsync;