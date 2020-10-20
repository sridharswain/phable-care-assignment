"use strict";
const express = require('express');

const FormFile = require('../util/FormFile');
const CSVParser = require('../util/CSVParser');
const RuleMapper = require('../mappers/RuleMapper');
const Queues = require('../constants/Queues');

const queue = require('../queue');
const ruleservice = require('../service/rule/ruleservice');

const router = express.Router();

function consumeRuleFile(req, res) {
    // TODO Validation of file comes here

    CSVParser(req.file.path)
        .subscribe((item) => {
            let rule = RuleMapper.fromCSVRow(item);
            queue.pushToQueue(Queues.RULE_PROCESS_QUEUE, rule.toJson());
            console.log(rule);
        }).then((result) => {
            console.log("Parsing Completed");
    });

    res.status(200).send();
}

function getRules(req, res) {
    ruleservice.getRulesByStatus(req.params.status)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.log(error);
        })
}

router.post('/update-rules', FormFile.single("file"), consumeRuleFile);
router.get("/get-rules/:status", getRules);

module.exports = router;