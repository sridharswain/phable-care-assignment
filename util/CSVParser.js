"use strict";
const csv = require('csvtojson');

module.exports = (filePath) => {
    return csv().fromFile(filePath);
}