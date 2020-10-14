'use strict'

const ruleupdate = require('../service/rule/ruleupdate');

/**
 * cron job to update rules
 */
module.exports = function () {
    ruleupdate.updateRules()
        .then(result => {
            console.log("Data Update Completed");
        });
}