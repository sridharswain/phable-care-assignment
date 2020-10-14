"use strict";
const Rule = require('../dto/Rule');


exports.fromCSVRow = (data) => {
    return new Rule(data["Vendor"],
        data["Product"],
        data["Start Date"],
        data["End Date"],
        parseFloat(data["Unit Price"]));
}