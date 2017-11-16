'use strict';

/**
 * CALLBACK format
 * 1-st parameter — Error
 * 2-nd parameter — Result/response/etc.
 */


module.exports = (x, y, cb) => {
    if (x <= 0 || y <= 0) {
        setTimeout(() => {
            cb(new Error(`Rectangle dimensions should be greater than zero: x = ${x}, y = ${y}`), null);
        }, 2000);
    }
};