"use strict";
const RuleStatus = require('../../constants/RuleStatus');

exports.ruleStatus = (startDate, endDate) => {
    let currentDate = new Date();
    if (currentDate < startDate) {
        return RuleStatus.FUTURE;
    } else if (currentDate > endDate) {
        return RuleStatus.EXPIRED;
    } else {
        return RuleStatus.ONGOING;
    }
}