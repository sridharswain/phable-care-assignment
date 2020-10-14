"use strict"
const Queues = require('../constants/Queues');

const ruleprocessor = require('../service/rule/ruleprocessor');

let consumers = {}

consumers[Queues.RULE_PROCESS_QUEUE] = {
    bindFunction: ruleprocessor.process,
    prefetch: 4
}
consumers[Queues.RULE_UPDATE_QUEUE] = {
    bindFunction: ruleprocessor.updateRule,
    prefetch: 4
}

module.exports = consumers;
