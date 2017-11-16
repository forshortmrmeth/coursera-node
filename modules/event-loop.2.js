'use strict';

let bar;

function someAsyncApiCall(callback) {
    // process.nextTick(callback);
    setImmediate(() => {
        console.log('setImmediate');
        callback();
    });
}

someAsyncApiCall(() => {
    console.log('bar', bar); // 1
});

setTimeout(() => {
    console.log('timeout');
    bar = 1;
}, 0);