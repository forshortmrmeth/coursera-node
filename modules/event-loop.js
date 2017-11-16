'use strict';

const fs = require('fs');
const path = require('path');

function asyncReadFileOperation(callback) {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        callback(err, data);
    });
}


// last log
setTimeout(() => {
    console.log('Log from setTimeout');
}, 0);


// 2-nd log
asyncReadFileOperation((err, data) => {
    let i = 0;
    while (i < 1e5) {
        i++;
    }
    console.log(`Async operation cb`);
});


// 1-st log
setImmediate(() => {
    console.log('Logs from setImmediate');
});

process.nextTick(() => console.log('next tick'));
