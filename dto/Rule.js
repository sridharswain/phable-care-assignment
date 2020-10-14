"use strict";

let Rule = function (vendorName, medicineName, startDate, endDate, price) {
    this.vendorName = vendorName;
    this.medicineName = medicineName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;

    this.toJson = function () {
        return JSON.stringify(this);
    }
}

module.exports = Rule;