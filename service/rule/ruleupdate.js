"use strict";
const db = require('../../models');
const queue = require('../../queue');
const Queues = require('../../constants/Queues');

exports.updateRules = async () => {
    let data = await db.rule.findAll();
    data.forEach(rule => {
        queue.pushToQueue(Queues.RULE_UPDATE_QUEUE, JSON.stringify(rule));
    });
}