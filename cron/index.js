"use strict";
const schedule = require('node-schedule');

const crons = {
    "ruleUpdateCron" : {
        job: require('./updaterule'),
        period: '*/2 * * * * *'
    }
}

exports.startCron = () => {
    for (let cronJobKey in crons) {
        let cronJob = crons[cronJobKey];
        let cron_rule = cronJob.period;
        schedule.scheduleJob(cron_rule, function () {
            cronJob.job();
        })
    }
}