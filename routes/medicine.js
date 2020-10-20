"use strict";
const express = require('express');
const router = express.Router();

const medicineservice = require('../service/medicine/medicineservice');

router.get("/:medicine_id", (req, res) => {
    medicineservice.getTariffs(req.params["medicine_id"])
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

module.exports = router;