const fs = require('fs');

const readFile = (filePath, encoding='utf8') => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        })
    });
};

const writeFile = (filePath, data, encoding='utf8') => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, { encoding }, (err) => {
            if(err) {
                reject(err);
            }
            resolve();
        })
    });
}
module.exports = { readFile, writeFile };