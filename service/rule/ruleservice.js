"use strict";
const RuleStatus = require('../../constants/RuleStatus');

const db = require('../../models');

exports.getRulesByStatus = async (status) => {
    return db.rule.findAll({
        where: {
            ruleStatus: RuleStatus[status]
        }
    });
}